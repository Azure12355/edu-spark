// src/components/teacher/course-management/ai-generate/GeneratedQuestionCard.tsx
"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { AIGeneratedQuestion } from '@/lib/data/aiGeneratedQuestionsData';
import styles from './GeneratedQuestionCard.module.css';

// 导入所有新的子组件
import CardHeader from './GeneratedQuestionCard/CardHeader';
import StemViewer from './GeneratedQuestionCard/StemViewer';
import OptionsViewer from './GeneratedQuestionCard/OptionsViewer';
import AnswerAnalysisViewer from './GeneratedQuestionCard/AnswerAnalysisViewer';

interface Props {
    question: AIGeneratedQuestion;
    theme: { // 接收主题对象
        colors: {
            bgEnd: string;
            iconBg: string;
        }
    };
}

const GeneratedQuestionCard: React.FC<Props> = ({ question, theme }) => {
    // 定义 CSS 变量
    const cardStyle = {
        '--card-theme-color': theme.colors.bgEnd,
        '--card-theme-bg': theme.colors.iconBg
    } as React.CSSProperties;

    return (
        <motion.div
            className={styles.card}
            style={cardStyle}
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
        >
            <CardHeader
                question={question}
                themeColor={theme.colors.bgEnd}
                themeBg={theme.colors.iconBg}
            />
            <StemViewer stem={question.stem} />
            <OptionsViewer question={question} />
            <AnswerAnalysisViewer question={question} />
        </motion.div>
    );
};
export default GeneratedQuestionCard;