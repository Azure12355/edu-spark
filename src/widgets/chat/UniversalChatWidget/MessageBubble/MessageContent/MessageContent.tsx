// src/components/common/UniversalChatWidget/MessageBubble/MessageContent/MessageContent.tsx
"use client";

import React, { useMemo } from 'react';
import styles from './MessageContent.module.css';
import MarkdownRenderer from '@/shared/components/ui/MarkdownRenderer/MarkdownRenderer';

interface MessageContentProps {
    content: string;
    isThinking?: boolean;
    isUser: boolean;
}

const MessageContent: React.FC<MessageContentProps> = ({ content, isThinking, isUser }) => {

    const contentToRender = useMemo(() => {
        return content.replace(/<think>[\s\S]*?<\/think>/g, '');
    }, [content]);

    return (
        <div className={styles.contentWrapper}>
            <MarkdownRenderer
                content={contentToRender}
                className={isUser ? "userMessageContent": undefined}
                // (className prop 逻辑保持不变，用于区分用户/AI气泡样式)
            />
            {isThinking && <span className={styles.typingIndicator}></span>}
        </div>
    );
};

export default MessageContent;