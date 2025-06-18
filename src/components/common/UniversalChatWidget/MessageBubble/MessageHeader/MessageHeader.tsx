// src/components/common/MessageBubble/MessageHeader.tsx
"use client";
import React from 'react';
import { motion } from 'framer-motion';
import styles from './MessageHeader.module.css';

interface MessageHeaderProps {
    isThinking?: boolean;
    isComplete?: boolean;
    hasThinkingText?: boolean;
    isThinkingPanelOpen?: boolean;
    onToggleThinkingPanel: () => void;
}

const MessageHeader: React.FC<MessageHeaderProps> = ({ isThinking, isComplete, hasThinkingText, isThinkingPanelOpen, onToggleThinkingPanel }) => {
    // 如果没有任何状态，不渲染
    if (!isThinking && !isComplete) return null;

    // 是否是可点击的“回答完毕”标签
    const isClickable = isComplete && hasThinkingText;

    return (
        <div className={styles.assistantMsgHeader}>
            {isThinking && !isComplete && (
                <span className={`${styles.statusTag} ${styles.statusTagThinking}`}>
                    <motion.i
                        className="fas fa-circle-notch"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                    />
                    <span>正在思考...</span>
                </span>
            )}

            {isComplete && (
                <span
                    className={`${styles.statusTag} ${styles.statusTagComplete} ${isClickable ? styles.clickable : ''}`}
                    onClick={isClickable ? onToggleThinkingPanel : undefined}
                    style={isClickable ? { cursor: 'pointer' } : {}}
                >
                    {isClickable ? (
                        <i className={`fas fa-chevron-right ${styles.chevron} ${isThinkingPanelOpen ? styles.open : ''}`} />
                    ) : (
                        <i className={`fas fa-check-circle ${styles.icon}`} />
                    )}
                    <span>
                        回答完毕
                        {isClickable && ` (点击${isThinkingPanelOpen ? '收起' : '展开'}思考过程)`}
                    </span>
                </span>
            )}
        </div>
    );
};

export default MessageHeader;