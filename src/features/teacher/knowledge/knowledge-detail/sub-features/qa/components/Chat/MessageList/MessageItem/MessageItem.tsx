// [!file src/features/teacher/knowledge/knowledge-detail/sub-features/qa/components/Chat/MessageList/MessageItem/MessageItem.tsx]
import React from 'react';
import Image from 'next/image';
import styles from './MessageItem.module.css';
import MarkdownRenderer from "@/shared/components/ui/MarkdownRenderer/MarkdownRenderer";
import ReferencesContainer from "../References/ReferencesContainer";
import { Reference } from '../References/ReferenceCard';

export interface Message {
    id: string;
    role: 'user' | 'assistant';
    content: string;
    isThinking?: boolean;
    references?: Reference[];
    thinkingText?: string | null;
}

interface MessageItemProps {
    message: Message;
}

const MessageItem: React.FC<MessageItemProps> = ({ message }) => {
    const { role, content, references, isThinking, thinkingText } = message;
    const isUser = role === 'user';
    const isAssistant = role === 'assistant';

    return (
        <div className={`${styles.messageItem} ${styles[role]}`}>
            {/* [!code focus start] */}
            {/* --- 核心修复：只有当角色是 assistant 时才渲染头像 --- */}
            {isAssistant && (
                <div className={styles.avatar}>
                    <Image src="/robot.gif" alt="AI 助手" width={40} height={40} style={{ borderRadius: '50%' }} />
                </div>
            )}
            {/* --- 核心修复结束 --- */}
            {/* [!code focus end] */}

            <div className={styles.messageContent}>
                <div className={styles.messageBubble}>
                    {/* [!code focus start] */}
                    {/* --- 核心修复：为用户消息传递一个特定的 className 以便在渲染器中修改样式 --- */}
                    <MarkdownRenderer content={content} className={isUser ? styles.userMessageContent : ''} />
                    {/* --- 核心修复结束 --- */}
                    {/* [!code focus end] */}
                    {isThinking && <span className={styles.blinkingCursor}></span>}
                </div>

                {isAssistant && thinkingText && (
                    <div className={styles.thinkingPanel}>
                        <h6 className={styles.thinkingTitle}><i className="fas fa-brain"></i> 思考过程</h6>
                        <pre className={styles.thinkingContent}>{thinkingText}</pre>
                    </div>
                )}

                {isAssistant && references && references.length > 0 && (
                    <ReferencesContainer references={references} />
                )}
            </div>
        </div>
    );
};

export default MessageItem;