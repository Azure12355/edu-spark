// src/components/teacher/course-management/ai-generate/ResultsPanel.tsx
"use client";
import React, { useMemo } from 'react';
// 核心修改 1：从新的类型和枚举文件中导入
import { AIGeneratedQuestion } from '@/types/question';
import { QuestionType } from '@/constants/enums';
import styles from './ResultsPanel.module.css';

// 导入新的子组件
import ResultsPanelHeader from './ResultsPanel/ResultsPanelHeader';
import StatsGrid from './ResultsPanel/StatsGrid';
import QuestionList from './ResultsPanel/QuestionList';

interface Props {
    questions: AIGeneratedQuestion[];
}

// 核心修改 2：statThemes 的键现在与 QuestionType 枚举值完全对应，增强了类型安全
const statThemes: Record<QuestionType | '总计', { icon: string; colors: { iconBg: string; text: string; bgEnd: string; } }> = {
    [QuestionType.SINGLE_CHOICE]: { icon: 'fas fa-check-circle', colors: { iconBg: '#e0f2fe', text: '#0ea5e9', bgEnd: '#0ea5e9' } },
    [QuestionType.MULTIPLE_CHOICE]: { icon: 'fas fa-check-double', colors: { iconBg: '#eef2ff', text: '#6366f1', bgEnd: '#6366f1' } },
    [QuestionType.TRUE_FALSE]: { icon: 'fas fa-balance-scale', colors: { iconBg: '#fdf4ff', text: '#a855f7', bgEnd: '#a855f7' } },
    [QuestionType.FILL_IN_THE_BLANK]: { icon: 'fas fa-pencil-alt', colors: { iconBg: '#f0fdf4', text: '#22c55e', bgEnd: '#22c55e' } },
    [QuestionType.SHORT_ANSWER]: { icon: 'fas fa-align-left', colors: { iconBg: '#fffbeb', text: '#f59e0b', bgEnd: '#f59e0b' } },
    [QuestionType.PROGRAMMING]: { icon: 'fas fa-code', colors: { iconBg: '#f1f5f9', text: '#475569', bgEnd: '#475569' } },
    '总计': { icon: 'fas fa-sigma', colors: { iconBg: '#fef2f2', text: '#ef4444', bgEnd: '#ef4444' } },
};

const ResultsPanel: React.FC<Props> = ({ questions }) => {
    const { stats, total } = useMemo(() => {
        // 核心修改 3：使用 Object.fromEntries 和枚举来初始化统计对象，更具鲁棒性
        const calculatedStats = Object.fromEntries(
            Object.values(QuestionType).map(type => [type, 0])
        ) as Record<QuestionType, number>;

        for (const q of questions) {
            // q.type 就是枚举值，可以直接作为 key
            if (q.type in calculatedStats) {
                calculatedStats[q.type]++;
            }
        }
        return { stats: calculatedStats, total: questions.length };
    }, [questions]);

    return (
        <div className={styles.panel}>
            <ResultsPanelHeader
                total={total}
            />
            <StatsGrid
                stats={stats}
                total={total}
                themes={statThemes}
            />
            <QuestionList
                questions={questions}
                themes={statThemes}
            />
        </div>
    );
};

export default ResultsPanel;