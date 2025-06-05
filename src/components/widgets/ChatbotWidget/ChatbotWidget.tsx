// src/components/widgets/ChatbotWidget/ChatbotWidget.tsx
"use client";
import React, { useState, useEffect, useRef, FormEvent } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm'; // 支持 GFM (表格、删除线等)
import styles from './ChatbotWidget.module.css';

interface Message {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  isThinking?: boolean; // 标记模型是否正在思考 (用于显示思考面板或加载状态)
  thinkingText?: string | null; // 存储 <think> 内容
  isComplete?: boolean; // 标记流式响应是否已完成
}

const ChatbotWidget: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  const initialMessages: Message[] = [
    { id: 'init-assistant', role: 'assistant', content: '我是火山引擎的智能助手，能为您解答各类问题，若您有需求，随时都能问我！', isComplete: true }
  ];
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [inputValue, setInputValue] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);
  const [showThinkingPanelId, setShowThinkingPanelId] = useState<string | null>(null); // 存储需要显示思考面板的消息ID
  const [isThinkingGlobally, setIsThinkingGlobally] = useState(false); // 全局思考状态，用于UI

  const chatBodyRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const currentAssistantMessageIdRef = useRef<string | null>(null); // 跟踪当前流式响应的助手消息ID

  useEffect(() => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
    }
  }, [messages, showThinkingPanelId]); // 当思考面板展开/关闭时也滚动

  useEffect(() => {
    if (isOpen && inputRef.current) {
        setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen]);

  const parseThinkContent = (rawChunkContent: string): { thinkingText: string | null; displayText: string; isFinalThinkChunk: boolean } => {
    let thinkingText: string | null = null;
    let displayText = rawChunkContent;
    let isFinalThinkChunk = false;

    const thinkStartTag = "\n<think>\n";
    const thinkEndTag = "\n</think>\n";

    if (displayText.includes(thinkStartTag)) {
        const parts = displayText.split(thinkStartTag);
        displayText = parts[0]; // 开头部分
        const rest = parts.slice(1).join(thinkStartTag);
        if (rest.includes(thinkEndTag)){
            const thinkParts = rest.split(thinkEndTag);
            thinkingText = thinkParts[0];
            displayText += thinkParts.slice(1).join(thinkEndTag);
            isFinalThinkChunk = true; // 思考结束
        } else {
            thinkingText = rest; // 思考未结束
        }
    } else if (showThinkingPanelId && messages.find(m => m.id === showThinkingPanelId)?.isThinking && !messages.find(m => m.id === showThinkingPanelId)?.isComplete) {
      // 如果当前正在显示思考面板，并且思考未结束，则后续内容也可能是思考内容的一部分
      if (displayText.includes(thinkEndTag)) {
        const thinkParts = displayText.split(thinkEndTag);
        thinkingText = thinkParts[0];
        displayText = thinkParts.slice(1).join(thinkEndTag);
        isFinalThinkChunk = true;
      } else {
        thinkingText = displayText;
        displayText = ""; // 此时的块都是思考内容
      }
    }
    return { thinkingText, displayText: displayText.trim(), isFinalThinkChunk };
  };


  const handleSubmit = async (e?: FormEvent) => {
    if (e) e.preventDefault();
    const userMessageContent = inputValue.trim();
    if (!userMessageContent || isSending) return;

    const newUserMessage: Message = { id: `user-${Date.now()}`, role: 'user', content: userMessageContent, isComplete: true };
    setMessages(prev => [...prev, newUserMessage]);
    setInputValue('');
    setIsSending(true);
    setIsThinkingGlobally(true); // 开始全局思考状态

    currentAssistantMessageIdRef.current = `assistant-${Date.now()}`;
    const assistantMsgId = currentAssistantMessageIdRef.current;
    
    // 先添加一个空的助手消息，用于后续填充流式内容
    setMessages(prev => [...prev, {
      id: assistantMsgId,
      role: 'assistant',
      content: '',
      isThinking: true, // 初始设为思考状态
      thinkingText: '',
      isComplete: false,
    }]);
    setShowThinkingPanelId(assistantMsgId); // 默认展开思考面板

    const apiMessagesHistory = [...messages, newUserMessage]
        .filter(msg => msg.role === 'user' || (msg.role === 'assistant' && msg.isComplete)) // 只发送用户消息和已完成的助手消息
        .map(msg => ({ role: msg.role, content: msg.content }));

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: apiMessagesHistory }),
      });

      if (!response.ok || !response.body) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `API request failed with status ${response.status}`);
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let accumulatedDisplayText = '';
      let accumulatedThinkingText = '';
      let done = false;

      while (!done) {
        const { value, done: readerDone } = await reader.read();
        done = readerDone;
        const chunk = decoder.decode(value, { stream: true });
        // console.log("Raw chunk:", chunk); // 调试日志

        // SSE 格式是 data: {...}\n\ndata: {...}\n\n
        const lines = chunk.split('\n\n').filter(line => line.startsWith('data: '));

        for (const line of lines) {
          const jsonDataString = line.substring('data: '.length);
          if (jsonDataString.trim() === '[DONE]') {
            done = true; // 后端发送了 [DONE] 信号
            break;
          }
          try {
            const parsedChunk = JSON.parse(jsonDataString);
            if (parsedChunk.error) { // 处理后端流中可能出现的错误
              console.error("Error from stream:", parsedChunk.error, parsedChunk.details);
              accumulatedDisplayText += `\n\n错误: ${parsedChunk.details || parsedChunk.error}`;
              done = true;
              break;
            }

            const chunkContent = parsedChunk.choices?.[0]?.delta?.content || '';
            const { thinkingText, displayText, isFinalThinkChunk } = parseThinkContent(chunkContent);
            
            if (thinkingText) {
              accumulatedThinkingText += thinkingText;
            }
            accumulatedDisplayText += displayText;

            setMessages(prev => prev.map(msg =>
              msg.id === assistantMsgId
                ? {
                    ...msg,
                    content: accumulatedDisplayText,
                    thinkingText: accumulatedThinkingText,
                    isThinking: !isFinalThinkChunk && !!accumulatedThinkingText, // 如果有思考内容且未结束则isThinking
                  }
                : msg
            ));

            if(isFinalThinkChunk && showThinkingPanelId === assistantMsgId){
                // 如果思考结束，并且当前思考面板是展开的，则折叠它
                // 但由于流式输出，此时displayText可能还没完全输出，所以不在这里折叠
                // 折叠逻辑将在流结束后处理
            }

          } catch (parseError) {
            // console.warn("Failed to parse JSON chunk:", jsonDataString, parseError);
            // 可能是部分 JSON 数据，或者非 JSON 的 DONE 信号等
            if (jsonDataString.includes("[DONE]")) done = true; // 再次检查 DONE
          }
        } // end for line of lines
        if (done) break;
      } // end while

      // 流结束后的处理
      setMessages(prev => prev.map(msg =>
        msg.id === assistantMsgId
          ? { ...msg, isThinking: false, isComplete: true } // 标记完成，思考结束
          : msg
      ));
      setShowThinkingPanelId(null); // 流结束后，默认折叠思考面板

    } catch (error) {
      console.error("Error handling stream:", error);
      setMessages(prev => prev.map(msg =>
          msg.id === assistantMsgId
          // @ts-ignore
            ? { ...msg, content: `抱歉，处理您的请求时发生了错误: ${error.message}`, isThinking: false, isComplete: true }
            : msg
      ));
      setShowThinkingPanelId(null);
    } finally {
      setIsSending(false);
      setIsThinkingGlobally(false);
      currentAssistantMessageIdRef.current = null;
    }
  };


  const quickQuestions = ["你是谁？", "你可以干嘛？", "你可以为我做什么？"];
  const handleQuickQuestion = (question: string) => {
    setInputValue(question);
    // 考虑自动提交或让用户点击
    // handleSubmit(); // 如果要自动提交
  };

  const toggleThinkingPanel = (messageId: string) => {
    setShowThinkingPanelId(prevId => (prevId === messageId ? null : messageId));
  };

  const widgetVariants = { /* ... (保持不变) ... */ };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className={`${styles.chatbotWidget} ${isMaximized ? styles.maximized : ''}`}
          variants={widgetVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          drag
          dragConstraints={{ top: -300, left: -400, right: 400, bottom: 100 }}
          dragElastic={0.1}
          dragMomentum={false}
        >
          <div className={styles.widgetHeader}>
            <div className={styles.headerTitle}>
              <Image src="/images/volcengine-assistant-logo.svg" alt="火山智能助手" width={28} height={28} />
              火山智能助手
            </div>
            <div className={styles.headerControls}>
              <button onClick={() => setIsMaximized(!isMaximized)} className={styles.controlButton} title={isMaximized ? "最小化" : "最大化"}>
                <i className={`fas ${isMaximized ? 'fa-compress-alt' : 'fa-expand-alt'}`}></i>
              </button>
              <button onClick={onClose} className={styles.controlButton} title="关闭">
                <i className="fas fa-times"></i>
              </button>
            </div>
          </div>

          <div className={styles.chatBody} ref={chatBodyRef}>
            {messages.map(msg => (
              <motion.div
                key={msg.id}
                className={`${styles.messageBubble} ${styles[msg.role]}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                {msg.role === 'assistant' && (
                  <div className={styles.assistantMsgHeader}>
                    {msg.isThinking && !msg.isComplete ? (
                      <span className={styles.statusTagThinking} onClick={() => toggleThinkingPanel(msg.id)} style={{cursor: 'pointer'}}>
                        <motion.i className="fas fa-circle-notch fa-spin" style={{ marginRight: '6px' }} />
                        思考中... (点击{showThinkingPanelId === msg.id ? '收起' : '展开'})
                      </span>
                    ) : msg.isComplete && msg.thinkingText ? (
                      <span className={styles.statusTagComplete} onClick={() => toggleThinkingPanel(msg.id)} style={{cursor: 'pointer'}}>
                        <i className={`fas ${showThinkingPanelId === msg.id ? 'fa-chevron-down' : 'fa-chevron-right'}`} style={{ marginRight: '6px' }}></i>
                        回答完毕 (思考过程)
                      </span>
                    ) : msg.isComplete ? (
                         <span className={styles.statusTagComplete}>
                            <i className="fas fa-check-circle" style={{ marginRight: '6px' }}></i>
                            回答完毕
                        </span>
                    ) : null}
                  </div>
                )}

                {/* Markdown 渲染 */}
                <div className={styles.messageContent}>
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {msg.content}
                  </ReactMarkdown>
                </div>
                
                {msg.role === 'assistant' && msg.thinkingText && showThinkingPanelId === msg.id && (
                  <motion.div 
                    className={styles.thinkingPanel}
                    initial={{ height: 0, opacity: 0, marginTop: 0}}
                    animate={{ height: 'auto', opacity: 1, marginTop: '10px' }}
                    exit={{ height: 0, opacity: 0, marginTop: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <h4>模型的思考过程：</h4>
                    <pre>{msg.thinkingText}</pre>
                  </motion.div>
                )}

                {msg.role === 'assistant' && msg.isComplete && msg.id !== 'init-assistant' && (
                  <div className={styles.messageActions}>
                    <button title="赞"><i className="far fa-thumbs-up"></i></button>
                    <button title="踩"><i className="far fa-thumbs-down"></i></button>
                    <button title="复制" onClick={() => navigator.clipboard.writeText(msg.content)}><i className="far fa-copy"></i></button>
                  </div>
                )}
              </motion.div>
            ))}
            {isThinkingGlobally && messages[messages.length-1]?.role !== 'assistant' && ( // 如果全局还在思考，且最后一条不是助手消息
                 <motion.div
                    className={`${styles.messageBubble} ${styles.assistant} ${styles.thinkingGlobalPlaceholder}`}
                    initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                >
                    <span className={styles.statusTagThinking}>
                        <motion.i className="fas fa-circle-notch fa-spin" style={{ marginRight: '6px' }} />
                        正在处理...
                    </span>
                </motion.div>
            )}
          </div>

          <div className={styles.quickActions}>
            {quickQuestions.map(q => (
              <button key={q} onClick={() => handleQuickQuestion(q)} className={styles.quickQuestionBtn}>
                {q} <i className="fas fa-chevron-right"></i>
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} className={styles.inputArea}>
            <textarea
              ref={inputRef}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder='您可以输入“产品+问题”描述问题~'
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
              {isSending ? <i className="fas fa-spinner fa-spin"></i> : <i className="fas fa-paper-plane"></i>}
            </button>
          </form>
          <div className={styles.footerInfo}>
            模型可能偶尔犯错，内容不代表火山引擎观点
            <span className={styles.promoTag}>限时免费</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ChatbotWidget;