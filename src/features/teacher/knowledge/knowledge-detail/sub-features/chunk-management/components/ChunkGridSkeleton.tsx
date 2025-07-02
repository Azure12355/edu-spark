"use client";
import React from 'react';
import { motion } from 'framer-motion';
import styles from '../styles/ChunkGrid.module.css'; // 复用样式

const SkeletonCard = () => (
    <div className={styles.skeletonCard}>
        <div className={styles.skeletonHeader}>
            <div className={styles.skeletonIcon}></div>
            <div className={styles.skeletonTextLong}></div>
        </div>
        <div className={styles.skeletonContent}>
            <div className={styles.skeletonTextShort}></div>
            <div className={styles.skeletonTextMedium}></div>
            <div className={styles.skeletonTextShort}></div>
        </div>
        <div className={styles.skeletonFooter}>
            <div className={styles.skeletonTextShort}></div>
            <div className={styles.skeletonTextShort}></div>
        </div>
    </div>
);

interface ChunkGridSkeletonProps {
    count?: number;
    viewMode: 'grid' | 'list';
}

const ChunkGridSkeleton: React.FC<ChunkGridSkeletonProps> = ({ count = 6, viewMode }) => {
    return (
        <div className={`${styles.grid} ${viewMode === 'list' ? styles.listView : ''}`}>
            {Array.from({ length: count }).map((_, index) => (
                <motion.div
                    key={index}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.05 }}
                >
                    <SkeletonCard />
                </motion.div>
            ))}
        </div>
    );
};

export default ChunkGridSkeleton;