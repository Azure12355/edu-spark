// src/components/teacher/course-management/point-detail/AuxiliarySidebar/AuxiliarySidebar.tsx
"use client";
import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { hotQuestions } from '@/shared/lib/data/pointDetailData';
import styles from './AuxiliarySidebar.module.css';

interface TocItem {
    level: number;
    text: string;
    id: string;
}

interface AuxiliarySidebarProps {
    markdownContent: string;
    scrollContainerRef: React.RefObject<HTMLDivElement | null>;
}

const AuxiliarySidebar: React.FC<AuxiliarySidebarProps> = ({ markdownContent, scrollContainerRef }) => {
    const [toc, setToc] = useState<TocItem[]>([]);
    const [activeTocId, setActiveTocId] = useState('');
    const observer = useRef<IntersectionObserver | null>(null);

    // 核心修复：重构目录生成和滚动监听的 useEffect
    useEffect(() => {
        const scrollContainer = scrollContainerRef.current;
        if (!scrollContainer) return;

        // 使用 MutationObserver 来监听 Bytemd Viewer 的 DOM 变化
        // 这是最可靠的方式，确保在 viewer 渲染完成后执行我们的逻辑
        const domObserver = new MutationObserver(() => {
            const viewerContent = scrollContainer.querySelector('.bytemd-preview');
            const headings = viewerContent?.querySelectorAll('h1, h2, h3, h4');

            if (headings && headings.length > 0) {
                // DOM 已经准备好，可以生成目录
                const newToc: TocItem[] = Array.from(headings).map((el, index) => {
                    // 动态地为每个标题添加唯一的 ID
                    const id = `toc-heading-${index}`;
                    el.id = id;
                    return {
                        level: parseInt(el.tagName.substring(1), 10),
                        text: el.textContent || '',
                        id: id,
                    };
                });

                // 仅在目录内容变化时更新状态，避免不必要的重渲染
                // 这里的 JSON.stringify 比较是有效的，因为 toc 结构简单且稳定
                if (JSON.stringify(newToc) !== JSON.stringify(toc)) {
                    setToc(newToc);
                }

                // 成功生成目录后，断开 DOM 观察者，因为它只需要执行一次
                domObserver.disconnect();
            }
        });

        // 开始观察主滚动容器的子节点变化
        domObserver.observe(scrollContainer, {
            childList: true,
            subtree: true,
        });

        // 组件卸载时，清理观察者
        return () => domObserver.disconnect();

    }, [markdownContent, scrollContainerRef, toc]); // 依赖 markdownContent 以在内容切换时重新执行


    // 滚动监听逻辑（依赖于 TOC 的生成）
    useEffect(() => {
        // 当 toc 数组有内容后，才开始设置滚动监听
        if (toc.length === 0) return;

        const scrollContainer = scrollContainerRef.current;
        if (!scrollContainer) return;

        // 清理旧的监听器
        if (observer.current) observer.current.disconnect();

        observer.current = new IntersectionObserver(
            (entries) => {
                const visibleEntries = entries.filter(e => e.isIntersecting);
                if (visibleEntries.length > 0) {
                    // 获取所有可见条目，并找到最接近视口顶部的那个
                    visibleEntries.sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
                    setActiveTocId(visibleEntries[0].target.id);
                }
            },
            {
                root: scrollContainer,
                rootMargin: "0px 0px -80% 0px" // 标题进入视口顶部20%区域时触发高亮
            }
        );

        const headings = scrollContainer.querySelectorAll('h1, h2, h3, h4');
        headings.forEach(el => {
            if (el.id && observer.current) {
                observer.current.observe(el);
            }
        });

        return () => observer.current?.disconnect();
    }, [toc, scrollContainerRef]); // 依赖 toc，当 toc 生成后才开始监听

    const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
        e.preventDefault();
        const scrollContainer = scrollContainerRef.current;
        if (scrollContainer) {
            const targetElement = scrollContainer.querySelector(`#${id}`);
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }
    };

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