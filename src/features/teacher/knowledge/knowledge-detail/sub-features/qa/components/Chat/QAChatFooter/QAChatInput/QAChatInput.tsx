// [!file src/features/teacher/knowledge/knowledge-detail/sub-features/qa/components/Chat/QAChatFooter/QAChatInput/QAChatInput.tsx]
import React, { useRef, useEffect } from 'react';
import styles from './QAChatInput.module.css';

interface QAChatInputProps {
    query: string;
    setQuery: (query: string) => void;
    onSendMessage: (message: string) => void;
    isLoading: boolean;
    onStop: () => void;
}

const QAChatInput: React.FC<QAChatInputProps> = ({ query, setQuery, onSendMessage, isLoading, onStop }) => {
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
        const textarea = textareaRef.current;
        if (textarea) {
            textarea.style.height = 'auto';
            const scrollHeight = textarea.scrollHeight;
            textarea.style.height = `${scrollHeight}px`;
        }
    }, [query]);

    const handleSend = () => {
        const trimmedValue = query.trim();
        if (trimmedValue && !isLoading) {
            onSendMessage(trimmedValue);
        }
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault();
            handleSend();
        }
    };

    // [!code focus start]
    // 决定显示发送按钮还是停止按钮
    const renderButton = () => {
        if (isLoading) {
            return (
                <button
                    className={styles.sendButton}
                    onClick={onStop}
                    title="停止生成 (Esc)"
                >
                    <i className="fas fa-stop"></i>
                </button>
            );
        }
        return (
            <button
                className={styles.sendButton}
                onClick={handleSend}
                disabled={!query.trim()}
                title="发送 (Enter)"
            >
                <i className="fas fa-paper-plane"></i>
            </button>
        );
    };
    // [!code focus end]

    return (
        <div className={styles.inputWrapper}>
            <textarea
                ref={textareaRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="在此输入您的问题..."
                className={styles.chatInput}
                rows={1}
                disabled={isLoading}
            />
            {renderButton()}
        </div>
    );
};

export default QAChatInput;