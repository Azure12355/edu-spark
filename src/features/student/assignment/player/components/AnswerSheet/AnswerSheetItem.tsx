// [!file src/features/student/assignment/player/components/AnswerSheet/AnswerSheetItem.tsx]
// [code focus start ++]
"use client";

import React from 'react';
import styles from './AnswerSheetItem.module.css';

interface ItemProps {
    index: number;
    isCurrent: boolean;
    isAnswered: boolean;
    onClick: () => void;
}

const AnswerSheetItem: React.FC<ItemProps> = ({ index, isCurrent, isAnswered, onClick }) => {
    // 动态组合 CSS class
    const classes = [
        styles.item,
        isCurrent ? styles.current : '',
        isAnswered ? styles.answered : ''
    ].join(' ').trim(); // 使用 join 和 trim 确保 classname 格式正确

    return (
        <button className={classes} onClick={onClick}>
            {index + 1}
        </button>
    );
};

export default AnswerSheetItem;
// [code focus end ++]