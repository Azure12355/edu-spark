// src/components/teacher/studio/TopicRadarChart/TopicRadarChart.tsx
"use client";
import React from 'react';
import EChartsReactCore from '@/shared/components/ui/ECharts/EChartsReactCore';
import type { EChartsOption } from 'echarts';
import styles from './TopicRadarChart.module.css';

const TopicRadarChart = () => {
    const option: EChartsOption = {
        color: ['#1A237E', '#29B6F6', '#2196F3'],
        tooltip: { trigger: 'item' },
        legend: {
            data: ['纯文本', '图文类', '视频类'],
            right: 10,
            top: 10,
            orient: 'vertical',
            icon: 'circle'
        },
        radar: {
            indicator: [
                { name: '娱乐', max: 6500 }, { name: '体育', max: 16000 },
                { name: '财经', max: 30000 }, { name: '科技', max: 38000 },
                { name: '其他', max: 52000 }, { name: '国际', max: 25000 }
            ],
            shape: 'circle',
            center: ['45%', '55%'], // 微调中心点
            radius: '65%', // 调整大小
            splitArea: { areaStyle: { color: ['#FAFBFC', '#FFFFFF'], shadowBlur: 0 } },
            axisLine: { lineStyle: { color: '#F2F3F5' } },
            splitLine: { lineStyle: { color: '#F2F3F5' } }
        },
        series: [{
            name: '题材分布',
            type: 'radar',
            data: [
                { value: [4200, 3000, 20000, 35000, 50000, 18000], name: '纯文本', areaStyle: { opacity: 0.2 } },
                { value: [5000, 14000, 28000, 26000, 42000, 21000], name: '图文类', areaStyle: { opacity: 0.2 } },
                { value: [6000, 15000, 18000, 30000, 32000, 11000], name: '视频类', areaStyle: { opacity: 0.2 } }
            ]
        }]
    };

    return (
        <div className={styles.card}>
            <h3 className={styles.title}>内容题材分布</h3>
            <div className={styles.chartContainer}>
                <EChartsReactCore option={option} />
            </div>
        </div>
    );
};

export default TopicRadarChart;