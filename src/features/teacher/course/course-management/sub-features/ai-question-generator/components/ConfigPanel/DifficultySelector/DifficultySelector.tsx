// [!file src/features/teacher/course/course-management/sub-features/ai-question-generator/components/ConfigPanel/DifficultySelector/DifficultySelector.tsx]
"use client";

import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import styles from './DifficultySelector.module.css';
// 1. 导入枚举和文本映射，确保类型安全和UI文本一致
import { QuestionDifficultyEnum, QuestionDifficultyTextMap } from '@/shared/types';

// 2. 定义一个更通用的选项类型，使组件可复用
interface Option {
    value: QuestionDifficultyEnum;
    label: string;
}

// 3. 将难度选项定义为常量，并使用枚举值
const difficultyOptions: Option[] = [
    { value: QuestionDifficultyEnum.EASY, label: QuestionDifficultyTextMap.EASY.text },
    { value: QuestionDifficultyEnum.MEDIUM, label: QuestionDifficultyTextMap.MEDIUM.text },
    { value: QuestionDifficultyEnum.HARD, label: QuestionDifficultyTextMap.HARD.text },
];

// 4. 更新 Props 接口，使其成为一个完全受控的组件
interface DifficultySelectorProps {
    selectedValue: QuestionDifficultyEnum;
    onValueChange: (value: QuestionDifficultyEnum) => void;
}

const DifficultySelector: React.FC<DifficultySelectorProps> = ({ selectedValue, onValueChange }) => {
    // 5. 动画相关的内部状态保持不变，这属于组件自身的表现层逻辑
    const [pillStyle, setPillStyle] = useState({});
    const buttonRefs = useRef<(HTMLButtonElement | null)[]>([]);

    useEffect(() => {
        const activeIndex = difficultyOptions.findIndex(opt => opt.value === selectedValue);
        const activeButton = buttonRefs.current[activeIndex];
        if (activeButton) {
            setPillStyle({
                left: activeButton.offsetLeft,
                width: activeButton.offsetWidth,
            });
        }
    }, [selectedValue]);

    return (
        <div className={styles.card}>
            <h3 className={styles.cardTitle}><span>*</span>难度：</h3>
            <div className={styles.segmentedControl}>
                <motion.div
                    className={styles.activePill}
                    animate={pillStyle}
                    transition={{ type: "spring", stiffness: 400, damping: 35 }}
                />
                {difficultyOptions.map((option, index) => (
                    <button
                        key={option.value}
                        ref={(el) => { buttonRefs.current[index] = el; }}
                        // 6. onClick 调用 props 传来的回调函数
                        onClick={() => onValueChange(option.value)}
                        // 7. 判断 active 状态也基于 props
                        className={`${styles.controlButton} ${selectedValue === option.value ? styles.active : ''}`}
                    >
                        {option.label}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default DifficultySelector;