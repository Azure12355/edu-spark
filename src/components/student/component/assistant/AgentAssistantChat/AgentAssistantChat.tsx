// src/components/student/component/assistant/AgentAssistantChat/AgentAssistantChat.tsx
"use client";

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import styles from './AgentAssistantChat.module.css';

// 更新组件导入路径
import ChatHeader from '@/components/common/UniversalChatWidget/ChatHeader/ChatHeader';
import ChatBody from '@/components/common/UniversalChatWidget/ChatBody/ChatBody';
import ChatInputForm from '@/components/common/UniversalChatWidget/ChatInputForm/ChatInputForm'; // <-- 使用新的组件
import AssistantWelcomeScreen from '../AssistantWelcomeScreen/AssistantWelcomeScreen';
import MessageBubble from '../MessageBubble/MessageBubble';
import ChatFooter from '@/components/common/UniversalChatWidget/ChatFooter/ChatFooter';
import SkillSelector, {Skill} from "@/components/common/UniversalChatWidget/SkillSelector/SkillSelector";
// 不再需要 QuickActionPrompts

// ... Message 接口定义不变 ...
interface Message {
    id: string;
    role: 'user' | 'assistant' | 'system';
    content: string;
    thinkingText?: string | null;
    isThinking?: boolean;
    isComplete?: boolean;
}

// --- 2. 定义技能数据 (可以从外部文件导入) ---
const availableSkills: Skill[] = [
    { id: 'analyze_research', name: '分析研究', icon: <i style={{color: '#4F46E5'}} className="fas fa-chart-pie"></i> },
    { id: 'code_mode', name: '代码模式', icon: <i style={{color: '#3B82F6'}} className="fas fa-code"></i> },
    { id: 'web_search', name: '联网搜索', icon:  <i style={{color: '#3B82F6'}} className="fas fa-earth"></i> },
    { id: 'ppt_creation', name: 'PPT创作', icon: <i style={{color: '#EF4444'}} className="fas fa-file-powerpoint"></i> },
    { id: 'command_center', name: '指令中心', icon: <i style={{color: '#8B5CF6'}} className="fas fa-satellite-dish"></i> },
];
// 注意：为了简洁，SVG 的 path 数据用 "M..." 代替，实际使用时请替换为完整的 SVG 路径数据。
// 或者，您可以直接使用 Font Awesome 图标，就像 "分析研究" 那样。

