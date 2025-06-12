"use client";
import React from 'react';
import styles from './ImportSourceTabs.module.css';

const TABS = [
    { id: 'local', icon: 'fa-folder', text: '本地上传' },
    { id: 'tos', icon: 'fa-database', text: '从 TOS 导入' },
    { id: 'lark', icon: 'fa-paper-plane', text: '飞书文档' },
    { id: 'url', icon: 'fa-link', text: '公开下载链接' },
];

interface ImportSourceTabsProps {
    activeTab: string;
    onTabChange: (tabId: string) => void;
}

const ImportSourceTabs: React.FC<ImportSourceTabsProps> = ({ activeTab, onTabChange }) => {
    return (
        <nav className={styles.tabsContainer}>
            {TABS.map(tab => (
                <button
                    key={tab.id}
                    className={`${styles.tabButton} ${activeTab === tab.id ? styles.active : ''}`}
                    onClick={() => onTabChange(tab.id)}
                >
                    <i className={`fas ${tab.icon}`}></i>
                    {tab.text}
                </button>
            ))}
        </nav>
    );
};
export default ImportSourceTabs;