// [!file src/shared/components/ui/ConfirmationModal/ConfirmationModal.tsx]
"use client";

import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './ConfirmationModal.module.css';
import { useConfirmationModalState, useConfirmationModalActions } from '@/shared/hooks/useConfirmationModal';

// 定义类型到图标和样式的映射
const typeConfig = {
    warning: { icon: 'fas fa-exclamation-triangle', className: styles.warning },
    danger: { icon: 'fas fa-trash-alt', className: styles.danger },
    info: { icon: 'fas fa-info-circle', className: styles.info },
};

// 动画变体
const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
};
const modalVariants = {
    hidden: { opacity: 0, y: -30, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { type: 'spring', stiffness: 300, damping: 25 } },
    exit: { opacity: 0, y: 20, scale: 0.95 },
};

/**
 * 全局确认弹窗组件。
 * 它通过 Hook 监听全局状态，并自我渲染。
 * 你只需要在根布局（RootLayout）中渲染一次即可。
 */
const ConfirmationModal: React.FC = () => {
    const { isOpen, options } = useConfirmationModalState();
    const { hideModal, setIsConfirming } = useConfirmationModalActions();

    // 监听键盘事件
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') hideModal();
        };
        if (isOpen) {
            document.addEventListener('keydown', handleKeyDown);
        }
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [isOpen, hideModal]);

    // 如果没有配置，不渲染任何东西
    if (!options) return null;

    const {
        title,
        message,
        onConfirm,
        confirmText = '确认',
        cancelText = '取消',
        type = 'warning',
        isConfirming = false
    } = options;

    const config = typeConfig[type];

    const handleConfirm = async () => {
        setIsConfirming(true);
        try {
            await onConfirm();
        } finally {
            setIsConfirming(false);
            hideModal();
        }
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
                    onClick={hideModal}
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
                            <button className={`${styles.button} ${styles.cancelButton}`} onClick={hideModal} disabled={isConfirming}>
                                {cancelText}
                            </button>
                            <button
                                className={`${styles.button} ${styles.confirmButton} ${config.className}`}
                                onClick={handleConfirm}
                                disabled={isConfirming}
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