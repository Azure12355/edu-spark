// [!file src/features/teacher/knowledge/knowledge-list/components/KnowledgeBaseHeader/KnowledgeBaseHeader.tsx]
"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { useKnowledgeStats } from '../../hooks/useKnowledgeStats';
import { useHeaderAnimations } from '../../services/useHeaderAnimations';
import styles from './KnowledgeBaseHeader.module.css';

// --- 纯 UI 子组件 ---

/**
 * 一个由SVG和CSS动画构建的、动态的、富有科技感的大脑/电路图标。
 */
const BrainCircuitIcon = () => (
    <div className={styles.brainIconContainer}>
        <svg viewBox="0 0 100 100" className={styles.brainSvg}>
            <defs>
                <filter id="glow">
                    <feGaussianBlur stdDeviation="2.5" result="coloredBlur" />
                    <feMerge>
                        <feMergeNode in="coloredBlur" />
                        <feMergeNode in="SourceGraphic" />
                    </feMerge>
                </filter>
                <radialGradient id="brain-grad" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="var(--metric-color, #4f46e5)" stopOpacity="1" />
                    <stop offset="100%" stopColor="var(--metric-color-dark, #3b3e9a)" stopOpacity="1" />
                </radialGradient>
            </defs>
            {/* 脑部轮廓 */}
            <path
                d="M50 2 C 25 2, 25 40, 50 40 S 75 2, 50 2 Z"
                className={styles.brainPath}
                filter="url(#glow)"
            />
            <path
                d="M50 98 C 25 98, 25 60, 50 60 S 75 98, 50 98 Z"
                className={styles.brainPath}
                filter="url(#glow)"
            />
            {/* 动态光点 */}
            <circle cx="50" cy="50" r="3" className={styles.spark1} />
            <circle cx="30" cy="30" r="2" className={styles.spark2} />
            <circle cx="70" cy="70" r="2.5" className={styles.spark3} />
        </svg>
    </div>
);

// 卡片骨架
const MetricCardSkeleton = () => <div className={styles.metricCardSkeleton} />;

// 统计卡片
interface MetricCardProps {
    icon: string;
    value: string | number;
    label: string;
    color: string;
}
const MetricCard: React.FC<MetricCardProps> = ({ icon, value, label, color }) => (
    <div className={styles.metricCard} style={{ '--metric-color': color } as React.CSSProperties}>
        <div className={styles.metricIconWrapper}>
            <div className={styles.iconShine}></div>
            <i className={icon}></i>
        </div>
        <div className={styles.metricContent}>
            <div className={styles.metricValue}>{value}</div>
            <div className={styles.metricLabel}>{label}</div>
        </div>
    </div>
);


const KnowledgeBaseHeader: React.FC = () => {
    const { kbCount, docCount, sliceCount, isLoading } = useKnowledgeStats();
    const { containerRef, animationProps, interactionProps, styleProps } = useHeaderAnimations();

    return (
        <motion.div
            ref={containerRef}
            className={styles.banner}
            style={{ rotateX: styleProps.rotateX, rotateY: styleProps.rotateY, transformStyle: 'preserve-3d' }}
            initial="hidden"
            animate="visible"
        >
            {/* 背景效果层 */}
            <div className={styles.backgroundEffects}>
                {/*@ts-ignore*/}
                <div className={styles.aurora} style={{ backgroundImage: styleProps.lightGradient }} />
                <div className={styles.gridPattern} />
            </div>

            {/* 内容层 */}
            <div className={styles.contentWrapper}>
                <motion.div className={styles.leftSection} variants={animationProps.itemVariants}>
                    <div className={styles.titleGroup}>
                        <BrainCircuitIcon />
                        <h2 className={styles.title}>知识库中心</h2>
                    </div>
                    <p className={styles.subtitle}>
                        构建、管理并共享您的教学知识资产，为强大的AI助教提供核心动力。
                    </p>
                    <div className={styles.quickActions}>
                        <button className={`${styles.actionButton} ${styles.primary}`}>
                            <i className="fas fa-plus"></i> 创建知识库
                        </button>
                        <button className={styles.actionButton}>
                            <i className="fas fa-share-alt"></i> 共享广场
                        </button>
                    </div>
                </motion.div>

                <motion.div className={styles.rightSection} variants={animationProps.itemVariants}>
                    {isLoading ? (
                        <>
                            <MetricCardSkeleton />
                            <MetricCardSkeleton />
                            <MetricCardSkeleton />
                        </>
                    ) : (
                        <>
                            <MetricCard icon="fas fa-database" value={kbCount} label="知识库总数" color="#4f46e5" />
                            <MetricCard icon="fas fa-file-alt" value={docCount.toLocaleString()} label="文档总数" color="#059669" />
                            <MetricCard icon="fas fa-cubes" value={sliceCount.toLocaleString()} label="切片总数" color="#d97706" />
                        </>
                    )}
                </motion.div>
            </div>
        </motion.div>
    );
};
export default KnowledgeBaseHeader;