// src/components/teacher/studio/ContentPublishChart/ContentPublishChart.tsx
"use client";
import React from 'react';
import EChartsReactCore from '@/components/common/ECharts/EChartsReactCore';
import type { EChartsOption } from 'echarts';
import styles from './ContentPublishChart.module.css';

const ContentPublishChart = () => {
    // 1. 定义与设计稿一致的颜色主题
    const chartColors = {
        text: '#87EAF2', // 纯文本 - 浅蓝
        video: '#3A84FF', // 视频类 - 中蓝
        image: '#4C51BF', // 图文类 - 深蓝
    };

    const option: EChartsOption = {
        // 2. 配置提示框
        tooltip: {
            trigger: 'axis',
            axisPointer: { type: 'shadow' },
            formatter: (params: any) => {
                let res = `${params[0].name}<br/>`;
                params.forEach((item: any) => {
                    res += `${item.marker} ${item.seriesName}: ${item.value}k<br/>`;
                });
                return res;
            }
        },

        // 3. 配置图例
        legend: {
            data: ['纯文本', '视频类', '图文类'],
            bottom: 0,
            itemGap: 20,
            icon: 'circle',
            textStyle: { color: '#4E5969' }
        },

        // 4. 配置网格，为图例留出空间
        grid: {
            left: '3%',
            right: '4%',
            top: '10%',
            bottom: '15%',
            containLabel: true
        },

        // 5. 配置 X 轴
        xAxis: [
            {
                type: 'category',
                data: ['00:00', '02:00', '04:00', '06:00', '08:00', '10:00', '12:00', '14:00', '16:00', '18:00', '20:00', '22:00'],
                axisTick: { show: false },
                axisLine: { show: false },
                axisLabel: { color: '#86909C' }
            }
        ],

        // 6. 配置 Y 轴
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

        // 7. 配置 series，实现堆叠效果
        series: [
            {
                name: '图文类',
                type: 'bar',
                stack: '总量', // 关键：所有 stack 值相同的 series 会堆叠
                barWidth: '20%',
                itemStyle: { color: chartColors.image },
                data: [2.2, 2.2, 4.8, 4.8, 5.2, 3.4, 1.2, 2.2, 2.8, 3.4, 1.8, 3.2]
            },
            {
                name: '视频类',
                type: 'bar',
                stack: '总量',
                barWidth: '20%',
                itemStyle: { color: chartColors.video },
                data: [1.2, 3.6, 3.2, 0.8, 1.2, 2, 1.2, 4, 3, 1.8, 4, 2.8]
            },
            {
                name: '纯文本',
                type: 'bar',
                stack: '总量',
                barWidth: '20%',
                itemStyle: { color: chartColors.text, borderRadius: [5, 5, 0, 0] }, // 只给最顶部的系列设置圆角
                data: [1.8, 3.2, 4, 3, 2.8, 3.2, 2.8, 2.8, 1.4, 0.6, 2, 3.6]
            }
        ]
    };

    return (
        <div className={styles.card}>
            <div className={styles.header}>
                <h3 className={styles.title}>内容发布比例</h3>
                <a href="#" className={styles.moreLink}>查看更多</a>
            </div>
            <div className={styles.chartContainer}>
                <EChartsReactCore option={option} />
            </div>
        </div>
    );
};

export default ContentPublishChart;