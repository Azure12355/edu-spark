"use client";
import React from 'react';
import { motion } from 'framer-motion';
import styles from './DocumentTabs.module.css';

// 1. 数据驱动：将Tabs定义为常量数组，便于管理和扩展
const TABS = ['基本信息', '原始文档', '切片详情', '知识检索', '知识问答', '使用统计'];

interface DocumentTabsProps {
    activeTab: string;
    onTabChange: (tab: string) => void;
}

const DocumentTabs: React.FC<DocumentTabsProps> = ({ activeTab, onTabChange }) => {
    return (
        <nav className={styles.tabsContainer}>
            <div className={styles.tabsList}>
                {TABS.map(tab => (
                    <button
                        key={tab}
                        className={`${styles.tabButton} ${activeTab === tab ? styles.active : ''}`}
                        onClick={() => onTabChange(tab)}
                    >
                        {/* 2. 为活动指示器添加一个 motion.div */}
                        {activeTab === tab && (
                            <motion.div
                                className={styles.activePill}
                                layoutId="activeTabIndicator" // 关键：让Framer Motion追踪这个元素
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

export default DocumentTabs;