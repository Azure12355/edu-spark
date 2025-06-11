"use client";
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './AgentCategoryFilter.module.css';

// 重新定义分类数据，使用 Font Awesome 图标
const categoryItems = [
    { name: '计算机', iconClass: 'fas fa-laptop-code' },
    { name: '艺术设计', iconClass: 'fas fa-palette' },
    { name: '理工科', iconClass: 'fas fa-flask' },
    { name: '文史哲', iconClass: 'fas fa-book-open' },
    { name: '经管', iconClass: 'fas fa-chart-line' },
    { name: '语言', iconClass: 'fas fa-language' },
    { name: '生活娱乐', iconClass: 'fas fa-gamepad' },
    { name: '综合', iconClass: 'fas fa-infinity' },
];

const VISIBLE_CATEGORIES = 5;

const AgentCategoryFilter = () => {
    const [activeCategory, setActiveCategory] = useState('计算机');
    const [isDropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const visibleCategories = categoryItems.slice(0, VISIBLE_CATEGORIES);
    const hiddenCategories = categoryItems.slice(VISIBLE_CATEGORIES);

    const handleCategoryClick = (categoryName: string) => {
        setActiveCategory(categoryName);
        setDropdownOpen(false);
    };

    // 点击外部关闭下拉菜单
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setDropdownOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [dropdownRef]);


    return (
        <div className={styles.filterContainer}>
            <div className={styles.filterButtons}>
                {visibleCategories.map(item => (
                    <button
                        key={item.name}
                        onClick={() => handleCategoryClick(item.name)}
                        className={`${styles.filterButton} ${activeCategory === item.name ? styles.active : ''}`}
                    >
                        {activeCategory === item.name && (
                            <motion.div
                                layoutId="activeCategoryPill"
                                className={styles.activePill}
                                transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                            />
                        )}
                        <span className={styles.iconWrapper}>
                            <i className={item.iconClass}></i>
                        </span>
                        <span className={styles.textWrapper}>{item.name}</span>
                    </button>
                ))}

                {hiddenCategories.length > 0 && (
                    <div className={styles.moreButtonWrapper} ref={dropdownRef}>
                        <button
                            onClick={() => setDropdownOpen(!isDropdownOpen)}
                            className={`${styles.filterButton} ${styles.moreButton}`}
                        >
                             <span className={styles.iconWrapper}>
                                <i className="fas fa-ellipsis-h"></i>
                            </span>
                            <span className={styles.textWrapper}>更多</span>
                        </button>
                        <AnimatePresence>
                            {isDropdownOpen && (
                                <motion.div
                                    className={styles.moreDropdown}
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    {hiddenCategories.map(item => (
                                        <a key={item.name} onClick={() => handleCategoryClick(item.name)}>
                                            <i className={item.iconClass}></i> {item.name}
                                        </a>
                                    ))}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                )}
            </div>
            <button className={styles.advancedFilterButton}>
                <i className="fas fa-sliders-h"></i>
                <span>高级筛选</span>
            </button>
        </div>
    );
};

export default AgentCategoryFilter;