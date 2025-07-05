// [!file src/features/teacher/course/course-management/sub-features/question-preview/components/QuestionPreviewCard/QuestionPreviewCard.tsx]
"use client";

import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

// 1. 导入类型和渲染器
// 为了演示，我们假设有一个通用的 MarkdownRenderer，您可以替换为您项目中的实际组件
import MarkdownRenderer from '@/shared/components/ui/MarkdownRenderer/MarkdownRenderer';

import styles from './QuestionPreviewCard.module.css';
import {
    QuestionDifficultyMap,
    QuestionTypeTextMap
} from "@/features/teacher/course/course-management/sub-features/question-bank/types/enums";
import {
    QuestionTypeEnum,
    QuestionVO
} from "@/features/teacher/course/course-management/sub-features/question-bank/types";

interface QuestionPreviewCardProps {
    question: QuestionVO;
}

const QuestionPreviewCard: React.FC<QuestionPreviewCardProps> = ({ question }) => {

    // 2. 将渲染逻辑拆分为独立的、可读性强的内部组件或函数

    // 渲染选项部分
    const OptionsSection = () => {
        if (![QuestionTypeEnum.SINGLE_CHOICE, QuestionTypeEnum.MULTIPLE_CHOICE].includes(question.type) || !question.options) {
            return null;
        }

        const correctAnswers = new Set(question.answers);

        return (
            <div className={styles.section}>
                <h4 className={styles.sectionTitle}><i className="fas fa-list-ul"></i> 选项</h4>
                <div className={styles.optionsContainer}>
                    {question.options.map((option, index) => {
                        const isCorrect = correctAnswers.has(option);
                        const letter = String.fromCharCode(65 + index);
                        return (
                            <div key={index} className={`${styles.optionItem} ${isCorrect ? styles.correct : ''}`}>
                                <div className={styles.optionLetter}>{letter}</div>
                                <div className={styles.optionText}>
                                    <MarkdownRenderer content={option} />
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        );
    };

    // 渲染答案和解析部分
    const AnswerAndAnalysisSection = () => {
        let answerContent: string;
        if (question.type === QuestionTypeEnum.TRUE_FALSE) {
            answerContent = question.answers[0] === 'true' ? '正确' : '错误';
        } else {
            answerContent = question.answers.join('、');
        }

        return (
            <div className={`${styles.section} ${styles.answerAnalysisSection}`}>
                <div className={styles.answerBox}>
                    <h4 className={styles.sectionTitle}><i className="fas fa-lightbulb"></i> 正确答案</h4>
                    <div className={styles.contentViewer}>
                        <MarkdownRenderer content={answerContent} />
                    </div>
                </div>
                <div className={styles.analysisBox}>
                    <h4 className={styles.sectionTitle}><i className="fas fa-comment-dots"></i> 题目解析</h4>
                    <div className={styles.contentViewer}>
                        {question.analyses.length > 0 ? (
                            <MarkdownRenderer content={question.analyses.join('\n\n---\n\n')} />
                        ) : (
                            <p className={styles.noAnalysis}>暂无解析</p>
                        )}
                    </div>
                </div>
            </div>
        );
    };

    const difficultyInfo = QuestionDifficultyMap[question.difficulty];
    const typeText = QuestionTypeTextMap[question.type];

    return (
        <motion.div
            className={styles.card}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
        >
            <header className={styles.header}>
                <h2>{typeText}</h2>
                <div className={styles.metaTags}>
                    <span className={`${styles.tag} ${styles[difficultyInfo.className]}`}>{difficultyInfo.text}</span>
                    <span className={styles.tag}>{question.source}</span>
                </div>
            </header>

            <div className={styles.body}>
                <div className={styles.section}>
                    <h4 className={styles.sectionTitle}><i className="fas fa-align-left"></i> 题干</h4>
                    <div className={styles.contentViewer}>
                        <MarkdownRenderer content={question.stem} />
                    </div>
                </div>

                <OptionsSection />
                <AnswerAndAnalysisSection />
            </div>

            <footer className={styles.footer}>
                <div className={styles.footerSection}>
                    <strong>关联知识点：</strong>
                    <div className={styles.pointList}>
                        {question.knowledgePoints.map(point =>
                            <span key={point.knowledgePointId} className={styles.pointTag}>{point.knowledgePointTitle}</span>
                        )}
                    </div>
                </div>
                <div className={styles.footerSection}>
                    <strong>创建者：</strong>
                    <span>{question.creators.map(c => c.nickname).join(', ')}</span>
                </div>
                <div className={styles.footerSection}>
                    <strong>创建于：</strong>
                    <span>{new Date(question.createdAt).toLocaleString()}</span>
                </div>
            </footer>
        </motion.div>
    );
};

export default QuestionPreviewCard;