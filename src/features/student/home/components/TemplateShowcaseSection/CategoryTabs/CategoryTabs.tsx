"use client";

import React from 'react';
import styles from './CategoryTabs.module.css';

interface CategoryTabsProps {
    categories: string[];
    // activeCategory: string; // 未来可以传入 active 状态
    // onTabChange: (category: string) => void; // 未来可以传入切换逻辑
}

const CategoryTabs: React.FC<CategoryTabsProps> = ({ categories }) => {
    return (
        <div className={styles.categoryTabs}>
            {categories.map((cat, index) => (
                // 暂时将第一个设为 active
                <button key={cat} className={`${styles.categoryTab} ${index === 0 ? styles.activeCategoryTab : ''}`}>
                    {cat}
                </button>
            ))}
        </div>
    );
};

export default CategoryTabs;