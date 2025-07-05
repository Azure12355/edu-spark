// [!file src/features/teacher/course/course-management/sub-features/point-detail/components/AuxiliarySidebar/TableOfContents.tsx]
"use client";

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import styles from './AuxiliarySidebar.module.css';

export interface TocItem {
    level: number;
    text: string;
    id: string;
}

interface TableOfContentsProps {
    toc: TocItem[];
    activeTocId: string;
    onLinkClick: (e: React.MouseEvent<HTMLAnchorElement>, id: string) => void;
    isLoading: boolean;
}

const TableOfContents: React.FC<TableOfContentsProps> = ({ toc, activeTocId, onLinkClick, isLoading }) => {
    // 骨架屏
    const Skeleton = () => (
        <div className={styles.tocSkeleton}>
            {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className={`${styles.skeletonLine} ${i % 2 === 0 ? styles.wFull : styles.wShort}`}></div>
            ))}
        </div>
    );

    // 空状态
    const EmptyState = () => <p className={styles.noToc}>暂无目录</p>;

    return (
        <div className={styles.card}>
            <div className={styles.cardHeader}>
                <h3 className={styles.cardTitle}><i className="fas fa-bars"></i> 目录</h3>
            </div>
            <nav className={styles.tocNav}>
                {isLoading ? (
                    <Skeleton />
                ) : toc.length > 0 ? (
                    toc.map((item) => (
                        <Link
                            key={item.id}
                            href={`#${item.id}`}
                            onClick={(e) => onLinkClick(e, item.id)}
                            className={`${styles.tocLink} ${styles[`level${item.level}`]} ${activeTocId === item.id ? styles.active : ''}`}
                        >
                            {item.text}
                        </Link>
                    ))
                ) : (
                    <EmptyState />
                )}
            </nav>
        </div>
    );
};

export default TableOfContents;