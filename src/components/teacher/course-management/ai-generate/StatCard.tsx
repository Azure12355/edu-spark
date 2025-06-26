// src/components/teacher/course-management/ai-generate/StatCard.tsx
import React from 'react';
import styles from './StatCard.module.css';
interface Props { label: string; value: number; }
const StatCard: React.FC<Props> = ({ label, value }) => (
    <div className={styles.statCard}>
        <div className={styles.label}>{label}</div>
        <div className={styles.value}>{value}</div>
    </div>
);
export default StatCard;