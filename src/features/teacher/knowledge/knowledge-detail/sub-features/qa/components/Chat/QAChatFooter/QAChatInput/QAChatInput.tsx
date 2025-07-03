// src/features/teacher/knowledge/knowledge-detail/sub-features/qa/components/QAChatFooter/QAChatInput.tsx
import React, { useState, useRef, useEffect } from 'react';
import styles from './QAChatInput.module.css';

/**
 * @interface QAChatInputProps
 * @description QAChatInput 组件的 Props 定义
 */
interface QAChatInputProps {
    onSendMessage: (message: string) => void;
    isLoading: boolean;
}

/**
 * 问答聊天输入组件
 * @description 封装了文本输入框、发送按钮以及输入框高度自适应的逻辑。
 */
const QAChatInput: React.FC<QAChatInputProps> = ({ onSendMessage, isLoading }) => {
    const [inputValue, setInputValue] = useState('');
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    // 处理输入框高度自适应的 Effect
    useEffect(() => {
        const textarea = textareaRef.current;
        if (textarea) {
            // 先重置高度，以便在删除内容时能正确缩小
            textarea.style.height = 'auto';
            // 设置新的高度，但不超过最大值
            const scrollHeight = textarea.scrollHeight;
            textarea.style.height = `${scrollHeight}px`;
        }
    }, [inputValue]);

    const handleSend = () => {
        const trimmedValue = inputValue.trim();
        if (trimmedValue && !isLoading) {
            onSendMessage(trimmedValue);
            setInputValue(''); // 发送后清空输入框
        }
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
        // 当用户按下 Enter 且没有同时按下 Shift 键时，发送消息
        if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault(); // 阻止默认的换行行为
            handleSend();
        }
    };

    return (
        <div className={styles.inputWrapper}>
            <textarea
                ref={textareaRef}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="在此输入您的问题..."
                className={styles.chatInput}
                rows={1}
                disabled={isLoading}
            />
            <button
                className={styles.sendButton}
                onClick={handleSend}
                disabled={isLoading || !inputValue.trim()}
                title="发送 (Enter)"
            >
                {isLoading ? (
                    <i className="fas fa-spinner fa-spin"></i>
                ) : (
                    <i className="fas fa-paper-plane"></i>
                )}
            </button>
        </div>
    );
};

export default QAChatInput;