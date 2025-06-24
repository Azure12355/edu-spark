// src/components/teacher/studio/DataTrendChart/DataTrendChart.tsx
"use client";
import React from 'react';
import EChartsReactCore from '@/components/common/ECharts/EChartsReactCore';
import type { EChartsOption } from 'echarts';
import styles from './DataTrendChart.module.css';

const DataTrendChart = () => {
    const colors = ['#2196F3', '#ebd44d', '#69d06d', '#855cd1'];
    const option: EChartsOption = {
        color: colors,
        tooltip: {
            trigger: 'axis',
            axisPointer: { type: 'cross' },
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            borderColor: '#e5e7eb',
            borderWidth: 1,
            textStyle: { color: '#1f2937' },
            padding: 15,
            extraCssText: 'box-shadow: 0 4px 12px rgba(0,0,0,0.1); border-radius: 8px;'
        },
        grid: { top: '10%', left: '3%', right: '4%', bottom: '3%', containLabel: true },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: ['06-24', '06-23', '06-22', '06-21', '06-20', '06-19', '06-18', '06-17', '06-16', '06-15'],
            axisLine: { show: false },
            axisTick: { show: false },
        },
        yAxis: {
            type: 'value',
            axisLabel: { formatter: '{value} k' },
            splitLine: { lineStyle: { type: 'dashed' } }
        },
        series: [
            { name: '内容曝光量', type: 'line', smooth: true, data: [32, 28, 20, 35, 30, 28, 25, 36, 30, 31], areaStyle: { opacity: 0.1 } },
            { name: '内容点击量', type: 'line', smooth: true, data: [15, 20, 21, 18, 16, 15, 12, 14, 19, 18], areaStyle: { opacity: 0.1 } },
            { name: '内容生产量', type: 'line', smooth: true, data: [10, 8, 9, 6, 7, 8, 9, 8, 10, 9], areaStyle: { opacity: 0.1 } },
            { name: '活跃用户数', type: 'line', smooth: true, data: [1, 2, 1, 3, 2, 1, 2, 1.5, 3, 4], areaStyle: { opacity: 0.1 } },
        ]
    };
    return (
        <div className={styles.chartContainer}>
            <EChartsReactCore option={option} />
        </div>
    );
};

export default DataTrendChart;