// src/components/teacher/course-management/point-detail/AuxiliarySidebar/AuxiliarySidebar.tsx
"use client";
import React, { useState, useEffect, useRef } from 'react';
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
    const observer = useRef<IntersectionObserver | null>(null);

    // 1. 生成TOC目录
    useEffect(() => {
        const lines = markdownContent.split('\n');
        const newToc: TocItem[] = [];
        lines.forEach((line) => {
            const match = line.match(/^(#+)\s+(.*?)(\s*\{#(.+?)\})?$/);
            if (match) {
                const level = match[1].length;
                const text = match[2];
                const id = match[4] || `toc-item-${newToc.length}`;
                newToc.push({ level, text, id });
            }
        });
        setToc(newToc);
    }, [markdownContent]);

    // 2. 实现滚动监听 (Scroll Spying)
    useEffect(() => {
        if (observer.current) observer.current.disconnect();

        observer.current = new IntersectionObserver(
            (entries) => {
                const visibleEntries = entries.filter(e => e.isIntersecting);
                if (visibleEntries.length > 0) {
                    // 优先选择视口中最靠上的可见标题
                    setActiveTocId(visibleEntries[0].target.id);
                }
            },
            { rootMargin: "0px 0px -80% 0px" } // 标题进入视口顶部20%区域时触发
        );

        const elements = document.querySelectorAll('.markdown-body h1, .markdown-body h2, .markdown-body h3');
        elements.forEach(el => {
            if (el.id && observer.current) {
                observer.current.observe(el);
            }
        });

        return () => observer.current?.disconnect();
    }, [toc]); // 当TOC生成后重新监听

    const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
        e.preventDefault();
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    // 3. 为热门题目添加颜色标签
    const getHotnessColor = (index: number) => {
        if (index === 0) return styles.hotnessTop1;
        if (index === 1) return styles.hotnessTop2;
        if (index === 2) return styles.hotnessTop3;
        return styles.hotnessNormal;
    };

    return (
        <aside className={styles.sidebar}>
            <div className={styles.card}>
                <div className={styles.cardHeader}>
                    <h3 className={styles.cardTitle}><i className="fas fa-bars"></i> 目录</h3>
                </div>
                <nav className={styles.tocNav}>
                    {toc.map(item => (
                        <a key={item.id} href={`#${item.id}`}
                           onClick={(e) => handleLinkClick(e, item.id)}
                           className={`${styles.tocLink} ${styles[`level${item.level}`]} ${activeTocId === item.id ? styles.active : ''}`}>
                            {item.text}
                        </a>
                    ))}
                    {toc.length === 0 && <p className={styles.noToc}>暂无目录</p>}
                </nav>
            </div>
            <div className={`${styles.card} ${styles.hotQuestionsCard}`}>
                <div className={styles.cardHeader}>
                    <h3 className={styles.cardTitle}><i className="fas fa-fire-alt"></i> 热门题目榜</h3>
                    <Link href="#" className={styles.moreLink}>更多</Link>
                </div>
                <div className={styles.hotList}>
                    {hotQuestions.map((q, index) => (
                        <Link key={q.id} href="#" className={styles.hotItem}>
                            <span className={`${styles.hotRank} ${getHotnessColor(index)}`}>{index + 1}</span>
                            <span className={styles.hotTitle}>{q.title}</span>
                            <span className={styles.hotViews}><i className="far fa-eye"></i> {q.viewCount}</span>
                        </Link>
                    ))}
                </div>
            </div>
        </aside>
    );
};
export default AuxiliarySidebar;