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
            {isOpen && (
                <motion.div
                    className={styles.thinkingPanel}
                    initial={{ height: 0, opacity: 0, marginTop: 0 }}
                    animate={{ height: 'auto', opacity: 1, marginTop: '12px' }}
                    exit={{ height: 0, opacity: 0, marginTop: 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                >
                    <h4><i className="fas fa-brain" />助教的思考过程：</h4>
                    <pre>{thinkingText}</pre>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default MessageThinkingPanel;