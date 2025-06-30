"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './AuthModal.module.css';
import InfoPanel from './InfoPanel';
import FormPanel from './FormPanel';

interface AuthModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.3 } },
    exit: { opacity: 0, transition: { duration: 0.3 } },
};

const modalVariants = {
    hidden: { opacity: 0, y: -30, scale: 0.98 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { type: 'spring', stiffness: 300, damping: 25, delay: 0.1 } },
    exit: { opacity: 0, y: 20, scale: 0.98, transition: { duration: 0.2 } },
};

// 【新增】定义认证模式类型
export type AuthMode = 'login' | 'register' | 'qr-code';

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
    // 【核心修改】: 使用 state 管理当前的认证模式
    const [authMode, setAuthMode] = useState<AuthMode>('login');

    // 【核心修改】: 定义一个回调函数，让子组件可以切换模式
    const handleModeChange = (mode: AuthMode) => {
        setAuthMode(mode);
    };

    // 当弹窗关闭时，重置回默认的登录模式
    const handleClose = () => {
        onClose();
        setTimeout(() => setAuthMode('login'), 300); // 延迟重置，等待关闭动画完成
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className={styles.backdrop}
                    variants={backdropVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    onClick={handleClose}
                >
                    <motion.div
                        className={styles.modalWrapper}
                        variants={modalVariants}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className={styles.modalContent}>
                            <InfoPanel />
                            {/* 【核心修改】: 将模式状态和切换函数传递给 FormPanel */}
                            <FormPanel
                                currentMode={authMode}
                                onModeChange={handleModeChange}
                            />
                        </div>
                    </motion.div>
                    {/* 【核心修改】: 将关闭按钮移到弹窗外部 */}
                    <button onClick={handleClose} className={styles.closeButton} title="关闭">
                        <i className="fas fa-times"></i>
                    </button>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default AuthModal;