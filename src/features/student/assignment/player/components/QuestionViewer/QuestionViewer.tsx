// [code focus start ++]
import React from 'react';
import { QuestionVO, QuestionTypeEnum } from '@/shared/types';
import styles from './QuestionViewer.module.css';
import { Check, X } from 'lucide-react';

interface QuestionViewerProps {
    question: QuestionVO;
    userAnswer: any;
    onAnswerChange: (answer: any) => void;
}

const QuestionViewer: React.FC<QuestionViewerProps> = ({ question, userAnswer, onAnswerChange }) => {

    const questionTypeText = {
        [QuestionTypeEnum.SINGLE_CHOICE]: "单选题",
        [QuestionTypeEnum.MULTIPLE_CHOICE]: "多选题",
        [QuestionTypeEnum.TRUE_FALSE]: "判断题",
        [QuestionTypeEnum.FILL_IN_THE_BLANK]: "填空题",
        [QuestionTypeEnum.SHORT_ANSWER]: "简答题",
        [QuestionTypeEnum.PROGRAMMING]: "编程题",
    };

    // --- 单选题渲染逻辑 ---
    const renderSingleChoice = () => (
        <ul className={styles.optionsList}>
            {question.options?.map((option, index) => {
                const optionLabel = String.fromCharCode(65 + index);
                return (
                    <li key={index}
                        className={`${styles.optionItem} ${userAnswer === optionLabel ? styles.selected : ''}`}
                        onClick={() => onAnswerChange(optionLabel)}>
                        <div className={styles.optionLabel}>{optionLabel}</div>
                        <span>{option}</span>
                    </li>
                );
            })}
        </ul>
    );

    // --- 多选题渲染逻辑 ---
    const renderMultipleChoice = () => {
        const currentAnswers: string[] = Array.isArray(userAnswer) ? userAnswer : [];
        const handleMultiChange = (optionLabel: string) => {
            const newAnswers = currentAnswers.includes(optionLabel)
                ? currentAnswers.filter(a => a !== optionLabel)
                : [...currentAnswers, optionLabel].sort();
            onAnswerChange(newAnswers);
        };
        return (
            <ul className={styles.optionsList}>
                {question.options?.map((option, index) => {
                    const optionLabel = String.fromCharCode(65 + index);
                    const isSelected = currentAnswers.includes(optionLabel);
                    return (
                        <li key={index}
                            className={`${styles.optionItem} ${isSelected ? styles.selected : ''}`}
                            onClick={() => handleMultiChange(optionLabel)}>
                            <div className={styles.checkboxLabel}>
                                {isSelected ? <Check size={16}/> : optionLabel}
                            </div>
                            <span>{option}</span>
                        </li>
                    );
                })}
            </ul>
        );
    };

    // --- 判断题渲染逻辑 ---
    const renderTrueFalse = () => (
        <div className={styles.trueFalseContainer}>
            <button
                className={`${styles.trueFalseButton} ${styles.true} ${userAnswer === 'T' ? styles.selected : ''}`}
                onClick={() => onAnswerChange('T')}>
                <Check size={20}/> 正确
            </button>
            <button
                className={`${styles.trueFalseButton} ${styles.false} ${userAnswer === 'F' ? styles.selected : ''}`}
                onClick={() => onAnswerChange('F')}>
                <X size={20}/> 错误
            </button>
        </div>
    );

    // --- 填空题渲染逻辑 ---
    const renderFillInTheBlank = () => {
        const parts = question.stem.split('___');
        const currentAnswers = Array.isArray(userAnswer) ? userAnswer : [];

        const handleFillChange = (index: number, value: string) => {
            const newAnswers = [...currentAnswers];
            newAnswers[index] = value;
            onAnswerChange(newAnswers);
        };

        return (
            <div className={styles.questionStem}>
                {parts.map((part, index) => (
                    <React.Fragment key={index}>
                        {part}
                        {index < parts.length - 1 && (
                            <input
                                type="text"
                                className={styles.fillBlankInput}
                                value={currentAnswers[index] || ''}
                                onChange={(e) => handleFillChange(index, e.target.value)}
                            />
                        )}
                    </React.Fragment>
                ))}
            </div>
        );
    };

    // --- 简答/编程题渲染逻辑 ---
    const renderShortAnswer = () => (
        <textarea
            className={styles.textareaAnswer}
            value={userAnswer || ''}
            onChange={(e) => onAnswerChange(e.target.value)}
            placeholder="请在此输入您的答案..."
        />
    );

    // --- 主渲染逻辑 ---
    const renderAnswerArea = () => {
        switch (question.type) {
            case QuestionTypeEnum.SINGLE_CHOICE: return renderSingleChoice();
            case QuestionTypeEnum.MULTIPLE_CHOICE: return renderMultipleChoice();
            case QuestionTypeEnum.TRUE_FALSE: return renderTrueFalse();
            case QuestionTypeEnum.FILL_IN_THE_BLANK: return renderFillInTheBlank();
            case QuestionTypeEnum.SHORT_ANSWER: return renderShortAnswer();
            case QuestionTypeEnum.PROGRAMMING: return renderShortAnswer(); // 编程题暂时也用文本域
            default: return <p>暂不支持的题型: {question.type}</p>;
        }
    };

    return (
        <div className={styles.viewerContainer}>
            <header className={styles.questionHeader}>
                <div className={styles.questionType}>
                    {questionTypeText[question.type as keyof typeof questionTypeText]}
                </div>
                {question.type !== QuestionTypeEnum.FILL_IN_THE_BLANK && (
                    <div className={styles.questionStem}>{question.stem}</div>
                )}
            </header>
            <div className={styles.answerArea}>
                {renderAnswerArea()}
            </div>
        </div>
    );
};

export default QuestionViewer;
// [code focus end ++]