// src/components/teacher/course-management/question-preview/QuestionPreviewCard.tsx
"use client";
import React, { useMemo } from 'react';
import { Viewer } from '@bytemd/react';
import gfm from '@bytemd/plugin-gfm';
import highlight from '@bytemd/plugin-highlight';
import math from '@bytemd/plugin-math';
import { Question } from '@/shared/types/question';
import { QuestionType } from '@/shared/constants/enums';
import styles from './QuestionPreviewCard.module.css';
import 'bytemd/dist/index.css';
import 'katex/dist/katex.css';

interface Props {
    question: Question;
}

const QuestionPreviewCard: React.FC<Props> = ({ question }) => {
    const bytemdPlugins = useMemo(() => [gfm(), highlight(), math()], []);

    const renderOptions = () => {
        if (![QuestionType.SINGLE_CHOICE, QuestionType.MULTIPLE_CHOICE].includes(question.type) || !question.options) {
            return null;
        }

        const correctAnswers = new Set(question.answers);

        return (
            <div className={styles.section}>
                <h4 className={styles.sectionTitle}><i className="fas fa-list-ul"></i> 选项</h4>
                <div className={styles.optionsContainer}>
                    {question.options.map((option, index) => {
                        const isCorrect = correctAnswers.has(option);
                        return (
                            <div key={index} className={`${styles.optionItem} ${isCorrect ? styles.correct : ''}`}>
                                <i className={`far ${isCorrect ? 'fa-check-circle' : 'fa-circle'} ${styles.icon}`}></i>
                                <div className={styles.optionText}>
                                    <Viewer value={`${String.fromCharCode(65 + index)}. ${option}`} plugins={bytemdPlugins} />
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        );
    };

    const renderAnswer = () => {
        let answerContent: string;
        if (question.type === QuestionType.TRUE_FALSE) {
            answerContent = question.answers[0] === 'true' ? '正确' : '错误';
        } else {
            answerContent = question.answers.join(', ');
        }

        return (
            <div className={styles.answerSection}>
                <h4 className={styles.sectionTitle}><i className="fas fa-lightbulb"></i> 正确答案</h4>
                <div className={styles.contentViewer}>
                    <Viewer value={answerContent} plugins={bytemdPlugins} />
                </div>
            </div>
        );
    };

    return (
        <div className={styles.card}>
            <header className={styles.header}>
                {/* BugFix: Use question.id if available, otherwise a placeholder */}
                <h2>题目 ID: {question.id || 'Unsaved'}</h2>
                <div className={styles.metaTags}>
                    <span className={styles.typeTag}>{question.type}</span>
                    <span className={`${styles.difficultyTag} ${styles[question.difficulty]}`}>{question.difficulty}</span>
                </div>
            </header>
            <div className={styles.body}>
                <div className={styles.section}>
                    <h4 className={styles.sectionTitle}><i className="fas fa-align-left"></i> 题干内容</h4>
                    <div className={styles.contentViewer}>
                        <Viewer value={question.stem} plugins={bytemdPlugins} />
                    </div>
                </div>
                {renderOptions()}
                {renderAnswer()}
                <div className={styles.section}>
                    <h4 className={styles.sectionTitle}><i className="fas fa-comment-dots"></i> 题目解析</h4>
                    <div className={styles.contentViewer}>
                        <Viewer value={question.analyses.join('\n\n---\n\n')} plugins={bytemdPlugins} />
                    </div>
                </div>
            </div>
            <footer className={styles.footer}>
                <div className={styles.pointList}>
                    <strong>关联知识点：</strong>
                    {question.points.map(point =>
                        <span key={point.id} className={styles.pointTag}>{point.title}</span>
                    )}
                </div>
                {/* BugFix: Safely render creator and creation date */}
                <span>
                    创建者: {question.creators?.join(', ') || 'N/A'} | 创建于: {question.createdAt ? new Date(question.createdAt).toLocaleString() : 'N/A'}
                </span>
            </footer>
        </div>
    );
};

export default QuestionPreviewCard;