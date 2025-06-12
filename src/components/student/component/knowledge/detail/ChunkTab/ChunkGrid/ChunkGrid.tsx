"use client";
import React from 'react';
import styles from './ChunkGrid.module.css';
import { Chunk } from '@/lib/data/chunkData'; // 引入类型
import ChunkCard from '../ChunkCard/ChunkCard';

// 新增 Props 接口
interface ChunkGridProps {
    chunks: Chunk[];
}

const ChunkGrid: React.FC<ChunkGridProps> = ({ chunks }) => {
    return (
        <div className={styles.grid}>
            {chunks.map(chunk => (
                <ChunkCard key={chunk.id} chunk={chunk} />
            ))}
        </div>
    );
};

export default ChunkGrid;