// src/components/teacher/course-management/ai-generate/ConfigPanel/TypeSelector.tsx
"use client";
import React from 'react';
import { motion } from 'framer-motion';
import styles from './TypeSelector.module.css';
import { QuestionType } from '@/lib/data/questionBankData';

// 1. 定义与 StatCard 一致的主题数据结构
const typeThemes: Record<QuestionType, { icon: string; colors: { text: string; iconBg: string; } }> = {
    '单选题': { icon: 'fas fa-check-circle', colors: { text: '#0ea5e9', iconBg: '#e0f2fe' } },
    '多选题': { icon: 'fas fa-check-double', colors: { text: '#6366f1', iconBg: '#eef2ff' } },
    '判断题': { icon: 'fas fa-balance-scale', colors: { text: '#a855f7', iconBg: '#fdf4ff' } },
    '填空题': { icon: 'fas fa-pencil-alt', colors: { text: '#22c55e', iconBg: '#f0fdf4' } },
    '简答题': { icon: 'fas fa-align-left', colors: { text: '#f59e0b', iconBg: '#fffbeb' } },
    '编程题': { icon: 'fas fa-code', colors: { text: '#475569', iconBg: '#f1f5f9' } },
};

// 2. Props 接口保持不变
interface Props {
    selectedTypes: Set<QuestionType>;
    onTypeChange: (type: QuestionType) => void;
}

// 3. 定义动画变体
const gridVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.05,
        },
    },
};
const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
};


const TypeSelector: React.FC<Props> = ({ selectedTypes, onTypeChange }) => (
    <div className={styles.card}>
        <h3 className={styles.cardTitle}><span>*</span>题型：</h3>
        <motion.div
            className={styles.typeGrid}
            variants={gridVariants}
            initial="hidden"
            animate="visible"
        >
            {(Object.keys(typeThemes) as QuestionType[]).map(type => {
                const theme = typeThemes[type];
                const isChecked = selectedTypes.has(type);
                return (
                    <motion.label
                        key={type}
                        className={`${styles.typeLabel} ${isChecked ? styles.checked : ''}`}
                        variants={itemVariants}
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.98 }}
                        style={{
                            '--type-theme-color': theme.colors.text,
                            '--type-theme-bg': theme.colors.iconBg,
                        } as React.CSSProperties}
                    >
                        <input
                            type="checkbox"
                            className={styles.checkboxInput}
                            checked={isChecked}
                            onChange={() => onTypeChange(type)}
                        />
                        {/* 4. 使用新的 JSX 结构 */}
                        <div className={styles.typeIcon}>
                            <i className={theme.icon}></i>
                        </div>
                        <span className={styles.typeName}>{type}</span>
                        <div className={styles.checkBadge}>
                            <i className="fas fa-check"></i>
                        </div>
                    </motion.label>
                )
            })}
        </motion.div>
    </div>
);

export default TypeSelector;