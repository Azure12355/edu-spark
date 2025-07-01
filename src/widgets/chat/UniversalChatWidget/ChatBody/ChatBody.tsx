// src/components/common/UniversalChatWidget/ChatBody/ChatBody.tsx
"use client";

import React, { forwardRef, ReactNode } from 'react';
import styles from './ChatBody.module.css';

/**
 * ChatBody 组件的 Props 定义
 */
interface ChatBodyProps {
    /**
     * 要在聊天区域内渲染的内容，通常是一系列的消息气泡组件。
     */
    children: ReactNode;

    /**
     * 允许从外部传入额外的 CSS class，用于样式定制。
     */
    className?: string;
}

/**
 * ChatBody 是一个通用的聊天内容显示区域组件。
 * 它的核心职责是提供一个带有自定义滚动条的、能够自适应父容器高度的区域，
 * 用于承载和展示聊天消息。
 *
 * @param {ChatBodyProps} props - 组件的 props。
 * @param {React.ForwardedRef<HTMLDivElement>} ref - 转发到主滚动容器的 ref，
 *   允许父组件直接操作 DOM，例如控制滚动位置。
 * @returns {React.ReactElement} - 渲染后的 ChatBody 组件。
 */
const ChatBody = forwardRef<HTMLDivElement, ChatBodyProps>(
    ({ children, className }, ref) => {
        return (
            <main className={`${styles.chatBody} ${className || ''}`} ref={ref}>
                {children}
            </main>
        );
    }
);

// 为 forwardRef 组件添加 displayName，便于 React DevTools 调试
ChatBody.displayName = 'ChatBody';

export default ChatBody;