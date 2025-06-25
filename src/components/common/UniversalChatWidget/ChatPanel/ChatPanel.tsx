// src/components/common/UniversalChatWidget/ChatPanel/ChatPanel.tsx
"use client";

import React, { useRef, useEffect, ReactNode } from 'react';
import styles from './ChatPanel.module.css';
import ChatBody from '@/components/common/UniversalChatWidget/ChatBody/ChatBody';
import '../widget.css';

interface ChatPanelProps {
    welcomeScreen: ReactNode;
    header: ReactNode;
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

    useEffect(() => {
        if (chatBodyRef.current) {
            // 只有当用户没有向上滚动时，才自动滚动到底部
            const { scrollHeight, clientHeight, scrollTop } = chatBodyRef.current;
            if (scrollHeight - scrollTop < clientHeight + 50) { // 50px 的缓冲区域
                chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
            }
        }
    }, [chatContent]);

    return (
        <div className={`${styles.chatContainer} ${overrideClassName || ''}`}>
            {showWelcome ? (
                // WelcomeScreen 应该也能占满空间，假设其根元素有 height: 100%
                welcomeScreen
            ) : (
                // 关键修复：用一个带有 flex 布局的 div 替换 React Fragment
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