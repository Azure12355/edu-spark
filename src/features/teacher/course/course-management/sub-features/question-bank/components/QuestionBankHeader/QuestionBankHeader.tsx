// [!file src/features/teacher/course/course-management/sub-features/question-bank/components/QuestionBankHeader/QuestionBankHeader.tsx]
"use client";

import React from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import styles from './QuestionBankHeader.module.css';
import Tooltip from '@/shared/components/ui/Tooltip/Tooltip';

interface QuestionBankHeaderProps {
    pointTitle: string;
}

const QuestionBankHeader: React.FC<QuestionBankHeaderProps> = ({ pointTitle }) => {
    const params = useParams();
    const courseId = params.id as string;

    // 为新增题目动态生成一个唯一的临时ID
    const newQuestionId = `new-${Date.now()}`;

    return (
        <header className={styles.headerContainer}>
            <div className={styles.titleGroup}>
                <h1 className={styles.title}>题库管理</h1>
                <p className={styles.subtitle} title={pointTitle}>
                    当前知识点: <strong>{pointTitle || '请从左侧选择一个知识点'}</strong>
                </p>
            </div>
            <div className={styles.actions}>
                <Tooltip content="使用 AI 辅助快速生成题目" position="top">
                    <Link href={`/teacher/courses/${courseId}/questions/ai-generate`} className={`${styles.actionButton} ${styles.aiButton}`}>
                        <i className="fas fa-wand-magic-sparkles"></i>
                        <span>AI 智能出题</span>
                    </Link>
                </Tooltip>

                <Tooltip content="从 Excel 或其他格式文件导入题目" position="top">
                    <button className={`${styles.actionButton} ${styles.secondaryButton}`}>
                        <i className="fas fa-file-import"></i>
                        <span>批量导入</span>
                    </button>
                </Tooltip>

                <Tooltip content="手动创建一道新题目" position="top">
                    <Link href={`/teacher/courses/${courseId}/questions/${newQuestionId}/edit`} className={`${styles.actionButton} ${styles.primaryButton}`}>
                        <i className="fas fa-plus"></i>
                        <span>新增题目</span>
                    </Link>
                </Tooltip>
            </div>
        </header>
    );
};

export default QuestionBankHeader;