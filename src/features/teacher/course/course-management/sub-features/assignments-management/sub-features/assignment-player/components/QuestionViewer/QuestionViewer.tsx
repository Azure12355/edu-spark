// [!file src/features/teacher/course/course-management/sub-features/assignments-management/sub-features/assignment-player/components/QuestionViewer/QuestionViewer.tsx]
"use client";

import React from 'react';
import styles from './QuestionViewer.module.css';
import {AssignmentQuestionLinkVO, QuestionTypeTextMap} from '@/shared/types';
import MarkdownRenderer from '@/shared/components/ui/MarkdownRenderer/MarkdownRenderer'; // 复用我们的Markdown渲染器
import { QuestionTypeEnum } from '@/shared/types/enums/course/QuestionTypeEnum';

// 定义 Props 类型
interface QuestionViewerProps {
    questionLink: AssignmentQuestionLinkVO | undefined;
    questionIndex: number;
    totalQuestions: number;
    studentAnswer: any;
    onAnswerChange: (questionId: number, answer: any) => void;
}

const QuestionViewer: React.FC<QuestionViewerProps> = ({
                                                           questionLink,
                                                           questionIndex,
                                                           totalQuestions,
                                                           studentAnswer,
                                                           onAnswerChange,
                                                       }) => {

    if (!questionLink) {
        return (
            <div className={`${styles.viewerContainer} ${styles.loadingState}`}>
                <i className="fas fa-spinner fa-spin"></i>
                <p>正在加载题目...</p>
            </div>
        );
    }

    const { question } = questionLink;

    // 渲染不同题型的作答区域
    const renderAnswerArea = () => {
        const questionId = Number(question.id);

        switch (question.type) {
            case QuestionTypeEnum.SINGLE_CHOICE:
                return (
                    <div className={styles.optionsContainer}>
                        {question.options.map((option, index) => (
                            <label key={index} className={`${styles.optionLabel} ${studentAnswer === option ? styles.selected : ''}`}>
                                <input
                                    type="radio"
                                    name={`question-${questionId}`}
                                    value={option}
                                    checked={studentAnswer === option}
                                    onChange={(e) => onAnswerChange(questionId, e.target.value)}
                                    className={styles.radioInput}
                                />
                                <span className={styles.optionText}>{String.fromCharCode(65 + index)}. {option}</span>
                            </label>
                        ))}
                    </div>
                );

            case QuestionTypeEnum.MULTIPLE_CHOICE:
                const currentAnswers = Array.isArray(studentAnswer) ? studentAnswer : [];
                const handleMultiChange = (option: string) => {
                    const newAnswers = currentAnswers.includes(option)
                        ? currentAnswers.filter(a => a !== option)
                        : [...currentAnswers, option];
                    onAnswerChange(questionId, newAnswers);
                };
                return (
                    <div className={styles.optionsContainer}>
                        {question.options.map((option, index) => (
                            <label key={index} className={`${styles.optionLabel} ${currentAnswers.includes(option) ? styles.selected : ''}`}>
                                <input
                                    type="checkbox"
                                    value={option}
                                    checked={currentAnswers.includes(option)}
                                    onChange={() => handleMultiChange(option)}
                                    className={styles.checkboxInput}
                                />
                                <span className={styles.optionText}>{String.fromCharCode(65 + index)}. {option}</span>
                            </label>
                        ))}
                    </div>
                );

            case QuestionTypeEnum.FILL_IN_THE_BLANK:
            case QuestionTypeEnum.SHORT_ANSWER:
            case QuestionTypeEnum.PROGRAMMING:
                return (
                    <textarea
                        className={styles.textareaAnswer}
                        placeholder="在此输入您的答案..."
                        value={studentAnswer || ''}
                        onChange={(e) => onAnswerChange(questionId, e.target.value)}
                        rows={10}
                    />
                );

            default:
                return <p>暂不支持该题型作答。</p>;
        }
    };

    return (
        <div className={styles.viewerContainer}>
            {/* 题目头部信息 */}
            <div className={styles.questionHeader}>
                <span className={styles.questionCounter}>{questionIndex + 1} / {totalQuestions}</span>
                <div className={styles.questionMeta}>
                    <span>类型: {QuestionTypeTextMap[question.type] || '未知'}</span>
                    <span className={styles.divider}>|</span>
                    <span>分值: {questionLink.score}分</span>
                </div>
            </div>

            {/* 题干区域 */}
            <div className={styles.stemContainer}>
                <MarkdownRenderer content={question.stem} />
            </div>

            {/* 作答区域 */}
            <div className={styles.answerArea}>
                <h3 className={styles.areaTitle}>作答区</h3>
                {renderAnswerArea()}
            </div>
        </div>
    );
};

export default QuestionViewer;