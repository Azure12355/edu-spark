// src/components/teacher/course-management/ai-generate/GeneratedQuestionCard/OptionsViewer.tsx
"use client";
import React, { useMemo } from 'react';
import { Viewer } from '@bytemd/react';
import gfm from '@bytemd/plugin-gfm';
import { AIGeneratedQuestion } from '@/lib/data/aiGeneratedQuestionsData';
import styles from './OptionsViewer.module.css';

interface Props {
    question: AIGeneratedQuestion;
}

const OptionsViewer: React.FC<Props> = ({ question }) => {
    const plugins = useMemo(() => [gfm()], []);

    if (!['单选题', '多选题'].includes(question.type) || !question.options) {
        return null;
    }

    const correctAnswers = new Set(
        Array.isArray(question.answer) ? question.answer : [question.answer]
    );

    return (
        <ul className={styles.optionsWrapper}>
            {question.options.map((option, index) => {
                const isCorrect = correctAnswers.has(option);
                return (
                    <li key={index} className={`${styles.optionItem} ${isCorrect ? styles.correct : ''}`}>
                        <div className={styles.optionLetter}>{String.fromCharCode(65 + index)}</div>
                        <div className={styles.optionText}>
                            <Viewer value={option} plugins={plugins} />
                        </div>
                    </li>
                );
            })}
        </ul>
    );
};

export default OptionsViewer;