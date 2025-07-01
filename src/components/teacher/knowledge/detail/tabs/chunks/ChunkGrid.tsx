"use client";
import React from 'react';
import {AnimatePresence, motion} from 'framer-motion';
import {ChunkVO} from '@/services/chunkService';
import styles from './ChunkGrid.module.css';
import ChunkCard from "@/components/teacher/knowledge/detail/tabs/chunks/ChunkCard";

interface ChunkGridProps {
    chunks: ChunkVO[];
    isLoading: boolean;
    onDeleteChunk: (chunkId: number) => Promise<boolean>;
}

const SkeletonCard = () => (
    <div className={`${styles.card} ${styles.skeleton}`}>
        {/* ... 骨架屏样式可以从 DocumentTable 复制和调整 ... */}
    </div>
);

const EmptyState = () => (
    <div className={styles.emptyContainer}>
        <div className={styles.emptyState}>
            <i className="fas fa-box-open"></i>
            <h3>没有找到匹配的切片</h3>
            <p>请尝试调整筛选条件或搜索关键词。</p>
        </div>
    </div>
);

const ChunkGrid: React.FC<ChunkGridProps> = ({chunks, isLoading, onDeleteChunk}) => {
    if (isLoading) {
        return (
            <div className={styles.grid}>
                {Array.from({length: 6}).map((_, index) => <SkeletonCard key={index}/>)}
            </div>
        );
    }

    return (
        <div className={styles.grid}>
            <AnimatePresence>
                {chunks.length > 0 ? (
                    chunks.map(chunk => (
                        <motion.div key={chunk.id} layout>
                            <ChunkCard chunk={chunk} onDelete={onDeleteChunk}/>
                        </motion.div>
                    ))
                ) : (
                    <EmptyState/>
                )}
            </AnimatePresence>
        </div>
    );
};

export default ChunkGrid;