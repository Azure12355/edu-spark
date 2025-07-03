"use client";

import React from 'react';
import { motion } from 'framer-motion';
import styles from './MessageBubble.module.css';

// 导入所有子组件
import MessageHeader from './MessageHeader/MessageHeader';
import MessageContent from './MessageContent/MessageContent';
import MessageThinkingPanel from './MessageThinkingPanel/MessageThinkingPanel';
import MessageReferences from './MessageReferences/MessageReferences';
import MessageActions from './MessageActions/MessageActions';

// 导入类型
import type { ChunkVO } from '@/features/teacher/knowledge/knowledge-detail/sub-features/chunk-management/service/chunkService';

/**
 * @interface AgentInfo
 * @description 定义了渲染一个智能体头像和主题色所需的信息。
 */
export interface AgentInfo {
    avatar: React.ReactNode;
    themeColor?: string;
}

/**
 * @interface BubbleMessage
 * @description 定义了渲染一个完整消息气泡所需的所有数据。
 */
export interface BubbleMessage {
    id: string;
    role: 'user' | 'assistant';
    content: string;
    isComplete: boolean;
    isThinking?: boolean;
    thinkingText?: string | null;
    references?: ChunkVO[];
    agent?: AgentInfo;
    timestamp?: string;
}

interface MessageBubbleProps {
    message: BubbleMessage;
    isThinkingPanelOpen?: boolean;
    onToggleThinkingPanel?: (id: string) => void;
    showAvatar?: boolean;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({
                                                         message,
                                                         isThinkingPanelOpen = false,
                                                         onToggleThinkingPanel = () => {},
                                                         showAvatar = true,
                                                     }) => {
    const isUser = message.role === 'user';
    const bubbleVariants = {
        hidden: { opacity: 0, y: 10 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
    };

    return (
        <motion.div
            className={`${styles.bubbleContainer} ${isUser ? styles.user : styles.assistant}`}
            variants={bubbleVariants}
            initial="hidden"
            animate="visible"
        >
            {showAvatar && (
                <div className={styles.avatarWrapper} style={{ '--agent-theme-color': message.agent?.themeColor } as React.CSSProperties}>
                    {message.agent?.avatar}
                </div>
            )}
            <div className={styles.messageContentWrapper}>
                <MessageHeader message={message} />

                {/* 【核心修复】: 渲染 MessageContent 组件 */}
                <MessageContent content={message.content} isUser={isUser} />

                {message.isThinking && <MessageThinkingPanel />}

                {message.isComplete && message.references && message.references.length > 0 && (
                    <MessageReferences references={message.references} />
                )}

                {message.isComplete && (
                    <MessageActions
                        message={message}
                        isThinkingPanelOpen={isThinkingPanelOpen}
                        onToggleThinkingPanel={() => onToggleThinkingPanel(message.id)}
                    />
                )}
            </div>
        </motion.div>
    );
};

export default MessageBubble;