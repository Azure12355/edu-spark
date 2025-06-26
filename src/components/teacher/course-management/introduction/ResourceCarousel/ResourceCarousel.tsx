// src/components/teacher/course-management/introduction/ResourceCarousel/ResourceCarousel.tsx
"use client";
import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './ResourceCarousel.module.css';

export interface BookResource {
    title: string;
    author: string;
    coverUrl: string;
}

interface ResourceCarouselProps {
    books: BookResource[];
}

const ResourceCarousel: React.FC<ResourceCarouselProps> = ({ books }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const goToPrevious = () => {
        const isFirstSlide = currentIndex === 0;
        const newIndex = isFirstSlide ? books.length - 1 : currentIndex - 1;
        setCurrentIndex(newIndex);
    };

    const goToNext = () => {
        const isLastSlide = currentIndex === books.length - 1;
        const newIndex = isLastSlide ? 0 : currentIndex + 1;
        setCurrentIndex(newIndex);
    };

    return (
        <div className={styles.carouselContainer}>
            <div className={styles.carouselTrackWrapper}>
                <motion.div
                    className={styles.carouselTrack}
                    animate={{ x: `-${currentIndex * 100}%` }}
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                >
                    {books.map((book, index) => (
                        <div key={index} className={styles.slide}>
                            <div className={styles.bookCover}>
                                <Image src={book.coverUrl} alt={book.title} layout="fill" objectFit="cover" />
                            </div>
                            <div className={styles.bookInfo}>
                                <h5 className={styles.bookTitle}>{book.title}</h5>
                                <p className={styles.bookAuthor}>{book.author}</p>
                            </div>
                        </div>
                    ))}
                </motion.div>
            </div>
            <div className={styles.controls}>
                <button onClick={goToPrevious} className={styles.navButton} aria-label="上一本">
                    <i className="fas fa-arrow-left"></i>
                </button>
                <div className={styles.dotsContainer}>
                    {books.map((_, index) => (
                        <div
                            key={index}
                            className={`${styles.dot} ${currentIndex === index ? styles.active : ''}`}
                            onClick={() => setCurrentIndex(index)}
                        />
                    ))}
                </div>
                <button onClick={goToNext} className={styles.navButton} aria-label="下一本">
                    <i className="fas fa-arrow-right"></i>
                </button>
            </div>
        </div>
    );
};

export default ResourceCarousel;