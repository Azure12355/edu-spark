// [!file src/widgets/analytics/TodayStats/TodayStats.tsx]
"use client";
import React from 'react';
import EChartsReactCore from '@/shared/components/ui/ECharts/EChartsReactCore';
import type { EChartsOption } from 'echarts';
import styles from './TodayStats.module.css';

const TodayStats = () => {
    // [code focus start ++]
    // --- 核心修改：替换为学情分析相关数据 ---
    const option: EChartsOption = {
        grid: { left: '15%', right: '15%', bottom: '10%', top: '10%', containLabel: true },
        xAxis: {
            type: 'value',
            splitLine: { show: false },
            axisLabel: {
                formatter: '{value}', // 直接显示数值，因为单位不同
                color: '#86909C',
                fontSize: 12
            }
        },
        yAxis: {
            type: 'category',
            data: ['新增题目', '学生答疑', '作业批改'],
            axisTick: { show: false },
            axisLine: { show: false },
            axisLabel: {
                color: '#4E5969',
                fontSize: 14,
                fontWeight: 500
            }
        },
        series: [{
            type: 'bar',
            data: [
                { value: 25, name: '新增题目', itemStyle: { color: '#3b82f6' } }, // 蓝色
                { value: 88, name: '学生答疑', itemStyle: { color: '#22c55e' } }, // 绿色
                { value: 42, name: '作业批改', itemStyle: { color: '#f97316' } }, // 橙色
            ],
            // 为每个条形图设置不同的颜色
            itemStyle: {
                borderRadius: 5,
            },
            barWidth: '20px',
            label: {
                show: true,
                position: 'right', // 标签显示在条形图右侧
                color: '#1D2129',
                fontSize: 14,
                fontWeight: 'bold',
                formatter: '{c} 次' // 格式化标签内容
            },
        }]
    };
    // [code focus end ++]

    return (
        <div className={styles.card}>
            {/* [code focus start ++] */}
            <h3 className={styles.title}>今日教学活动统计</h3>
            {/* [code focus end ++] */}
            <div className={styles.chartContainer}>
                <EChartsReactCore option={option} />
            </div>
        </div>
    );
};

export default TodayStats;