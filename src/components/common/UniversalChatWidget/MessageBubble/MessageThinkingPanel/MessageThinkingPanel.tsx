// src/components/common/MessageBubble/MessageThinkingPanel.tsx
"use client";
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './MessageThinkingPanel.module.css';

interface MessageThinkingPanelProps {
    isOpen: boolean;
    thinkingText: string;
}

const MessageThinkingPanel: React.FC<MessageThinkingPanelProps> = ({ isOpen, thinkingText }) => {
    return (
        <AnimatePresence>
            {isOpen && thinkingText && (
                <motion.div
                    className={styles.thinkingPanel}
                    // 动画参数保持不变，因为 height: auto 会自动处理方向
                    initial={{ height: 0, opacity: 0, marginBottom: 0 }}
                    animate={{ height: 'auto', opacity: 1, marginBottom: '16px' }}
                    exit={{ height: 0, opacity: 0, marginBottom: 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                >
                    <h4><i className="fas fa-brain" />Agent的思考过程：</h4>
                    <pre>{thinkingText}</pre>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default MessageThinkingPanel;