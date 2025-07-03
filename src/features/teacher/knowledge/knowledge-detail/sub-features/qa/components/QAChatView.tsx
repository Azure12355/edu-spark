"use client";

import React from 'react';
import Image from 'next/image';
import styles from '../styles/QAChatView.module.css';

// --- 统一导入所有需要的通用组件和类型 ---
import ChatPanel from '@/widgets/chat/UniversalChatWidget/ChatPanel/ChatPanel';
import ChatHeader from '@/widgets/chat/UniversalChatWidget/ChatHeader/ChatHeader';
import WelcomeScreen from '@/widgets/chat/UniversalChatWidget/WelcomeScreen/WelcomeScreen';
import MessageBubble, { BubbleMessage } from '@/widgets/chat/UniversalChatWidget/MessageBubble/MessageBubble';
import { PromptCardData } from '@/widgets/chat/UniversalChatWidget/PromptCard/PromptCard';
import ChatInputForm from '@/widgets/chat/UniversalChatWidget/ChatInputForm/ChatInputForm';
import ChatFooter from '@/widgets/chat/UniversalChatWidget/ChatFooter/ChatFooter';
import { useToast } from '@/shared/hooks/useToast';

/**
 * @interface QAChatViewProps
 * @description 定义了QA聊天视图所需的所有外部依赖（数据和回调），使其成为一个纯UI组件。
 */
export interface QAChatViewProps {
    messages: BubbleMessage[];
    isLoading: boolean;
    query: string;
    setQuery: (query: string) => void;
    onSendMessage: (queryText: string) => void;
    onClear: () => void;
    onStop: () => void;
}

// 静态数据：定义欢迎界面的内容
const welcomeData = {
    avatar: <Image src="/robot.gif" alt="QA助手" width={80} height={80} priority style={{borderRadius: '50%'}}/>,
    title: "知识库问答测试",
    subtitle: "在这里，您可以模拟用户提问，测试和评估当前知识库在特定参数下的问答效果。",
    promptCards: [
        { id: 'qa-1', icon: <i className="fas fa-sitemap"></i>, title: '总结核心概念', description: '请总结一下关于“时间复杂度”的核心知识点。' },
        { id: 'qa-2', icon: <i className="fas fa-code-branch"></i>, title: '对比两种方法', description: '对比说明“邻接矩阵”和“邻接表”的优缺点。' },
    ] as PromptCardData[],
};

// 静态数据：定义助手的头像和主题色
const assistantAgent = {
    avatar: <Image src="/robot.gif" alt="QA助手" width={36} height={36} style={{borderRadius: '50%'}}/>,
    themeColor: '#10B981', // 绿色，代表知识和准确
};

/**
 * 知识问答（QA）聊天视图组件（重构后）
 * @description 负责组装通用的聊天组件，展示问答交互界面。
 */
const QAChatView: React.FC<QAChatViewProps> = ({
                                                   messages,
                                                   isLoading,
                                                   query,
                                                   setQuery,
                                                   onSendMessage,
                                                   onClear,
                                                   onStop
                                               }) => {
    const showWelcome = messages.length === 0 && !isLoading;

    const handleFormSubmit = () => {
        if (query.trim()) {
            onSendMessage(query);
        }
    };

    return (
        <div className={styles.chatView}>
            <ChatPanel
                overrideClassName={styles.chatPanelOverride}
                showWelcome={showWelcome}
                welcomeScreen={
                    <WelcomeScreen
                        avatar={welcomeData.avatar}
                        title={welcomeData.title}
                        subtitle={welcomeData.subtitle}
                        promptCards={welcomeData.promptCards}
                        onCardClick={(card) => onSendMessage(card.description)}
                    />
                }
                header={
                    <ChatHeader title="问答测试">
                        <button onClick={onClear} className="text-sm text-gray-500 hover:text-gray-700" title="清空对话">
                            <i className="fas fa-trash-alt"></i> 清空
                        </button>
                    </ChatHeader>
                }
                chatContent={
                    messages.map(msg => (
                        <MessageBubble
                            key={msg.id}
                            message={{ ...msg, agent: msg.role === 'assistant' ? assistantAgent : undefined }}
                        />
                    ))
                }
                inputForm={
                    <ChatInputForm
                        inputValue={query}
                        onInputChange={setQuery}
                        onSubmit={handleFormSubmit}
                        isSending={isLoading}
                        onStop={onStop}
                        placeholder="输入您的问题，测试知识库的回答效果..."
                    />
                }
                footer={<ChatFooter />}
            />
        </div>
    );
};

export default QAChatView;