// src/components/teacher/course-management/point-detail/PointHeader/PointHeader.tsx
"use client";
import React from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import styles from './PointHeader.module.css';
import { PointDetail } from '@/lib/data/pointDetailData';

const PointHeader: React.FC<{ point: PointDetail | null }> = ({ point }) => { // 1. 允许 point 为 null
    const params = useParams();
    const courseId = params.id;
    const pointId = params.pointId;

    // 2. 如果 point 数据还未加载，可以返回一个骨架屏或 null
    if (!point) {
        return (
            <div className={`${styles.headerCard} ${styles.skeleton}`}>
                <div className={styles.mainInfo}>
                    <div className={`${styles.skeletonLine} ${styles.skeletonTitle}`}></div>
                    <div className={`${styles.skeletonLine} ${styles.skeletonTags}`}></div>
                </div>
            </div>
        );
    }

    return (
        <div className={styles.headerCard}>
            <div className={styles.mainInfo}>
                <h1 className={styles.title}>{point.id}. {point.title}</h1>
                <div className={styles.meta}>
                    <span className={`${styles.tag} ${styles.difficulty}`}>{point.difficulty}</span>
                    {/* 3. 核心修复：在 map 之前检查 point.tags 是否为数组 */}
                    {Array.isArray(point.tags) && point.tags.map(tag =>
                        <span key={tag} className={styles.tag}>{tag}</span>
                    )}
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
                <Link href={`/teacher/courses/${courseId}/syllabus/${pointId}/edit`} passHref>
                    <button className={`${styles.actionButton} ${styles.editButton}`}>
                        <i className="fas fa-pen"></i> 编辑内容
                    </button>
                </Link>
            </div>
        </div>
    );
};
export default PointHeader;