// src/components/teacher/studio/OverviewChart/OverviewChart.tsx
"use client";
import React from 'react';
import EChartsReactCore from '@/components/common/ECharts/EChartsReactCore';
import type { EChartsOption } from 'echarts';
import styles from './OverviewChart.module.css';

const OverviewChart = () => {
    const option: EChartsOption = {
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross',
                label: {
                    backgroundColor: '#6a7985'
                }
            }
        },
        grid: {
            left: '20px',
            right: '20px',
            bottom: '20px',
            containLabel: true
        },
        xAxis: [
            {
                type: 'category',
                boundaryGap: false,
                data: ['2025-1', '2025-2', '2025-3', '2025-4', '2025-5', '2025-6', '2025-7', '2025-8', '2025-9', '2025-10', '2025-11', '2025-12'],
                axisLine: { show: false },
                axisTick: { show: false },
                axisLabel: { color: '#86909C' }
            }
        ],
        yAxis: [
            {
                type: 'value',
                axisLabel: {
                    formatter: '{value}k',
                    color: '#86909C'
                },
                splitLine: {
                    lineStyle: {
                        type: 'dashed',
                        color: '#e5e6eb'
                    }
                }
            }
        ],
        series: [
            {
                name: '内容数据',
                type: 'line',
                smooth: true,
                symbol: 'none',
                sampling: 'lttb',
                lineStyle: {
                    width: 3,
                    color: {
                        type: 'linear',
                        x: 0, y: 0, x2: 1, y2: 0,
                        colorStops: [
                            { offset: 0, color: '#29B6F6' }, // Light Blue
                            { offset: 0.5, color: '#8E24AA' }, // Purple
                            { offset: 1, color: '#29B6F6' }  // Light Blue
                        ]
                    }
                },
                areaStyle: {
                    color: {
                        type: 'linear',
                        x: 0, y: 0, x2: 0, y2: 1,
                        colorStops: [
                            { offset: 0, color: 'rgba(41, 182, 246, 0.2)' },
                            { offset: 0.5, color: 'rgba(142, 36, 170, 0.1)' },
                            { offset: 1, color: 'rgba(41, 182, 246, 0)' }
                        ]
                    }
                },
                data: [42, 38, 28, 72, 68, 29, 45, 52, 65, 70, 42, 60]
            }
        ]
    };

    return (
        <div className={styles.card}>
            <div className={styles.header}>
                <h3 className={styles.title}>内容数据 <span>(近1年)</span></h3>
                <a href="#" className={styles.moreLink}>查看更多</a>
            </div>
            <div className={styles.chartContainer}>
                <EChartsReactCore option={option} />
            </div>
        </div>
    );
};

export default OverviewChart;