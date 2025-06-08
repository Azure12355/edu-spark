// src/components/teacher/pages/AgentExperience/ExperienceChatPanel.tsx
"use client";
import React, { useState, useEffect, useRef, FormEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneLight } from 'react-syntax-highlighter/dist/esm/styles/prism';
import mermaid from 'mermaid';
import { Button } from 'antd';
import { PaperClipOutlined, SendOutlined } from '@ant-design/icons';
import type { AgentInfo, Message } from '@/lib/agentExperienceData';
import styles from './ExperienceChatPanel.module.css';
import 'github-markdown-css/github-markdown-light.css';

interface ExperienceChatPanelProps {
  agent: AgentInfo;
  messages: Message[];
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
}

const ExperienceChatPanel: React.FC<ExperienceChatPanelProps> = ({ agent, messages, setMessages }) => {
  const [inputValue, setInputValue] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [showThinkingPanelId, setShowThinkingPanelId] = useState<string | null>(null);

  const chatBodyRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
    }
  }, [messages, showThinkingPanelId]);

  useEffect(() => {
    mermaid.initialize({ startOnLoad: false, theme: 'neutral', securityLevel: 'loose' });
    try {
      mermaid.run({ nodes: document.querySelectorAll('.mermaid') });
    } catch (e) {
      console.error("Mermaid rendering error:", e);
    }
  }, [messages]);

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

    const apiMessagesHistory = messages.slice(1)
      .concat(newUserMessage)
      .filter(msg => msg.role === 'user' || (msg.role === 'assistant' && msg.isComplete))
      .map(({ role, content }) => ({ role, content }));
      //@ts-ignore
    apiMessagesHistory.unshift({ role: 'system', content: `You are the AI assistant "${agent.name}". Your description is: "${agent.description}". Respond to the user in a helpful and engaging manner, consistent with your persona.` });

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
            } catch (error) { /* Ignore */ }
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
      setMessages(prev => prev.map(msg => msg.id === assistantMsgId ? { ...msg, content: `抱歉，处理您的请求时发生了错误: ${error instanceof Error ? error.message : String(error)}`, isThinking: false, isComplete: true } : msg));
    } finally {
      setIsSending(false);
      inputRef.current?.focus();
    }
  };

  const handleQuickQuestion = (question: string) => {
    setInputValue(question);
    setTimeout(() => {
      inputRef.current?.focus();
    }, 50);
  };
  
  const toggleThinkingPanel = (messageId: string) => {
    setShowThinkingPanelId(prevId => (prevId === messageId ? null : messageId));
  };
  
  return (
    <main className={styles.chatPanel}>
      <div className={styles.chatHeader}>
          <div className={styles.agentTitle}>
              <span className={styles.agentIcon}>{agent.icon}</span>
              <div>
                  <h1 className={styles.agentName}>{agent.name}</h1>
                  <p className={styles.agentDesc}>{agent.description}</p>
              </div>
          </div>
      </div>
      <div className={styles.chatBody} ref={chatBodyRef}>
        {messages.length === 1 && messages[0].id === 'init-assistant' ? (
             <div className={styles.welcomeScreen}>
                <div className={styles.welcomeIcon}>
                  {agent.icon === '📄' ? <img src="/file.svg" alt="file icon" width="64"/> : agent.icon}
                </div>
                <h2 className={styles.welcomeTitle}>{agent.name}</h2>
                <p className={styles.welcomeMessage}>{messages[0].content}</p>
                <div className={styles.promptSuggestions}>
                    {agent.promptSuggestions.map((prompt, index) => (
                        <button key={index} className={styles.suggestionButton} onClick={() => handleQuickQuestion(prompt)}>
                            {prompt}
                        </button>
                    ))}
                </div>
            </div>
        ) : (
            messages.slice(1).map((msg) => (
              <motion.div
                key={msg.id}
                className={`${styles.messageBubble} ${styles[msg.role]}`}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
              >
                 {msg.role === 'assistant' && msg.thinkingText && (
                  <div className={styles.statusTag} onClick={() => toggleThinkingPanel(msg.id)}>
                      <i className={`fas fa-chevron-right ${showThinkingPanelId === msg.id ? styles.chevronOpen : ''}`}></i>
                      点击{showThinkingPanelId === msg.id ? '收起' : '展开'}思考过程
                  </div>
                )}
                <div className={`${styles.messageContent} markdown-body`}>
                  {msg.content ? (
                    <ReactMarkdown
                      remarkPlugins={[remarkGfm]}
                      components={{
                        code({ node, inline, className, children, ...props }: any) {
                          const match = /language-(\w+)/.exec(className || '');
                          if (match && match[1] === 'mermaid') {
                            return <pre className="mermaid">{String(children)}</pre>;
                          }
                          return !inline && match ? (
                            <SyntaxHighlighter style={oneLight} language={match[1]} PreTag="div" {...props}>
                              {String(children).replace(/\n$/, '')}
                            </SyntaxHighlighter>
                          ) : (
                            <code className={className} {...props}>{children}</code>
                          );
                        }
                      }}
                    >
                      {msg.content}
                    </ReactMarkdown>
                  ) : (
                    <span className={styles.typingIndicator}></span>
                  )}
                </div>
                <AnimatePresence>
                {showThinkingPanelId === msg.id && msg.thinkingText && (
                  <motion.div 
                    className={styles.thinkingPanel}
                    initial={{ height: 0, opacity: 0, marginTop: 0 }}
                    animate={{ height: 'auto', opacity: 1, marginTop: '12px' }}
                    exit={{ height: 0, opacity: 0, marginTop: 0 }}
                  >
                    <h4><i className="fas fa-brain" style={{marginRight: '8px'}}></i>助教的思考过程：</h4>
                    <pre>{msg.thinkingText}</pre>
                  </motion.div>
                )}
                </AnimatePresence>
              </motion.div>
            ))
        )}
      </div>
      <div className={styles.inputWrapper}>
        <form onSubmit={handleSubmit} className={styles.inputArea}>
            <textarea
                ref={inputRef}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="请输入问题，体验智能体能力"
                rows={1}
                onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSubmit();
                    }
                }}
                disabled={isSending}
            />
            <Button className={styles.attachButton} icon={<PaperClipOutlined />} />
            <Button type="primary" htmlType="submit" className={styles.sendButton} disabled={isSending || !inputValue.trim()} icon={<SendOutlined />} />
        </form>
        <p className={styles.footerInfo}>
            该回复由AI生成，内容可能包含不准确信息，请谨慎辨别。
        </p>
      </div>
    </main>
  );
};

export default ExperienceChatPanel;