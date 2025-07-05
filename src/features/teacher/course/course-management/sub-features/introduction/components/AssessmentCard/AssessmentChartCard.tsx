"use client";

import React from 'react';
import { motion } from 'framer-motion';
import EChartsReactCore from '@/shared/components/ui/ECharts/EChartsReactCore';
import type { EChartsOption } from 'echarts';
import styles from './AssessmentChartCard.module.css';
import { AssessmentItem } from '../../types'; // 从我们定义的领域类型中导入

// 定义组件 Props
interface AssessmentChartCardProps {
    title: string;
    // [!code focus start]
    // 使用从 types.ts 导入的强类型
    data?: AssessmentItem[];
    // [!code focus end]
}

// 预定义的颜色方案，可以根据需要扩展或作为 prop 传入
const defaultColors = ['#4f46e5', '#3b82f6', '#60a5fa', '#93c5fd', '#a5b4fc', '#c7d2fe'];

// 1. 新增一个优雅的空状态组件
const EmptyState = () => (
    <div className={styles.emptyState}>
        <div className={styles.emptyIcon}>
            <i className="fas fa-chart-pie"></i>
        </div>
        <p>暂无考核方式数据</p>
        <span>请在课程设置中添加</span>
    </div>
);

const AssessmentChartCard: React.FC<AssessmentChartCardProps> = ({ title, data }) => {

    // 2. 健壮性处理：如果 data 未提供或为空，则渲染空状态
    if (!data || data.length === 0) {
        return (
            <div className={styles.card}>
                <h2 className={styles.sectionTitle}>{title}</h2>
                <EmptyState />
            </div>
        );
    }

    // 3. ECharts 配置逻辑
    const option: EChartsOption = {
        tooltip: {
            trigger: 'item',
            formatter: '{b} : {c}%',
            backgroundColor: 'rgba(50, 50, 50, 0.7)',
            borderColor: '#333',
            borderWidth: 0,
            padding: 10,
            textStyle: {
                color: '#fff',
            }
        },
        legend: {
            bottom: '5%',
            left: 'center',
            icon: 'circle',
            itemWidth: 10,
            itemHeight: 10,
            textStyle: {
                color: 'var(--teacher-text-secondary)',
                fontSize: 13,
            },
            itemGap: 15
        },
        color: defaultColors,
        series: [
            {
                name: '考核方式',
                type: 'pie',
                radius: ['55%', '75%'], // 调整内外半径，使环更精致
                center: ['50%', '42%'], // 稍微上移，为图例留出更多空间
                avoidLabelOverlap: false,
                label: {
                    show: false, // 不在图表上显示标签
                    position: 'center'
                },
                emphasis: {
                    scaleSize: 8, // 悬浮时放大效果更明显
                    label: {
                        show: true,
                        fontSize: 20,
                        fontWeight: 'bold',
                        formatter: '{d}%' // 悬浮时在中心显示百分比
                    }
                },
                labelLine: {
                    show: false
                },
                // [!code focus start]
                // 4. 将 props 中的 data 映射为 ECharts 需要的格式
                data: data.map(item => ({
                    // 将 weight 字符串（如 "40%"）转换为数值
                    value: parseFloat(item.weight.replace('%', '')),
                    name: `${item.item} ${item.weight}` // 图例中同时显示名称和权重
                })),
                // [!code focus end]
            },
        ],
    };

    return (
        <motion.div
            className={styles.card}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: 'spring' }}
        >
            <h2 className={styles.sectionTitle}>{title}</h2>
            <div className={styles.chartContainer}>
                <EChartsReactCore option={option} style={{ height: '100%', width: '100%' }} />
            </div>
        </motion.div>
    );
};

export default AssessmentChartCard;