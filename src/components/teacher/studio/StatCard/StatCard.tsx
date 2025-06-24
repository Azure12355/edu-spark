// src/components/teacher/studio/StatCard/StatCard.tsx
import React from 'react';
import styles from './StatCard.module.css';

interface StatCardProps {
    title: string;
    value: string;
    trendValue: string;
    trendDirection: 'up' | 'down';
    icon: string;
    iconColor: string;
    iconBgColor: string;
}

const StatCard: React.FC<StatCardProps> = ({
                                               title,
                                               value,
                                               trendValue,
                                               trendDirection,
                                               icon,
                                               iconColor,
                                               iconBgColor
                                           }) => {
    return (
        <div className={styles.card}>
            <div className={styles.content}>
                <div className={styles.title}>{title}</div>
                <div className={styles.value}>{value}</div>
                <div className={`${styles.trend} ${styles[trendDirection]}`}>
                    <i className={`fas fa-arrow-${trendDirection}`} style={{ fontSize: '12px' }}></i>
                    <span>{trendValue}</span>
                </div>
            </div>
            <div
                className={styles.iconWrapper}
                style={{
                    '--icon-color': iconColor,
                    '--icon-bg-color': iconBgColor
                } as React.CSSProperties}
            >
                <i className={icon}></i>
            </div>
        </div>
    );
};

export default StatCard;