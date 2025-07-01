// src/components/teacher/course-management/ai-generate/ConfigPanel/DifficultySelector.tsx
"use client";
import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import styles from './DifficultySelector.module.css';
import { QuestionDifficulty } from '@/shared/lib/data/questionBankData';

const difficulties: QuestionDifficulty[] = ['简单', '中等', '困难'];

interface Props {
    selectedDifficulty: QuestionDifficulty;
    onDifficultyChange: (difficulty: QuestionDifficulty) => void;
}

const DifficultySelector: React.FC<Props> = ({ selectedDifficulty, onDifficultyChange }) => {
    const [pillStyle, setPillStyle] = useState({});
    const buttonRefs = useRef<(HTMLButtonElement | null)[]>([]);

    useEffect(() => {
        const activeIndex = difficulties.indexOf(selectedDifficulty);
        const activeButton = buttonRefs.current[activeIndex];
        if (activeButton) {
            setPillStyle({
                left: activeButton.offsetLeft,
                width: activeButton.offsetWidth,
            });
        }
    }, [selectedDifficulty]);

    return (
        <div className={styles.card}>
            <h3 className={styles.cardTitle}><span>*</span>难度：</h3>
            <div className={styles.segmentedControl}>
                <motion.div
                    className={styles.activePill}
                    animate={pillStyle}
                    transition={{ type: "spring", stiffness: 400, damping: 35 }}
                />
                {difficulties.map((d, index) => (
                    <button
                        key={d}
                        ref={(el: any) => buttonRefs.current[index] = el}
                        onClick={() => onDifficultyChange(d)}
                        className={`${styles.controlButton} ${selectedDifficulty === d ? styles.active : ''}`}
                    >
                        {d}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default DifficultySelector;