// src/components/teacher/course-management/questions/QuestionBankHeader.tsx
import React from 'react';
import styles from './QuestionBankHeader.module.css';

interface QuestionBankHeaderProps {
    pointTitle: string;
}

const QuestionBankHeader: React.FC<QuestionBankHeaderProps> = ({ pointTitle }) => {
    return (
        <header className={styles.headerContainer}>
            <div className={styles.titleGroup}>
                <h1 className={styles.title}>题库管理</h1>
                <p className={styles.subtitle}>当前知识点: {pointTitle || '请选择一个知识点'}</p>
            </div>
            <div className={styles.actions}>
                <button className={`${styles.actionButton} ${styles.secondaryButton}`}>
                    <i className="fas fa-file-import"></i> 批量导入
                </button>
                <button className={`${styles.actionButton} ${styles.primaryButton}`}>
                    <i className="fas fa-plus"></i> 新增题目
                </button>
            </div>
        </header>
    );
};

export default QuestionBankHeader;