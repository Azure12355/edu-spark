"use client";

import React from 'react';
import styles from './MessageContent.module.css';
import MarkdownRenderer from '@/shared/components/ui/MarkdownRenderer/MarkdownRenderer'; // 复用通用 Markdown 渲染器

interface MessageContentProps {
    content: string;
    isUser: boolean;
}

/**
 * @description 消息内容组件，负责渲染 Markdown 格式的文本。
 */
const MessageContent: React.FC<MessageContentProps> = ({ content, isUser }) => {
    return (
        <div className={`${styles.contentWrapper} ${isUser ? styles.userMessage : ''}`}>
            {/* 直接使用通用的 MarkdownRenderer，并将 isUser 作为 className 传递 */}
            <MarkdownRenderer content={content} className={isUser ? styles.userMessage : ''} />
        </div>
    );
};

export default MessageContent;