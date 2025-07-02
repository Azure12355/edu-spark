// src/features/teacher/knowledge/knowledge-detail/components/tabs/chunks/ChunkGrid.tsx
"use client";

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChunkVO } from '@/features/teacher/knowledge/knowledge-detail/sub-features/chunk-management/service/chunkService';
import { ViewMode } from '@/features/teacher/knowledge/knowledge-detail/sub-features/chunk-management/components/toolbar-parts/ViewModeToggle';
import ChunkCard from './ChunkCard';
import styles from '../styles/ChunkGrid.module.css';

/**
 * @interface ChunkGridProps
 * @description ChunkGrid 组件的 Props 定义。
 * @property {ChunkVO[]} chunks - 需要渲染的切片数据数组。
 * @property {(chunkId: number) => Promise<boolean>} onDeleteChunk - 删除切片的回调函数。
 * @property {ViewMode} viewMode - 当前的视图模式 ('grid' 或 'list')。
 */
interface ChunkGridProps {
    chunks: ChunkVO[];
    onDeleteChunk: (chunkId: number) => Promise<boolean>;
    viewMode: ViewMode;
}

/**
 * 纯展示组件，负责渲染切片网格或列表。
 * 它不包含任何关于加载状态或空状态的判断逻辑。
 *
 * @param {ChunkGridProps} props - 组件的 Props。
 * @returns {React.ReactElement} - 渲染后的 JSX 元素。
 */
const ChunkGrid: React.FC<ChunkGridProps> = ({ chunks, onDeleteChunk, viewMode }) => {
    // 容器动画变体，用于子元素的交错入场效果
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.05, delayChildren: 0.1 },
        },
    };

    // 子项动画变体，用于单个卡片的入场和退场
    const itemVariants = {
        initial: { opacity: 0, scale: 0.95, y: 15 },
        animate: { opacity: 1, scale: 1, y: 0, transition: { type: 'spring', stiffness: 250, damping: 25 } },
        exit: { opacity: 0, scale: 0.9, y: -10, transition: { duration: 0.2 } },
    };

    return (
        <motion.div
            className={`${styles.grid} ${viewMode === 'list' ? styles.listView : ''}`}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            layout // 启用布局动画以响应 viewMode 和数据变化
        >
            <AnimatePresence>
                {chunks.map(chunk => (
                    <motion.div
                        key={chunk.id}
                        layout="position" // 确保在重新排序或过滤时动画平滑
                        variants={itemVariants}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                    >
                        <ChunkCard chunk={chunk} onDelete={onDeleteChunk} />
                    </motion.div>
                ))}
            </AnimatePresence>
        </motion.div>
    );
};

export default ChunkGrid;