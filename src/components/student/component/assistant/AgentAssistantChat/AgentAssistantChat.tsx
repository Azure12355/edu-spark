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
import ChatFooter from '../ChatFooter/ChatFooter';
// 不再需要 QuickActionPrompts

interface Message {
    id: string;
    role: 'user' | 'assistant' | 'system';
    content: string;
    thinkingText?: string | null;
    isThinking?: boolean;
    isComplete?: boolean;
}

const AgentAssistantChat: React.FC = () => {
    // ... (其他 state 和 ref 定义不变) ...
    const initialMessages: Message[] = [
        {
            id: 'init-assistant',
            role: 'assistant',
            content: "你好！我是你的专属 Agent 助教。你可以开始向我提问了。",
            isComplete: true
        }
    ];

    const [messages, setMessages] = useState<Message[]>(initialMessages);
    const [inputValue, setInputValue] = useState('');
    const [isSending, setIsSending] = useState(false);
    const [showThinkingPanelId, setShowThinkingPanelId] = useState<string | null>(null);

    // --- 核心修改 1: 创建 AbortController 的 ref ---
    const abortControllerRef = useRef<AbortController | null>(null);

    const chatBodyRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (chatBodyRef.current) {
            chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
        }
    }, [messages, showThinkingPanelId]);

    const handleSendMessage = async (data: { text: string; mode: string }) => {
        // ... (原有的函数开始部分逻辑不变) ...
        const content = data.text.trim();
        if (!content) return;

        setIsSending(true);
        // --- 核心修改 2: 在发送时创建新的 AbortController ---
        abortControllerRef.current = new AbortController();

        const newUserMessage: Message = { id: `user-${Date.now()}`, role: 'user', content: content, isComplete: true };
        const assistantMsgId = `assistant-${Date.now()}`;

        setMessages(prev => [
            ...prev.filter(m => m.id !== 'init-assistant'),
            newUserMessage,
            { id: assistantMsgId, role: 'assistant', content: '', isThinking: true, isComplete: false }
        ]);
        setInputValue('');

        const apiMessagesHistory = [...messages.slice(1), {role: 'user', content: data.text}]
            .map(({ role, content }) => ({ role, content }));

        try {
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ messages: apiMessagesHistory, mode: data.mode }),
                // --- 核心修改 3: 将 signal 传递给 fetch ---
                signal: abortControllerRef.current.signal,
            });

            // ... (流式响应处理逻辑不变) ...
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
            // --- 核心修改 4: 捕获中断错误 ---
            if (error.name === 'AbortError') {
                console.log('Fetch aborted by user.');
                // 当中断时，将AI消息标记为“已中断”
                setMessages(prev => prev.map(msg => msg.id === assistantMsgId ? { ...msg, content: msg.content + "\n\n[用户已中断]", isThinking: false, isComplete: true } : msg));
            } else {
                console.error("Error handling stream:", error);
                setMessages(prev => prev.map(msg => msg.id === assistantMsgId ? { ...msg, content: `抱歉，处理您的请求时发生了错误: ${error instanceof Error ? error.message : String(error)}`, isThinking: false, isComplete: true } : msg));
            }
        } finally {
            setIsSending(false);
            abortControllerRef.current = null; // 清理
        }
    };

    // --- 核心修改 5: 实现 onStop 函数 ---
    const handleStopSending = () => {
        if (abortControllerRef.current) {
            abortControllerRef.current.abort();
        }
    };

    const handleClearChat = () => {
        setMessages(initialMessages);
        handleStopSending(); // 清空时也停止正在进行的请求
    };

    // ... toggleThinkingPanel 和 showWelcomeScreen 不变 ...
    const toggleThinkingPanel = (messageId: string) => {
        setShowThinkingPanelId(prevId => (prevId === messageId ? null : messageId));
    };
    const showWelcomeScreen = messages.length === 1 && messages[0].id === 'init-assistant';

    return (
        <div className={styles.chatContainer}>
            {showWelcomeScreen ? (
                <AssistantWelcomeScreen onPromptClick={(text) => handleSendMessage({ text, mode: 'auto' })} />
            ) : (
                <>
                    <ChatHeader
                        title="Agent 助教"
                        avatar={<Image src="/images/Chat/robot.png" alt="Agent 助教" width={26} height={26} />}
                    >
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

                    {/* --- 核心修改 6: 传递 onStop prop --- */}
                    <ChatInputForm
                        inputValue={inputValue}
                        onInputChange={setInputValue}
                        // 简化 onSubmit 的数据传递，不再需要附件
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