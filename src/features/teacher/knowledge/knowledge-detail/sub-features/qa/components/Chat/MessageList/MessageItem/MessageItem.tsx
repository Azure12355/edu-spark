// src/features/teacher/knowledge/knowledge-detail/sub-features/qa/components/MessageList/MessageItem.tsx
import React from 'react';
import Image from 'next/image';
import styles from './MessageItem.module.css';
import MarkdownRenderer from "@/shared/components/ui/MarkdownRenderer/MarkdownRenderer";
import ReferencesContainer from "../References/ReferencesContainer";
import { Reference } from '../References/ReferenceCard'; // 导入引用类型

/**
 * @interface Message
 * @description 定义单条消息的完整数据结构
 */
export interface Message {
    role: 'user' | 'assistant';
    content: string;
    isThinking?: boolean;
    references?: Reference[];
    thinkingText?: string | null;
}

/**
 * @interface MessageItemProps
 * @description MessageItem 组件的 Props 定义
 */
interface MessageItemProps {
    message: Message;
}

/**
 * 单条消息项组件
 * @description 负责渲染用户或AI助手的单条消息，包括头像、消息气泡和引用。
 */
const MessageItem: React.FC<MessageItemProps> = ({ message }) => {
    const { role, content, references, isThinking, thinkingText } = message;
    const isAssistant = role === 'assistant';

    return (
        <div className={`${styles.messageItem} ${styles[role]}`}>
            {/* 1. 头像 */}
            <div className={styles.avatar}>
                {isAssistant ? (
                    <Image src="/robot.gif" alt="AI 助手" width={40} height={40} style={{ borderRadius: '50%' }} />
                ) : (
                    <i className="fas fa-user"></i>
                )}
            </div>

            {/* 2. 消息内容区 */}
            <div className={styles.messageContent}>
                {/* 2.1 消息气泡 */}
                <div className={styles.messageBubble}>
                    <MarkdownRenderer content={content} />
                    {isThinking && <span className={styles.blinkingCursor}></span>}
                </div>

                {/* 2.2 思考过程（如果存在） */}
                {isAssistant && thinkingText && (
                    <div className={styles.thinkingPanel}>
                        <h6 className={styles.thinkingTitle}><i className="fas fa-brain"></i> 思考过程</h6>
                        <pre className={styles.thinkingContent}>{thinkingText}</pre>
                    </div>
                )}

                {/* 2.3 引用来源（如果存在） */}
                {isAssistant && references && (
                    <ReferencesContainer references={references} />
                )}
            </div>
        </div>
    );
};

export default MessageItem;