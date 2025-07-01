// src/components/common/ConfirmationModal/ConfirmationModal.tsx
"use client";
import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './ConfirmationModal.module.css';

export type ConfirmationType = 'warning' | 'danger' | 'info';

interface Props {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title: string;
    message: string | React.ReactNode;
    confirmText?: string;
    cancelText?: string;
    type?: ConfirmationType;
    isConfirming?: boolean; // 【新增】: 确认操作是否正在进行中
}

const typeConfig = {
    warning: { icon: 'fas fa-exclamation-triangle', className: styles.warning },
    danger: { icon: 'fas fa-trash-alt', className: styles.danger },
    info: { icon: 'fas fa-info-circle', className: styles.info },
};

const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
};

const modalVariants = {
    hidden: { opacity: 0, y: -30, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { type: 'spring', stiffness: 300, damping: 25 } },
    exit: { opacity: 0, y: 20, scale: 0.95 },
};

const ConfirmationModal: React.FC<Props> = ({
                                                isOpen,
                                                onClose,
                                                onConfirm,
                                                title,
                                                message,
                                                confirmText = '确认',
                                                cancelText = '取消',
                                                type = 'warning',
                                                isConfirming = false, // 【新增】: 解构并设置默认值
                                            }) => {
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') onClose();
        };
        if (isOpen) document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [isOpen, onClose]);

    const config = typeConfig[type];

    const handleConfirm = () => {
        onConfirm();
        onClose();
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className={styles.backdrop}
                    variants={backdropVariants}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    onClick={onClose}
                >
                    <motion.div
                        className={styles.modal}
                        variants={modalVariants}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className={`${styles.iconWrapper} ${config.className}`}>
                            <i className={config.icon}></i>
                        </div>
                        <h2 className={styles.title}>{title}</h2>
                        <div className={styles.message}>{message}</div>
                        <div className={styles.actions}>
                            <button className={`${styles.button} ${styles.cancelButton}`} onClick={onClose} disabled={isConfirming}>
                                {cancelText}
                            </button>
                            <button
                                className={`${styles.button} ${styles.confirmButton} ${config.className}`}
                                onClick={handleConfirm}
                                disabled={isConfirming} // 【新增】: 禁用按钮
                            >
                                {isConfirming ? (
                                    <i className="fas fa-spinner fa-spin"></i>
                                ) : (
                                    confirmText
                                )}
                            </button>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default ConfirmationModal;