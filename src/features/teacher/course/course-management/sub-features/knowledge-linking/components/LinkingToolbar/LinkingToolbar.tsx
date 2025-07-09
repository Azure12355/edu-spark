// [!file src/features/teacher/course/course-management/sub-features/knowledge-linking/components/LinkingToolbar/LinkingToolbar.tsx]
"use client";

import React from 'react';
import styles from './LinkingToolbar.module.css';

// 定义 Props 类型
interface LinkingToolbarProps {
    searchTerm: string;
    onSearchChange: (term: string) => void;
}

const LinkingToolbar: React.FC<LinkingToolbarProps> = ({
                                                           searchTerm,
                                                           onSearchChange,
                                                       }) => {
    return (
        <div className={styles.toolbarContainer}>
            <div className={styles.searchInputWrapper}>
                <i className={`fas fa-search ${styles.searchIcon}`}></i>
                <input
                    type="text"
                    placeholder="搜索可用的知识库名称..."
                    className={styles.searchInput}
                    value={searchTerm}
                    onChange={(e) => onSearchChange(e.target.value)}
                />
            </div>

            <div className={styles.rightActions}>
                {/* 预留给未来的操作按钮，例如“新建知识库”的快捷入口 */}
                {/*
                <button className={styles.actionButton}>
                    <i className="fas fa-plus"></i> 新建知识库
                </button>
                */}
            </div>
        </div>
    );
};

export default LinkingToolbar;