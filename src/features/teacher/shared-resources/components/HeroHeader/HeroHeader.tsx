// [!file src/features/teacher/shared-resources/components/HeroHeader/HeroHeader.tsx]
"use client";

import React from 'react';
import styles from './HeroHeader.module.css';
import { motion } from 'framer-motion';

const HeroHeader: React.FC = () => {
    // 定义容器的动画变体，用于子元素的交错入场
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2, // 子元素依次入场，间隔0.2秒
                delayChildren: 0.3,   // 整体延迟0.3秒开始
            },
        },
    };

    // 定义子元素的动画变体
    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { type: 'spring', stiffness: 100, damping: 15 },
        },
    };

    return (
        <motion.header
            className={styles.heroContainer}
            initial="hidden"
            animate="visible"
            variants={containerVariants}
        >
            {/* 背景抽象图形 */}
            <div className={styles.backgroundShapes}>
                <motion.div
                    className={`${styles.shape} ${styles.shape1}`}
                    animate={{ y: [0, 15, 0], x: [0, -10, 0] }}
                    transition={{ duration: 8, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }}
                ></motion.div>
                <motion.div
                    className={`${styles.shape} ${styles.shape2}`}
                    animate={{ y: [0, -10, 0], x: [0, 20, 0] }}
                    transition={{ duration: 10, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }}
                ></motion.div>
                <motion.div
                    className={`${styles.shape} ${styles.shape3}`}
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 6, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }}
                ></motion.div>
            </div>

            {/* 内容 */}
            <motion.div variants={itemVariants} className={styles.iconWrapper}>
                <i className="fas fa-globe-americas"></i>
            </motion.div>

            <motion.h1 variants={itemVariants} className={styles.title}>
                知识的交汇与新生
            </motion.h1>

            <motion.p variants={itemVariants} className={styles.subtitle}>
                探索由顶尖教育者们分享的公开课程与知识库，汲取灵感，共创未来。<br/>
                每一次分享，都是对教育的献礼。
            </motion.p>
        </motion.header>
    );
};

export default HeroHeader;