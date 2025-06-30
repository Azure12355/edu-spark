"use client";
import React, { useState } from 'react';
import styles from './LoginForm.module.css';
import { useAuth } from '@/hooks/useAuth';

interface RegisterFormProps {
    onSuccess: () => void; // 注册成功后的回调，用于切换到登录界面
}

const RegisterForm: React.FC<RegisterFormProps> = ({ onSuccess }) => {
    const { handleRegister, isLoading } = useAuth();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [checkPassword, setCheckPassword] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const success = await handleRegister({ username, password, checkPassword });
        if (success) {
            onSuccess();
        }
    };

    return (
        <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.inputGroup}>
                <i className={`fas fa-user ${styles.icon}`}></i>
                <input type="text" placeholder="输入用户名 (不少于4位)" className={styles.inputField} value={username} onChange={e => setUsername(e.target.value)} disabled={isLoading} />
            </div>
            <div className={styles.inputGroup}>
                <i className={`fas fa-lock ${styles.icon}`}></i>
                <input type="password" placeholder="输入密码 (不少于6位)" className={styles.inputField} value={password} onChange={e => setPassword(e.target.value)} disabled={isLoading} />
            </div>
            <div className={styles.inputGroup}>
                <i className={`fas fa-check-circle ${styles.icon}`}></i>
                <input type="password" placeholder="确认密码" className={styles.inputField} value={checkPassword} onChange={e => setCheckPassword(e.target.value)} disabled={isLoading} />
            </div>
            <button type="submit" className={styles.submitButton} disabled={isLoading}>
                {isLoading ? '注册中...' : '注 册'}
            </button>
        </form>
    );
};

export default RegisterForm;