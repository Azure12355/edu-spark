// src/components/teacher/course-management/point-detail/AuxiliarySidebar/AuxiliarySidebar.tsx
"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { hotQuestions, HotQuestion } from '@/lib/data/pointDetailData';
import styles from './AuxiliarySidebar.module.css';

interface TocItem {
    level: number;
    text: string;
    id: string;
}

const AuxiliarySidebar: React.FC<{ markdownContent: string }> = ({ markdownContent }) => {
    const [toc, setToc] = useState<TocItem[]>([]);
    const [activeTocId, setActiveTocId] = useState('');

    useEffect(() => {
        const lines = markdownContent.split('\n');
        const newToc: TocItem[] = [];
        lines.forEach((line, index) => {
            const match = line.match(/^(#+)\s+(.*)/);
            if (match) {
                const level = match[1].length;
                const text = match[2];
                const id = `toc-item-${index}`;
                newToc.push({ level, text, id });
            }
        });
        setToc(newToc);
    }, [markdownContent]);

    // ... In a real app, you would implement scroll spying to set activeTocId

    return (
        <aside className={styles.sidebar}>
            <div className={styles.card}>
                <div className={styles.cardHeader}>
                    <h3 className={styles.cardTitle}>目录</h3>
                    <button className={styles.toggleButton}><i className="fas fa-angle-double-right"></i></button>
                </div>
                <nav className={styles.tocNav}>
                    {toc.map(item => (
                        <a key={item.id} href={`#${item.id}`}
                           className={`${styles.tocLink} ${styles[`level${item.level}`]} ${activeTocId === item.id ? styles.active : ''}`}>
                            {item.text}
                        </a>
                    ))}
                </nav>
            </div>
            <div className={styles.card}>
                <div className={styles.cardHeader}>
                    <h3 className={styles.cardTitle}>热门题目榜</h3>
                    <Link href="#" className={styles.moreLink}>更多</Link>
                </div>
                <div className={styles.hotList}>
                    {hotQuestions.map(q => (
                        <Link key={q.id} href="#" className={styles.hotItem}>
                            <span>{q.title}</span>
                            <span className={styles.hotViews}><i className="far fa-eye"></i> {q.viewCount}</span>
                        </Link>
                    ))}
                </div>
            </div>
        </aside>
    );
};
export default AuxiliarySidebar;