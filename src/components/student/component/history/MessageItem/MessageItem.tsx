"use client";
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import styles from './MessageItem.module.css';

interface MessageItemProps {
    message: { role: 'user' | 'assistant'; content: string };
    agent: any;
    onEdit: (newContent: string) => void;
    onDelete: () => void;
}

const MessageItem: React.FC<MessageItemProps> = ({ message, agent, onEdit, onDelete }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editText, setEditText] = useState(message.content);

    const handleSave = () => {
        onEdit(editText);
        setIsEditing(false);
    };

    const handleCancel = () => {
        setEditText(message.content);
        setIsEditing(false);
    };

    const isUser = message.role === 'user';

    return (
        <motion.div
            className={styles.messageItem}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            layout
        >
            <div
                className={`${styles.avatar} ${isUser ? styles.userAvatar : styles.assistantAvatar}`}
                style={!isUser ? { background: agent.avatarGradient } : {}}
            >
                {isUser ? <i className="fas fa-user"></i> : agent.avatarText}
            </div>
            <div className={styles.contentWrapper}>
                <div className={styles.messageHeader}>
                    <span className={styles.senderName}>{isUser ? '你' : agent.name}</span>
                    {!isEditing && (
                        <div className={styles.actions}>
                            <button className={styles.actionButton} onClick={() => setIsEditing(true)} title="编辑">
                                <i className="fas fa-pencil-alt"></i>
                            </button>
                            <button className={styles.actionButton} onClick={onDelete} title="删除">
                                <i className="fas fa-trash-alt"></i>
                            </button>
                        </div>
                    )}
                </div>
                {isEditing ? (
                    <div className={styles.editArea}>
                        <textarea value={editText} onChange={(e) => setEditText(e.target.value)} />
                        <div className={styles.editControls}>
                            <button onClick={handleCancel} className={styles.cancelButton}>取消</button>
                            <button onClick={handleSave} className={styles.saveButton}>保存</button>
                        </div>
                    </div>
                ) : (
                    <div className={styles.messageBody}>
                        {message.content}
                    </div>
                )}
            </div>
        </motion.div>
    );
};

export default MessageItem;