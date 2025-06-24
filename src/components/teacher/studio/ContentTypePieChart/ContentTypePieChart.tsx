// src/components/teacher/studio/ContentTypePieChart/ContentTypePieChart.tsx
"use client";
import React from 'react';
import EChartsReactCore from '@/components/common/ECharts/EChartsReactCore';
import type { EChartsOption } from 'echarts';
import styles from './ContentTypePieChart.module.css';

const ContentTypePieChart = () => {
    // 1. 定义与设计稿一致的颜色
    const chartColors = ['#00BFFF', '#3A84FF', '#4C51BF'];

    const option: EChartsOption = {
        // 2. 定义图表的颜色主题
        color: chartColors,

        // 3. 利用 title 属性在图表中心创建文本
        title: {
            text: '928,530',
            subtext: '内容量',
            left: 'center',
            top: '42%', // 精细调整垂直位置
            textStyle: {
                fontSize: 28,
                fontWeight: 'bold',
                color: '#1D2129',
            },
            subtextStyle: {
                fontSize: 14,
                color: '#86909C',
            },
            itemGap: 10, // 主副标题间距
        },

        tooltip: {
            trigger: 'item',
            formatter: '{b}: {c} ({d}%)' // 提示框显示更详细信息
        },

        // 4. 配置图例样式和位置
        legend: {
            orient: 'horizontal',
            bottom: '5%',
            left: 'center',
            itemGap: 24, // 增大图例项间距
            icon: 'circle', // 使用圆形图例
            textStyle: {
                color: '#4E5969',
                fontSize: 14,
            }
        },

        series: [
            {
                name: '内容类别占比',
                type: 'pie',
                // 5. 创建环形图（甜甜圈图）
                radius: ['60%', '80%'],
                center: ['50%', '45%'], // 调整图表中心，为图例留出空间
                avoidLabelOverlap: true,

                // 6. 配置外部标签和引导线
                label: {
                    show: true,
                    position: 'outside',
                    formatter: '{d}%', // 只显示百分比
                    color: '#4E5969',
                    fontSize: 14,
                },
                labelLine: {
                    show: true,
                    length: 15,
                    length2: 15,
                    smooth: true,
                },

                // 7. 高亮（悬浮）时的样式
                emphasis: {
                    label: {
                        show: true,
                        fontSize: 16,
                        fontWeight: 'bold'
                    },
                    scaleSize: 10 // 悬浮时放大尺寸
                },

                // 8. 模拟数据
                data: [
                    { value: 445742, name: '纯文本' }, // 48%
                    { value: 334300, name: '图文类' }, // 36%
                    { value: 148588, name: '视频类' }, // 16%
                ],
            },
        ],
    };

    return (
        <div className={styles.card}>
            <div className={styles.header}>
                <h3 className={styles.title}>内容类别占比</h3>
                <a href="#" className={styles.moreLink}>查看更多</a>
            </div>
            <div className={styles.chartContainer}>
                <EChartsReactCore option={option} />
            </div>
        </div>
    );
};

export default ContentTypePieChart;