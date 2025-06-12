"use client";
import React from 'react';
import styles from './DocumentTabs.module.css';

// --- 核心修改：新增“基本信息”并调整顺序 ---
const TABS = ['基本信息', '原始文档', '切片详情', '知识检索', '知识问答'];
// --- 结束修改 ---

interface DocumentTabsProps {
    activeTab: string;
    onTabChange: (tab: string) => void;
}

const DocumentTabs: React.FC<DocumentTabsProps> = ({ activeTab, onTabChange }) => {
    return (
        <nav className={styles.tabsContainer}>
            {TABS.map(tab => (
                <button
                    key={tab}
                    className={`${styles.tabButton} ${activeTab === tab ? styles.active : ''}`}
                    onClick={() => onTabChange(tab)}
                >
                    {tab}
                </button>
            ))}
        </nav>
    );
};
export default DocumentTabs;