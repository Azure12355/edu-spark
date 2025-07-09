// [!file src/features/teacher/shared-resources/components/ResourceToolbar/ResourceToolbar.tsx]
"use client";

import React from 'react';
import styles from './ResourceToolbar.module.css';
import { ResourceType } from '../../hooks/useSharedResources';

// 定义 Props 类型
interface ResourceToolbarProps {
    searchTerm: string;
    onSearchChange: (term: string) => void;
    activeTab: ResourceType;
    onTabChange: (tab: ResourceType) => void;
}

const ResourceToolbar: React.FC<ResourceToolbarProps> = ({
                                                             searchTerm,
                                                             onSearchChange,
                                                             activeTab,
                                                             onTabChange,
                                                         }) => {
    return (
        <div className={styles.toolbarContainer}>
            {/* 左侧 Tab 切换区域 */}
            <div className={styles.tabs}>
                <button
                    className={`${styles.tabButton} ${activeTab === 'courses' ? styles.active : ''}`}
                    onClick={() => onTabChange('courses')}
                >
                    <i className="fas fa-book-open"></i>
                    <span>公开课程</span>
                </button>
                <button
                    className={`${styles.tabButton} ${activeTab === 'knowledgeBases' ? styles.active : ''}`}
                    onClick={() => onTabChange('knowledgeBases')}
                >
                    <i className="fas fa-database"></i>
                    <span>知识库广场</span>
                </button>
            </div>

            {/* 右侧搜索框 */}
            <div className={styles.searchWrapper}>
                <i className={`fas fa-search ${styles.searchIcon}`}></i>
                <input
                    type="text"
                    placeholder={`搜索公开${activeTab === 'courses' ? '课程' : '知识库'}...`}
                    className={styles.searchInput}
                    value={searchTerm}
                    onChange={(e) => onSearchChange(e.target.value)}
                />
            </div>
        </div>
    );
};

export default ResourceToolbar;