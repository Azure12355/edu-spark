// src/components/student/component/assistant/AgentAssistantChat.tsx
"use client";

import React, { useState, useEffect, useRef } from 'react';
import styles from './AgentAssistantChat.module.css'; // 主容器样式

// 导入所有新的子组件
import AssistantWelcomeScreen from '../AssistantWelcomeScreen/AssistantWelcomeScreen';
import ChatHeader from '../ChatHeader/ChatHeader';
import MessageBubble from '../MessageBubble/MessageBubble';
import QuickActionPrompts from '../QuickActionPrompts/QuickActionPrompts';
import ChatInputForm from '../ChatInputForm/ChatInputForm';
import ChatFooter from '../ChatFooter/ChatFooter';

// Message 接口定义保持不变
interface Message {
    id: string;
    role: 'user' | 'assistant';
    content: string;
    thinkingText?: string | null;
    isThinking?: boolean;
    isComplete?: boolean;
}

const AgentAssistantChat: React.FC = () => {
    const initialMessages: Message[] = [
        {
            id: 'init-assistant',
            role: 'assistant',
            content: "你好！我是你的专属 Agent 助教。你可以开始向我提问了。",
            isComplete: true
        }
    ];

    // State 管理
    const [messages, setMessages] = useState<Message[]>(initialMessages);
    const [inputValue, setInputValue] = useState('');
    const [isSending, setIsSending] = useState(false);
    const [showThinkingPanelId, setShowThinkingPanelId] = useState<string | null>(null);

    const chatBodyRef = useRef<HTMLDivElement>(null);

    // 滚动到底部
    useEffect(() => {
        if (chatBodyRef.current) {
            chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
        }
    }, [messages, showThinkingPanelId]);

    // 核心业务逻辑：发送消息
    const sendChatMessage = async (messageContent: string) => {
        const content = messageContent.trim();
        if (!content || isSending) return;

        setIsSending(true);
        const newUserMessage: Message = { id: `user-${Date.now()}`, role: 'user', content, isComplete: true };
        const assistantMsgId = `assistant-${Date.now()}`;

        setMessages(prev => [
            ...prev.filter(m => m.id !== 'init-assistant'), // 发送消息时移除初始欢迎语
            newUserMessage,
            { id: assistantMsgId, role: 'assistant', content: '', isThinking: true, isComplete: false }
        ]);
        setInputValue('');

        const apiMessagesHistory = [...messages.slice(1), newUserMessage] // 准备API历史记录
            .map(({ role, content }) => ({ role, content }));

        try {
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ messages: apiMessagesHistory }),
            });

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

        } catch (error) {
            console.error("Error handling stream:", error);
            setMessages(prev => prev.map(msg => msg.id === assistantMsgId ? { ...msg, content: `抱歉，处理您的请求时发生了错误: ${error instanceof Error ? error.message : String(error)}`, isThinking: false, isComplete: true } : msg));
        } finally {
            setIsSending(false);
        }
    };

    const handleClearChat = () => {
        setMessages(initialMessages);
    };

    const toggleThinkingPanel = (messageId: string) => {
        setShowThinkingPanelId(prevId => (prevId === messageId ? null : messageId));
    };

    const showWelcomeScreen = messages.length === 1 && messages[0].id === 'init-assistant';

    return (
        <div className={styles.chatContainer}>
            {showWelcomeScreen ? (
                <AssistantWelcomeScreen onPromptClick={sendChatMessage} />
            ) : (
                <>
                    <ChatHeader onClearChat={handleClearChat} />

                    <main className={styles.chatBody} ref={chatBodyRef}>
                        {messages.map(msg => (
                            msg.id !== 'init-assistant' &&
                            <MessageBubble
                                key={msg.id}
                                message={msg}
                                isThinkingPanelOpen={showThinkingPanelId === msg.id}
                                onToggleThinkingPanel={toggleThinkingPanel}
                            />
                        ))}
                    </main>

                    <QuickActionPrompts onPromptClick={sendChatMessage} />

                    <ChatInputForm
                        inputValue={inputValue}
                        onInputChange={setInputValue}
                        onSubmit={() => sendChatMessage(inputValue)}
                        isSending={isSending}
                        shouldFocus={!showWelcomeScreen}
                    />

                    <ChatFooter />
                </>
            )}
        </div>
    );
};

export default AgentAssistantChat;