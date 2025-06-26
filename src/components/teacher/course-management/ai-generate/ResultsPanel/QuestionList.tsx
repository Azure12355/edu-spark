// src/components/teacher/course-management/ai-generate/ResultsPanel/QuestionList.tsx
"use client";
import React from 'react';
import GeneratedQuestionCard from '../GeneratedQuestionCard';
import { AIGeneratedQuestion } from '@/lib/data/aiGeneratedQuestionsData';
import styles from './QuestionList.module.css';

interface StatTheme {
    colors: {
        bgEnd: string;
        iconBg: string;
    }
}
interface Props {
    questions: AIGeneratedQuestion[];
    themes: Record<string, StatTheme>;
}

const QuestionList: React.FC<Props> = ({ questions, themes }) => {
    return (
        <div className={styles.questionList}>
            {questions.map(q => (
                <GeneratedQuestionCard
                    key={q.id}
                    question={q}
                    theme={themes[q.type as keyof typeof themes]}
                />
            ))}
        </div>
    );
};

export default QuestionList;