// src/components/common/InputModal/InputModal.tsx
"use client";
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './InputModal.module.css';

interface Props {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (value: string) => void;
    title: string;
    label: string;
    placeholder?: string;
    confirmText?: string;
    initialValue?: string;
    validation?: (value: string) => string | null; // 返回错误信息或 null
}

const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
};

const modalVariants = {
    hidden: { opacity: 0, y: -30, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { type: 'spring', stiffness: 300, damping: 25 } },
    exit: { opacity: 0, y: 20, scale: 0.95 },
};

const InputModal: React.FC<Props> = ({
                                         isOpen,
                                         onClose,
                                         onSubmit,
                                         title,
                                         label,
                                         placeholder,
                                         confirmText = '确认',
                                         initialValue = '',
                                         validation,
                                     }) => {
    const [value, setValue] = useState(initialValue);
    const [error, setError] = useState<string | null>(null);
    const inputRef = React.useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (isOpen) {
            // 当模态框打开时，清空状态并聚焦输入框
            setValue(initialValue);
            setError(null);
            setTimeout(() => inputRef.current?.focus(), 100); // 延迟聚焦以确保动画完成
        }
    }, [isOpen, initialValue]);

    const handleSubmit = () => {
        const validationError = validation ? validation(value) : null;
        if (validationError) {
            setError(validationError);
            return;
        }
        onSubmit(value);
        onClose();
    };

    const handleKeyDown = (event: React.KeyboardEvent) => {
        if (event.key === 'Enter') {
            handleSubmit();
        }
        if (event.key === 'Escape') {
            onClose();
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div className={styles.backdrop} /* ... */ onClick={onClose}>
                    <motion.div className={styles.modal} /* ... */ onClick={(e) => e.stopPropagation()}>
                        <header className={styles.header}>
                            <h2 className={styles.title}>{title}</h2>
                            <button onClick={onClose} className={styles.closeButton} title="关闭"><i className="fas fa-times"></i></button>
                        </header>
                        <div className={styles.body}>
                            <label htmlFor="input-modal-field" className={styles.label}>{label}</label>
                            <input
                                id="input-modal-field"
                                ref={inputRef}
                                type="text"
                                className={`${styles.input} ${error ? styles.error : ''}`}
                                value={value}
                                onChange={(e) => {
                                    setValue(e.target.value);
                                    if(error) setError(null); // 用户输入时清除错误
                                }}
                                onKeyDown={handleKeyDown}
                                placeholder={placeholder}
                            />
                            <div className={styles.errorMessage}>{error || ''}</div>
                        </div>
                        <div className={styles.actions}>
                            <button className={`${styles.button} ${styles.cancelButton}`} onClick={onClose}>取消</button>
                            <button className={`${styles.button} ${styles.confirmButton}`} onClick={handleSubmit} disabled={!!error || !value.trim()}>
                                {confirmText}
                            </button>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default InputModal;