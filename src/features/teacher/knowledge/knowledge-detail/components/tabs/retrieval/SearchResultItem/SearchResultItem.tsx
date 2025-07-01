"use client";
import React, { useState } from 'react';
import styles from './SearchResultItem.module.css';
import { SearchResult } from '@/shared/lib/data/searchResultData';
import { getFileIcon } from '@/shared/lib/data/documentData';

const SearchResultItem: React.FC<{ result: SearchResult }> = ({ result }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const { icon, color } = getFileIcon(result.sourceDocument.type);

    return (
        <div className={styles.item}>
            <p className={`${styles.content} ${!isExpanded ? styles.collapsed : ''}`}>
                {result.content}
            </p>
            <div className={styles.footer}>
                <div className={styles.sourceInfo}>
                    <i className={`fas ${icon}`} style={{ color }}></i>
                    <span>{result.sourceDocument.name}</span>
                </div>
                <button className={styles.expandButton} onClick={() => setIsExpanded(!isExpanded)}>
                    {isExpanded ? '收起' : '展开'}
                </button>
            </div>
            {isExpanded && (
                <div className={styles.metadata}>
                    <span>召回分数 <strong className={styles.score}>{result.score}</strong></span>
                    <span>召回位次 {result.rank}</span>
                </div>
            )}
        </div>
    );
};
export default SearchResultItem;