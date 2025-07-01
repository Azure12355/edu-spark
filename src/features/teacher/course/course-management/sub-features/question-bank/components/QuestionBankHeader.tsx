// src/components/teacher/course-management/questions/QuestionBankHeader.tsx
import React from 'react';
import Link from 'next/link'; // 引入Link
import { useParams } from 'next/navigation'; // 引入useParams
import styles from './QuestionBankHeader.module.css';

interface QuestionBankHeaderProps {
    pointTitle: string;
}

const QuestionBankHeader: React.FC<QuestionBankHeaderProps> = ({ pointTitle }) => {
    const params = useParams(); // 获取路由参数
    const courseId = params.id;

    return (
        <header className={styles.headerContainer}>
            <div className={styles.titleGroup}>
                <h1 className={styles.title}>题库管理</h1>
                <p className={styles.subtitle}>当前知识点: {pointTitle || '请选择一个知识点'}</p>
            </div>
            <div className={styles.actions}>
                {/* --- 新增的AI出题按钮 --- */}
                <Link href={`/teacher/courses/${courseId}/questions/ai-generate`} className={`${styles.actionButton} ${styles.aiButton}`}>
                    <i className="fas fa-wand-magic-sparkles"></i> AI 智能出题
                </Link>
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