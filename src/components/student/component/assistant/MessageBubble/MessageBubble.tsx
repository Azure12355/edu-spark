// src/components/student/component/assistant/MessageBubble.tsx
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneLight } from 'react-syntax-highlighter/dist/esm/styles/prism';
import mermaid from 'mermaid';
import styles from './MessageBubble.module.css';

interface Message {
    id: string;
    role: 'user' | 'assistant';
    content: string;
    thinkingText?: string | null;
    isThinking?: boolean;
    isComplete?: boolean;
}

interface MessageBubbleProps {
    message: Message;
    isThinkingPanelOpen: boolean;
    onToggleThinkingPanel: (id: string) => void;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ message, isThinkingPanelOpen, onToggleThinkingPanel }) => {

    React.useEffect(() => {
        if (message.content.includes("```mermaid")) {
            mermaid.run({ nodes: document.querySelectorAll('.mermaid') });
        }
    }, [message.content]);

    return (
        <motion.div
            key={message.id}
            className={`${styles.messageBubble} ${styles[message.role]}`}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
        >
            {message.role === 'assistant' && (message.isThinking || message.isComplete) && (
                <div className={styles.assistantMsgHeader}>
                    {message.isThinking && !message.isComplete && (
                        <span className={styles.statusTagThinking}>
                        <motion.i className="fas fa-circle-notch fa-spin" style={{ marginRight: '8px' }} />
                        正在思考...
                    </span>
                    )}
                    {message.isComplete && !message.thinkingText && (
                        <span className={styles.statusTagComplete}>
                        <i className="fas fa-check-circle" style={{ marginRight: '8px', color: '#10b981' }} />
                        回答完毕
                    </span>
                    )}
                    {message.isComplete && message.thinkingText && (
                        <span className={styles.statusTagComplete} onClick={() => onToggleThinkingPanel(message.id)} style={{cursor: 'pointer'}}>
                        <i className={`fas fa-chevron-right ${isThinkingPanelOpen ? styles.chevronOpen : ''}`} style={{ marginRight: '8px', transition: 'transform 0.2s' }}></i>
                        回答完毕 (点击{isThinkingPanelOpen ? '收起' : '展开'}思考过程)
                    </span>
                    )}
                </div>
            )}

            <div className={`${styles.messageContent} markdown-body`}>
                {message.content ? (
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
                        {message.isThinking ? message.content.replace(/<think>[\s\S]*?<\/think>/g, '') : message.content}
                    </ReactMarkdown>
                ) : (
                    !message.isComplete && <span className={styles.typingIndicator}></span>
                )}
            </div>

            <AnimatePresence>
                {isThinkingPanelOpen && message.thinkingText && (
                    <motion.div
                        className={styles.thinkingPanel}
                        initial={{ height: 0, opacity: 0, marginTop: 0 }}
                        animate={{ height: 'auto', opacity: 1, marginTop: '12px' }}
                        exit={{ height: 0, opacity: 0, marginTop: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                    >
                        <h4><i className="fas fa-brain" style={{marginRight: '8px'}}></i>助教的思考过程：</h4>
                        <pre>{message.thinkingText}</pre>
                    </motion.div>
                )}
            </AnimatePresence>

            {message.role === 'assistant' && message.isComplete && message.id !== 'init-assistant' && (
                <div className={styles.messageActions}>
                    <button title="复制" onClick={() => navigator.clipboard.writeText(message.content)}><i className="far fa-copy"></i> 复制</button>
                    <button title="赞"><i className="far fa-thumbs-up"></i></button>
                    <button title="踩"><i className="far fa-thumbs-down"></i></button>
                </div>
            )}
        </motion.div>
    );
};

export default MessageBubble;