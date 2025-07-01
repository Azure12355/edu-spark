// src/components/teacher/studio/SourcePieCharts/SourcePieCharts.tsx
"use client";
import React from 'react';
import EChartsReactCore from '@/shared/components/ui/ECharts/EChartsReactCore';
import type { EChartsOption } from 'echarts';
import styles from './SourcePieCharts.module.css';

// 1. 定义共享的图例数据和颜色
const legendData = [
    { name: 'UGC原创', color: '#1d4cd4' },
    { name: '国外网站', color: '#36a3ff' },
    { name: '转载文章', color: '#8a73d1' },
    { name: '行业报告', color: '#36cfff' },
    { name: '其他', color: '#8de174' },
];
// 为了方便，我们创建一个颜色数组
const chartColors = legendData.map(item => item.color);


// 2. 创建一个可复用的函数来生成图表配置
const createPieOption = (title: string, data: { value: number; name: string }[]): EChartsOption => {
    return {
        color: chartColors,
        title: {
            text: title,
            left: 'center',
            top: 'center',
            textStyle: {
                fontSize: 16,
                fontWeight: "bold",
                color: '#4E5969'
            }
        },
        tooltip: {
            trigger: 'item',
            formatter: '{b}: {d}%'
        },
        series: [
            {
                name: '来源',
                type: 'pie',
                radius: ['65%', '85%'],
                avoidLabelOverlap: false,
                label: {
                    show: true,
                    position: 'outside',
                    formatter: '{d}%',
                    color: '#86909C',
                    fontSize: 13,
                },
                labelLine: {
                    show: true,
                    length: 10,
                    length2: 10,
                },
                emphasis: {
                    label: { show: false },
                    scaleSize: 5
                },
                data: data
            }
        ]
    };
};

// 3. 为每个饼图准备数据
const textData = [
    { value: 44, name: '转载文章' },
    { value: 23, name: '其他' },
    { value: 16, name: '国外网站' },
    { value: 14, name: 'UGC原创' },
    { value: 3, name: '行业报告' },
];
const imageData = [
    { value: 31, name: '转载文章' },
    { value: 27, name: '行业报告' },
    { value: 26, name: '国外网站' },
    { value: 8, name: 'UGC原创' },
    { value: 7, name: '其他' },
];
const videoData = [
    { value: 42, name: '转载文章' },
    { value: 24, name: '行业报告' },
    { value: 22, name: '其他' },
    { value: 8, name: '国外网站' },
    { value: 4, name: 'UGC原创' },
];


const SourcePieCharts = () => {
    return (
        <div className={styles.card}>
            <div className={styles.header}>
                <h3 className={styles.title}>内容发布来源</h3>
            </div>
            <div className={styles.chartGrid}>
                <div className={styles.chartWrapper}>
                    <EChartsReactCore option={createPieOption('纯文本', textData)} />
                </div>
                <div className={styles.chartWrapper}>
                    <EChartsReactCore option={createPieOption('图文类', imageData)} />
                </div>
                <div className={styles.chartWrapper}>
                    <EChartsReactCore option={createPieOption('视频类', videoData)} />
                </div>
            </div>
            <div className={styles.legendContainer}>
                {legendData.map(item => (
                    <div key={item.name} className={styles.legendItem}>
                        <div className={styles.legendColorBox} style={{ backgroundColor: item.color }} />
                        <span>{item.name}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SourcePieCharts;