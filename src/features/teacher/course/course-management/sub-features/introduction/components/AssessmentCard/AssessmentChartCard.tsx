// src/components/teacher/course-management/introduction/AssessmentChartCard/AssessmentChartCard.tsx
"use client";

import React from 'react';
import EChartsReactCore from '@/shared/components/ui/ECharts/EChartsReactCore';
import type { EChartsOption } from 'echarts';
import styles from './AssessmentChartCard.module.css';

// 定义传入数据和颜色的类型
interface ChartDataItem {
    value: number;
    name: string;
}

interface AssessmentChartCardProps {
    title: string;
    data: ChartDataItem[];
    colors: string[];
}

const AssessmentChartCard: React.FC<AssessmentChartCardProps> = ({ title, data, colors }) => {

    const option: EChartsOption = {
        tooltip: {
            trigger: 'item',
            formatter: '{b}: {d}%'
        },
        // 核心修改 1: 将图例配置移到下方
        legend: {
            bottom: '5%', // 距离底部 5%
            left: 'center', // 水平居中
            icon: 'rect', // 使用矩形图例，与截图一致
            itemWidth: 14,
            itemHeight: 14,
            textStyle: {
                color: 'var(--teacher-text-secondary)',
                fontSize: 14, // 调整字体大小使其更清晰
            },
            itemGap: 20 // 增大图例间距
        },
        color: colors, // 使用传入的颜色数组
        series: [
            {
                name: '考核方式',
                type: 'pie',
                // 核心修改 2: 调整环形图的半径和中心点，以适应下方图例
                radius: ['60%', '80%'], // 环形更宽一些
                center: ['50%', '45%'], // 稍微向上移动，为图例留出空间
                avoidLabelOverlap: false,
                label: {
                    show: false, // 不在图表上显示标签
                },
                emphasis: {
                    label: {
                        show: false, // 悬浮时也不显示标签
                    },
                    scaleSize: 5 // 悬浮时扇区轻微放大
                },
                data: data,
            },
        ],
    };

    return (
        <div className={styles.card}>
            <h2 className={styles.sectionTitle}>{title}</h2>
            <div className={styles.chartContainer}>
                <EChartsReactCore option={option} style={{ height: '100%', width: '100%' }} />
            </div>
        </div>
    );
};

export default AssessmentChartCard;