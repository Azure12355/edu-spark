// [!file src/widgets/analytics/OverviewChart/OverviewChart.tsx]
"use client";
import React from 'react';
import EChartsReactCore from '@/shared/components/ui/ECharts/EChartsReactCore';
import type { EChartsOption } from 'echarts';
import styles from './OverviewChart.module.css';

const OverviewChart = () => {
    // [code focus start ++]
    // --- 核心修改：替换为学情分析相关的图表数据和配置 ---

    // 1. 定义与学情分析匹配的颜色主题
    const chartColors = {
        total: '#3b82f6',    // 总问题数 - 蓝色
        resolved: '#16a34a', // 已解决数 - 绿色
    };

    // 2. 模拟近12周的数据
    const weeks = Array.from({ length: 12 }, (_, i) => `第${i + 1}周`);
    const totalQuestionsData = [88, 95, 120, 110, 135, 150, 142, 160, 175, 165, 180, 205];
    const resolvedQuestionsData = [80, 88, 110, 105, 128, 140, 138, 155, 168, 160, 175, 200];

    const option: EChartsOption = {
        tooltip: {
            trigger: 'axis',
            axisPointer: { type: 'cross' },
            formatter: (params: any) => { // 自定义tooltip
                const week = params[0].name;
                const total = params[0].value;
                const resolved = params[1].value;
                const rate = total > 0 ? ((resolved / total) * 100).toFixed(1) : 0;
                return `
                    <strong>${week}</strong><br/>
                    <span style="color:${chartColors.total};">●</span> 总提问数: ${total}<br/>
                    <span style="color:${chartColors.resolved};">●</span> 已解决数: ${resolved}<br/>
                    <span style="color:#6b7280;">●</span> 问题解决率: <strong>${rate}%</strong>
                `;
            }
        },
        legend: {
            data: ['总提问数', '已解决数'],
            right: 20,
            top: 5,
            textStyle: { color: '#4E5969' }
        },
        grid: {
            left: '3%', right: '4%', bottom: '3%', containLabel: true
        },
        xAxis: [{
            type: 'category',
            boundaryGap: false,
            data: weeks,
            axisLine: { show: false },
            axisTick: { show: false },
            axisLabel: { color: '#86909C' }
        }],
        yAxis: [{
            type: 'value',
            name: '次数',
            axisLabel: { color: '#86909C' },
            splitLine: { lineStyle: { type: 'dashed', color: '#e5e6eb' } }
        }],
        series: [
            {
                name: '总提问数',
                type: 'line',
                smooth: true,
                symbol: 'none',
                sampling: 'lttb',
                lineStyle: { width: 3, color: chartColors.total },
                areaStyle: {
                    color: {
                        type: 'linear', x: 0, y: 0, x2: 0, y2: 1,
                        colorStops: [
                            { offset: 0, color: 'rgba(59, 130, 246, 0.2)' },
                            { offset: 1, color: 'rgba(59, 130, 246, 0)' }
                        ]
                    }
                },
                data: totalQuestionsData
            },
            {
                name: '已解决数',
                type: 'line',
                smooth: true,
                symbol: 'none',
                sampling: 'lttb',
                lineStyle: { width: 3, color: chartColors.resolved },
                areaStyle: {
                    color: {
                        type: 'linear', x: 0, y: 0, x2: 0, y2: 1,
                        colorStops: [
                            { offset: 0, color: 'rgba(22, 163, 74, 0.2)' },
                            { offset: 1, color: 'rgba(22, 163, 74, 0)' }
                        ]
                    }
                },
                data: resolvedQuestionsData
            }
        ]
    };
    // [code focus end ++]

    return (
        <div className={styles.card}>
            <div className={styles.header}>
                {/* [code focus start ++] */}
                <h3 className={styles.title}>学生问题解决率趋势 <span>(近12周)</span></h3>
                {/* [code focus end ++] */}
                <a href="#" className={styles.moreLink}>查看更多</a>
            </div>
            <div className={styles.chartContainer}>
                <EChartsReactCore option={option} />
            </div>
        </div>
    );
};

export default OverviewChart;