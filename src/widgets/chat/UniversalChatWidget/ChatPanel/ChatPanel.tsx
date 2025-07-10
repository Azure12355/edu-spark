// [code focus start ++]
"use client";

import React, { useRef, useEffect, ReactNode } from 'react';
import styles from './ChatPanel.module.css';
import ChatBody from '@/widgets/chat/UniversalChatWidget/ChatBody/ChatBody';
import '../widget.css';

interface ChatPanelProps {
    welcomeScreen: ReactNode;
    header?: ReactNode;
    chatContent: ReactNode;
    skillSelector?: ReactNode;
    inputForm: ReactNode;
    footer?: ReactNode;
    showWelcome: boolean;
    overrideClassName?: string;
}

const ChatPanel: React.FC<ChatPanelProps> = ({
                                                 welcomeScreen,
                                                 header,
                                                 chatContent,
                                                 skillSelector,
                                                 inputForm,
                                                 footer,
                                                 showWelcome,
                                                 overrideClassName
                                             }) => {
    const chatBodyRef = useRef<HTMLDivElement>(null);

    // 核心优化：使用 MutationObserver 监听DOM变化来强制滚动到底部
    useEffect(() => {
        const chatBodyElement = chatBodyRef.current;
        if (!chatBodyElement) return;

        // 定义一个函数来平滑滚动到底部
        const scrollToBottom = () => {
            chatBodyElement.scrollTo({
                top: chatBodyElement.scrollHeight,
                behavior: 'smooth' // 使用平滑滚动，体验更好
            });
        };

        // 首次渲染和 chatContent 更新时，都应尝试滚动
        scrollToBottom();

        // 创建一个 MutationObserver 实例来监听 DOM 的变化
        const observer = new MutationObserver(() => {
            // 只要DOM有任何变化，就无条件滚动到底部
            // 使用 requestAnimationFrame 确保在浏览器下次重绘前执行滚动，防止布局抖动
            requestAnimationFrame(scrollToBottom);
        });

        // 配置 observer：
        // - childList: 监听子节点的添加或删除（新消息）
        // - subtree: 监听所有后代节点的变化（例如图片加载完成导致高度变化）
        // - characterData: 监听文本节点内容的变化（流式输出）
        const config = { childList: true, subtree: true, characterData: true };
        observer.observe(chatBodyElement, config);

        // 清理函数：当组件卸载时，断开 observer 的连接
        return () => {
            observer.disconnect();
        };
    }, [chatContent]); // 依赖 chatContent，当它从空变为有内容时（即从欢迎页切换到聊天页），重新设置 observer

    return (
        <div className={`${styles.chatContainer} ${overrideClassName || ''}`}>
            {showWelcome ? (
                welcomeScreen
            ) : (
                <div className={styles.mainChatLayout}>
                    {header}
                    <ChatBody ref={chatBodyRef}>
                        {chatContent}
                    </ChatBody>
                    {skillSelector}
                    {inputForm}
                    {footer}
                </div>
            )}
        </div>
    );
};

export default ChatPanel;
// [code focus end ++]