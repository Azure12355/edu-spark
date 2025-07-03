// [!file src/features/teacher/knowledge/knowledge-detail/sub-features/qa/components/Chat/MessageList/MessageItem/MessageItem.tsx]
import React from 'react';
import Image from 'next/image';
import styles from './MessageItem.module.css';
import MarkdownRenderer from "@/shared/components/ui/MarkdownRenderer/MarkdownRenderer";
import ReferencesContainer from "../References/ReferencesContainer";
import { Reference } from '../References/ReferenceCard';

/**
 * @interface Message
 * @description 定义单条消息的完整数据结构，用于前端UI渲染
 */
export interface Message {
    id: string; // [!code ++] 核心增补：为每条消息添加唯一的ID
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
    const isAssistant = role === 'assistant';

    return (
        <div className={`${styles.messageItem} ${styles[role]}`}>
            <div className={styles.avatar}>
                {isAssistant ? (
                    <Image src="/robot.gif" alt="AI 助手" width={40} height={40} style={{ borderRadius: '50%' }} />
                ) : (
                    <i className="fas fa-user"></i>
                )}
            </div>

            <div className={styles.messageContent}>
                <div className={styles.messageBubble}>
                    <MarkdownRenderer content={content} />
                    {/* [!code focus start] */}
                    {/* 修复：只要在思考中，就显示光标 */}
                    {isThinking && <span className={styles.blinkingCursor}></span>}
                    {/* [!code focus end] */}
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