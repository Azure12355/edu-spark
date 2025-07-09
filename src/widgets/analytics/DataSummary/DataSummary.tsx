// [!file src/widgets/analytics/DataSummary/DataSummary.tsx]
"use client";
import React from 'react';
import EChartsReactCore from '@/shared/components/ui/ECharts/EChartsReactCore';
import type { EChartsOption } from 'echarts';
import styles from './DataSummary.module.css';

// [code focus start ++]
// --- 核心修改：替换为学情分析相关的统计项 ---
const statItems = [
    { label: '累计提交作业(人次)', value: '3,502', icon: 'fas fa-file-signature', color: '#2F7BFF', bgColor: '#EAF2FF' },
    { label: '平均答题正确率', value: '88.6%', icon: 'fas fa-check-double', color: '#16A34A', bgColor: '#E6FFFB' },
    { label: '累计AI答疑次数', value: '12,834', icon: 'fas fa-comments', color: '#F59E0B', bgColor: '#FFF7E8' },
    { label: '知识点平均掌握度', value: '82.5', icon: 'fas fa-brain', color: '#8B5CF6', bgColor: '#F5F3FF' },
];

const DataSummary = () => {
    // --- 核心修改：替换为学情分析相关的图表数据 ---
    const option: EChartsOption = {
        color: ['#2F7BFF', '#16A34A', '#F59E0B', '#8B5CF6'], // 更新颜色以匹配统计卡片
        tooltip: {
            trigger: 'axis',
            axisPointer: { type: 'cross', label: { backgroundColor: '#6a7985' } },
        },
        legend: {
            data: ['提交人次', '平均正确率', 'AI答疑次数', '知识点掌握度'],
            bottom: 0,
            textStyle: { color: '#4E5969' }
        },
        grid: { left: '3%', right: '4%', bottom: '12%', top: '15%', containLabel: true },
        xAxis: [{
            type: 'category',
            boundaryGap: false,
            data: ['第1周', '第2周', '第3周', '第4周', '第5周', '第6周', '第7周', '第8周', '第9周', '第10周'],
            axisLine: { show: false },
            axisTick: { show: false },
            axisLabel: { color: '#86909C' }
        }],
        yAxis: [
            { // Y轴1: 用于次数 (提交人次, AI答疑次数)
                type: 'value',
                name: '次数',
                axisLabel: { formatter: '{value}', color: '#86909C' },
                splitLine: { lineStyle: { type: 'dashed', color: '#e5e6eb' } },
            },
            { // Y轴2: 用于百分比或分数 (正确率, 掌握度)
                type: 'value',
                name: '得分/百分比(%)',
                min: 0,
                max: 100,
                axisLabel: { formatter: '{value}', color: '#86909C' },
                splitLine: { show: false }, // 避免与左侧Y轴的分割线重叠
            }
        ],
        series: [
            {
                name: '提交人次',
                type: 'bar', // 改为柱状图以区分
                yAxisIndex: 0, // 使用左侧Y轴
                data: [120, 132, 101, 134, 90, 230, 210, 180, 190, 220],
                itemStyle: { color: '#2F7BFF', opacity: 0.8 },
                barWidth: '10px'
            },
            {
                name: 'AI答疑次数',
                type: 'bar',
                yAxisIndex: 0,
                data: [220, 182, 191, 234, 290, 330, 310, 280, 300, 350],
                itemStyle: { color: '#F59E0B', opacity: 0.8 },
                barWidth: '10px'
            },
            {
                name: '平均正确率',
                type: 'line',
                yAxisIndex: 1, // 使用右侧Y轴
                smooth: true,
                symbol: 'circle',
                symbolSize: 8,
                data: [82, 85, 83, 88, 86, 90, 92, 89, 91, 93],
                itemStyle: { color: '#16A34A' }
            },
            {
                name: '知识点掌握度',
                type: 'line',
                yAxisIndex: 1,
                smooth: true,
                symbol: 'circle',
                symbolSize: 8,
                data: [78, 81, 79, 84, 83, 87, 89, 88, 90, 92],
                itemStyle: { color: '#8B5CF6' }
            },
        ]
    };
    // [code focus end ++]

    return (
        <div className={styles.card}>
            <div className={styles.header}>
                {/* [code focus start ++] */}
                <h3 className={styles.title}>学情数据总览</h3>
                {/* [code focus end ++] */}
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