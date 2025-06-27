// src/components/teacher/course-management/ai-generate/GeneratedQuestionCard/OptionsViewer.tsx
"use client";
import React, { useMemo } from 'react';
import { Viewer } from '@bytemd/react';
import gfm from '@bytemd/plugin-gfm';
import { AIGeneratedQuestion } from '@/types/question'; // 导入新类型
import { QuestionType } from '@/constants/enums'; // 导入新枚举
import styles from './OptionsViewer.module.css';

interface Props {
    question: AIGeneratedQuestion;
}

const OptionsViewer: React.FC<Props> = ({ question }) => {
    const plugins = useMemo(() => [gfm()], []);

    // 核心修改：判断题目类型时使用枚举
    if (![QuestionType.SINGLE_CHOICE, QuestionType.MULTIPLE_CHOICE].includes(question.type) || !question.options) {
        return null;
    }

    // 核心修改：直接使用 `question.answers` 数组创建 Set
    const correctAnswers = new Set(question.answers);

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