"use client";
import React from 'react';
import { motion } from 'framer-motion';
import styles from './HistoryBanner.module.css';

const HistoryBanner = () => {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1, delayChildren: 0.2 },
        },
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0, opacity: 1,
            transition: { type: 'spring', stiffness: 100 },
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
                <motion.div variants={itemVariants} className={styles.icon}>
                    <i className="fas fa-history"></i>
                </motion.div>
                <motion.h1 variants={itemVariants} className={styles.title}>
                    对话记忆回廊
                </motion.h1>
                <motion.p variants={itemVariants} className={styles.subtitle}>
                    每一次智慧的碰撞，每一次灵感的闪现，都为你精心收藏。在这里，回顾你的学习足迹。
                </motion.p>
                <motion.div variants={itemVariants} className={styles.searchBar}>
                    <i className="fas fa-search"></i>
                    <input type="text" placeholder="搜索对话内容或Agent名称..." />
                </motion.div>
            </div>
        </motion.div>
    );
};

export default HistoryBanner;