// [!file src/features/teacher/course/course-management/sub-features/assignments-management/sub-features/assignment-player/components/AnswerSheet/AnswerSheet.tsx]
"use client";

import React from 'react';
import styles from './AnswerSheet.module.css';
import { AssignmentQuestionLinkVO } from '@/shared/types';
import AnswerSheetItem from './AnswerSheetItem';
import { QuestionTypeEnum } from '@/shared/types/enums/course/QuestionTypeEnum';

interface AnswerSheetProps {
    questions: AssignmentQuestionLinkVO[];
    answers: Record<number, any>;
    currentQuestionIndex: number;
    onQuestionSelect: (index: number) => void;
}

// 题目类型到简短文本的映射，用于答题卡分组
const typeGroupMap: { [key: string]: string } = {
    [QuestionTypeEnum.SINGLE_CHOICE]: '单选题',
    [QuestionTypeEnum.MULTIPLE_CHOICE]: '多选题',
    [QuestionTypeEnum.TRUE_FALSE]: '判断题',
    [QuestionTypeEnum.FILL_IN_THE_BLANK]: '填空题',
    [QuestionTypeEnum.SHORT_ANSWER]: '简答题',
    [QuestionTypeEnum.PROGRAMMING]: '编程题',
};

const AnswerSheet: React.FC<AnswerSheetProps> = ({
                                                     questions,
                                                     answers,
                                                     currentQuestionIndex,
                                                     onQuestionSelect,
                                                 }) => {

    // 按题目类型对题目进行分组
    const groupedQuestions: { [type: string]: { question: AssignmentQuestionLinkVO; originalIndex: number }[] } = {};
    questions.forEach((q, index) => {
        const typeKey = typeGroupMap[q.question.type] || '其他';
        if (!groupedQuestions[typeKey]) {
            groupedQuestions[typeKey] = [];
        }
        groupedQuestions[typeKey].push({ question: q, originalIndex: index });
    });

    return (
        <div className={styles.sheetContainer}>
            <h3 className={styles.title}>答题卡</h3>

            {Object.entries(groupedQuestions).map(([type, group]) => (
                <div key={type} className={styles.typeGroup}>
                    <h4 className={styles.groupTitle}>{type} (共 {group.length} 题)</h4>
                    <div className={styles.answerGrid}>
                        {group.map(({ question, originalIndex }) => (
                            <AnswerSheetItem
                                key={question.question.id}
                                index={originalIndex}
                                isCurrent={currentQuestionIndex === originalIndex}
                                isAnswered={answers.hasOwnProperty(question.question.id)}
                                onSelect={onQuestionSelect}
                            />
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default AnswerSheet;