// [code focus start ++]
"use client";

import React from 'react';
import styles from './AnswerSheet.module.css';
import AnswerSheetItem from './AnswerSheetItem';
import { useAssignmentPlayerStore } from '../../store/assignmentPlayerStore';

/**
 * 播放器右侧的答题卡，用于快速导航和查看作答状态。
 */
const AnswerSheet: React.FC = () => {
    // 1. 从 Zustand Store 获取所有需要的状态和 actions
    const {
        questions,
        currentQuestionIndex,
        userAnswers,
        setCurrentQuestionIndex
    } = useAssignmentPlayerStore();

    return (
        <div className={styles.sheetContainer}>
            <h3 className={styles.title}>答题卡</h3>
            <div className={styles.grid}>
                {questions.map((question, index) => (
                    <AnswerSheetItem
                        key={question.id}
                        index={index}
                        // 2. 判断当前题目是否是正在显示的题目
                        isCurrent={index === currentQuestionIndex}
                        // 3. 判断当前题目是否已有答案
                        isAnswered={userAnswers[question.id as number] !== undefined && userAnswers[question.id as number] !== null && userAnswers[question.id as number] !== ''}
                        // 4. 点击题号时，调用 action 更新当前题目索引
                        onClick={() => setCurrentQuestionIndex(index)}
                    />
                ))}
            </div>
        </div>
    );
};

export default AnswerSheet;
// [code focus end ++]