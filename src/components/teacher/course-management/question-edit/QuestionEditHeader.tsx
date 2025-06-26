// src/components/teacher/course-management/question-edit/QuestionEditHeader.tsx
import React from 'react';
import Link from 'next/link';
import styles from './QuestionEditHeader.module.css';

interface Props { courseId: string; onSave: () => void; }
const QuestionEditHeader: React.FC<Props> = ({ courseId, onSave }) => (
    <header className={styles.header}>
        <div className={styles.leftSection}>
            <Link href={`/teacher/courses/${courseId}/questions`} className={styles.backButton}>
                <i className="fas fa-arrow-left"></i>
            </Link>
            <h1 className={styles.title}>编辑题目</h1>
            <span className={styles.statusTag}>草稿</span>
        </div>
        <div className={styles.rightSection}>
            <button onClick={onSave} className={`${styles.actionButton} ${styles.saveButton}`}>保存题目</button>
        </div>
    </header>
);
export default QuestionEditHeader;