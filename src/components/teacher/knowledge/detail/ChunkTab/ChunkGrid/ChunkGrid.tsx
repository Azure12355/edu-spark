"use client";
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Chunk } from '@/types/knowledge';
import ChunkCard from '../ChunkCard/ChunkCard';
import styles from './ChunkGrid.module.css';

interface ChunkGridProps {
    chunks: Chunk[];
}

const EmptyState = () => (
    <div className={styles.emptyState}>
        <i className="fas fa-box-open"></i>
        <h3>没有找到匹配的切片</h3>
        <p>请尝试调整筛选条件或搜索关键词。</p>
    </div>
);

const ChunkGrid: React.FC<ChunkGridProps> = ({ chunks }) => {
    return (
        <div className={styles.grid}>
            <AnimatePresence>
                {chunks.length > 0 ? (
                    chunks.map(chunk => (
                        <motion.div
                            key={chunk.id}
                            layout="position"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            transition={{ duration: 0.3 }}
                        >
                            <ChunkCard chunk={chunk} />
                        </motion.div>
                    ))
                ) : (
                    <div className={styles.emptyContainer}>
                        <EmptyState />
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default ChunkGrid;