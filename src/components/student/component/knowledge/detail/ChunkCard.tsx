"use client";
import React from 'react';
import styles from './ChunkCard.module.css';
import { Chunk } from '@/lib/data/chunkData';
import { getFileIcon } from '@/lib/data/documentData';

const ChunkCard: React.FC<{ chunk: Chunk }> = ({ chunk }) => {
    const extension = chunk.sourceDocument.split('.').pop()?.toLowerCase() || 'txt';
    const { icon, color } = getFileIcon(extension as any);

    return (
        <div className={styles.card}>
            <div className={styles.header}>
                <span className={styles.index}>#{chunk.index}</span>
                <span className={styles.id}>ID {chunk.id}</span>
            </div>
            <p className={styles.content}>{chunk.content}</p>
            <div className={styles.footer}>
                <div className={styles.sourceInfo}>
                    <i className={`fas ${icon}`} style={{ color }}></i>
                    <span>{chunk.sourceDocument}</span>
                    <span>·</span>
                    <span>字符 {chunk.charCount}</span>
                </div>
                <div className={styles.timestamp}>
                    更新于 {chunk.updatedAt}
                </div>
            </div>
        </div>
    );
};

export default ChunkCard;