// src/components/common/ChatPanel/ChatPanel.tsx
"use client";

import React, { useRef, useEffect, ReactNode } from 'react';
import styles from './ChatPanel.module.css';
import ChatBody from '@/components/common/UniversalChatWidget/ChatBody/ChatBody';
import '../widget.css';


// 定义 ChatPanel 的 props 接口
interface ChatPanelProps {
    /** 初始欢迎界面 */
    welcomeScreen: ReactNode;
    /** 聊天头部 */
    header: ReactNode;
    /** 聊天消息内容 */
    chatContent: ReactNode;
    /** 技能选择器区域 */
    skillSelector?: ReactNode;
    /** 聊天输入框 */
    inputForm: ReactNode;
    /** 底部信息栏 */
    footer?: ReactNode;
    /** 是否显示欢迎界面 */
    showWelcome: boolean;
    /** 外部传入的 class */
    className?: string;
}

/**
 * ChatPanel 是一个通用的聊天界面组装容器。
 * 它负责搭建聊天界面的整体布局，但不包含任何业务逻辑。
 * 所有可变部分（如头部、内容、输入框）都通过 props 注入。
 */
const ChatPanel: React.FC<ChatPanelProps> = ({
                                                 welcomeScreen,
                                                 header,
                                                 chatContent,
                                                 skillSelector,
                                                 inputForm,
                                                 footer,
                                                 showWelcome,
                                                 className
                                             }) => {
    const chatBodyRef = useRef<HTMLDivElement>(null);

    // 监听 chatContent 的变化来自动滚动
    useEffect(() => {
        if (chatBodyRef.current) {
            chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
        }
    }, [chatContent]);

    return (
        <div className={`${styles.chatContainer} ${className || ''}`}>
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