// src/components/teacher/course-management/ai-generate/GeneratedQuestionCard/CardHeader.tsx
"use client";
import React from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { AIGeneratedQuestion } from '@/lib/data/aiGeneratedQuestionsData';
import { useAIGeneratedQuestionsStore } from '@/store/aiGeneratedQuestionsStore';
import { useToast } from '@/hooks/useToast';
import styles from './CardHeader.module.css';

interface Props {
    question: AIGeneratedQuestion;
    themeColor: string;
    themeBg: string;
}

const CardHeader: React.FC<Props> = ({ question, themeColor, themeBg }) => {
    const params = useParams();
    const courseId = params.id as string;
    const deleteQuestion = useAIGeneratedQuestionsStore((state) => state.deleteQuestion);
    const showToast = useToast();

    const handleDelete = () => {
        if (window.confirm(`确定要删除题目 "${question.stem.substring(0, 20)}..." 吗？此操作不可撤销。`)) {
            deleteQuestion(question.id);
            showToast({ message: '题目已删除', type: 'info' });
        }
    };

    const handleAddToBank = () => {
        // 在实际应用中，这里会调用一个 action 将此题目加入到主题库
        showToast({ message: '功能开发中：加入题库', type: 'info' });
    };

    return (
        <header className={styles.header}>
            <div className={styles.meta}>
                <span
                    className={styles.typeTag}
                    style={{ '--card-theme-color': themeColor, '--card-theme-bg': themeBg } as React.CSSProperties}
                >
                    {question.type}
                </span>
                <span className={styles.pointLabel}>知识点:</span>
                <div className={styles.pointTagList}>
                    {/* --- 核心修改 --- */}
                    {(question.points ?? []).map(point =>
                        <span key={point.id} className={styles.pointTag}>{point.title}</span>
                    )}
                </div>
            </div>
            <div className={styles.actions}>
                <button onClick={handleAddToBank} title="加入题库"><i className="fas fa-plus-square"></i></button>
                {/* --- 核心修改：将编辑按钮链接到新页面 --- */}
                <Link href={`/teacher/courses/${courseId}/questions/ai-generate/${question.id}/edit`} passHref>
                    <button title="编辑"><i className="fas fa-pen"></i></button>
                </Link>
                <button onClick={handleDelete} title="删除"><i className="fas fa-trash"></i></button>
            </div>
        </header>
    );
};

export default CardHeader;