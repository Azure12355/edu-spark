// [!file src/widgets/analytics/ContentTimeAnalysisChart/ContentTimeAnalysisChart.tsx]
"use client";
import React from 'react';
import EChartsReactCore from '@/shared/components/ui/ECharts/EChartsReactCore';
import type { EChartsOption } from 'echarts';
import styles from './ContentTimeAnalysisChart.module.css';

const ContentTimeAnalysisChart = () => {
    // [code focus start ++]
    // --- 核心修改：替换为学情分析相关的时段数据 ---

    // 1. 定义与教学场景匹配的颜色主题
    const chartColors = {
        qa: '#3b82f6',      // AI答疑 - 蓝色
        practice: '#16a34a', // 随堂练习 - 绿色
        knowledge: '#f97316',  // 知识点查看 - 橙色
    };

    // 2. 生成X轴的时间数据 (保持不变)
    const hours = Array.from({ length: 24 }, (_, i) => `${String(i).padStart(2, '0')}:00`);

    // 3. 设计符合学生学习行为模式的模拟数据
    const qaData =       [5, 2, 1, 0, 0, 1, 5, 10, 25, 40, 60, 55, 70, 85, 95, 80, 65, 50, 75, 90, 100, 85, 60, 30]; // 晚上是答疑高峰
    const practiceData = [2, 1, 0, 0, 0, 0, 8, 15, 30, 55, 70, 60, 40, 30, 45, 65, 80, 85, 90, 75, 60, 40, 20, 10]; // 练习集中在课后和晚上
    const knowledgeData= [8, 5, 2, 1, 1, 2, 10, 20, 45, 65, 80, 70, 75, 88, 92, 78, 70, 60, 80, 85, 90, 70, 50, 25]; // 知识点查看贯穿全天，上课和晚自习是高峰

    const option: EChartsOption = {
        tooltip: { trigger: 'axis' },
        color: [chartColors.qa, chartColors.practice, chartColors.knowledge],
        legend: {
            data: ['AI 问答次数', '随堂练习提交量', '知识点查看次数'],
            bottom: '8%',
            itemGap: 20,
            icon: 'circle',
            textStyle: { color: '#4E5969' }
        },
        grid: {
            left: '3%', right: '4%', top: '12%', bottom: '25%', containLabel: true
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: hours,
            axisLine: { show: false },
            axisTick: { show: false },
            axisLabel: { color: '#86909C', interval: (index: number) => index % 2 === 0 }
        },
        yAxis: {
            type: 'value',
            name: '活跃度指数', // 统一Y轴名称
            axisLabel: { formatter: '{value}', color: '#86909C' },
            splitLine: { lineStyle: { type: 'dashed', color: '#eef1f5' } }
        },
        dataZoom: [
            {
                type: 'slider',
                start: 0,
                end: 100,
                bottom: '2%',
                height: 20,
                backgroundColor: '#f7f9fc',
                borderColor: '#e5e7eb',
                dataBackground: {
                    lineStyle: { color: 'rgba(59, 130, 246, 0.3)' },
                    areaStyle: { color: {
                            type: 'linear', x: 0, y: 0, x2: 0, y2: 1,
                            colorStops: [{ offset: 0, color: 'rgba(59, 130, 246, 0.1)' }, { offset: 1, color: 'rgba(59, 130, 246, 0)' }]
                        }}
                },
                fillerColor: 'rgba(59, 130, 246, 0.15)',
                handleStyle: { color: '#fff', borderColor: '#3b82f6' },
                moveHandleStyle: { color: '#3b82f6' },
                handleIcon: 'M-2,0H2v10H-2z M-5,0H5v2H-5z M-5,10H5v2H-5z'
            }
        ],
        series: [
            {
                name: 'AI 问答次数',
                type: 'line',
                smooth: true,
                symbol: 'none',
                areaStyle: { opacity: 0.1 },
                data: qaData
            },
            {
                name: '随堂练习提交量',
                type: 'line',
                smooth: true,
                symbol: 'none',
                areaStyle: { opacity: 0.1 },
                data: practiceData
            },
            {
                name: '知识点查看次数',
                type: 'line',
                smooth: true,
                symbol: 'none',
                areaStyle: { opacity: 0.1 },
                data: knowledgeData
            }
        ]
    };
    // [code focus end ++]

    return (
        <div className={styles.card}>
            <div className={styles.header}>
                {/* [code focus start ++] */}
                <h3 className={styles.title}>学生学习行为时段分析</h3>
                {/* [code focus end ++] */}
            </div>
            <div className={styles.chartContainer}>
                <EChartsReactCore option={option} />
            </div>
        </div>
    );
};

export default ContentTimeAnalysisChart;