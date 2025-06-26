// src/components/teacher/course-management/question-preview/QuestionPreviewHeader.tsx
"use client";
import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import styles from './QuestionPreviewHeader.module.css';

interface Props {
    courseId: string;
    questionId: string;
}

const QuestionPreviewHeader: React.FC<Props> = ({ courseId, questionId }) => {
    const router = useRouter();
    return (
        <header className={styles.header}>
            <div className={styles.leftSection}>
                <button onClick={() => router.back()} className={styles.backButton} title="返回上一页">
                    <i className="fas fa-arrow-left"></i>
                </button>
                <h1 className={styles.title}>题目预览</h1>
            </div>
            <div className={styles.rightSection}>
                <Link href={`/teacher/courses/${courseId}/questions/${questionId}/edit`} className={styles.editButton}>
                    <i className="fas fa-pen"></i> 编辑此题
                </Link>
            </div>
        </header>
    );
};

export default QuestionPreviewHeader;