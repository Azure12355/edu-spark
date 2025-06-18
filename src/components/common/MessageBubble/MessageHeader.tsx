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
    if (!isThinking && !isComplete) return null;

    return (
        <div className={styles.assistantMsgHeader}>
            {isThinking && !isComplete && (
                <span className={styles.statusTagThinking}>
                    <motion.i className="fas fa-circle-notch fa-spin" style={{ marginRight: '8px' }} />
                    正在思考...
                </span>
            )}
            {isComplete && !hasThinkingText && (
                <span className={styles.statusTagComplete}>
                    <i className="fas fa-check-circle" style={{ color: '#10b981' }} />
                    回答完毕
                </span>
            )}
            {isComplete && hasThinkingText && (
                <span className={styles.statusTagComplete} onClick={onToggleThinkingPanel} style={{ cursor: 'pointer' }}>
                    <i className={`fas fa-chevron-right ${isThinkingPanelOpen ? styles.chevronOpen : ''}`} />
                    回答完毕 (点击{isThinkingPanelOpen ? '收起' : '展开'}思考过程)
                </span>
            )}
        </div>
    );
};

export default MessageHeader;