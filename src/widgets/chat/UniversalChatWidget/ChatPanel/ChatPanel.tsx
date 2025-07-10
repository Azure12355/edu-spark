// [!file src/widgets/chat/UniversalChatWidget/ChatPanel/ChatPanel.tsx]
"use client";

import React, { useRef, useEffect, ReactNode, useState } from 'react';
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
    // 1. 新增一个 state 用于追踪用户是否正在向上滚动查看历史记录
    const [isUserScrollingUp, setIsUserScrollingUp] = useState(false);

    // 2. 核心优化：使用 MutationObserver 监听DOM变化来触发滚动
    useEffect(() => {
        const chatBodyElement = chatBodyRef.current;
        if (!chatBodyElement) return;

        // 定义一个函数来平滑滚动到底部
        const scrollToBottom = () => {
            chatBodyElement.scrollTo({
                top: chatBodyElement.scrollHeight,
                behavior: 'smooth' // 使用平滑滚动
            });
        };

        // 首次渲染时滚动到底部
        scrollToBottom();

        const observer = new MutationObserver((mutations) => {
            // 当DOM变化时，我们检查用户是否正在向上滚动
            // 如果没有，就执行滚动
            if (!isUserScrollingUp) {
                // 使用 requestAnimationFrame 确保在浏览器下次重绘前执行滚动
                // 这可以避免因快速DOM变更导致的布局抖动和滚动计算不准问题
                requestAnimationFrame(scrollToBottom);
            }
        });

        // 配置 observer：监听子节点（消息气泡）的添加或删除
        const config = { childList: true };
        observer.observe(chatBodyElement, config);

        // 清理函数：当组件卸载时，断开 observer 的连接
        return () => {
            observer.disconnect();
        };
    }, [isUserScrollingUp]); // 依赖 isUserScrollingUp，当用户开始或停止滚动时，可以重新评估逻辑


    // 3. 新增 useEffect 用于处理用户的滚动行为
    useEffect(() => {
        const chatBodyElement = chatBodyRef.current;
        if (!chatBodyElement) return;

        let scrollTimeout: NodeJS.Timeout;

        const handleScroll = () => {
            clearTimeout(scrollTimeout);

            const { scrollTop, scrollHeight, clientHeight } = chatBodyElement;
            const isAtBottom = scrollHeight - scrollTop - clientHeight < 10; // 增加10px的容差

            // 如果用户滚动到了非底部区域，我们就标记他正在向上滚动
            if (!isAtBottom) {
                setIsUserScrollingUp(true);
            }

            // 【智能重置】: 如果用户滚动，但在一段时间后停止，并且他最终停在了底部，
            // 那么我们认为他已经看完了历史消息，可以恢复自动滚动。
            scrollTimeout = setTimeout(() => {
                const { scrollTop: newScrollTop, scrollHeight: newScrollHeight, clientHeight: newClientHeight } = chatBodyElement;
                if (newScrollHeight - newScrollTop - newClientHeight < 10) {
                    setIsUserScrollingUp(false);
                }
            }, 150); // 150ms 的延迟，避免过于频繁地更新state
        };

        chatBodyElement.addEventListener('scroll', handleScroll);

        return () => {
            chatBodyElement.removeEventListener('scroll', handleScroll);
            clearTimeout(scrollTimeout);
        };
    }, []); // 这个 effect 只需要在组件挂载时运行一次

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