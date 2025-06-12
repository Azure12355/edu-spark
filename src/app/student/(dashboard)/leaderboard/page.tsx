// src/app/student/(dashboard)/leaderboard/page.tsx
"use client";

import React, { useState, useMemo } from 'react';
import styles from './leaderboard.module.css';
import { agentData } from '@/lib/data/agentData'; // 导入我们更新后的数据
import RankingControls from '@/components/student/component/leaderboard/RankingControls';
import RankingList from '@/components/student/component/leaderboard/RankingList';
import type { Agent } from '@/lib/data/agentData';

export type RankingType = 'comprehensive' | 'creator' | 'new';
export type TimeRange = 'week' | 'month' | 'total';

export default function LeaderboardPage() {
    const [rankingType, setRankingType] = useState<RankingType>('comprehensive');
    const [timeRange, setTimeRange] = useState<TimeRange>('week');
    const [searchQuery, setSearchQuery] = useState('');

    // 使用 useMemo 进行性能优化，当依赖项变化时才重新计算
    const filteredAndSortedAgents = useMemo(() => {
        let processedData: Agent[] = [...agentData];

        // 1. 根据搜索查询进行过滤
        if (searchQuery.trim()) {
            processedData = processedData.filter(agent =>
                agent.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                agent.creator.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        // 2. 根据榜单类型进行排序
        switch (rankingType) {
            case 'comprehensive':
                // 综合榜：主要按热度排序
                processedData.sort((a, b) => b.hotness - a.hotness);
                break;
            case 'creator':
                // 创作榜：假设按创建者字母顺序排序（实际可换成更复杂逻辑）
                processedData.sort((a, b) => a.creator.localeCompare(b.creator));
                break;
            case 'new':
                // 新秀榜：按ID倒序，模拟新创建的在前
                processedData.sort((a, b) => b.id - a.id);
                break;
            default:
                break;
        }

        return processedData;
    }, [searchQuery, rankingType]);

    return (
        <div className={styles.leaderboardContainer}>
            <header className={styles.pageHeader}>
                <h1><i className="fas fa-trophy"></i> Agent 排行榜</h1>
                <p>发现最受欢迎、最具创新性的学习智能体</p>
            </header>
            <RankingControls
                rankingType={rankingType}
                onRankingTypeChange={setRankingType}
                timeRange={timeRange}
                onTimeRangeChange={setTimeRange}
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
            />
            <RankingList agents={filteredAndSortedAgents} />
        </div>
    );
}