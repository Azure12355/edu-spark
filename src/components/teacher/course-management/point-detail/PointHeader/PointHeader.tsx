// src/components/teacher/course-management/point-detail/PointHeader/PointHeader.tsx
"use client";
import React from 'react';
import styles from './PointHeader.module.css';
import { PointDetail } from '@/lib/data/pointDetailData';

const PointHeader: React.FC<{ point: PointDetail }> = ({ point }) => {
    return (
        <div className={styles.headerCard}>
            <div className={styles.mainInfo}>
                <h1 className={styles.title}>{point.id}. {point.title}</h1>
                <div className={styles.meta}>
                    <span className={`${styles.tag} ${styles.difficulty}`}>{point.difficulty}</span>
                    {point.tags.map(tag => <span key={tag} className={styles.tag}>{tag}</span>)}
                </div>
            </div>
            <div className={styles.actions}>
                <button className={styles.actionButton}>
                    <i className="far fa-bookmark"></i> 标记
                </button>
                <button className={styles.actionButton}>
                    <i className="fas fa-share-alt"></i> 分享
                </button>
                <div className={styles.stats}>
                    <span><i className="far fa-star"></i> {point.likeCount}</span>
                    <span><i className="far fa-eye"></i> {point.viewCount}</span>
                </div>
            </div>
        </div>
    );
};
export default PointHeader;