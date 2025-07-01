"use client";
import React from 'react';
import styles from './UsageDonutChart.module.css';

interface UsageDonutChartProps {
    value: number;
    maxValue: number;
    label: string;
    color: string;
}

const UsageDonutChart: React.FC<UsageDonutChartProps> = ({ value, maxValue, label, color }) => {
    const radius = 50;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (value / maxValue) * circumference;

    return (
        <div className={styles.chartContainer}>
            <svg className={styles.chartSvg} width="160" height="160" viewBox="0 0 120 120">
                <circle
                    className={styles.track}
                    cx="60"
                    cy="60"
                    r={radius}
                />
                <circle
                    className={styles.progress}
                    cx="60"
                    cy="60"
                    r={radius}
                    stroke={color}
                    strokeDasharray={circumference}
                    strokeDashoffset={offset}
                />
            </svg>
            <div className={styles.centerText}>
                <div className={styles.totalValue}>{value.toLocaleString()}</div>
                <div className={styles.totalLabel}>{label}</div>
            </div>
        </div>
    );
};

export default UsageDonutChart;