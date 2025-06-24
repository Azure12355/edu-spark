// src/components/teacher/my-courses/MyCoursesHeader.tsx
"use client";
import React from 'react';
import { motion } from 'framer-motion';
import styles from './MyCoursesHeader.module.css';

const MyCoursesHeader = () => {
    return (
        <motion.div
            className={styles.headerContainer}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <div className={styles.backgroundShapes}>
                <div className={`${styles.shape} ${styles.shape1}`}></div>
                <div className={`${styles.shape} ${styles.shape2}`}></div>
            </div>
            <div className={styles.leftSection}>
                <h2 className={styles.title}>欢迎回来，王老师！</h2>
                <p className={styles.subtitle}>高效管理您的课程智能体，开启新一代数字化教学。</p>
                <div className={styles.statsRow}>
                    <div className={styles.statItem}>
                        <div className={styles.statValue}>
                            <i className="fas fa-book-open"></i>
                            <span>4</span>
                        </div>
                        <div className={styles.statLabel}>进行中课程</div>
                    </div>
                    <div className={styles.statItem}>
                        <div className={styles.statValue}>
                            <i className="fas fa-users"></i>
                            <span>310</span>
                        </div>
                        <div className={styles.statLabel}>覆盖学生总数</div>
                    </div>
                    <div className={styles.statItem}>
                        <div className={styles.statValue}>
                            <i className="fas fa-check-circle"></i>
                            <span>92%</span>
                        </div>
                        <div className={styles.statLabel}>平均作业完成率</div>
                    </div>
                </div>
            </div>
            {/* 可以在右侧添加一个插图 */}
        </motion.div>
    );
};

export default MyCoursesHeader;