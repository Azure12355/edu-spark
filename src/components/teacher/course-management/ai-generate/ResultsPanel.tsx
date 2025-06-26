// src/components/teacher/course-management/ai-generate/ResultsPanel.tsx
"use client";
import React, { useMemo } from 'react';
import { AIGeneratedQuestion } from '@/lib/data/aiGeneratedQuestionsData';
import { QuestionType } from '@/lib/data/questionBankData';
import styles from './ResultsPanel.module.css';

// 导入新的子组件
import ResultsPanelHeader from './ResultsPanel/ResultsPanelHeader';
import StatsGrid from './ResultsPanel/StatsGrid';
import QuestionList from './ResultsPanel/QuestionList';

interface Props {
    questions: AIGeneratedQuestion[];
}

// 主题定义移到这里，因为它被多个子组件共享
const statThemes = {
    '单选题': { icon: 'fas fa-check-circle', colors: { iconBg: '#e0f2fe', text: '#0ea5e9', bgEnd: '#0ea5e9' } },
    '多选题': { icon: 'fas fa-check-double', colors: { iconBg: '#eef2ff', text: '#6366f1', bgEnd: '#6366f1' } },
    '判断题': { icon: 'fas fa-balance-scale', colors: { iconBg: '#fdf4ff', text: '#a855f7', bgEnd: '#a855f7' } },
    '填空题': { icon: 'fas fa-pencil-alt', colors: { iconBg: '#f0fdf4', text: '#22c55e', bgEnd: '#22c55e' } },
    '简答题': { icon: 'fas fa-align-left', colors: { iconBg: '#fffbeb', text: '#f59e0b', bgEnd: '#f59e0b' } },
    '编程题': { icon: 'fas fa-code', colors: { iconBg: '#f1f5f9', text: '#475569', bgEnd: '#475569' } },
    '总计': { icon: 'fas fa-sigma', colors: { iconBg: '#fef2f2', text: '#ef4444', bgEnd: '#ef4444' } },
};

const ResultsPanel: React.FC<Props> = ({ questions }) => {

    // 计算统计数据的逻辑保留在组装器中
    const { stats, total } = useMemo(() => {
        const calculatedStats: Record<QuestionType, number> = {
            '单选题': 0, '多选题': 0, '判断题': 0,
            '填空题': 0, '简答题': 0, '编程题': 0
        };
        for (const q of questions) {
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
                onClear={() => alert('清空题目')}
                onAddToBank={() => alert('加入题库')}
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