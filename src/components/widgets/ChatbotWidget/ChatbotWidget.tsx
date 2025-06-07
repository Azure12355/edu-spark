// src/components/widgets/ChatbotWidget/ChatbotWidget.tsx
"use client";

import React, { useState, useEffect, useRef, FormEvent } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

// **关键修正 1: 引入代码高亮和 Mermaid 库**
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneLight } from 'react-syntax-highlighter/dist/esm/styles/prism'; // 选择一个亮色主题
import mermaid from 'mermaid';

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
      content: '我是火山引擎的智能助手，能为您解答各类问题。试试问我：“用 mermaid 画一个流程图” 或 “给我一段 javascript 的 hello world 代码”', 
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

  // **关键修正 2: 使用 useEffect 处理 Mermaid 图表渲染**
  useEffect(() => {
    // 初始化 Mermaid 配置
    mermaid.initialize({
      startOnLoad: false,
      theme: 'neutral', // 使用中性主题，适配我们的背景
      securityLevel: 'loose',
    });
    
    // 每次消息更新后，查找并渲染 Mermaid 图表
    // 我们需要给它一点延迟，以确保 React 完成 DOM 更新
    const timer = setTimeout(() => {
        try {
            mermaid.run({
                nodes: document.querySelectorAll('.mermaid'),
            });
        } catch(e) {
            console.error("Mermaid rendering error:", e);
        }
    }, 100);

    return () => clearTimeout(timer);
  }, [messages]);

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
              <Image src="/images/Chat/robot.png" alt="智能助手" width={26} height={26} />
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
                {/* ... (assistant header logic remains the same) ... */}
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
                
                <div className={`${styles.messageContent} markdown-body`}>
                  {msg.content ? (
                    // **关键修正 3: 使用 components prop 自定义渲染器**
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
                
                {/* ... (thinking panel and message actions remain the same) ... */}
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
          
          {/* ... (quick actions, input area, and footer remain the same) ... */}
          <section className={styles.quickActions}>
            {["你是谁？", "讲解下火山引擎", "热门产品"].map(q => (
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