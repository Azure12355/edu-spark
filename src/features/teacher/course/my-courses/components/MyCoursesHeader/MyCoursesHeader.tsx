"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import EChartsReactCore from '@/shared/components/ui/ECharts/EChartsReactCore';
import type { EChartsOption } from 'echarts';
import styles from './MyCoursesHeader.module.css';
import Tooltip from '@/shared/components/ui/Tooltip/Tooltip';

// --- 1. 内部子组件：用于展示单项统计数据 ---
interface HeaderStatCardProps {
    icon: string;
    iconBgClass: string;
    label: string;
    value: string;
    chartData: number[];
}

const HeaderStatCard: React.FC<HeaderStatCardProps> = ({ icon, iconBgClass, label, value, chartData }) => {
    const chartOption: EChartsOption = {
        grid: { top: 5, right: 0, bottom: 5, left: 0 },
        xAxis: { show: false, type: 'category' },
        yAxis: { show: false, type: 'value' },
        series: [{
            data: chartData,
            type: 'line',
            smooth: true,
            showSymbol: false,
            lineStyle: { width: 2, color: '#ffffff' },
        }]
    };

    return (
        <div className={styles.statCard}>
            <div className={`${styles.statIcon} ${iconBgClass}`}>
                <i className={icon}></i>
            </div>
            <div className={styles.statDetails}>
                <span className={styles.statValue}>{value}</span>
                <span className={styles.statLabel}>{label}</span>
            </div>
            <div className={styles.sparkline}>
                <EChartsReactCore option={chartOption} />
            </div>
        </div>
    );
};


// --- 2. 主组件：MyCoursesHeader ---
const MyCoursesHeader: React.FC = () => {
    // 模拟的统计数据
    const stats = [
        { icon: 'fas fa-book-reader', iconBgClass: styles.iconBlue, label: '进行中课程', value: '12', chartData: [5, 8, 6, 10, 8, 11, 12] },
        { icon: 'fas fa-users', iconBgClass: styles.iconGreen, label: '总学生数', value: '1,344', chartData: [300, 500, 450, 700, 650, 900, 1344] },
        { icon: 'fas fa-comments', iconBgClass: styles.iconPurple, label: '本周互动', value: '6.9k', chartData: [3000, 4500, 6000, 7500, 7200, 7000, 6908] }
    ];

    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

    // 定义容器和子项的动画变体
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1, delayChildren: 0.1 },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 200 } },
    };

    return (
        <motion.div
            className={styles.headerContainer}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            <div className={styles.leftSection}>
                <motion.h2 variants={itemVariants} className={styles.title}>
                    <strong>欢迎回来，迷糊老师！</strong>
                </motion.h2>
                <motion.p variants={itemVariants} className={styles.subtitle}>
                    高效管理您的课程智能体，开启新一代数字化教学。
                </motion.p>
                <motion.div variants={itemVariants} className={styles.statsRow}>
                    {stats.map((stat, index) => (
                        <HeaderStatCard key={index} {...stat} />
                    ))}
                </motion.div>
            </div>
            <motion.div variants={itemVariants} className={styles.rightSection}>
                <div className={styles.viewToggle}>
                    <Tooltip content="卡片视图" position="top">
                        <button className={viewMode === 'grid' ? styles.active : ''} onClick={() => setViewMode('grid')}>
                            <i className="fas fa-th-large"></i>
                        </button>
                    </Tooltip>
                    <Tooltip content="列表视图" position="top">
                        <button className={viewMode === 'list' ? styles.active : ''} onClick={() => setViewMode('list')}>
                            <i className="fas fa-list"></i>
                        </button>
                    </Tooltip>
                </div>
                <Link href="#" passHref>
                    <button className={styles.createButton}>
                        <i className="fas fa-plus"></i> 创建新课程
                    </button>
                </Link>
            </motion.div>
        </motion.div>
    );
};

export default MyCoursesHeader;