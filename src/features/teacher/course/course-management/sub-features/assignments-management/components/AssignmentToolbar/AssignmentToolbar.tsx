// [!file src/features/teacher/course/course-management/sub-features/assignments-management/components/AssignmentToolbar/AssignmentToolbar.tsx]
"use client";

import React from 'react';
import styles from './AssignmentToolbar.module.css';

// 定义 Props 类型
interface AssignmentToolbarProps {
    searchTerm: string;
    onSearchChange: (term: string) => void;
    activeTab: 'templates' | 'activities';
    onTabChange: (tab: 'templates' | 'activities') => void;
    onCreateTemplate: () => void;
}

const AssignmentToolbar: React.FC<AssignmentToolbarProps> = ({
                                                                 searchTerm,
                                                                 onSearchChange,
                                                                 activeTab,
                                                                 onTabChange,
                                                                 onCreateTemplate,
                                                             }) => {
    return (
        <div className={styles.toolbarContainer}>
            {/* 左侧 Tab 切换区域 */}
            <div className={styles.leftSection}>
                <div className={styles.tabs}>
                    <button
                        className={`${styles.tabButton} ${activeTab === 'templates' ? styles.activeTab : ''}`}
                        onClick={() => onTabChange('templates')}
                    >
                        作业模板库
                    </button>
                    <button
                        className={`${styles.tabButton} ${activeTab === 'activities' ? styles.activeTab : ''}`}
                        onClick={() => onTabChange('activities')}
                    >
                        已发布活动
                    </button>
                </div>
                {/* 搜索框 */}
                <div className={styles.searchInputWrapper}>
                    <i className={`fas fa-search ${styles.searchIcon}`}></i>
                    <input
                        type="text"
                        placeholder={activeTab === 'templates' ? "搜索模板名称..." : "搜索活动标题..."}
                        className={styles.searchInput}
                        value={searchTerm}
                        onChange={(e) => onSearchChange(e.target.value)}
                    />
                </div>
            </div>

            {/* 右侧操作按钮区域 */}
            <div className={styles.rightSection}>
                {activeTab === 'templates' && (
                    <button onClick={onCreateTemplate} className={styles.createButton}>
                        <i className="fas fa-plus"></i>
                        <span>创建模板</span>
                    </button>
                )}
                {/* 如果是已发布活动Tab，未来可以放其他操作，比如“发布新活动”的通用按钮，但现在只允许在模板库创建模板 */}
            </div>
        </div>
    );
};

export default AssignmentToolbar;