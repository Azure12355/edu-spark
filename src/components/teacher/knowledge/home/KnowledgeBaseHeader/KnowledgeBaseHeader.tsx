"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { useKnowledgeStats } from '@/hooks/useKnowledgeStats';
import { useHeaderAnimations } from '@/hooks/useHeaderAnimations';
import styles from './KnowledgeBaseHeader.module.css';

// --- 纯 UI 子组件 ---
const BrainCircuitIcon = () => (<div>X</div>);

interface MetricCardProps {
    icon: string;
    value: string | number;
    label: string;
    color: string;
}

const MetricCardSkeleton = () => <div className={styles.metricCardSkeleton} />;

const MetricCard: React.FC<MetricCardProps> = ({ icon, value, label, color }) => (
    <div className={styles.metricCard} style={{ '--metric-color': color } as React.CSSProperties}>
        <div className={styles.metricIconWrapper}><i className={icon}></i></div>
        <div className={styles.metricValue}>{value}</div>
        <div className={styles.metricLabel}>{label}</div>
    </div>
);


const KnowledgeBaseHeader: React.FC = () => {
    // 1. 调用业务逻辑 Hook 获取数据和加载状态
    const { kbCount, docCount, sliceCount, isLoading } = useKnowledgeStats();

    // 2. 调用 UI 逻辑 Hook 获取动画和交互所需的 props
    const { containerRef, animationProps, interactionProps, styleProps } = useHeaderAnimations();

    return (
        <motion.div
            ref={containerRef}
            className={styles.banner}
            style={{ rotateX: styleProps.rotateX, rotateY: styleProps.rotateY, transformStyle: 'preserve-3d' }}
            variants={animationProps.containerVariants}
            initial="hidden"
            animate="visible"
            {...interactionProps} // 应用 onMouseMove, onMouseLeave
        >
            <motion.div className={styles.aurora} style={{ backgroundImage: styleProps.lightGradient }} />
            <div className={styles.gridPattern} />

            <div className={styles.contentWrapper}>
                <motion.div className={styles.leftSection} variants={animationProps.itemVariants}>
                    <div className={styles.titleGroup}>
                        <div className={styles.titleIcon}><BrainCircuitIcon /></div>
                        <h2 className={styles.title}>知识库中心</h2>
                    </div>
                    <p className={styles.subtitle}>
                        在这里，您可以构建、管理并共享您的教学知识资产，为强大的 AI 助教提供动力。
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

                <div className={styles.rightSection}>
                    {isLoading ? (
                        <>
                            <MetricCardSkeleton />
                            <MetricCardSkeleton />
                            <MetricCardSkeleton />
                        </>
                    ) : (
                        <>
                            <motion.div variants={animationProps.itemVariants}><MetricCard icon="fas fa-database" value={kbCount} label="知识库总数" color="#3b82f6" /></motion.div>
                            <motion.div variants={animationProps.itemVariants}><MetricCard icon="fas fa-file-alt" value={docCount.toLocaleString()} label="文档总数" color="#16a34a" /></motion.div>
                            <motion.div variants={animationProps.itemVariants}><MetricCard icon="fas fa-cubes" value={sliceCount.toLocaleString()} label="切片总数" color="#f97316" /></motion.div>
                        </>
                    )}
                </div>
            </div>
        </motion.div>
    );
};
export default KnowledgeBaseHeader;