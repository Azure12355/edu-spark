// src/components/teacher/course-management/ai-generate/ResultsPanel/StatsGrid.tsx
"use client";
import React from 'react';
import StatCard from '../StatCard'; // 引用上级的 StatCard 组件
import styles from './StatsGrid.module.css';
import { QuestionType } from '@/lib/data/questionBankData';

interface StatTheme {
    icon: string;
    colors: {
        bgStart?: string;
        bgEnd?: string;
        iconBg: string;
        text: string;
    };
}

interface Props {
    stats: Record<QuestionType, number>;
    total: number;
    themes: Record<string, StatTheme>;
}

const StatsGrid: React.FC<Props> = ({ stats, total, themes }) => {
    return (
        <div className={styles.statsGrid}>
            {Object.entries(stats).map(([label, value]) => {
                const theme = themes[label as keyof typeof themes] || themes['总计'];
                return (
                    <StatCard
                        key={label}
                        label={label}
                        value={value}
                        icon={theme.icon}
                        colors={theme.colors}
                    />
                );
            })}
        </div>
    );
};

export default StatsGrid;