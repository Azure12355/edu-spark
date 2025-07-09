// [!file src/shared/components/common/UnderConstruction/UnderConstruction.tsx]
"use client";

import React from 'react';
import styles from './UnderConstruction.module.css';
import { motion, useTransform, useMotionValue } from 'framer-motion';

interface UnderConstructionProps {
    pageTitle?: string;
    featureName?: string;
}

const UnderConstruction: React.FC<UnderConstructionProps> = ({
                                                                 pageTitle = "新功能探索中",
                                                                 featureName = "这个模块"
                                                             }) => {
    // 1. 创建用于3D视差效果的 motion value
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const rotateX = useTransform(y, [-100, 100], [10, -10]);
    const rotateY = useTransform(x, [-100, 100], [-10, 10]);

    const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
        const rect = event.currentTarget.getBoundingClientRect();
        x.set(event.clientX - rect.left - rect.width / 2);
        y.set(event.clientY - rect.top - rect.height / 2);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    // 2. Framer Motion 动画变体
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.2, delayChildren: 0.2 } }
    };
    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { type: 'spring', damping: 15, stiffness: 100 } }
    };

    return (
        <motion.div
            className={styles.container}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
        >
            {/* 背景粒子效果 */}
            <div className={styles.particles}>
                {Array.from({ length: 30 }).map((_, i) => (
                    <div key={i} className={styles.particle}></div>
                ))}
            </div>

            {/* 内容容器 */}
            <motion.div
                className={styles.contentWrapper}
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                {/* 核心图标 */}
                <motion.div variants={itemVariants} className={styles.iconContainer}>
                    <div className={styles.iconGlow}></div>
                    <i className="fas fa-drafting-compass"></i>
                </motion.div>

                {/* 主标题 */}
                <motion.h1 variants={itemVariants} className={styles.title}>
                    {pageTitle}
                </motion.h1>

                {/* 副标题 */}
                <motion.p variants={itemVariants} className={styles.description}>
                    我们的AI工程师正在为 <strong>{featureName}</strong> 绘制蓝图，<br />
                    用代码与光线，编织全新的交互体验。敬请期待！
                </motion.p>

                {/* 进度条 */}
                <motion.div variants={itemVariants} className={styles.progressBarContainer}>
                    <div className={styles.progressBarLabel}>
                        <span>创意编译中...</span>
                    </div>
                    <div className={styles.progressBar}>
                        <motion.div
                            className={styles.progressFill}
                            initial={{ width: 0 }}
                            animate={{ width: '100%' }}
                            transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                        />
                    </div>
                </motion.div>
            </motion.div>
        </motion.div>
    );
};

export default UnderConstruction;