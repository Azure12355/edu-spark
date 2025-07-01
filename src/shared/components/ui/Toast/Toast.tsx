// src/components/common/Toast/Toast.tsx
"use client";

import React from 'react';
import ReactDOM from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useToastStore, ToastType } from '@/shared/hooks/useToast';
import styles from './Toast.module.css';

// 定义图标和颜色的映射
const toastConfig = {
    success: { icon: 'fas fa-check-circle', color: '#10B981' },
    error: { icon: 'fas fa-times-circle', color: '#EF4444' },
    warning: { icon: 'fas fa-exclamation-triangle', color: '#F59E0B' },
    info: { icon: 'fas fa-info-circle', color: '#3B82F6' },
};

const ToastProvider: React.FC = () => {
    const { toasts, removeToast } = useToastStore();

    // 确保只在客户端渲染
    const [isMounted, setIsMounted] = React.useState(false);
    React.useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) {
        return null;
    }

    return ReactDOM.createPortal(
        <div className={styles.toastContainer}>
            <AnimatePresence>
                {toasts.map((toast) => (
                    <motion.div
                        key={toast.id}
                        className={styles.toast}
                        style={{ '--toast-color': toastConfig[toast.type].color } as React.CSSProperties}
                        initial={{ opacity: 0, y: -20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, x: 50, scale: 0.9 }}
                        transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                        layout
                    >
                        <div className={styles.toastIcon}>
                            <i className={toastConfig[toast.type].icon}></i>
                        </div>
                        <p className={styles.toastMessage}>{toast.message}</p>
                        <button className={styles.closeButton} onClick={() => removeToast(toast.id)}>
                            <i className="fas fa-times"></i>
                        </button>
                    </motion.div>
                ))}
            </AnimatePresence>
        </div>,
        document.body
    );
};

export default ToastProvider;