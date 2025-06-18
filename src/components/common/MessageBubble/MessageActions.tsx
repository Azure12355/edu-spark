// src/components/common/MessageBubble/MessageActions.tsx
"use client";
import React from 'react';
import styles from './MessageActions.module.css';

interface MessageActionsProps {
    contentToCopy: string;
}

const MessageActions: React.FC<MessageActionsProps> = ({ contentToCopy }) => {
    return (
        <div className={styles.messageActions}>
            <button title="复制" onClick={() => navigator.clipboard.writeText(contentToCopy)}>
                <i className="far fa-copy" /> 复制
            </button>
            <button title="赞"><i className="far fa-thumbs-up" /> 赞</button>
            <button title="踩"><i className="far fa-thumbs-down" /> 踩</button>
        </div>
    );
};

export default MessageActions;