// src/components/teacher/course-management/ai-generate/GeneratedQuestionCard.tsx
"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { AIGeneratedQuestion } from '@/shared/types/question'; // 已更新为新类型
import styles from './GeneratedQuestionCard.module.css';
import CardHeader from './GeneratedQuestionCard/CardHeader';
import StemViewer from './GeneratedQuestionCard/StemViewer';
import OptionsViewer from './GeneratedQuestionCard/OptionsViewer';
import AnswerAnalysisViewer from './GeneratedQuestionCard/AnswerAnalysisViewer';

interface Props {
    question: AIGeneratedQuestion;
    theme: {
        colors: {
            bgEnd: string;
            iconBg: string;
        }
    };
}

// 该组件作为容器，本身不需要修改
const GeneratedQuestionCard: React.FC<Props> = ({ question, theme }) => {
    const cardStyle = {
        '--card-theme-color': theme.colors.bgEnd,
        '--card-theme-bg': theme.colors.iconBg
    } as React.CSSProperties;

    return (
        <div
            className={styles.card}
            style={cardStyle}
        >
            <CardHeader
                question={question}
                themeColor={theme.colors.bgEnd}
                themeBg={theme.colors.iconBg}
            />
            <StemViewer stem={question.stem} />
            <OptionsViewer question={question} />
            <AnswerAnalysisViewer question={question} />
        </div>
    );
};
export default GeneratedQuestionCard;