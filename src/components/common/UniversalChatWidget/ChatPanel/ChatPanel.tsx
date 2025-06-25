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
    // 关键修复：使用一个更明确的 prop 名称来传递覆盖样式
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
                                                 overrideClassName // 接收覆盖类
                                             }) => {
    const chatBodyRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (chatBodyRef.current) {
            chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
        }
    }, [chatContent]);

    return (
        // 关键修复：将默认样式和覆盖样式组合在一起
        <div className={`${styles.chatContainer} ${overrideClassName || ''}`}>
            {showWelcome ? (
                welcomeScreen
            ) : (
                <>
                    {header}
                    <ChatBody ref={chatBodyRef}>
                        {chatContent}
                    </ChatBody>
                    {skillSelector}
                    {inputForm}
                    {footer}
                </>
            )}
        </div>
    );
};

export default ChatPanel;