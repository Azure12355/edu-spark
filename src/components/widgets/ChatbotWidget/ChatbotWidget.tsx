// src/components/widgets/ChatbotWidget/ChatbotWidget.tsx
"use client";

import React, { useState, useEffect, useRef, FormEvent } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

// **关键修正 1**: 引入专业的Markdown样式库作为基础
import 'github-markdown-css/github-markdown-light.css';

import styles from './ChatbotWidget.module.css';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  thinkingText?: string | null;
  isThinking?: boolean;
  isComplete?: boolean;
}

const ChatbotWidget: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  const initialMessages: Message[] = [
    { 
      id: 'init-assistant', 
      role: 'assistant', 
      content: '我是火山引擎的智能助手，能为您解答各类问题。若您有需求，随时都能问我！', 
      isComplete: true 
    }
  ];

  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [inputValue, setInputValue] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);
  const [showThinkingPanelId, setShowThinkingPanelId] = useState<string | null>(null);

  const chatBodyRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
    }
  }, [messages, showThinkingPanelId]);

  useEffect(() => {
    if (isOpen) {
        setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen]);

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
      {
        id: assistantMsgId,
        role: 'assistant',
        content: '',
        isThinking: true,
        isComplete: false,
      }
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

      if (!response.ok || !response.body) {
        throw new Error('API request failed');
      }

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
                setMessages(prev =>
                  prev.map(msg =>
                    msg.id === assistantMsgId
                      ? { ...msg, content: accumulatedContent, isThinking: true }
                      : msg
                  )
                );
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
      
      setMessages(prev =>
        prev.map(msg =>
          msg.id === assistantMsgId
            ? { 
                ...msg, 
                content: finalDisplayText,
                thinkingText: finalThinkingText,
                isThinking: false, 
                isComplete: true 
              }
            : msg
        )
      );

    } catch (error) {
      console.error("Error handling stream:", error);
      setMessages(prev =>
        prev.map(msg =>
          msg.id === assistantMsgId
            ? {
                ...msg,
                content: `抱歉，处理您的请求时发生了错误: ${error instanceof Error ? error.message : String(error)}`,
                isThinking: false,
                isComplete: true,
              }
            : msg
        )
      );
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
  
  const widgetVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", damping: 20, stiffness: 200 } },
    exit: { opacity: 0, y: 20, scale: 0.98, transition: { duration: 0.2 } },
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className={`${styles.chatbotWidget} ${isMaximized ? styles.maximized : ''}`}
          variants={widgetVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          {/* Header */}
          <header className={styles.widgetHeader}>
            <div className={styles.headerTitle}>
              <Image src="/robot.svg" alt="智能助手" width={26} height={26} />
              火山智能助手
            </div>
            <div className={styles.headerControls}>
              <button onClick={() => setIsMaximized(!isMaximized)} className={styles.controlButton} title={isMaximized ? "还原" : "最大化"}>
                <i className={`fas ${isMaximized ? 'fa-compress-alt' : 'fa-expand-alt'}`}></i>
              </button>
              <button onClick={onClose} className={styles.controlButton} title="关闭">
                <i className="fas fa-times"></i>
              </button>
            </div>
          </header>

          {/* Chat Body */}
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
                        正在生成...
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
                
                {/* **关键修正 2**: 添加 'markdown-body' 类，以激活github-markdown-css的样式 */}
                <div className={`${styles.messageContent} markdown-body`}>
                  {msg.content ? (
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
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
                    <h4><i className="fas fa-brain" style={{marginRight: '8px'}}></i>模型的思考过程：</h4>
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
          
          {/* Quick Actions & Input Area (no changes) */}
          <section className={styles.quickActions}>
            {["你是谁？", "讲解下火山引擎", "推荐一些热门产品"].map(q => (
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
              placeholder="请输入您的问题，例如“介绍一下大模型服务平台”"
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
            模型输出由AI生成，可能存在不准确之处，请谨慎参考
            <span className={styles.promoTag}>Beta</span>
          </footer>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ChatbotWidget;