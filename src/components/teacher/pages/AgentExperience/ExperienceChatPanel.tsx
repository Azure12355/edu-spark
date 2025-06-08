// src/components/teacher/pages/AgentExperience/ExperienceChatPanel.tsx
"use client";
import React, { useState, useEffect, useRef, FormEvent } from 'react';
import { motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneLight } from 'react-syntax-highlighter/dist/esm/styles/prism';
import mermaid from 'mermaid';
import { Button } from 'antd';
import { PaperClipOutlined } from '@ant-design/icons';
import type { AgentInfo } from '@/lib/agentExperienceData';
import styles from './ExperienceChatPanel.module.css';
import 'github-markdown-css/github-markdown-light.css';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

interface ExperienceChatPanelProps {
  agent: AgentInfo;
}

const ExperienceChatPanel: React.FC<ExperienceChatPanelProps> = ({ agent }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isSending, setIsSending] = useState(false);
  const chatBodyRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // 当 agent 改变时，重置聊天界面
  useEffect(() => {
    setMessages([{ id: 'init-assistant', role: 'assistant', content: agent.welcomeMessage }]);
    setInputValue('');
    inputRef.current?.focus();
  }, [agent]);
  
  // 滚动到底部
  useEffect(() => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
    }
  }, [messages]);
  
  // Mermaid 图表渲染
  useEffect(() => {
    mermaid.initialize({ startOnLoad: false, theme: 'neutral', securityLevel: 'loose' });
    try {
        mermaid.run({ nodes: document.querySelectorAll('.mermaid') });
    } catch(e) { console.error("Mermaid rendering error:", e); }
  }, [messages]);

  const handleSubmit = async (e?: FormEvent) => {
    if (e) e.preventDefault();
    const userMessageContent = inputValue.trim();
    if (!userMessageContent || isSending) return;

    setIsSending(true);
    const newUserMessage: Message = { id: `user-${Date.now()}`, role: 'user', content: userMessageContent };
    
    // 将用户消息和AI思考占位符一起更新
    setMessages(prev => [
      ...prev,
      newUserMessage,
      { id: `assistant-${Date.now()}`, role: 'assistant', content: '' }
    ]);
    setInputValue('');

    const apiMessagesHistory = [...messages, newUserMessage].map(({ role, content }) => ({ role, content }));

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: apiMessagesHistory }),
      });

      if (!response.ok || !response.body) throw new Error('API请求失败');

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let accumulatedContent = '';
      
      const updateAssistantMessage = (content: string) => {
          setMessages(prev => {
              const lastMsgIndex = prev.length - 1;
              const newMessages = [...prev];
              if(newMessages[lastMsgIndex].role === 'assistant') {
                  newMessages[lastMsgIndex] = { ...newMessages[lastMsgIndex], content };
              }
              return newMessages;
          });
      };

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
                updateAssistantMessage(accumulatedContent);
              }
            } catch (error) { /* 忽略不完整的JSON块 */ }
          }
        }
      }
    } catch (error) {
        setMessages(prev => {
            const lastMsgIndex = prev.length - 1;
            const newMessages = [...prev];
            newMessages[lastMsgIndex] = { ...newMessages[lastMsgIndex], content: `抱歉，处理您的请求时发生了错误。`};
            return newMessages;
        });
    } finally {
      setIsSending(false);
      inputRef.current?.focus();
    }
  };

  const handleQuickQuestion = (question: string) => {
    setInputValue(question);
    setTimeout(() => {
        inputRef.current?.focus();
        handleSubmit();
    }, 100);
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
        {messages.length === 1 ? (
            // 欢迎界面
             <div className={styles.welcomeScreen}>
                <div className={styles.welcomeIcon}>{agent.icon}</div>
                <h2 className={styles.welcomeTitle}>{agent.name}</h2>
                <p className={styles.welcomeMessage}>{agent.welcomeMessage}</p>
                <div className={styles.promptSuggestions}>
                    {agent.promptSuggestions.map((prompt, index) => (
                        <button key={index} className={styles.suggestionButton} onClick={() => handleQuickQuestion(prompt)}>
                            {prompt}
                        </button>
                    ))}
                </div>
            </div>
        ) : (
            // 对话消息
            messages.map((msg, index) => (
              index > 0 && // 不显示第一条欢迎消息
              <motion.div
                key={msg.id}
                className={`${styles.messageBubble} ${styles[msg.role]}`}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
              >
                <div className={`${styles.messageContent} markdown-body`}>
                  {msg.content ? (
                    <ReactMarkdown
                      remarkPlugins={[remarkGfm]}
                      components={{
                        // @ts-ignore
                        code({ node, inline, className, children, ...props }) {
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
            <Button type="primary" htmlType="submit" className={styles.sendButton} disabled={isSending || !inputValue.trim()}>
                发送
            </Button>
        </form>
        <p className={styles.footerInfo}>
            该回复由AI生成，内容可能包含不准确信息，请谨慎辨别。
        </p>
      </div>
    </main>
  );
};

export default ExperienceChatPanel;