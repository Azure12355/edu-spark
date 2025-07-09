// [!file src/features/teacher/course/course-management/sub-features/assignments-management/sub-features/assignment-edit/components/QuestionLinkManager/QuestionListItem.tsx]
"use client";

import React, { useState } from 'react';
import styles from './QuestionListItem.module.css';
import { AssignmentQuestionLinkVO } from '@/shared/types';
import Tooltip from '@/shared/components/ui/Tooltip/Tooltip';
import { QuestionTypeTextMap } from '@/shared/types/enums/course/QuestionTypeEnum';
import { QuestionDifficultyTextMap } from '@/shared/types/enums/course/QuestionDifficultyEnum';

interface QuestionListItemProps {
    link: AssignmentQuestionLinkVO;
    onUpdateLink: (questionId: number, newScore: number, newOrderIndex: number) => void;
    onRemoveLink: (questionId: number) => void;
}

const QuestionListItem: React.FC<QuestionListItemProps> = ({
                                                               link,
                                                               onUpdateLink,
                                                               onRemoveLink
                                                           }) => {
    const { question, score, orderIndex } = link;
    const [editingScore, setEditingScore] = useState(false);
    const [currentScore, setCurrentScore] = useState(score);

    // 题目类型和难度映射
    const typeText = QuestionTypeTextMap[question.type] || '未知类型';
    const difficultyInfo = QuestionDifficultyTextMap[question.difficulty] || { text: '未知', className: '' };

    const handleScoreChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(e.target.value, 10);
        setCurrentScore(isNaN(value) ? 0 : value);
    };

    const handleScoreBlur = () => {
        setEditingScore(false);
        if (currentScore !== score) {
            onUpdateLink(Number(question.id), currentScore, orderIndex);
        }
    };

    const handleScoreKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            e.currentTarget.blur(); // 失去焦点触发 blur 事件
        }
    };

    return (
        <div className={styles.itemContainer}>
            <div className={styles.questionInfo}>
                <span className={styles.orderIndex}>{orderIndex + 1}.</span> {/* 显示为从1开始的序号 */}
                <span className={styles.questionStem}>{question.stem}</span>
                <span className={styles.questionTypeTag}>{typeText}</span>
                <span className={`${styles.questionDifficultyTag} ${styles[difficultyInfo.className]}`}>
                    {difficultyInfo.text}
                </span>
            </div>
            <div className={styles.actions}>
                <div className={styles.scoreInputWrapper}>
                    {editingScore ? (
                        <input
                            type="number"
                            value={currentScore}
                            onChange={handleScoreChange}
                            onBlur={handleScoreBlur}
                            onKeyDown={handleScoreKeyDown}
                            className={styles.scoreInput}
                            autoFocus
                        />
                    ) : (
                        <span onClick={() => setEditingScore(true)} className={styles.scoreDisplay}>
                            {currentScore} 分 <i className="fas fa-pencil-alt"></i>
                        </span>
                    )}
                </div>
                {/* TODO: 顺序调整按钮，需要实现拖拽或上下箭头 */}
                <Tooltip content="移除题目" position="top">
                    <button
                        onClick={() => onRemoveLink(Number(question.id))}
                        className={`${styles.actionButton} ${styles.deleteButton}`}
                    >
                        <i className="fas fa-trash-alt"></i>
                    </button>
                </Tooltip>
            </div>
        </div>
    );
};

export default QuestionListItem;