// src/app/student/(dashboard)/leaderboard/page.tsx
"use client";

import React, { useState, useMemo } from 'react';
import styles from './leaderboard.module.css';
import { agentData } from '@/lib/data/agentData'; // 导入我们更新后的数据
import RankingControls from '@/components/student/component/leaderboard/RankingControls/RankingControls';
import RankingList from '@/components/student/component/leaderboard/RankingList/RankingList';
import LeaderboardBanner from '@/components/student/component/leaderboard/LeaderboardBanner/LeaderboardBanner'; // 导入新 Banner
import type { Agent } from '@/lib/data/agentData';

export type RankingType = 'comprehensive' | 'creator' | 'new';
export type TimeRange = 'week' | 'month' | 'total';

export default function LeaderboardPage() {
    const [rankingType, setRankingType] = useState<RankingType>('comprehensive');
    const [timeRange, setTimeRange] = useState<TimeRange>('week');
    const [searchQuery, setSearchQuery] = useState('');

    const filteredAndSortedAgents = useMemo(() => {
        let processedData: Agent[] = [...agentData];

        if (searchQuery.trim()) {
            processedData = processedData.filter(agent =>
                agent.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                agent.creator.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        switch (rankingType) {
            case 'comprehensive':
                processedData.sort((a, b) => b.hotness - a.hotness);
                break;
            case 'creator':
                processedData.sort((a, b) => a.creator.localeCompare(b.creator));
                break;
            case 'new':
                processedData.sort((a, b) => b.id - a.id);
                break;
            default:
                break;
        }

        return processedData;
    }, [searchQuery, rankingType]);

    return (
        <div className={styles.leaderboardContainer}>
            {/* 使用新的 Banner 组件 */}
            <LeaderboardBanner />

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