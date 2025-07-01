"use client";
import React, { useEffect } from 'react';
import { motion, useMotionValue, useTransform, animate } from 'framer-motion';
import styles from './MyAgentsHeader.module.css';
import { MyAgent, myAgentsData } from '@/shared/lib/data/myAgentsData';

// 动画数字组件
const AnimatedNumber = ({ value }: { value: number }) => {
    const count = useMotionValue(0);
    const rounded = useTransform(count, latest => Math.round(latest));
    useEffect(() => {
        const controls = animate(count, value, { duration: 1.5, ease: "easeOut" });
        return controls.stop;
    }, [value, count]);
    return <motion.span>{rounded}</motion.span>;
};

const MyAgentsHeader: React.FC = () => {
    const totalAgents = myAgentsData.length;
    const favoriteCount = myAgentsData.filter(a => a.type === 'favorite').length;
    const createdCount = myAgentsData.filter(a => a.type === 'created').length;
    const mostUsedAgent = [...myAgentsData].sort((a, b) => b.usageCount - a.usageCount)[0];

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
                <div className={`${styles.shape} ${styles.shape3}`}></div>
            </div>
            <div className={styles.leftSection}>
                <h1 className={styles.title}>我的智能体中心</h1>
                <p className={styles.subtitle}>在这里管理你的学习伙伴和创作灵感，开启高效的 AI 学习之旅。</p>
                <div className={styles.statsRow}>
                    <div className={styles.statCard}>
                        <div className={styles.statValue}><AnimatedNumber value={totalAgents} /></div>
                        <div className={styles.statLabel}>智能体总数</div>
                    </div>
                    <div className={styles.statCard}>
                        <div className={styles.statValue}><AnimatedNumber value={favoriteCount} /></div>
                        <div className={styles.statLabel}>我的收藏</div>
                    </div>
                    <div className={styles.statCard}>
                        <div className={styles.statValue}><AnimatedNumber value={createdCount} /></div>
                        <div className={styles.statLabel}>我的创作</div>
                    </div>
                </div>
            </div>
            <div className={styles.rightSection}>
                <div className={styles.featuredCard}>
                    <div className={styles.featuredHeader}>
                        <i className="fas fa-star"></i>
                        <span>最常使用</span>
                    </div>
                    <div className={styles.featuredAgentInfo}>
                        <div className={styles.featuredAgentIcon} style={{ backgroundColor: mostUsedAgent.color }}>
                            <i className={mostUsedAgent.icon}></i>
                        </div>
                        <div className={styles.featuredAgentText}>
                            <h4>{mostUsedAgent.name}</h4>
                            <p>by {mostUsedAgent.creator}</p>
                        </div>
                    </div>
                    <button className={styles.featuredButton}>
                        继续对话 <i className="fas fa-arrow-right"></i>
                    </button>
                </div>
            </div>
        </motion.div>
    );
};

export default MyAgentsHeader;