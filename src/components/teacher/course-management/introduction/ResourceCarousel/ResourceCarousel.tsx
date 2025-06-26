// src/components/teacher/course-management/introduction/ResourceCarousel/ResourceCarousel.tsx
"use client";
import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './ResourceCarousel.module.css';

// 1. 扩展数据结构，为每本书添加主题色
export interface BookResource {
    title: string;
    author: string;
    coverUrl: string;
    themeColor: string; // e.g., 'rgba(79, 70, 229, 0.2)'
}

interface ResourceCarouselProps {
    books: BookResource[];
}

// 2. 定义动画变体
const variants = {
    enter: (direction: number) => ({
        x: direction > 0 ? 30 : -30,
        opacity: 0,
        scale: 0.95
    }),
    center: {
        zIndex: 1,
        x: 0,
        opacity: 1,
        scale: 1
    },
    exit: (direction: number) => ({
        zIndex: 0,
        x: direction < 0 ? 30 : -30,
        opacity: 0,
        scale: 0.95
    })
};

const ResourceCarousel: React.FC<ResourceCarouselProps> = ({ books }) => {
    const [[page, direction], setPage] = useState([0, 0]);

    const paginate = (newDirection: number) => {
        setPage([page + newDirection, newDirection]);
    };

    // 3. 计算正确的书籍索引，处理循环
    const bookIndex = ((page % books.length) + books.length) % books.length;

    return (
        <div
            className={styles.carouselContainer}
            // 4. 动态设置背景渐变色
            style={{ '--bg-glow-color': books[bookIndex].themeColor } as React.CSSProperties}
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
                            <Image src={books[bookIndex].coverUrl} alt={books[bookIndex].title} layout="fill" objectFit="cover" priority/>
                        </div>
                    </motion.div>
                </AnimatePresence>

                {/* 5. 装饰性的背景书籍封面 */}
                <div className={`${styles.backgroundCover} ${styles.bgCoverLeft}`}>
                    <Image src={books[((bookIndex - 1 + books.length) % books.length)].coverUrl} alt="" layout="fill" objectFit="cover" />
                </div>
                <div className={`${styles.backgroundCover} ${styles.bgCoverRight}`}>
                    <Image src={books[(bookIndex + 1) % books.length].coverUrl} alt="" layout="fill" objectFit="cover" />
                </div>
            </div>

            <div className={styles.bookInfo}>
                <h5 className={styles.bookTitle}>{books[bookIndex].title}</h5>
                <p className={styles.bookAuthor}>{books[bookIndex].author}</p>
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