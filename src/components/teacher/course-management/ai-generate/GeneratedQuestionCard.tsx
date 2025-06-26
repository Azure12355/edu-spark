// src/components/teacher/course-management/ai-generate/GeneratedQuestionCard.tsx
"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { AIGeneratedQuestion } from '@/lib/data/aiGeneratedQuestionsData';
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

const GeneratedQuestionCard: React.FC<Props> = ({ question, theme }) => {
    const cardStyle = {
        '--card-theme-color': theme.colors.bgEnd,
        '--card-theme-bg': theme.colors.iconBg
    } as React.CSSProperties;

    // 此处无需再添加 motion.div，因为父组件 QuestionList 已经为每个卡片包裹了 motion.div
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