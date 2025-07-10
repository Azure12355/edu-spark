// src/components/student/component/leaderboard/RankingControls.tsx
"use client";
import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import styles from './RankingControls.module.css';
import type { RankingType, TimeRange } from '@/app/(home)/leaderboard/page';

interface RankingControlsProps {
    rankingType: RankingType;
    onRankingTypeChange: (type: RankingType) => void;
    timeRange: TimeRange;
    onTimeRangeChange: (range: TimeRange) => void;
    searchQuery: string;
    onSearchChange: (query: string) => void;
}

const rankingTypes: { id: RankingType; label: string }[] = [
    { id: 'comprehensive', label: '综合榜' },
    { id: 'creator', label: '创作榜' },
    { id: 'new', label: '新秀榜' },
];

const timeRanges: { id: TimeRange; label: string }[] = [
    { id: 'week', label: '本周' },
    { id: 'month', label: '本月' },
    { id: 'total', label: '总榜' },
];

const RankingControls: React.FC<RankingControlsProps> = ({
                                                             rankingType, onRankingTypeChange,
                                                             timeRange, onTimeRangeChange,
                                                             searchQuery, onSearchChange
                                                         }) => {
    return (
        <div className={styles.controlsContainer}>
            <div className={styles.leftControls}>
                <div className={styles.rankingTypeTabs}>
                    {rankingTypes.map(type => (
                        <button
                            key={type.id}
                            onClick={() => onRankingTypeChange(type.id)}
                            className={`${styles.tabButton} ${rankingType === type.id ? styles.active : ''}`}
                        >
                            {rankingType === type.id && (
                                <motion.div
                                    layoutId="rankingTypePill"
                                    className={styles.activePill}
                                    transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                                />
                            )}
                            <span className={styles.tabText}>{type.label}</span>
                        </button>
                    ))}
                </div>
                <div className={styles.timeRangeSelector}>
                    <i className="far fa-calendar-alt"></i>
                    <select value={timeRange} onChange={(e) => onTimeRangeChange(e.target.value as TimeRange)}>
                        {timeRanges.map(range => (
                            <option key={range.id} value={range.id}>{range.label}</option>
                        ))}
                    </select>
                </div>
            </div>
            <div className={styles.searchBar}>
                <i className="fas fa-search"></i>
                <input
                    type="text"
                    placeholder="搜索Agent或创作者..."
                    value={searchQuery}
                    onChange={(e) => onSearchChange(e.target.value)}
                />
            </div>
        </div>
    );
};

export default RankingControls;