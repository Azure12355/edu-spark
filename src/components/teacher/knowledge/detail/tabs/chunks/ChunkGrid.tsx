"use client";
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChunkVO } from '@/services/chunkService';

// 导入所有需要的子组件
import ChunkCard from './ChunkCard';
import ChunkGridSkeleton from './ChunkGridSkeleton';
import EmptyState from './EmptyState';
import { ViewMode } from './ViewModeToggle'; // 假设 ViewMode 类型在这里

import styles from './ChunkGrid.module.css';

// 更新 Props 接口
interface ChunkGridProps {
    chunks: ChunkVO[];
    isLoading: boolean;
    onDeleteChunk: (chunkId: number) => Promise<boolean>;
    viewMode: ViewMode;
    hasActiveFilters: boolean; // 新增：用于判断是否显示不同的空状态
}

const ChunkGrid: React.FC<ChunkGridProps> = ({
                                                 chunks,
                                                 isLoading,
                                                 onDeleteChunk,
                                                 viewMode,
                                                 hasActiveFilters
                                             }) => {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.05, delayChildren: isLoading ? 0.5 : 0 },
        },
    };

    // 1. 渲染骨架屏
    if (isLoading) {
        return <ChunkGridSkeleton viewMode={viewMode} />;
    }

    // 2. 渲染空状态
    if (chunks.length === 0) {
        return <EmptyState hasFilters={hasActiveFilters} />;
    }

    // 3. 渲染真实数据
    return (
        <motion.div
            className={`${styles.grid} ${viewMode === 'list' ? styles.listView : ''}`}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            layout // 启用布局动画以响应 viewMode 切换
        >
            <AnimatePresence>
                {chunks.map(chunk => (
                    <motion.div
                        key={chunk.id}
                        layout="position"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ type: 'spring', stiffness: 250, damping: 25 }}
                    >
                        {/* 假设 ChunkCard 也能适应列表模式的样式 */}
                        <ChunkCard chunk={chunk} onDelete={onDeleteChunk} />
                    </motion.div>
                ))}
            </AnimatePresence>
        </motion.div>
    );
};

export default ChunkGrid;