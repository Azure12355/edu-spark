// src/features/teacher/course/course-management/sub-features/ai-question-generator/components/StatCard.tsx
"use client";
import React from 'react';
import { motion } from 'framer-motion';
import styles from './StatCard.module.css';

// 1. 定义一个清晰的、自包含的 Prop 类型
export interface StatCardData {
    label: string;
    value: number;
    icon: string;
    theme: {
        textColor: string;
        bgColor: string;
    };
}

interface StatCardProps {
    data: StatCardData;
}

// 2. 动画变体保持不变
const cardVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
        opacity: 1, y: 0,
        transition: { type: 'spring', stiffness: 350, damping: 25 }
    }
};

const StatCard: React.FC<StatCardProps> = ({ data }) => {
    // 3. 使用 CSS 变量来动态设置主题色，代码更简洁
    const cardStyle = {
        '--card-theme-color': data.theme.textColor,
        '--card-theme-bg': data.theme.bgColor,
    } as React.CSSProperties;

    return (
        <motion.div
            className={styles.statCard}
            style={cardStyle}
            variants={cardVariants}
            whileHover={{ scale: 1.05 }}
        >
            <div className={styles.content}>
                <div className={styles.iconWrapper}>
                    <i className={`${data.icon} ${styles.icon}`}></i>
                </div>
                <p className={styles.label}>{data.label}</p>
            </div>
            <p className={styles.value}>{data.value}</p>
        </motion.div>
    );
};
export default StatCard;