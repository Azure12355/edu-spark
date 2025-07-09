// [!file src/widgets/analytics/TopicRadarChart/TopicRadarChart.tsx]
"use client";
import React from 'react';
import EChartsReactCore from '@/shared/components/ui/ECharts/EChartsReactCore';
import type { EChartsOption } from 'echarts';
import styles from './TopicRadarChart.module.css';

const TopicRadarChart = () => {
    // [code focus start ++]
    // --- 核心修改：替换为班级综合能力对比数据 ---
    const option: EChartsOption = {
        color: ['#4f46e5', '#059669', '#d97706'], // 使用一组鲜艳且对比强烈的颜色
        tooltip: { trigger: 'item' },
        legend: {
            data: ['01班 平均水平', '02班 平均水平', '03班 平均水平'],
            bottom: 10, // 图例放在底部
            textStyle: {
                color: '#4E5969'
            }
        },
        radar: {
            // 定义雷达图的维度指标，这些是衡量学生能力的关键维度
            indicator: [
                { name: '理论掌握度', max: 100 },
                { name: '编程实践能力', max: 100 },
                { name: '作业完成率', max: 100 },
                { name: '知识点覆盖广度', max: 100 },
                { name: '难题挑战率', max: 100 }
            ],
            shape: 'circle',
            center: ['50%', '50%'],
            radius: '65%',
            splitArea: {
                areaStyle: {
                    color: ['rgba(250, 251, 252, 0.8)', 'rgba(242, 243, 245, 0.8)'], // 使用更柔和的背景填充色
                    shadowBlur: 0
                }
            },
            axisLine: { lineStyle: { color: '#E5E6EB' } },
            splitLine: { lineStyle: { color: '#E5E6EB' } },
            axisName: { // 优化雷达图轴线文字样式
                color: '#4E5969',
                fontSize: 13
            }
        },
        series: [{
            name: '班级能力对比',
            type: 'radar',
            data: [
                {
                    value: [92, 85, 95, 75, 88, 65],
                    name: '01班 平均水平',
                    areaStyle: { opacity: 0.2 },
                    symbol: 'circle',
                    symbolSize: 6
                },
                {
                    value: [80, 92, 88, 85, 76, 80],
                    name: '02班 平均水平',
                    areaStyle: { opacity: 0.2 },
                    symbol: 'triangle',
                    symbolSize: 6
                },
                {
                    value: [75, 78, 82, 93, 91, 88],
                    name: '03班 平均水平',
                    areaStyle: { opacity: 0.2 },
                    symbol: 'diamond',
                    symbolSize: 6
                }
            ]
        }]
    };
    // [code focus end ++]

    return (
        <div className={styles.card}>
            {/* [code focus start ++] */}
            <h3 className={styles.title}>班级综合能力对比</h3>
            {/* [code focus end ++] */}
            <div className={styles.chartContainer}>
                <EChartsReactCore option={option} />
            </div>
        </div>
    );
};

export default TopicRadarChart;