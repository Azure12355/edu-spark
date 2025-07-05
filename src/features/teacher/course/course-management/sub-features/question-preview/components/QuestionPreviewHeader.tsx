// [!file src/features/teacher/course/course-management/sub-features/question-preview/components/QuestionPreviewHeader/QuestionPreviewHeader.tsx]
"use client";

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import styles from './QuestionPreviewHeader.module.css';
import Tooltip from '@/shared/components/ui/Tooltip/Tooltip';

interface QuestionPreviewHeaderProps {
    courseId: string | number;
    questionId: string | number;
}

const QuestionPreviewHeader: React.FC<QuestionPreviewHeaderProps> = ({ courseId, questionId }) => {
    const router = useRouter();

    return (
        <header className={styles.header}>
            <div className={styles.leftSection}>
                <Tooltip content="返回题库列表" position="right">
                    <button onClick={() => router.back()} className={styles.backButton}>
                        <i className="fas fa-arrow-left"></i>
                    </button>
                </Tooltip>
                <div className={styles.titleContainer}>
                    <h1 className={styles.title}>题目预览</h1>
                    <span className={styles.breadcrumb}>
                        题目 ID: {questionId}
                    </span>
                </div>
            </div>

            <div className={styles.rightSection}>
                <Tooltip content="分享此题目" position="top">
                    <button className={`${styles.actionButton} ${styles.secondaryButton}`}>
                        <i className="fas fa-share-alt"></i>
                        <span>分享</span>
                    </button>
                </Tooltip>
                <Tooltip content="编辑此题目" position="top">
                    <Link href={`/teacher/courses/${courseId}/questions/${questionId}/edit`} className={`${styles.actionButton} ${styles.primaryButton}`}>
                        <i className="fas fa-pen"></i>
                        <span>编辑</span>
                    </Link>
                </Tooltip>
            </div>
        </header>
    );
};

export default QuestionPreviewHeader;