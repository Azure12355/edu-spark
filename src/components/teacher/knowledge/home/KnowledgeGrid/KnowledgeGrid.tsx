"use client";
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { KnowledgeBase } from '@/types/knowledge'; // 1. 导入类型
import KnowledgeCard from '../KnowledgeCard/KnowledgeCard';
import styles from './KnowledgeGrid.module.css';

// 2. 更新 Props 接口，接收 kbs 数组
interface KnowledgeGridProps {
    kbs: KnowledgeBase[];
}

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
const KnowledgeGrid: React.FC<KnowledgeGridProps> = ({ kbs }) => {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.07 },
        },
    };

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
                            <KnowledgeCard kb={kb} />
                        </motion.div>
                    ))
                ) : (
                    // 空状态的渲染逻辑保持不变
                    <EmptyState />
                )}
            </AnimatePresence>
        </motion.div>
    );
};

export default KnowledgeGrid;