const AgentAssistantChat: React.FC = () => {
    // ... 其他 state 和 ref 定义不变 ...
    const initialMessages: Message[] = [ { id: 'init-assistant', role: 'assistant', content: "你好！我是你的专属 Agent 助教。你可以开始向我提问了。", isComplete: true } ];
    const [messages, setMessages] = useState<Message[]>(initialMessages);
    const [inputValue, setInputValue] = useState('');
    const [isSending, setIsSending] = useState(false);
    const [showThinkingPanelId, setShowThinkingPanelId] = useState<string | null>(null);
    const abortControllerRef = useRef<AbortController | null>(null);
    const chatBodyRef = useRef<HTMLDivElement>(null);

    // --- 3. 新增 state 来管理选中的技能 ---
    const [selectedSkill, setSelectedSkill] = useState<string>('');

    // ... useEffects 和其他函数保持不变 ...
    useEffect(() => { if (chatBodyRef.current) chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight; }, [messages, showThinkingPanelId]);

    // --- 4. 修改 handleSendMessage 以包含选中的技能 ---
    const handleSendMessage = async (data: { text: string; mode: string }) => {
        let content = data.text.trim();
        if (!content) return;

        // 如果有选中的技能，将其作为前缀添加到消息中
        if (selectedSkill) {
            const skillName = availableSkills.find(s => s.id === selectedSkill)?.name || '';
            content = `[使用${skillName}功能] ${content}`;
        }

        setIsSending(true);
        abortControllerRef.current = new AbortController();
        const newUserMessage: Message = { id: `user-${Date.now()}`, role: 'user', content: content, isComplete: true };
        const assistantMsgId = `assistant-${Date.now()}`;

        setMessages(prev => [ ...prev.filter(m => m.id !== 'init-assistant'), newUserMessage, { id: assistantMsgId, role: 'assistant', content: '', isThinking: true, isComplete: false } ]);
        setInputValue('');
        setSelectedSkill(''); // 发送后清空选中技能

        const apiMessagesHistory = [...messages.slice(1), {role: 'user', content: data.text}].map(({ role, content }) => ({ role, content }));

        try {
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    messages: apiMessagesHistory,
                    mode: data.mode,
                    skill: selectedSkill // 将技能ID传给API
                }),
                signal: abortControllerRef.current.signal,
            });
            // ... (处理流式响应的逻辑完全不变)
            if (!response.ok || !response.body) throw new Error('API request failed');
            const reader = response.body.getReader();
            const decoder = new TextDecoder();
            let accumulatedContent = '';
            while (true) {
                const { value, done } = await reader.read();
                if (done) break;
                const chunk = decoder.decode(value, { stream: true });
                const lines = chunk.split('\n\n');
                for (const line of lines) {
                    if (line.startsWith('data: ')) {
                        const jsonDataString = line.substring('data: '.length).trim();
                        if (jsonDataString === '[DONE]') break;
                        try {
                            const parsedChunk = JSON.parse(jsonDataString);
                            const deltaContent = parsedChunk.choices?.[0]?.delta?.content || '';
                            if (deltaContent) {
                                accumulatedContent += deltaContent;
                                setMessages(prev => prev.map(msg => msg.id === assistantMsgId ? { ...msg, content: accumulatedContent, isThinking: true } : msg));
                            }
                        } catch (error) { /* 忽略不完整的JSON块 */ }
                    }
                }
            }
            const thinkStartTag = "<think>";
            const thinkEndTag = "</think>";
            let finalThinkingText: string | null = null;
            let finalDisplayText = accumulatedContent;
            const thinkStartIndex = accumulatedContent.indexOf(thinkStartTag);
            const thinkEndIndex = accumulatedContent.indexOf(thinkEndTag);
            if (thinkStartIndex !== -1 && thinkEndIndex > thinkStartIndex) {
                finalThinkingText = accumulatedContent.substring(thinkStartIndex + thinkStartTag.length, thinkEndIndex).trim();
                finalDisplayText = (accumulatedContent.substring(0, thinkStartIndex) + accumulatedContent.substring(thinkEndIndex + thinkEndTag.length)).trim();
            }
            setMessages(prev => prev.map(msg => msg.id === assistantMsgId ? { ...msg, content: finalDisplayText, thinkingText: finalThinkingText, isThinking: false, isComplete: true } : msg));

        } catch (error: any) {
            if (error.name === 'AbortError') {
                setMessages(prev => prev.map(msg => msg.id === assistantMsgId ? { ...msg, content: msg.content + "\n\n[用户已中断]", isThinking: false, isComplete: true } : msg));
            } else {
                setMessages(prev => prev.map(msg => msg.id === assistantMsgId ? { ...msg, content: `抱歉，处理您的请求时发生了错误: ${error instanceof Error ? error.message : String(error)}`, isThinking: false, isComplete: true } : msg));
            }
        } finally {
            setIsSending(false);
            abortControllerRef.current = null;
        }
    };

    const handleStopSending = () => { if (abortControllerRef.current) abortControllerRef.current.abort(); };
    const handleClearChat = () => { setMessages(initialMessages); handleStopSending(); };
    const toggleThinkingPanel = (messageId: string) => { setShowThinkingPanelId(prevId => (prevId === messageId ? null : messageId)); };
    const showWelcomeScreen = messages.length === 1 && messages[0].id === 'init-assistant';

    return (
        <div className={styles.chatContainer}>
            {showWelcomeScreen ? (
                <AssistantWelcomeScreen onPromptClick={(text) => handleSendMessage({ text, mode: 'auto' })} />
            ) : (
                <>
                    <ChatHeader
                        title="Agent 助教"
                        avatar={<Image src="/images/Chat/robot.png" alt="Agent 助教" width={26} height={26} />} >
                        <button className={styles.controlButton} title="清空对话" onClick={handleClearChat}>
                            <i className="fas fa-trash-alt"></i>
                            <span style={{marginLeft: '5px'}}>清空对话</span>
                        </button>
                    </ChatHeader>

                    <ChatBody ref={chatBodyRef}>
                        {messages.map(msg => (
                            msg.id !== 'init-assistant' &&
                            <MessageBubble
                                key={msg.id}
                                message={msg}
                                isThinkingPanelOpen={showThinkingPanelId === msg.id}
                                onToggleThinkingPanel={toggleThinkingPanel}
                            />
                        ))}
                    </ChatBody>

                    {/* --- 5. 在此处添加 SkillSelector 组件 --- */}
                    <SkillSelector
                        skills={availableSkills}
                        selectedSkillId={selectedSkill}
                        onSkillSelect={setSelectedSkill}
                    />

                    <ChatInputForm
                        inputValue={inputValue}
                        onInputChange={setInputValue}
                        onSubmit={(data) => handleSendMessage({ text: data.text, mode: data.mode })}
                        isSending={isSending}
                        onStop={handleStopSending}
                        shouldFocus={!showWelcomeScreen}
                    />

                    <ChatFooter />
                </>
            )}
        </div>
    );
};

export default AgentAssistantChat;