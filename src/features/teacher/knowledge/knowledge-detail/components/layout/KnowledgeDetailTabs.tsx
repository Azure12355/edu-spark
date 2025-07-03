"use client";
import React from 'react';
import { motion } from 'framer-motion';
import styles from './KnowledgeDetailTabs.module.css';

// 1. 【类型安全】更新 Props 接口
interface KnowledgDetailTabsProps {
    tabs: string[]; // 接收一个字符串数组作为标签页列表
    activeTab: string | any;
    onTabChange: (tab: string) => void;
}

const KnowledgeDetailTabs: React.FC<KnowledgDetailTabsProps> = ({ tabs, activeTab, onTabChange }) => {
    return (
        <nav className={styles.tabsContainer}>
            <div className={styles.tabsList}>
                {/* 2. 【数据驱动】遍历从 props 接收的 tabs 数组 */}
                {tabs.map(tab => (
                    <button
                        key={tab}
                        className={`${styles.tabButton} ${activeTab === tab ? styles.active : ''}`}
                        onClick={() => onTabChange(tab)}
                    >
                        {activeTab === tab && (
                            <motion.div
                                className={styles.activePill}
                                layoutId="activeTabIndicator"
                                transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                            />
                        )}
                        <span className={styles.tabText}>{tab}</span>
                    </button>
                ))}
            </div>
        </nav>
    );
};

export default KnowledgeDetailTabs;