// src/components/teacher/studio/ContentTimeAnalysisChart/ContentTimeAnalysisChart.tsx
"use client";
import React from 'react';
import EChartsReactCore from '@/components/common/ECharts/EChartsReactCore';
import type { EChartsOption } from 'echarts';
import styles from './ContentTimeAnalysisChart.module.css';

const ContentTimeAnalysisChart = () => {
    // 1. 定义与设计稿一致的颜色主题
    const chartColors = {
        text: '#29B6F6',      // 纯文本 - 亮蓝
        video: '#1A237E',     // 视频类 - 深蓝
        image: '#2196F3',     // 图文类 - 中蓝
    };

    // 生成X轴的时间数据
    const hours = Array.from({ length: 24 }, (_, i) => `${String(i).padStart(2, '0')}:00`);

    const option: EChartsOption = {
        // 2. 配置提示框和颜色
        tooltip: { trigger: 'axis' },
        color: [chartColors.text, chartColors.video, chartColors.image],

        // 3. 配置图例
        legend: {
            data: ['纯文本', '视频类', '图文类'],
            bottom: '8%', // 调整图例位置，使其在 dataZoom 上方
            itemGap: 20,
            icon: 'circle',
            textStyle: { color: '#4E5969' }
        },

        // 4. 配置网格，为 dataZoom 和图例留出足够空间
        grid: {
            left: '3%',
            right: '4%',
            top: '12%',
            bottom: '25%', // 底部留出更多空间
            containLabel: true
        },

        // 5. 配置 X 轴
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: hours,
            axisLine: { show: false },
            axisTick: { show: false },
            axisLabel: {
                color: '#86909C',
                // 每隔一个标签显示，避免拥挤
                interval: (index: number) => index % 2 === 0,
            }
        },

        // 6. 配置 Y 轴
        yAxis: {
            type: 'value',
            axisLabel: {
                formatter: '{value} %',
                color: '#86909C'
            },
            splitLine: {
                lineStyle: {
                    type: 'dashed', // 使用实线分割线
                    color: '#eef1f5'
                }
            }
        },

        // 7. 配置 dataZoom (核心)
        dataZoom: [
            {
                type: 'slider',
                start: 0,
                end: 100, // 默认显示全部范围
                bottom: '2%',
                height: 20,
                backgroundColor: '#f7f9fc',
                borderColor: '#e5e7eb',
                dataBackground: {
                    lineStyle: { color: '#d1d5db' },
                    areaStyle: {
                        color: {
                            type: 'linear', x: 0, y: 0, x2: 0, y2: 1,
                            colorStops: [{ offset: 0, color: 'rgba(59, 130, 246, 0.2)' }, { offset: 1, color: 'rgba(59, 130, 246, 0)' }]
                        }
                    }
                },
                fillerColor: 'rgba(59, 130, 246, 0.15)',
                handleStyle: {
                    color: '#fff',
                    borderColor: '#3b82f6'
                },
                moveHandleStyle: {
                    color: '#3b82f6'
                },
                // 自定义手柄图标
                handleIcon: 'M-2,0H2v10H-2z M-5,0H5v2H-5z M-5,10H5v2H-5z'
            }
        ],

        // 8. 配置 series
        series: [
            {
                name: '纯文本',
                type: 'line',
                smooth: true,
                symbol: 'none',
                data: [55, 25, 10, 40, 75, 98, 70, 30, 4, 30, 62, 98, 40, 0, 50, 90, 80, 100, 85, 28, 42, 82, 45, 28]
            },
            {
                name: '视频类',
                type: 'line',
                smooth: true,
                symbol: 'none',
                data: [28, 85, 60, 40, 30, 20, 5, 25, 5, 40, 75, 88, 70, 92, 95, 80, 0, 40, 55, 30, 5, 0, 20, 40]
            },
            {
                name: '图文类',
                type: 'line',
                smooth: true,
                symbol: 'none',
                data: [58, 70, 78, 60, 40, 32, 30, 45, 62, 35, 2, 25, 40, 5, 30, 60, 100, 95, 30, 58, 30, 48, 20, 50]
            }
        ]
    };

    return (
        <div className={styles.card}>
            <div className={styles.header}>
                <h3 className={styles.title}>内容时段分析</h3>
            </div>
            <div className={styles.chartContainer}>
                <EChartsReactCore option={option} />
            </div>
        </div>
    );
};

export default ContentTimeAnalysisChart;