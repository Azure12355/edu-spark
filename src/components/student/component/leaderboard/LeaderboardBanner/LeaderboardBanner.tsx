// src/components/student/component/leaderboard/LeaderboardBanner.tsx
"use client";
import React, { useRef, useEffect } from 'react';
import Image from 'next/image';
import { motion, useMotionValue, useTransform, animate } from 'framer-motion';
import styles from './LeaderboardBanner.module.css';

// 动画数字组件，用于展示动态数据
const AnimatedNumber = ({ value }: { value: number }) => {
    const count = useMotionValue(0);
    const rounded = useTransform(count, latest => Math.round(latest));

    useEffect(() => {
        const controls = animate(count, value, {
            duration: 2,
            ease: "easeOut"
        });
        return controls.stop;
    }, [value, count]);

    return <motion.span>{rounded}</motion.span>;
};

// 模拟的 Banner 数据
const bannerData = {
    stats: [
        { value: 1374, label: "在线 Agent 总数" },
        { value: 98650, label: "今日交互次数" },
        { value: 89, label: "本周新增 Agent" }
    ],
    champion: {
        id: 1,
        name: '急救知识 规划师 #6',
        creator: '红十字会',
        avatarText: '救',
        avatarGradient: 'linear-gradient(135deg, #d32f2f 0%, #ffcdd2 100%)'
    }
};

const LeaderboardBanner = () => {
    const bannerRef = useRef<HTMLDivElement>(null);

    // 鼠标跟踪效果
    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (bannerRef.current) {
            const rect = bannerRef.current.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            bannerRef.current.style.setProperty('--mouse-x', `${x}px`);
            bannerRef.current.style.setProperty('--mouse-y', `${y}px`);
        }
    };

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
            ref={bannerRef}
            className={styles.banner}
            onMouseMove={handleMouseMove}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            <div className={styles.interactiveBackground} />
            <div className={styles.content}>
                <motion.h1 variants={itemVariants}>
                    <i className="fas fa-trophy"></i> Agent 排行榜
                </motion.h1>
                <motion.p variants={itemVariants}>
                    发现最受欢迎、最具创新性的学习智能体
                </motion.p>

                <motion.div className={styles.statsRow} variants={itemVariants}>
                    {bannerData.stats.map((stat, index) => (
                        <div key={index} className={styles.statItem}>
                            <div className={styles.statNumber}>
                                <AnimatedNumber value={stat.value} />
                            </div>
                            <div className={styles.statLabel}>{stat.label}</div>
                        </div>
                    ))}
                </motion.div>

                <motion.button
                    className={styles.ctaButton}
                    variants={itemVariants}
                    whileHover={{ scale: 1.05, boxShadow: "0px 8px 25px rgba(234, 179, 8, 0.4)" }}
                    whileTap={{ scale: 0.98 }}
                >
                    <i className="fas fa-magic"></i> 创建我的 Agent
                </motion.button>
            </div>

            <motion.div className={styles.featuredSection} variants={itemVariants}>
                <div className={styles.championHeader}>
                    <div className={styles.championTrophy}>🏆</div>
                    本周冠军
                </div>
                <div className={styles.championInfo}>
                    <div className={styles.championAvatar} style={{ background: bannerData.champion.avatarGradient }}>
                        {bannerData.champion.avatarText}
                    </div>
                    <div className={styles.championText}>
                        <h4>{bannerData.champion.name}</h4>
                        <p>by {bannerData.champion.creator}</p>
                    </div>
                </div>
                <button className={styles.viewButton}>
                    <span>查看详情</span>
                    <i className="fas fa-arrow-right"></i>
                </button>
            </motion.div>
        </motion.div>
    );
};

export default LeaderboardBanner;