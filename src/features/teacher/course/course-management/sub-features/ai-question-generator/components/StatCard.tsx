// src/components/teacher/course-management/ai-generate/StatCard.tsx
"use client";
import React from 'react';
import { motion } from 'framer-motion';
import styles from './StatCard.module.css';

// Props 接口保持不变
interface Props {
    label: string;
    value: number;
    icon: string;
    colors: {
        bgStart?: string; // bgStart/End is now optional
        bgEnd?: string;
        iconBg: string;
        text: string;
    };
}

const StatCard: React.FC<Props> = ({ label, value, icon, colors }) => {
    const cardStyle = {
        '--card-theme-bg': colors.iconBg,
        '--card-theme-color': colors.text,
    } as React.CSSProperties;

    // 动画变体保持不变
    const cardVariants = {
        hidden: { opacity: 0, y: 15 },
        visible: {
            opacity: 1, y: 0,
            transition: { type: 'spring', stiffness: 350, damping: 25 }
        }
    };

    return (
        <motion.div
            className={styles.statCard}
            style={cardStyle}
            variants={cardVariants}
            whileHover={{ scale: 1.05 }}
        >
            {/* 新的 JSX 结构 */}
            <div className={styles.content}>
                <div className={styles.iconWrapper}>
                    <i className={`${icon} ${styles.icon}`}></i>
                </div>
                <p className={styles.label}>{label}</p>
            </div>
            <p className={styles.value}>{value}</p>
        </motion.div>
    );
};
export default StatCard;