"use client";
import React from 'react';
import styles from './MyAgentsToolbar.module.css';

interface ToolbarProps {
    searchQuery: string;
    onSearchChange: (query: string) => void;
    sortOption: string;
    onSortChange: (option: string) => void;
}

const MyAgentsToolbar: React.FC<ToolbarProps> = (
    { searchQuery, onSearchChange, sortOption, onSortChange }
) => {
    return (
        <div className={styles.toolbarContainer}>
            <div className={styles.searchBar}>
                <i className="fas fa-search"></i>
                <input
                    type="text"
                    placeholder="搜索我的智能体..."
                    value={searchQuery}
                    onChange={(e) => onSearchChange(e.target.value)}
                />
            </div>
            <div className={styles.controls}>
                <div className={styles.sortSelector}>
                    <label htmlFor="sort-select">排序方式:</label>
                    <select
                        id="sort-select"
                        value={sortOption}
                        onChange={(e) => onSortChange(e.target.value)}
                    >
                        <option value="lastUsed">最近使用</option>
                        <option value="name">名称</option>
                        <option value="usageCount">使用频率</option>
                    </select>
                </div>
                <button className={styles.createButton}>
                    <i className="fas fa-plus"></i> 创建智能体
                </button>
            </div>
        </div>
    );
};

export default MyAgentsToolbar;