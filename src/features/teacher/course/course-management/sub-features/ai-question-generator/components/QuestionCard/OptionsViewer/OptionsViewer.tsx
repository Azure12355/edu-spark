"use client";
import React from 'react';
import styles from './OptionsViewer.module.css';
import { AIQuestionRecordVO, QuestionTypeEnum } from '@/shared/types';
import MarkdownRenderer from '@/shared/components/ui/MarkdownRenderer/MarkdownRenderer';

export default ({ question }: { question: AIQuestionRecordVO }) => {
    if (![QuestionTypeEnum.SINGLE_CHOICE, QuestionTypeEnum.MULTIPLE_CHOICE].includes(question.type as QuestionTypeEnum) || !question.options) return null;
    const correctAnswers = new Set(question.answers);
    return (
        <ul className={styles.optionsWrapper}>
            {question.options.map((option, index) => (
                <li key={index} className={`${styles.optionItem} ${correctAnswers.has(option) ? styles.correct : ''}`}>
                    <div className={styles.optionLetter}>{String.fromCharCode(65 + index)}</div>
                    <div className={styles.optionText}><MarkdownRenderer content={option} /></div>
                </li>
            ))}
        </ul>
    );
};