// src/components/student/component/assistant/ChatInputForm.tsx
import React, { useRef, useEffect } from 'react';
import styles from './ChatInputForm.module.css';

interface ChatInputFormProps {
    inputValue: string;
    onInputChange: (value: string) => void;
    onSubmit: () => void;
    isSending: boolean;
    shouldFocus: boolean;
}

const ChatInputForm: React.FC<ChatInputFormProps> = ({ inputValue, onInputChange, onSubmit, isSending, shouldFocus }) => {
    const inputRef = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
        if (shouldFocus && inputRef.current) {
            inputRef.current.focus();
        }
    }, [shouldFocus]);

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            onSubmit();
        }
    };

    return (
        <form onSubmit={(e) => { e.preventDefault(); onSubmit(); }} className={styles.inputArea}>
            <textarea
                ref={inputRef}
                value={inputValue}
                onChange={(e) => onInputChange(e.target.value)}
                placeholder="输入你的问题，或 Shift + Enter 换行"
                rows={1}
                onKeyDown={handleKeyDown}
                disabled={isSending}
            />
            <button type="submit" className={styles.sendButton} disabled={isSending || !inputValue.trim()}>
                <i className="fas fa-paper-plane"></i>
            </button>
        </form>
    );
};

export default ChatInputForm;