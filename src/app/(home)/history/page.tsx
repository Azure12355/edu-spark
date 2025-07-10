"use client";
import React from 'react';
import styles from './history.module.css';
import HistoryBanner from '@/features/home/history/HistoryBanner/HistoryBanner';
import HistoryCard from '@/features/home/history/HistoryCard/HistoryCard';
import { historyData } from '@/shared/lib/data/historyData';

export default function HistoryPage() {
    return (
        <div className={styles.historyContainer}>
            {/* 顶部创意横幅 */}
            <HistoryBanner />

            {/* 对话历史卡片瀑布流 */}
            <div className={styles.historyGrid}>
                {historyData.map((history, index) => (
                    <HistoryCard key={history.id} history={history} index={index} />
                ))}
            </div>
        </div>
    );
}