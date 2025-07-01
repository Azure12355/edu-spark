"use client";
import React, { useState } from 'react';
import styles from './LoginForm.module.css';
import { useAuth } from '@/hooks/common/useAuth'; // 引入 Hook

interface LoginFormProps {
    onSuccess: () => void; // 登录成功后的回调，用于关闭弹窗
}

const LoginForm: React.FC<LoginFormProps> = ({ onSuccess }) => {
    const { handleLogin, isLoading } = useAuth();
    const [account, setAccount] = useState('weilanx');
    const [password, setPassword] = useState('weilanx');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const success = await handleLogin({ account, password });
        if (success) {
            onSuccess(); // 调用父组件的回调
        }
    };

    return (
        <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.inputGroup}>
                <i className={`fas fa-user ${styles.icon}`}></i>
                <input type="text"  placeholder="输入邮箱/手机号/用户名" className={styles.inputField} value={account} onChange={e => setAccount(e.target.value)} disabled={isLoading} />
            </div>
            <div className={styles.inputGroup}>
                <i className={`fas fa-lock ${styles.icon}`}></i>
                <input type="password" placeholder="输入密码" className={styles.inputField} value={password} onChange={e => setPassword(e.target.value)} disabled={isLoading} />
            </div>
            <button type="submit" className={styles.submitButton} disabled={isLoading}>
                {isLoading ? '登录中...' : '登 录'}
            </button>
            <div className={styles.links}>
                <a href="#" className={styles.link}>手机验证码登录</a>
                <a href="#" className={styles.link}>忘记密码</a>
            </div>
        </form>
    );
};

export default LoginForm;