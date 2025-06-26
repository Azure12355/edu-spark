// src/components/teacher/course-management/ai-generate/ConfigPanel/TypeSelector.tsx
"use client";
import React from 'react';
import styles from './TypeSelector.module.css';
import { QuestionType } from '@/lib/data/questionBankData';

const questionTypes: QuestionType[] = ['单选题', '多选题', '判断题', '填空题', '简答题', '编程题'];

interface Props {
    selectedTypes: Set<QuestionType>;
    onTypeChange: (type: QuestionType) => void;
}

const TypeSelector: React.FC<Props> = ({ selectedTypes, onTypeChange }) => (
    <div className={styles.card}>
        <h3 className={styles.cardTitle}><span>*</span>题型：</h3>
        <div className={styles.checkboxGrid}>
            {questionTypes.map(type => (
                <label key={type} className={styles.checkboxLabel}>
                    <input
                        type="checkbox"
                        className={styles.checkboxInput}
                        checked={selectedTypes.has(type)}
                        onChange={() => onTypeChange(type)}
                    />
                    <span className={styles.checkboxVisual}>
                        <i className={`fas fa-check ${styles.icon}`}></i>
                    </span>
                    <span className={styles.checkboxText}>{type}</span>
                </label>
            ))}
        </div>
    </div>
);

export default TypeSelector;