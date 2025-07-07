"use client";

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './ResourceCarousel.module.css';
import { BookItem } from '@/shared/types';

// 2. 更新组件的 Props 接口
interface ResourceCarouselProps {
    books?: BookItem[];
}

// 动画变体 (保持不变)
const variants = {
    enter: (direction: number) => ({
        x: direction > 0 ? 50 : -50,
        opacity: 0,
        scale: 0.9
    }),
    center: {
        zIndex: 1,
        x: 0,
        opacity: 1,
        scale: 1
    },
    exit: (direction: number) => ({
        zIndex: 0,
        x: direction < 0 ? 50 : -50,
        opacity: 0,
        scale: 0.9
    })
};

// 3. 新增一个优雅的空状态组件
const EmptyState = () => (
    <div className={styles.emptyState}>
        <div className={styles.emptyIcon}>
            <i className="fas fa-book-dead"></i>
        </div>
        <p>暂无推荐书籍</p>
    </div>
);


const ResourceCarousel: React.FC<ResourceCarouselProps> = ({ books }) => {
    // 4. 检查数据是否存在且不为空
    const hasBooks = books && books.length > 0;

    const [[page, direction], setPage] = useState([0, 0]);

    // 5. 【核心修复】: 仅在有书籍数据时才进行计算
    const bookIndex = hasBooks ? ((page % books.length) + books.length) % books.length : 0;

    // 6. 使用 useMemo 缓存当前的书籍和背景辉光色，避免不必要的重计算
    const currentBook = useMemo(() => hasBooks ? books[bookIndex] : null, [hasBooks, books, bookIndex]);
    const glowColor = useMemo(() => currentBook?.themeColor || 'rgba(100, 116, 139, 0.2)', [currentBook]);

    const paginate = (newDirection: number) => {
        setPage([page + newDirection, newDirection]);
    };

    // 如果没有书籍数据，直接渲染空状态
    if (!hasBooks) {
        return (
            <div className={styles.carouselContainer}>
                <h2 className={styles.sectionTitle}>推荐书籍</h2>
                <EmptyState />
            </div>
        );
    }

    return (
        <div
            className={styles.carouselContainer}
            style={{ '--bg-glow-color': glowColor } as React.CSSProperties}
        >
            <h2 className={styles.sectionTitle}>推荐书籍</h2>

            <div className={styles.carouselWrapper}>
                <AnimatePresence initial={false} custom={direction}>
                    <motion.div
                        key={page}
                        className={styles.slide}
                        custom={direction}
                        variants={variants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{
                            x: { type: "spring", stiffness: 300, damping: 30 },
                            opacity: { duration: 0.2 }
                        }}
                    >
                        <div className={styles.bookCover}>
                            <Image src={currentBook!.coverUrl} alt={currentBook!.title} layout="fill" objectFit="cover" priority/>
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>

            <div className={styles.bookInfo}>
                <AnimatePresence mode="wait">
                    <motion.h5
                        key={currentBook!.title}
                        className={styles.bookTitle}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                    >
                        {currentBook!.title}
                    </motion.h5>
                </AnimatePresence>
                <p className={styles.bookAuthor}>{currentBook!.author}</p>
            </div>

            <div className={styles.controls}>
                <button onClick={() => paginate(-1)} className={styles.navButton} aria-label="上一本">
                    <i className="fas fa-arrow-left"></i>
                </button>
                <div className={styles.dotsContainer}>
                    {books.map((_, i) => (
                        <div
                            key={i}
                            className={`${styles.dot} ${bookIndex === i ? styles.active : ''}`}
                            onClick={() => setPage([i, i > bookIndex ? 1 : -1])}
                        />
                    ))}
                </div>
                <button onClick={() => paginate(1)} className={styles.navButton} aria-label="下一本">
                    <i className="fas fa-arrow-right"></i>
                </button>
            </div>
        </div>
    );
};

export default ResourceCarousel;