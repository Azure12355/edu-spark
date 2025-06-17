// src/components/common/ChatHeader/ChatHeader.tsx
"use client";
import React from 'react';
import styles from './ChatHeader.module.css';

/**
 * 通用聊天头部组件的 Props 定义
 */
interface ChatHeaderProps {
    /**
     * 显示在标题左侧的头像或图标。
     * 这是一个 React 节点，可以传递 <Image> 组件、<i> 标签或任何其他元素。
     */
    avatar: React.ReactNode;

    /**
     * 显示的标题文本。
     */
    title: string;

    /**
     * 传递给头部右侧操作区的内容。
     * 通常是一些操作按钮，例如清空、设置、关闭等。
     */
    children?: React.ReactNode;

    /**
     * 允许从外部传入额外的 CSS class。
     */
    className?: string;
}

/**
 * ChatHeader 是一个通用的聊天窗口头部组件。
 * 它提供了标准化的布局，同时允许通过 props 对头像、标题和右侧操作按钮进行完全定制。
 */
const ChatHeader: React.FC<ChatHeaderProps> = ({ avatar, title, children, className }) => {
    return (
        <header className={`${styles.chatHeader} ${className || ''}`}>
            <div className={styles.headerTitle}>
                {avatar}
                <span>{title}</span>
            </div>
            {children && (
                <div className={styles.headerControls}>
                    {children}
                </div>
            )}
        </header>
    );
};

export default ChatHeader;