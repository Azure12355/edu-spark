// [!file src/features/teacher/course/course-management/sub-features/ai-question-generator/components/ConfigPanel/TypeSelector/TypeSelector.tsx]
"use client";
import React from 'react';
import { motion } from 'framer-motion';
import styles from './TypeSelector.module.css';
import { QuestionTypeEnum, QuestionTypeTextMap } from '@/shared/types';

// 定义主题映射
const typeThemes: Record<string, { icon: string; colors: { text: string; iconBg: string; } }> = {
    [QuestionTypeEnum.SINGLE_CHOICE]: { icon: 'fas fa-check-circle', colors: { text: '#0ea5e9', iconBg: '#e0f2fe' } },
    [QuestionTypeEnum.MULTIPLE_CHOICE]: { icon: 'fas fa-check-double', colors: { text: '#6366f1', iconBg: '#eef2ff' } },
    [QuestionTypeEnum.TRUE_FALSE]: { icon: 'fas fa-balance-scale', colors: { text: '#a855f7', iconBg: '#fdf4ff' } },
    [QuestionTypeEnum.FILL_IN_THE_BLANK]: { icon: 'fas fa-pencil-alt', colors: { text: '#22c55e', iconBg: '#f0fdf4' } },
    [QuestionTypeEnum.SHORT_ANSWER]: { icon: 'fas fa-align-left', colors: { text: '#f59e0b', iconBg: '#fffbeb' } },
    [QuestionTypeEnum.PROGRAMMING]: { icon: 'fas fa-code', colors: { text: '#475569', iconBg: '#f1f5f9' } },
};

/* [code focus start] */
// 更新 Props 接口，改为接收单个选中值
interface TypeSelectorProps {
    selectedType: QuestionTypeEnum;
    onTypeChange: (type: QuestionTypeEnum) => void;
}
/* [code focus end] */

const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
};

// [!code focus start]
const TypeSelector: React.FC<TypeSelectorProps> = ({ selectedType, onTypeChange }) => (
// [!code focus end]
    <div className={styles.card}>
        <h3 className={styles.cardTitle}><span>*</span>题型：</h3>
        <motion.div
            className={styles.typeGrid}
            variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.05 } } }}
            initial="hidden"
            animate="visible"
        >
            {Object.values(QuestionTypeEnum).map(type => {
                const theme = typeThemes[type];
                // [!code focus start]
                const isChecked = selectedType === type;
                // [!code focus end]
                return (
                    <motion.label
                        key={type}
                        className={`${styles.typeLabel} ${isChecked ? styles.checked : ''}`}
                        variants={itemVariants}
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.98 }}
                        style={{ '--type-theme-color': theme.colors.text, '--type-theme-bg': theme.colors.iconBg } as React.CSSProperties}
                    >
                        {/* [code focus start] */}
                        <input
                            type="radio"
                            name="question-type-selector" // 确保所有 radio button 在同一组
                            className={styles.checkboxInput} // 样式可以复用
                            checked={isChecked}
                            onChange={() => onTypeChange(type)}
                        />
                        {/* [code focus end] */}
                        <div className={styles.typeIcon}><i className={theme.icon}></i></div>
                        <span className={styles.typeName}>{QuestionTypeTextMap[type]}</span>
                        <div className={styles.checkBadge}><i className="fas fa-check"></i></div>
                    </motion.label>
                );
            })}
        </motion.div>
    </div>
);

export default TypeSelector;