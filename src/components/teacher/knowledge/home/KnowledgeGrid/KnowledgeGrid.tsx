"use client";
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { KnowledgeBase } from '@/types/knowledge'; // 1. 导入类型
import KnowledgeCard from '../KnowledgeCard/KnowledgeCard';
import styles from './KnowledgeGrid.module.css';
import {KnowledgeBaseVO} from "@/services/knowledgeService";

// 2. 更新 Props 接口，接收 kbs 数组
interface KnowledgeGridProps {
    kbs: KnowledgeBaseVO[];
    isLoading: boolean; // 新增 isLoading prop
    onDelete: (id: number) => Promise<void>; // 确认 prop 类型
}

const SkeletonCard = () => (
    <div className={`${styles.card} ${styles.skeleton}`}>
        <div className={styles.header}>
            <div className={styles.icon}></div>
            <div className={styles.title}></div>
        </div>
        <div className={styles.description}></div>
        <div className={styles.descriptionShort}></div>
        <div className={styles.stats}>
            <div className={styles.statItem}></div>
            <div className={styles.statItem}></div>
            <div className={styles.statItem}></div>
        </div>
    </div>
);


const EmptyState = () => (
    // ... 空状态组件保持不变 ...
    <motion.div
        className={styles.emptyStateContainer}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
    >
        <div className={styles.emptyIcon}>
            <i className="fas fa-search-minus"></i>
        </div>
        <h3 className={styles.emptyTitle}>未找到匹配的知识库</h3>
        <p className={styles.emptyMessage}>
            请尝试调整筛选条件，或创建一个新的知识库来开始您的AI教学之旅。
        </p>
    </motion.div>
);

// 3. 修改主组件，使用传入的 kbs prop
const KnowledgeGrid: React.FC<KnowledgeGridProps> = ({ kbs, isLoading, onDelete }) => {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.07 },
        },
    };

    // 【核心修改】: 根据 isLoading 状态决定渲染内容
    if (isLoading) {
        return (
            <div className={styles.grid}>
                {/* 渲染8个骨架屏作为占位符 */}
                {Array.from({ length: 8 }).map((_, index) => (
                    <SkeletonCard key={index} />
                ))}
            </div>
        );
    }

    return (
        <motion.div
            className={styles.grid}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            layout
        >
            <AnimatePresence>
                {kbs.length > 0 ? (
                    kbs.map(kb => (
                        <motion.div key={kb.id} layout="position">
                            {/* 【核心】: 传递 onDelete 函数 */}
                            <KnowledgeCard kb={kb} onDelete={onDelete} />
                        </motion.div>
                    ))
                ) : (
                    <EmptyState />
                )}
            </AnimatePresence>
        </motion.div>
    );
};

export default KnowledgeGrid;