"use client";
import React from 'react';
import styles from './FormPanel.module.css';
import LoginForm from './LoginForm';
import NextImage from 'next/image';
import RegisterForm from './RegisterForm';
import SocialLogins from './SocialLogins';
import { AuthMode } from './AuthModal';
import {AnimatePresence, motion} from "framer-motion";
import Image from "next/image"; // 引入类型

// 【新增】二维码组件

const QrCodePanel = () => (
    <div className={styles.qrPanel}>
        {/*@ts-ignore*/}
        <NextImage  src="/images/qr-code-placeholder.svg" alt="QR Code" width={180} height={180} />
        <p className={styles.qrText}>扫码登录，更安全</p>
        <p className={styles.qrSubText}>未在创客贴内完成绑定的微信和手机号，是两个独立账号</p>
        <a href="#" className={styles.qrHelpLink}>扫码登录遇到问题？点击这里</a>
    </div>
);

interface FormPanelProps {
    currentMode: AuthMode;
    onModeChange: (mode: AuthMode) => void;
    onCloseModal: () => void;
}

const FormPanel: React.FC<FormPanelProps> = ({ currentMode, onModeChange, onCloseModal }) => {

    const getTitle = () => {
        switch (currentMode) {
            case 'login': return '账号密码登录';
            case 'register': return '注册账号';
            case 'qr-code': return '微信扫码安全登录';
            default: return '';
        }
    };

    const isFormMode = currentMode === 'login' || currentMode === 'register';

    return (
        <div className={styles.formPanel}>
            <div className={styles.header}>
                <h2 className={styles.title}>
                    {/* 【核心修改】: 返回按钮 */ }
                    {currentMode !== 'login' && (
                        <button onClick={() => onModeChange('login')} className={styles.backButton}>
                            <i className="fas fa-chevron-left"></i> 返回登录
                        </button>
                    )}
                    {getTitle()}
                </h2>

                {/* 【核心修改】: 仅在登录模式下显示二维码切换按钮 */ }
                {currentMode === 'login' && (
                    <button onClick={() => onModeChange('qr-code')} className={styles.qrCodeButton} title="扫码登录">
                        <Image src={"/auth/qr-code.svg"} alt={"登陆"} width={48} height={48} />
                    </button>
                )}
            </div>

            {/* 【核心修改】: 根据模式渲染不同内容 */ }
            <AnimatePresence mode="wait">
                <motion.div
                    key={currentMode}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    className={styles.formContainer}
                >
                    {currentMode === 'login' && <LoginForm onSuccess={onCloseModal} />}
                    {currentMode === 'register' && <RegisterForm onSuccess={() => onModeChange('login')} />}
                    {currentMode === 'qr-code' && <QrCodePanel />}
                </motion.div>
            </AnimatePresence>

            <SocialLogins />

            {isFormMode && (
                <div className={styles.footer}>
                    <p>登录即同意 <a href="#">用户协议</a>、<a href="#">隐私政策</a></p>
                    <button onClick={() => onModeChange(currentMode === 'login' ? 'register' : 'login')} className={styles.footerLink}>
                        {currentMode === 'login' ? '新用户注册' : '已有账号？去登录'}
                    </button>
                </div>
            )}
        </div>
    );
};

export default FormPanel;