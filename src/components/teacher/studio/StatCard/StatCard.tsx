// src/components/teacher/studio/StatCard/StatCard.tsx
"use client";
import React from 'react';
import { motion } from 'framer-motion';
import styles from './StatCard.module.css';

interface StatCardProps {
    title: string;
    value: string;
    trendValue: string;
    trendDirection: 'up' | 'down';
    icon: string;
    iconColor: string;
    cardBgColor: string;
}

const StatCard: React.FC<StatCardProps> = ({
                                               title,
                                               value,
                                               trendValue,
                                               trendDirection,
                                               icon,
                                               iconColor,
                                               cardBgColor
                                           }) => {
    // 定义入场动画变体
    const cardVariants = {
        hidden: { opacity: 0, y: 20, scale: 0.98 },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: { type: 'spring', stiffness: 260, damping: 20 }
        }
    };

    return (
        <motion.div
            className={styles.card}
            style={{ '--card-bg-color': cardBgColor, '--icon-color': iconColor } as React.CSSProperties}
            variants={cardVariants}
        >
            <div className={styles.iconWrapper}>
                <i className={icon}></i>
            </div>
            <div className={styles.content}>
                <div className={styles.title}>{title}</div>
                <div className={styles.valueContainer}>
                    <span className={styles.value}>{value}</span>
                    <div className={`${styles.trend} ${styles[trendDirection]}`}>
                        <i className={`fas fa-arrow-${trendDirection}`}></i>
                        <span>{trendValue}</span>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default StatCard;