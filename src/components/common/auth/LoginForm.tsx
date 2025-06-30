import React from 'react';
import styles from './LoginForm.module.css';

const LoginForm = () => {
    return (
        <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
            <div className={styles.inputGroup}>
                <i className={`fas fa-user ${styles.icon}`}></i>
                <input type="text" placeholder="输入邮箱/手机号/用户名" className={styles.inputField} />
            </div>
            <div className={styles.inputGroup}>
                <i className={`fas fa-lock ${styles.icon}`}></i>
                <input type="password" placeholder="输入密码" className={styles.inputField} />
            </div>
            <button type="submit" className={styles.submitButton}>
                登 录
            </button>
            <div className={styles.links}>
                <a href="#" className={styles.link}>手机验证码登录</a>
                <a href="#" className={styles.link}>忘记密码</a>
            </div>
        </form>
    );
};

export default LoginForm;