// [!file src/widgets/analytics/ContentTypePieChart/ContentTypePieChart.tsx]
"use client";
import React from 'react';
import EChartsReactCore from '@/shared/components/ui/ECharts/EChartsReactCore';
import type { EChartsOption } from 'echarts';
import styles from './ContentTypePieChart.module.css';

const ContentTypePieChart = () => {
    // [code focus start ++]
    // --- 核心修改：替换为题目来源相关的数据和配置 ---

    // 1. 定义与题目来源匹配的颜色主题
    const chartColors = ['#3b82f6', '#10b981', '#f97316']; // 蓝色:手动, 绿色:AI, 橙色:导入

    // 2. 模拟数据，反映一个典型的题目构成
    const seriesData = [
        { value: 450, name: '手动创建' }, // 教师原创题目
        { value: 820, name: 'AI生成' },  // AI辅助生成的题目
        { value: 230, name: '批量导入' }, // 从外部文件导入的题目
    ];

    // 3. 计算总题量
    const totalQuestions = seriesData.reduce((sum, item) => sum + item.value, 0);

    const option: EChartsOption = {
        color: chartColors,
        title: {
            text: totalQuestions.toLocaleString(), // 格式化数字，例如 1,500
            subtext: '题库总量',
            left: 'center',
            top: '42%',
            textStyle: {
                fontSize: 28,
                fontWeight: 'bold',
                color: '#1D2129',
            },
            subtextStyle: {
                fontSize: 14,
                color: '#86909C',
            },
            itemGap: 8,
        },
        tooltip: {
            trigger: 'item',
            formatter: '{b}: {c} 道 ({d}%)' // 提示框显示具体题目数量和百分比
        },
        legend: {
            orient: 'horizontal',
            bottom: '5%',
            left: 'center',
            itemGap: 20,
            icon: 'circle',
            textStyle: {
                color: '#4E5969',
                fontSize: 14,
            },
            // 图例现在也由数据驱动
            data: seriesData.map(item => item.name)
        },
        series: [
            {
                name: '题目来源分布',
                type: 'pie',
                radius: ['60%', '80%'],
                center: ['50%', '45%'],
                avoidLabelOverlap: false,
                label: {
                    show: false, // 保持中心区域简洁，信息通过 tooltip 展示
                },
                labelLine: {
                    show: false,
                },
                emphasis: {
                    scale: true,
                    scaleSize: 8
                },
                data: seriesData,
            },
        ],
    };
    // [code focus end ++]

    return (
        <div className={styles.card}>
            <div className={styles.header}>
                {/* [code focus start ++] */}
                <h3 className={styles.title}>题库来源分布</h3>
                {/* [code focus end ++] */}
                <a href="#" className={styles.moreLink}>查看更多</a>
            </div>
            <div className={styles.chartContainer}>
                <EChartsReactCore option={option} />
            </div>
        </div>
    );
};

export default ContentTypePieChart;