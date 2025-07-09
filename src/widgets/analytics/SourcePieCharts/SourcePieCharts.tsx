// [!file src/widgets/analytics/SourcePieCharts/SourcePieCharts.tsx]
"use client";
import React from 'react';
import EChartsReactCore from '@/shared/components/ui/ECharts/EChartsReactCore';
import type { EChartsOption } from 'echarts';
import styles from './SourcePieCharts.module.css';

// [code focus start ++]
// --- 核心修改：替换为学情分析相关的图表数据 ---

// 1. 定义共享的图例数据和颜色，现在代表题型
const legendData = [
    { name: '选择题', color: '#3b82f6' },
    { name: '填空题', color: '#16a34a' },
    { name: '判断题', color: '#f97316' },
    { name: '简答题', color: '#8b5cf6' },
    { name: '编程题', color: '#ef4444' },
];
const chartColors = legendData.map(item => item.color);


// 2. 更新图表配置生成函数，使其更适合展示得分率
const createPieOption = (title: string, data: { value: number; name: string }[]): EChartsOption => {
    // 计算总分，用于显示在中心
    const totalScore = data.reduce((sum, item) => sum + item.value, 0);
    const avgScore = data.length > 0 ? (totalScore / data.length).toFixed(1) : '0';

    return {
        color: chartColors,
        // @ts-ignore
        title: {
            text: `${title}\n平均得分率`, // 主标题
            subtext: `${avgScore}%`,    // 副标题显示平均分
            left: 'center',
            top: '40%', // 微调位置
            textStyle: {
                fontSize: 16,
                fontWeight: "600",
                color: '#4E5969',
                lineHeight: 24,
            },
            subtextStyle: {
                fontSize: 24,
                fontWeight: 'bold',
                color: '#1D2129'
            }
        },
        tooltip: {
            trigger: 'item',
            formatter: '{b}: {c}%' // 提示框显示具体得分率
        },
        series: [
            {
                name: '题型得分率',
                type: 'pie',
                radius: ['65%', '85%'],
                avoidLabelOverlap: false,
                label: { show: false }, // 标签默认不显示，保持图表简洁
                labelLine: { show: false },
                emphasis: {
                    scale: true,
                    scaleSize: 8
                },
                data: data
            }
        ]
    };
};

// 3. 为每个课程准备符合逻辑的题型得分率数据
// 《数据结构》: 编程和选择题是重点，简答题稍弱
const dataStructureData = [
    { value: 92, name: '选择题' },
    { value: 85, name: '填空题' },
    { value: 95, name: '判断题' },
    { value: 78, name: '简答题' },
    { value: 88, name: '编程题' },
];

// 《操作系统》: 简答和选择是重点，编程题较少且得分率高
const osData = [
    { value: 90, name: '选择题' },
    { value: 88, name: '填空题' },
    { value: 94, name: '判断题' },
    { value: 91, name: '简答题' },
    { value: 95, name: '编程题' },
];

// 《计算机网络》: 简答题和选择题是难点，得分率稍低
const networkData = [
    { value: 85, name: '选择题' },
    { value: 90, name: '填空题' },
    { value: 96, name: '判断题' },
    { value: 82, name: '简答题' },
    { value: 89, name: '编程题' },
];
// [code focus end ++]


const SourcePieCharts = () => {
    return (
        <div className={styles.card}>
            <div className={styles.header}>
                {/* [code focus start ++] */}
                <h3 className={styles.title}>课程题型得分率分析</h3>
                {/* [code focus end ++] */}
            </div>
            <div className={styles.chartGrid}>
                <div className={styles.chartWrapper}>
                    {/* [code focus start ++] */}
                    <EChartsReactCore option={createPieOption('数据结构', dataStructureData)} />
                    {/* [code focus end ++] */}
                </div>
                <div className={styles.chartWrapper}>
                    {/* [code focus start ++] */}
                    <EChartsReactCore option={createPieOption('操作系统', osData)} />
                    {/* [code focus end ++] */}
                </div>
                <div className={styles.chartWrapper}>
                    {/* [code focus start ++] */}
                    <EChartsReactCore option={createPieOption('计算机网络', networkData)} />
                    {/* [code focus end ++] */}
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