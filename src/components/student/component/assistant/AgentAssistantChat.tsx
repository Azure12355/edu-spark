// src/components/student/component/assistant/AgentAssistantChat.tsx
"use client";

import React, { useState, useEffect, useRef, FormEvent } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneLight } from 'react-syntax-highlighter/dist/esm/styles/prism';
import mermaid from 'mermaid';

import 'github-markdown-css/github-markdown-light.css';
import styles from './AgentAssistantChat.module.css';

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

    const [messages, setMessages] = useState<Message[]>(initialMessages);
    const [inputValue, setInputValue] = useState('');
    const [isSending, setIsSending] = useState(false);
    const [showThinkingPanelId, setShowThinkingPanelId] = useState<string | null>(null);

    const chatBodyRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
        mermaid.initialize({
            startOnLoad: false,
            theme: 'neutral',
            securityLevel: 'loose',
        });

        const timer = setTimeout(() => {
            try {
                mermaid.run({ nodes: document.querySelectorAll('.mermaid') });
            } catch(e) { console.error("Mermaid rendering error:", e); }
        }, 100);

        return () => clearTimeout(timer);
    }, [messages]);

    useEffect(() => {
        if (chatBodyRef.current) {
            chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
        }
    }, [messages, showThinkingPanelId]);

    useEffect(() => {
        inputRef.current?.focus();
    }, []);

    const handleSubmit = async (e?: FormEvent) => {
        if (e) e.preventDefault();
        const userMessageContent = inputValue.trim();
        if (!userMessageContent || isSending) return;

        setIsSending(true);
        const newUserMessage: Message = { id: `user-${Date.now()}`, role: 'user', content: userMessageContent, isComplete: true };
        const assistantMsgId = `assistant-${Date.now()}`;

        setMessages(prev => [
            ...prev,
            newUserMessage,
            { id: assistantMsgId, role: 'assistant', content: '', isThinking: true, isComplete: false }
        ]);
        setInputValue('');

        const apiMessagesHistory = [...messages, newUserMessage]
            .filter(msg => msg.role === 'user' || (msg.role === 'assistant' && msg.isComplete))
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

    const handleQuickQuestion = (question: string) => {
        setInputValue(question);
        setTimeout(() => inputRef.current?.focus(), 50);
    };

    const toggleThinkingPanel = (messageId: string) => {
        setShowThinkingPanelId(prevId => (prevId === messageId ? null : messageId));
    };

    return (
        <div className={styles.chatContainer}>
            <header className={styles.widgetHeader}>
                <div className={styles.headerTitle}>
                    <Image src="/images/Chat/robot.png" alt="Agent 助教" width={26} height={26} />
                    Agent 助教
                </div>
                <div className={styles.headerControls}>
                    {/* 这里可以放一些页面特有的按钮，比如“清空对话” */}
                    <button className={styles.controlButton} title="清空对话" onClick={() => setMessages(initialMessages)}>
                        <i className="fas fa-trash-alt"></i>
                    </button>
                </div>
            </header>

            <main className={styles.chatBody} ref={chatBodyRef}>
                {messages.map(msg => (
                    <motion.div
                        key={msg.id}
                        className={`${styles.messageBubble} ${styles[msg.role]}`}
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.35, ease: "easeOut" }}
                    >
                        {msg.role === 'assistant' && (msg.isThinking || msg.isComplete) && (
                            <div className={styles.assistantMsgHeader}>
                                {msg.isThinking && !msg.isComplete && (
                                    <span className={styles.statusTagThinking}>
                    <motion.i className="fas fa-circle-notch fa-spin" style={{ marginRight: '8px' }} />
                    正在思考...
                  </span>
                                )}
                                {msg.isComplete && !msg.thinkingText && (
                                    <span className={styles.statusTagComplete}>
                    <i className="fas fa-check-circle" style={{ marginRight: '8px', color: '#10b981' }} />
                    回答完毕
                  </span>
                                )}
                                {msg.isComplete && msg.thinkingText && (
                                    <span className={styles.statusTagComplete} onClick={() => toggleThinkingPanel(msg.id)} style={{cursor: 'pointer'}}>
                    <i className={`fas fa-chevron-right ${showThinkingPanelId === msg.id ? styles.chevronOpen : ''}`} style={{ marginRight: '8px', transition: 'transform 0.2s' }}></i>
                    回答完毕 (点击{showThinkingPanelId === msg.id ? '收起' : '展开'}思考过程)
                  </span>
                                )}
                            </div>
                        )}

                        <div className={`${styles.messageContent} markdown-body`}>
                            {msg.content ? (
                                <ReactMarkdown
                                    remarkPlugins={[remarkGfm]}
                                    components={{
                                        // @ts-ignore
                                        code({ node, inline, className, children, ...props }) {
                                            const match = /language-(\w+)/.exec(className || '');
                                            const language = match ? match[1] : '';

                                            if (language === 'mermaid') {
                                                return <pre className="mermaid">{String(children)}</pre>;
                                            }

                                            return !inline && match ? (
                                                <SyntaxHighlighter
                                                    // @ts-ignore
                                                    style={oneLight}
                                                    language={language}
                                                    PreTag="div"
                                                    {...props}
                                                >
                                                    {String(children).replace(/\n$/, '')}
                                                </SyntaxHighlighter>
                                            ) : (
                                                <code className={className} {...props}>
                                                    {children}
                                                </code>
                                            );
                                        }
                                    }}
                                >
                                    {msg.isThinking ? msg.content.replace(/<think>[\s\S]*?<\/think>/g, '') : msg.content}
                                </ReactMarkdown>
                            ) : (
                                !msg.isComplete && <span className={styles.typingIndicator}></span>
                            )}
                        </div>

                        <AnimatePresence>
                            {showThinkingPanelId === msg.id && msg.thinkingText && (
                                <motion.div
                                    className={styles.thinkingPanel}
                                    initial={{ height: 0, opacity: 0, marginTop: 0 }}
                                    animate={{ height: 'auto', opacity: 1, marginTop: '12px' }}
                                    exit={{ height: 0, opacity: 0, marginTop: 0 }}
                                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                                >
                                    <h4><i className="fas fa-brain" style={{marginRight: '8px'}}></i>助教的思考过程：</h4>
                                    <pre>{msg.thinkingText}</pre>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {msg.role === 'assistant' && msg.isComplete && msg.id !== 'init-assistant' && (
                            <div className={styles.messageActions}>
                                <button title="复制" onClick={() => navigator.clipboard.writeText(msg.content)}><i className="far fa-copy"></i> 复制</button>
                                <button title="赞"><i className="far fa-thumbs-up"></i></button>
                                <button title="踩"><i className="far fa-thumbs-down"></i></button>
                            </div>
                        )}
                    </motion.div>
                ))}
            </main>

            <section className={styles.quickActions}>
                {["生成一份Java学习大纲", "解释一下什么是递归", "给我出几道高数题"].map(q => (
                    <button key={q} onClick={() => handleQuickQuestion(q)} className={styles.quickQuestionBtn}>
                        {q} <i className="fas fa-arrow-right"></i>
                    </button>
                ))}
            </section>
            <form onSubmit={handleSubmit} className={styles.inputArea}>
        <textarea
            ref={inputRef}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="输入你的问题，比如“解释一下什么是闭包”..."
            rows={1}
            onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSubmit();
                }
            }}
            disabled={isSending}
        />
                <button type="submit" className={styles.sendButton} disabled={isSending || !inputValue.trim()}>
                    <i className="fas fa-paper-plane"></i>
                </button>
            </form>
            <footer className={styles.footerInfo}>
                AI生成内容仅供参考，请谨慎采纳
                <span className={styles.promoTag}>Beta</span>
            </footer>
        </div>
    );
};

export default AgentAssistantChat;