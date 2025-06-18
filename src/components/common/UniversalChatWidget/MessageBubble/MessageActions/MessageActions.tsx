// src/components/common/MessageBubble/MessageActions.tsx
"use client";
import React from 'react';
import styles from './MessageActions.module.css';
import { useToast } from '@/hooks/useToast'; // 1. 导入 useToast hook

interface MessageActionsProps {
    contentToCopy: string;
}

const MessageActions: React.FC<MessageActionsProps> = ({ contentToCopy }) => {
    // 2. 获取 showToast 函数
    const showToast = useToast();

    const handleCopy = () => {
        navigator.clipboard.writeText(contentToCopy).then(() => {
            // 3. 调用 showToast 显示成功提示
            showToast({
                message: '内容已复制到剪贴板',
                type: 'success',
            });
        }).catch(err => {
            console.error('Failed to copy text: ', err);
            // 可以在这里显示一个错误提示
            showToast({
                message: '复制失败，请重试',
                type: 'error',
            });
        });
    };

    return (
        <div className={styles.messageActions}>
            <button title="复制" onClick={handleCopy}>
                <i className="far fa-copy" /> 复制
            </button>
            <button title="赞" onClick={() => showToast({ message: '感谢您的点赞！', type: 'info' })}>
                <i className="far fa-thumbs-up" /> 赞
            </button>
            <button title="踩" onClick={() => showToast({ message: '我们会努力改进！', type: 'warning' })}>
                <i className="far fa-thumbs-down" /> 踩
            </button>
        </div>
    );
};

export default MessageActions;