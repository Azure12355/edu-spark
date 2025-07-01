// src/components/teacher/studio/TodayStats/TodayStats.tsx
"use client";
import React from 'react';
import EChartsReactCore from '@/shared/components/ui/ECharts/EChartsReactCore';
import type { EChartsOption } from 'echarts';
import styles from './TodayStats.module.css';

const TodayStats = () => {
    const option: EChartsOption = {
        grid: { left: '10%', right: '10%', bottom: '10%', top: '10%', containLabel: true },
        xAxis: { type: 'value', splitLine: { show: false }, axisLabel: { formatter: '{value}k' } },
        yAxis: { type: 'category', data: ['分享量', '评论量', '点赞量'], axisTick: { show: false }, axisLine: { show: false } },
        series: [{
            type: 'bar',
            data: [1800, 6200, 4800],
            itemStyle: { color: '#3A84FF', borderRadius: 5 },
            barWidth: '20px',
            label: { show: false },
        }]
    };

    return (
        <div className={styles.card}>
            <h3 className={styles.title}>今日转赞评统计</h3>
            <div className={styles.chartContainer}>
                <EChartsReactCore option={option} />
            </div>
        </div>
    );
};

export default TodayStats;