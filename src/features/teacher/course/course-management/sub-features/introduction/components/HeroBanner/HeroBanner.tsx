// src/components/teacher/course-management/introduction/HeroBanner/HeroBanner.tsx
"use client";
import React from 'react';
import { motion } from 'framer-motion';
import styles from './HeroBanner.module.css';

// 定义动画变体，使其自成一体
const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { type: 'spring' }}
};

const HeroBanner = () => {
    return (
        <motion.div className={styles.heroCard} variants={itemVariants}>
            <div className={styles.heroContent}>
                <h1 className={styles.heroTitle}>数据结构与算法</h1>
                <p className={styles.heroSubtitle}>本课程是计算机科学的核心基石，旨在培养学生的计算思维、编程内功与问题求解能力，为未来的技术生涯铺平道路。</p>
                <div className={styles.heroStats}>
                    <div className={styles.statItem}><i className="fas fa-book-open"></i>10+ 核心知识点</div>
                    <div className={styles.statItem}><i className="fas fa-microchip"></i>20+ 经典算法</div>
                    <div className={styles.statItem}><i className="far fa-clock"></i>96 预计学时</div>
                </div>
                <div className={styles.heroActions}>
                    <button className={styles.ctaButton}>开始第一章学习</button>
                    <button className={styles.outlineButton}>查看教学大纲</button>
                </div>
            </div>
            <div className={styles.heroIllustration}>
                <i className="fas fa-drafting-compass"></i>
            </div>
        </motion.div>
    );
};

export default HeroBanner;