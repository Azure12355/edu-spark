// [!file src/features/teacher/course/course-management/sub-features/assignments-management/sub-features/assignment-player/components/AnswerSheet/AnswerSheetItem.tsx]
"use client";

import React from 'react';
import styles from './AnswerSheet.module.css';

interface AnswerSheetItemProps {
    index: number;
    isCurrent: boolean;
    isAnswered: boolean;
    isMarked?: boolean; // 未来可扩展
    onSelect: (index: number) => void;
}

const AnswerSheetItem: React.FC<AnswerSheetItemProps> = ({
                                                             index,
                                                             isCurrent,
                                                             isAnswered,
                                                             isMarked = false,
                                                             onSelect,
                                                         }) => {
    const classNames = [
        styles.answerItem,
        isCurrent ? styles.current : '',
        isAnswered ? styles.answered : '',
        isMarked ? styles.marked : '',
    ].join(' ');

    return (
        <button className={classNames} onClick={() => onSelect(index)}>
            {index + 1}
            {isMarked && <div className={styles.markIndicator}></div>}
        </button>
    );
};

export default AnswerSheetItem;