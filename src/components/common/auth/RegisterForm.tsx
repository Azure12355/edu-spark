import React from 'react';
import styles from './LoginForm.module.css';

const RegisterForm = () => {
    return (
        <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
            <div className={styles.inputGroup}>
                <i className={`fas fa-user ${styles.icon}`}></i>
                <input type="text" placeholder="输入用户名 (不少于4位)" className={styles.inputField} />
            </div>
            <div className={styles.inputGroup}>
                <i className={`fas fa-lock ${styles.icon}`}></i>
                <input type="password" placeholder="输入密码 (不少于6位)" className={styles.inputField} />
            </div>
            <div className={styles.inputGroup}>
                <i className={`fas fa-check-circle ${styles.icon}`}></i>
                <input type="password" placeholder="确认密码" className={styles.inputField} />
            </div>
            <button type="submit" className={styles.submitButton}>
                注 册
            </button>
        </form>
    );
};
export default RegisterForm;