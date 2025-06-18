// src/components/student/component/assistant/AgentAssistantChat/AgentAssistantChat.tsx
"use client";

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import styles from './AgentAssistantChat.module.css';

// --- 统一导入所有子组件和类型 ---
import ChatHeader from '@/components/common/UniversalChatWidget/ChatHeader/ChatHeader';
import ChatBody from '@/components/common/UniversalChatWidget/ChatBody/ChatBody';
import ChatInputForm from '@/components/common/UniversalChatWidget/ChatInputForm/ChatInputForm';
import SkillSelector, { Skill } from '@/components/common/UniversalChatWidget/SkillSelector/SkillSelector';
import AssistantWelcomeScreen from '../AssistantWelcomeScreen/AssistantWelcomeScreen';
import ChatFooter from '@/components/common/UniversalChatWidget/ChatFooter/ChatFooter';

// 导入重构后的 MessageBubble 及其所需类型
import MessageBubble, { BubbleMessage } from '@/components/common/MessageBubble/MessageBubble';
import { ReferenceItem } from '@/components/common/MessageBubble/MessageReferences';

// --- 技能按钮数据 ---
const availableSkills: Skill[] = [
    { id: 'deep_think', name: '深度思考', icon: <svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em"><defs><linearGradient x1="50%" y1="0%" x2="50%" y2="100%" id="grad_deep_think"><stop stopColor="#2DD4BF" offset="0%"></stop><stop stop-color="#3B82F6" offset="100%"></stop></linearGradient></defs><path d="M512 992a32 32 0 0 1-14.72-3.84l-384-221.76a32 32 0 0 1-17.28-27.84V285.44a32 32 0 0 1 17.28-27.84l384-221.76a32 32 0 0 1 29.44 0l384 221.76a32 32 0 0 1 17.28 27.84v448.32a32 32 0 0 1-17.28 27.84l-384 221.76A32 32 0 0 1 512 992z m-352-277.44l352 203.2 352-203.2V309.44l-352-203.2-352 203.2zM512 608a32 32 0 1 1 0-64 32 32 0 0 1 0 64z m-160 92.16a32 32 0 1 1 0-64 32 32 0 0 1 0 64z m320 0a32 32 0 1 1 0-64 32 32 0 0 1 0 64z m-160-184.32a32 32 0 1 1 0-64 32 32 0 0 1 0 64z" p-id="4523" fill="url(#grad_deep_think)"></path></svg> },
    { id: 'analyze_research', name: '分析研究', icon: <i style={{color: '#4F46E5'}} className="fas fa-chart-pie"></i> },
    { id: 'code_mode', name: '代码模式', icon: <i style={{color: '#3B82F6'}} className="fas fa-code"></i> },
    { id: 'web_search', name: '联网搜索', icon: <svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em"><defs><linearGradient x1="50%" y1="0%" x2="50%" y2="100%" id="grad_web_search"><stop stop-color="#A78BFA" offset="0%"></stop><stop stop-color="#3B82F6" offset="100%"></stop></linearGradient></defs><path d="M512 960A448 448 0 1 1 512 64a448 448 0 0 1 0 896z m0-64a384 384 0 1 0 0-768 384 384 0 0 0 0 768z" p-id="1371" fill="url(#grad_web_search)"></path><path d="M512 832c-154.112 0-288.768-100.8-336.704-242.88a32 32 0 1 1 59.52-25.216C275.904 686.08 384.896 768 512 768c127.104 0 236.096-81.92 277.184-204.16a32 32 0 1 1 59.52 25.216C800.768 731.2 666.112 832 512 832z" p-id="1372" fill="url(#grad_web_search)"></path></svg> },
    { id: 'ppt_creation', name: 'PPT创作', icon: <i style={{color: '#EF4444'}} className="fas fa-file-powerpoint"></i> },
    { id: 'command_center', name: '指令中心', icon: <i style={{color: '#8B5CF6'}} className="fas fa-satellite-dish"></i> },
];


// --- 全面的测试数据 ---
const mockMessages: BubbleMessage[] = [
    {
        id: 'user-1',
        role: 'user',
        content: '你好，请帮我解释一下什么是快速排序算法，并用 Python 实现。',
        isComplete: true,
    },
    {
        id: 'assistant-1',
        role: 'assistant',
        content: '', // 初始为空，模拟正在思考
        isThinking: true,
        isComplete: false,
    },
    {
        id: 'user-2',
        role: 'user',
        content: '这个算法的时间复杂度是多少？',
        isComplete: true,
    },
    {
        id: 'assistant-2',
        role: 'assistant',
        content: '快速排序的平均时间复杂度是 $O(n \\log n)$，最坏情况下的时间复杂度是 $O(n^2)$。',
        isThinking: false,
        isComplete: true,
    },
    {
        id: 'user-3',
        role: 'user',
        content: '太棒了！请帮我生成一个关于二叉树的 Mermaid 图。',
        isComplete: true,
    },
    {
        id: 'assistant-3',
        role: 'assistant',
        content: "当然，这是一个表示简单二叉树的Mermaid图示例：\n\n```mermaid\ngraph TD\n    A[Root] --> B[Left Child]\n    A --> C[Right Child]\n    B --> D[L-L]\n    B --> E[L-R]\n```",
        thinkingText: "1.  用户需要一个 Mermaid 图。\n2.  主题是二叉树。\n3.  构建一个简单的 TD (Top-Down) 图形。\n4.  定义根节点、左右子节点和孙节点。",
        isThinking: false,
        isComplete: true,
    },
    {
        id: 'user-4',
        role: 'user',
        content: '请根据我上传的文档，总结一下核心内容。',
        isComplete: true,
    },
    {
        id: 'assistant-4',
        role: 'assistant',
        content: "根据您提供的《数据结构与算法.pdf》<ref>1</ref>和《Web安全基础.docx》<ref>2</ref>文档，核心内容总结如下：\n\n1.  **数据结构与算法**：主要探讨了数组、链表、栈、队列、树和图等基本数据结构，并详细介绍了排序（如快速排序<ref>1</ref>）和搜索算法。\n2.  **Web安全**：重点讲解了XSS、CSRF等常见Web攻击手段及其防御措施<ref>2</ref>。",
        references: [
            { type: 'file', title: '数据结构与算法.pdf' },
            { type: 'file', title: 'Web安全基础.docx' },
            { type: 'web', title: '什么是跨站脚本攻击(XSS)? - OWASP', link: '#' }
        ],
        isThinking: false,
        isComplete: true,
    }
];


const AgentAssistantChat: React.FC = () => {
    const [messages, setMessages] = useState<BubbleMessage[]>([]); // 初始为空，通过按钮加载
    const [inputValue, setInputValue] = useState('');
    const [isSending, setIsSending] = useState(false);
    const [showThinkingPanelId, setShowThinkingPanelId] = useState<string | null>(null);
    const [selectedSkill, setSelectedSkill] = useState<string>('');

    const abortControllerRef = useRef<AbortController | null>(null);
    const chatBodyRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (chatBodyRef.current) {
            chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
        }
    }, [messages, showThinkingPanelId]);

    const handleSendMessage = async (data: { text: string; mode: string }) => {
        let content = data.text.trim();
        if (!content) return;

        if (selectedSkill) {
            const skillName = availableSkills.find(s => s.id === selectedSkill)?.name || '';
            content = `[使用${skillName}功能] ${content}`;
        }

        setIsSending(true);
        abortControllerRef.current = new AbortController();
        const newUserMessage: BubbleMessage = { id: `user-${Date.now()}`, role: 'user', content: content, isComplete: true };
        const assistantMsgId = `assistant-${Date.now()}`;

        setMessages(prev => [ ...prev, newUserMessage, { id: assistantMsgId, role: 'assistant', content: '', isThinking: true, isComplete: false } ]);
        setInputValue('');
        setSelectedSkill('');

        const apiMessagesHistory = [...messages, newUserMessage].filter(m => m.role === 'user' || m.isComplete).map(({ role, content }) => ({ role, content }));

        try {
            // ... (实际的API调用逻辑)
            // 这里我们用 setTimeout 模拟一个延迟的、可中断的响应
            await new Promise((resolve, reject) => {
                const timeoutId = setTimeout(() => {
                    const finalResponse = "这是一个模拟的AI回答，用于演示中断功能。";
                    setMessages(prev => prev.map(msg => msg.id === assistantMsgId ? { ...msg, content: finalResponse, isThinking: false, isComplete: true } : msg));
                    resolve(true);
                }, 5000); // 模拟5秒响应时间

                abortControllerRef.current?.signal.addEventListener('abort', () => {
                    clearTimeout(timeoutId);
                    reject(new DOMException('Aborted', 'AbortError'));
                });
            });

        } catch (error: any) {
            if (error.name === 'AbortError') {
                console.log('Fetch aborted by user.');
                setMessages(prev => prev.map(msg => msg.id === assistantMsgId ? { ...msg, content: msg.content + "\n\n[用户已中断]", isThinking: false, isComplete: true } : msg));
            } else {
                console.error("Error handling stream:", error);
                setMessages(prev => prev.map(msg => msg.id === assistantMsgId ? { ...msg, content: `抱歉，处理您的请求时发生了错误。`, isThinking: false, isComplete: true } : msg));
            }
        } finally {
            setIsSending(false);
            abortControllerRef.current = null;
        }
    };

    const handleStopSending = () => {
        abortControllerRef.current?.abort();
    };

    const handleClearChat = () => {
        setMessages([]);
        handleStopSending();
    };

    const toggleThinkingPanel = (messageId: string) => {
        setShowThinkingPanelId(prevId => (prevId === messageId ? null : messageId));
    };

    const showWelcomeScreen = messages.length === 0;

    // AI 助手 Agent 的定义
    const assistantAgent = {
        avatar: <Image src="/images/Chat/robot.png" alt="Agent 助教" width={36} height={36} />,
        themeColor: 'var(--student-primary)',
    };

    return (
        <div className={styles.chatContainer}>
            {showWelcomeScreen ? (
                <AssistantWelcomeScreen onPromptClick={(text) => handleSendMessage({ text, mode: 'auto' })} />
            ) : (
                <>
                    <ChatHeader
                        title="Agent 助教"
                        avatar={<Image src="/images/Chat/robot.png" alt="Agent 助教" width={26} height={26} />} >

                        {/* 增加一个加载测试数据的按钮，方便调试 */}
                        <button className={styles.controlButton} title="加载测试数据" onClick={() => setMessages(mockMessages)}>
                            <i className="fas fa-vial"></i>
                        </button>
                        <button className={styles.controlButton} title="清空对话" onClick={handleClearChat}>
                            <i className="fas fa-trash-alt"></i>
                        </button>

                    </ChatHeader>

                    <ChatBody ref={chatBodyRef}>
                        {messages.map(msg => (
                            msg.id !== 'init-assistant' &&
                            <MessageBubble
                                key={msg.id}
                                message={{
                                    ...msg,
                                    agent: msg.role === 'assistant' ? assistantAgent : undefined
                                }}
                                isThinkingPanelOpen={showThinkingPanelId === msg.id}
                                onToggleThinkingPanel={toggleThinkingPanel}
                            />
                        ))}
                    </ChatBody>

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