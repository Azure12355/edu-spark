// [!file src/features/teacher/course/course-management/sub-features/ai-question-generator/components/ResultPanel/StatsGrid/StatsGrid.tsx]
"use client";
import React, { useMemo } from 'react';
import StatCard, { StatCardData } from './StatCard';
import styles from './StatsGrid.module.css';
import { QuestionTypeEnum, QuestionTypeTextMap } from '@/shared/types';
// [!code focus start]
import { useAIGeneratedQuestionsStore } from '../../../store/aiGeneratedQuestionsStore';
// [!code focus end]

// 主题常量，保持不变
const statThemes: Record<string, { icon: string; colors: { iconBg: string; text: string; } }> = {
    [QuestionTypeEnum.SINGLE_CHOICE]: { icon: 'fas fa-check-circle', colors: { iconBg: '#e0f2fe', text: '#0ea5e9' } },
    [QuestionTypeEnum.MULTIPLE_CHOICE]: { icon: 'fas fa-check-double', colors: { iconBg: '#eef2ff', text: '#6366f1' } },
    [QuestionTypeEnum.TRUE_FALSE]: { icon: 'fas fa-balance-scale', colors: { iconBg: '#fdf4ff', text: '#a855f7' } },
    [QuestionTypeEnum.FILL_IN_THE_BLANK]: { icon: 'fas fa-pencil-alt', colors: { iconBg: '#f0fdf4', text: '#22c55e' } },
    [QuestionTypeEnum.SHORT_ANSWER]: { icon: 'fas fa-align-left', colors: { iconBg: '#fffbeb', text: '#f59e0b' } },
    [QuestionTypeEnum.PROGRAMMING]: { icon: 'fas fa-code', colors: { iconBg: '#f1f5f9', text: '#475569' } },
    '总计': { icon: 'fas fa-sigma', colors: { iconBg: '#fef2f2', text: '#ef4444' } },
};

// [!code focus start]
// 1. 移除所有 Props
const StatsGrid: React.FC = () => {
    // 2. 直接从 Store 中订阅 questions 列表
    const questions = useAIGeneratedQuestionsStore((state) => state.questions);

    // 3. 将统计计算逻辑内聚到组件内部
    const statCardsData = useMemo((): StatCardData[] => {
        const stats = Object.fromEntries(
            Object.values(QuestionTypeEnum).map(type => [type, 0])
        ) as Record<QuestionTypeEnum, number>;

        for (const q of questions) {
            if (q.type in stats) {
                stats[q.type as QuestionTypeEnum]++;
            }
        }

        const statsWithLabels = Object.entries(stats).map(([type, value]) => ({
            label: QuestionTypeTextMap[type as QuestionTypeEnum] || type,
            value,
            type: type as QuestionTypeEnum,
        }));

        const transformedCards: StatCardData[] = statsWithLabels.map(stat => {
            const theme = statThemes[stat.type as keyof typeof statThemes] || statThemes['总计'];
            return {
                label: stat.label,
                value: stat.value,
                icon: theme.icon,
                theme: {
                    textColor: theme.colors.text,
                    bgColor: theme.colors.iconBg,
                }
            };
        });

        // 将“总计”卡片添加到数组开头
        const totalTheme = statThemes['总计'];
        transformedCards.unshift({
            label: '总计',
            value: questions.length,
            icon: totalTheme.icon,
            theme: {
                textColor: totalTheme.colors.text,
                bgColor: totalTheme.colors.iconBg,
            }
        });

        return transformedCards;
    }, [questions]); // 依赖项只有 questions

    // 如果没有题目，不渲染统计区域
    if (questions.length === 0) {
        return null;
    }
// [!code focus end]

    return (
        <div className={styles.statsGrid}>
            {/* 4. 直接遍历计算好的 statCardsData */}
            {statCardsData.map((cardData) => (
                <StatCard key={cardData.label} data={cardData} />
            ))}
        </div>
    );
};

export default StatsGrid;