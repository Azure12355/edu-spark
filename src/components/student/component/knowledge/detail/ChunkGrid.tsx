"use client";
import React from 'react';
import styles from './ChunkGrid.module.css';
import { chunkData } from '@/lib/data/chunkData';
import ChunkCard from './ChunkCard';

const ChunkGrid = () => {
    return (
        <div className={styles.grid}>
            {chunkData.map(chunk => (
                <ChunkCard key={chunk.id} chunk={chunk} />
            ))}
        </div>
    );
};

export default ChunkGrid;