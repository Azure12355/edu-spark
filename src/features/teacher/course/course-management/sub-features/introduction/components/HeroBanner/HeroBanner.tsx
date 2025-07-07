"use client";

import React from 'react';
import { motion } from 'framer-motion';
import styles from './HeroBanner.module.css';
import {CourseDetail, CourseVO} from "@/shared/types";

// 2. 定义组件的 Props 接口
interface HeroBannerProps {
    course: CourseVO;
    details: CourseDetail | null; // 详情可能为 null
}

// 动画变体保持不变
const containerVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 150, damping: 20 } },
};

const HeroBanner: React.FC<HeroBannerProps> = ({ course, details }) => {
    // 3. 为统计数据提供默认值，处理 details 可能为 null 的情况
    const stats = [
        {
            icon: 'fas fa-book-open',
            label: '核心知识点',
            value: details?.keyKnowledge?.split(',').length || 'N/A'
        },
        {
            icon: 'fas fa-microchip',
            label: '包含算法',
            value: '20+' // 暂时为静态，未来可从metadata获取
        },
        {
            icon: 'far fa-clock',
            label: '预计学时',
            value: details?.estimatedHours ? `${details.estimatedHours} h` : 'N/A'
        },
    ];

    return (
        <motion.div
            className={styles.heroCard}
            style={{ '--hero-color-theme': course.colorTheme || '#4D8DFF' } as React.CSSProperties}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            <div className={styles.heroContent}>
                <motion.h1 variants={itemVariants} className={styles.heroTitle}>
                    {/* 4. 使用真实的课程名称 */}
                    {course.name}
                </motion.h1>
                <motion.p variants={itemVariants} className={styles.heroSubtitle}>
                    {/* 5. 使用真实的课程描述，并提供默认值 */}
                    {details?.introduction
                        ? details.introduction.replace(/<[^>]+>/g, '').substring(0, 100) + '...' // 截取纯文本简介
                        : "教师尚未填写详细的课程介绍，但探索的旅程已经开启！"
                    }
                </motion.p>
                <motion.div variants={itemVariants} className={styles.heroStats}>
                    {stats.map((stat, index) => (
                        <div key={index} className={styles.statItem}>
                            <i className={stat.icon}></i>
                            {stat.value} {stat.label}
                        </div>
                    ))}
                </motion.div>
                <motion.div variants={itemVariants} className={styles.heroActions}>
                    <button className={styles.ctaButton}>开始第一章学习</button>
                    <button className={styles.outlineButton}>查看教学大纲</button>
                </motion.div>
            </div>
            <motion.div variants={itemVariants} className={styles.heroIllustration}>
                {/* 可以根据课程类型显示不同图标，这里用 course.id 做个简单示例 */}
                <i className={course.id % 2 === 0 ? "fas fa-drafting-compass" : "fas fa-atom"}></i>
            </motion.div>
        </motion.div>
    );
};

export default HeroBanner;