// src/components/teacher/course-management/ai-generate/StatCard.tsx
"use client";
import React from 'react';
import { motion } from 'framer-motion';
import styles from './StatCard.module.css';

// 定义更丰富的 Props 接口
interface Props {
    label: string;
    value: number;
    icon: string; // Font Awesome icon class
    colors: {
        bgStart: string;
        bgEnd: string;
        iconBg: string;
        text: string;
    };
}

const StatCard: React.FC<Props> = ({ label, value, icon, colors }) => {
    // 定义 CSS 变量
    const cardStyle = {
        '--card-bg-start': colors.bgStart,
        '--card-bg-end': colors.bgEnd,
        '--card-icon-bg': colors.iconBg,
        '--card-text-color': colors.text,
    } as React.CSSProperties;

    // Framer Motion 动画变体
    const cardVariants = {
        hidden: { opacity: 0, y: 20, scale: 0.95 },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: { type: 'spring', stiffness: 300, damping: 20 }
        }
    };

    return (
        <motion.div
            className={styles.statCard}
            style={cardStyle}
            variants={cardVariants}
        >
            <div className={styles.iconWrapper}>
                <i className={`${icon} ${styles.icon}`}></i>
            </div>
            <div className={styles.content}>
                <p className={styles.label}>{label}</p>
                <p className={styles.value}>{value}</p>
            </div>
            <i className={`${icon} ${styles.backgroundPattern}`}></i>
        </motion.div>
    );
};
export default StatCard;