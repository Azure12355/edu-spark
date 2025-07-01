// src/components/teacher/studio/DataSummary/DataSummary.tsx
"use client";
import React from 'react';
import EChartsReactCore from '@/shared/components/ui/ECharts/EChartsReactCore';
import type { EChartsOption } from 'echarts';
import styles from './DataSummary.module.css';

const statItems = [
    { label: '内容生产量', value: '7,033', icon: 'fas fa-pen-nib', color: '#E1A229', bgColor: '#FFF7E8' },
    { label: '内容点击量', value: '5,187', icon: 'fas fa-mouse-pointer', color: '#16A34A', bgColor: '#E6FFFB' },
    { label: '内容曝光量', value: '2,173', icon: 'fas fa-heart', color: '#F53F3F', bgColor: '#FFF1F0' },
    { label: '活跃用户数', value: '2,393', icon: 'fas fa-user-friends', color: '#8B5CF6', bgColor: '#F5F3FF' },
];

const DataSummary = () => {
    const option: EChartsOption = {
        color: ['#3A84FF', '#FF7D00', '#00B42A', '#8B5CF6'],
        tooltip: {
            trigger: 'axis',
            axisPointer: { type: 'cross', label: { backgroundColor: '#6a7985' } },
        },
        legend: { show: false },
        grid: { left: '3%', right: '4%', bottom: '5%', top: '10%', containLabel: true },
        xAxis: [{
            type: 'category',
            boundaryGap: false,
            data: ['06-24', '06-23', '06-22', '06-21', '06-20', '06-19', '06-18', '06-17', '06-16', '06-15'],
            axisLine: { show: false },
            axisTick: { show: false },
            axisLabel: { color: '#86909C' }
        }],
        yAxis: [{
            type: 'value',
            axisLabel: { formatter: '{value}k', color: '#86909C' },
            splitLine: { lineStyle: { type: 'dashed', color: '#e5e6eb' } },
        }],
        series: [
            { name: '内容曝光量', type: 'line', smooth: true, symbol: 'circle', symbolSize: 8, data: [32, 28, 20, 25, 30, 38, 33, 35.67, 30, 32], areaStyle: { opacity: 0.1, color: '#3A84FF' } },
            { name: '内容点击量', type: 'line', smooth: true, symbol: 'circle', symbolSize: 8, data: [15, 20, 18, 16, 12, 14, 18, 14.07, 18, 16], areaStyle: { opacity: 0.1, color: '#FF7D00' } },
            { name: '内容生产量', type: 'line', smooth: true, symbol: 'circle', symbolSize: 8, data: [10, 8, 9, 7, 6, 8, 10, 7.56, 9, 10], areaStyle: { opacity: 0.1, color: '#00B42A' } },
            { name: '活跃用户数', type: 'line', smooth: true, symbol: 'circle', symbolSize: 8, data: [1, 2, 1.5, 2.5, 3, 2, 1, 1.54, 2, 3], areaStyle: { opacity: 0.1, color: '#8B5CF6' } },
        ]
    };

    return (
        <div className={styles.card}>
            <div className={styles.header}>
                <h3 className={styles.title}>数据总览</h3>
            </div>
            <div className={styles.statsGrid}>
                {statItems.map(item => (
                    <div key={item.label} className={styles.statItem}>
                        <div className={styles.iconWrapper} style={{ color: item.color, backgroundColor: item.bgColor }}>
                            <i className={item.icon}></i>
                        </div>
                        <div className={styles.data}>
                            <span className={styles.statLabel}>{item.label}</span>
                            <span className={styles.statValue}>{item.value}</span>
                        </div>
                    </div>
                ))}
            </div>
            <div className={styles.chartContainer}>
                <EChartsReactCore option={option} />
            </div>
        </div>
    );
};

export default DataSummary;