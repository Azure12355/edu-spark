// src/components/teacher/course-management/ai-generate/GeneratedQuestionCard/CardHeader.tsx
"use client";
import React from 'react';
import { AIGeneratedQuestion } from '@/lib/data/aiGeneratedQuestionsData';
import styles from './CardHeader.module.css';

interface Props {
    question: AIGeneratedQuestion;
    themeColor: string;
    themeBg: string;
}

const CardHeader: React.FC<Props> = ({ question, themeColor, themeBg }) => (
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
                {question.pointIds.map(id => <span key={id} className={styles.pointTag}>{id}</span>)}
            </div>
        </div>
        <div className={styles.actions}>
            <button title="加入题库"><i className="fas fa-plus-square"></i></button>
            <button title="编辑"><i className="fas fa-pen"></i></button>
            <button title="删除"><i className="fas fa-trash"></i></button>
        </div>
    </header>
);

export default CardHeader;