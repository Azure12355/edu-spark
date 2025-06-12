// src/components/student/component/leaderboard/LeaderboardBanner.tsx
"use client";
import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import styles from './LeaderboardBanner.module.css';

const LeaderboardBanner = () => {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.15, delayChildren: 0.2 },
        },
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: { type: 'spring', stiffness: 100, damping: 12 },
        },
    };

    return (
        <motion.div
            className={styles.banner}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            <div className={styles.content}>
                <motion.h1 variants={itemVariants}>
                    <i className="fas fa-trophy"></i> Agent 排行榜
                </motion.h1>
                <motion.p variants={itemVariants}>
                    发现最受欢迎、最具创新性的学习智能体
                </motion.p>
            </div>
            <motion.div
                className={styles.decoration}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.7, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
                {/* 使用一个抽象的、有科技感的装饰图 */}
                <Image src="/images/globe.svg" alt="Leaderboard Decoration" width={180} height={180} />
            </motion.div>
        </motion.div>
    );
};

export default LeaderboardBanner;