// [!file src/widgets/analytics/ContentPublishChart/ContentPublishChart.tsx]
"use client";
import React from 'react';
import EChartsReactCore from '@/shared/components/ui/ECharts/EChartsReactCore';
import type { EChartsOption } from 'echarts';
import styles from './ContentPublishChart.module.css';

const ContentPublishChart = () => {
    // [code focus start ++]
    // --- 核心修改：替换为教学资源增量相关的数据和配置 ---

    // 1. 定义与教学资源匹配的颜色主题
    const chartColors = {
        knowledgePoints: '#3b82f6', // 知识点 - 蓝色
        questions: '#16a34a',       // 题目 - 绿色
        documents: '#f97316',      // 知识库文档 - 橙色
    };

    // 2. 模拟最近8周的数据
    const weeks = Array.from({ length: 8 }, (_, i) => `第 ${i + 1} 周`);
    const knowledgePointsData = [15, 22, 18, 30, 25, 45, 38, 52];
    const questionsData = [50, 65, 55, 80, 75, 120, 110, 150];
    const documentsData = [5, 8, 6, 12, 10, 18, 15, 20];

    const option: EChartsOption = {
        tooltip: {
            trigger: 'axis',
            axisPointer: { type: 'shadow' },
            formatter: (params: any) => {
                let res = `${params[0].name}<br/>`;
                params.forEach((item: any) => {
                    res += `${item.marker} ${item.seriesName}: ${item.value} 个<br/>`;
                });
                return res;
            }
        },
        legend: {
            data: ['新增知识点', '新增题目', '新增文档'],
            bottom: 0,
            itemGap: 20,
            icon: 'circle',
            textStyle: { color: '#4E5969' }
        },
        grid: {
            left: '3%', right: '4%', top: '10%', bottom: '15%', containLabel: true
        },
        xAxis: [{
            type: 'category',
            data: weeks,
            axisTick: { show: false },
            axisLine: { show: false },
            axisLabel: { color: '#86909C' }
        }],
        yAxis: [{
            type: 'value',
            name: '数量 (个)',
            axisLabel: { color: '#86909C' },
            splitLine: { lineStyle: { type: 'dashed', color: '#e5e6eb' } }
        }],
        series: [
            {
                name: '新增知识点',
                type: 'bar',
                stack: '总量',
                barWidth: '35%',
                itemStyle: { color: chartColors.knowledgePoints },
                data: knowledgePointsData
            },
            {
                name: '新增题目',
                type: 'bar',
                stack: '总量',
                itemStyle: { color: chartColors.questions },
                data: questionsData
            },
            {
                name: '新增文档',
                type: 'bar',
                stack: '总量',
                itemStyle: { color: chartColors.documents, borderRadius: [5, 5, 0, 0] },
                data: documentsData
            }
        ]
    };
    // [code focus end ++]

    return (
        <div className={styles.card}>
            <div className={styles.header}>
                {/* [code focus start ++] */}
                <h3 className={styles.title}>课程资源增量分析</h3>
                {/* [code focus end ++] */}
                <a href="#" className={styles.moreLink}>查看更多</a>
            </div>
            <div className={styles.chartContainer}>
                <EChartsReactCore option={option} />
            </div>
        </div>
    );
};

export default ContentPublishChart;