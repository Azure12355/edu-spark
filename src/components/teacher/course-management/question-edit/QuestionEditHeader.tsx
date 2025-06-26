// src/components/teacher/course-management/question-edit/QuestionEditHeader.tsx
"use client"; // 使用 hook 需要客户端组件指令
import React from 'react';
// 1. 导入 useRouter hook
import { useRouter } from 'next/navigation';
import styles from './QuestionEditHeader.module.css';

interface Props {
    // 移除 courseId prop，因为它不再需要用来构建返回链接
    onSave: () => void;
}

const QuestionEditHeader: React.FC<Props> = ({ onSave }) => {
    // 2. 在组件内部获取 router 实例
    const router = useRouter();

    return (
        <header className={styles.header}>
            <div className={styles.leftSection}>
                {/* 3. 将 <a> 标签改为 <button>，并使用 router.back() */}
                <button onClick={() => router.back()} className={styles.backButton} title="返回上一页">
                    <i className="fas fa-arrow-left"></i>
                </button>
                <h1 className={styles.title}>编辑题目</h1>
                <span className={styles.statusTag}>草稿</span>
            </div>
            <div className={styles.rightSection}>
                <button onClick={onSave} className={`${styles.actionButton} ${styles.saveButton}`}>保存题目</button>
            </div>
        </header>
    );
};

export default QuestionEditHeader;