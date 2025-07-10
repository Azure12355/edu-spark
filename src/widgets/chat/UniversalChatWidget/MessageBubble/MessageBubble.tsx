// src/components/common/MessageBubble/MessageBubble.tsx
"use client";
import React, {useState} from 'react';
import {motion} from 'framer-motion';
import styles from './MessageBubble.module.css';

import MessageHeader from './MessageHeader/MessageHeader';
import MessageContent from './MessageContent/MessageContent';
import MessageThinkingPanel from './MessageThinkingPanel/MessageThinkingPanel';
import MessageActions from './MessageActions/MessageActions';
import {
    Reference
} from "@/features/teacher/knowledge/knowledge-detail/sub-features/qa/components/Chat/MessageList/References/ReferenceCard";
import ReferencesContainer
    from "@/features/teacher/knowledge/knowledge-detail/sub-features/qa/components/Chat/MessageList/References/ReferencesContainer";

export interface BubbleMessage {
    id: string;
    role: 'user' | 'assistant';
    content: string;
    thinkingText?: string | null;
    isThinking?: boolean;
    isComplete?: boolean;
    references?: Reference[];
    agent?: {
        avatar: React.ReactNode;
        themeColor?: string;
    };
}

interface MessageBubbleProps {
    message: BubbleMessage;
    isThinkingPanelOpen: boolean;
    onToggleThinkingPanel: (id: string) => void;
    showAvatar: boolean;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({
                                                         message,
                                                         isThinkingPanelOpen,
                                                         onToggleThinkingPanel,
                                                         showAvatar = false
                                                     }) => {
    const [highlightedRefIndex, setHighlightedRefIndex] = useState<number | null>(null);

    const {role, agent, id} = message;
    const isUser = role === 'user';
    const userAvatar = <i className="fas fa-user"></i>;

    const bubbleStyle = !isUser && agent?.themeColor ? {'--bubble-theme-color': agent.themeColor} as React.CSSProperties : {};

    const handleRefEnter = (index: number) => {
        setHighlightedRefIndex(index);
    };
    const handleRefLeave = () => {
        setHighlightedRefIndex(null);
    };

    return (
        <motion.div
            key={id}
            id={`message-${id}`}
            className={`${styles.messageContainer} ${isUser ? styles.user : styles.assistant}`}
            initial={{opacity: 0, y: 15}}
            animate={{opacity: 1, y: 0}}
            transition={{duration: 0.35, ease: "easeOut"}}
            style={bubbleStyle}
        >

            {
                showAvatar && (
                    <div className={styles.avatar}>
                        {isUser ? userAvatar : (agent?.avatar || <i className="fas fa-robot"></i>)}
                    </div>
                )
            }

            <div className={styles.bubble}>
                {!isUser && (
                    <MessageHeader
                        isThinking={message.isThinking}
                        isComplete={message.isComplete}
                        hasThinkingText={!!message.thinkingText}
                        isThinkingPanelOpen={isThinkingPanelOpen}
                        onToggleThinkingPanel={() => onToggleThinkingPanel(id)}
                    />
                )}

                <MessageContent
                    content={message.content}
                    isThinking={message.isThinking}
                    isUser={isUser}
                />

                <MessageThinkingPanel isOpen={isThinkingPanelOpen} thinkingText={message.thinkingText || ''}/>

                {message.references && message.references.length > 0 && (
                    <ReferencesContainer references={message.references}/>
                )}

                {!isUser && message.isComplete && id !== 'init-assistant' && (
                    <MessageActions contentToCopy={message.content}/>
                )}
            </div>
        </motion.div>
    );
};

export default MessageBubble;