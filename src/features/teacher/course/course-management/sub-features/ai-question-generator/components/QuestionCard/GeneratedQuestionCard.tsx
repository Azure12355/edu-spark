// src/features/teacher/course/course-management/sub-features/ai-question-generator/components/QuestionCard.tsx
"use client";
import React from 'react';
import styles from './GeneratedQuestionCard.module.css';
import { AIQuestionRecordVO } from '@/shared/types';
import CardHeader from '@/features/teacher/course/course-management/sub-features/ai-question-generator/components/QuestionCard/CardHeader/CardHeader';
import StemViewer from '@/features/teacher/course/course-management/sub-features/ai-question-generator/components/QuestionCard/StemViewer/StemViewer';
import OptionsViewer from '@/features/teacher/course/course-management/sub-features/ai-question-generator/components/QuestionCard/OptionsViewer/OptionsViewer';
import AnswerAnalysisViewer from '@/features/teacher/course/course-management/sub-features/ai-question-generator/components/QuestionCard/AnswerAnalysisViewer/AnswerAnalysisViewer';

interface Props {
    question: AIQuestionRecordVO;
    theme: { colors: { bgEnd: string; iconBg: string; } };
    onDelete: (id: number) => void;
    onAddToBank: (id: number) => void;
}

const GeneratedQuestionCard: React.FC<Props> = ({ question, theme, onDelete, onAddToBank }) => {
    const cardStyle = {
        '--card-theme-color': theme.colors.bgEnd,
    } as React.CSSProperties;

    return (
        <div className={styles.card} style={cardStyle}>
            <CardHeader
                question={question}
                themeColor={theme.colors.bgEnd}
                themeBg={theme.colors.iconBg}
                onDelete={onDelete}
                onAddToBank={onAddToBank}
            />
            <StemViewer stem={question.stem} />
            <OptionsViewer question={question} />
            <AnswerAnalysisViewer question={question} />
        </div>
    );
};
export default GeneratedQuestionCard;