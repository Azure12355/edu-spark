"use client";
import React from 'react';
import styles from './DocumentToolbar.module.css';

const DocumentToolbar = () => {
    return (
        <div className={styles.toolbar}>
            <button className={styles.importButton}><i className="fas fa-plus"></i> 导入文档</button>
            <div className={styles.searchContainer}>
                <div className={styles.filterDropdown}>名称 <i className="fas fa-chevron-down"></i></div>
                <input type="text" placeholder="搜索文档名称" className={styles.searchInput} />
                <button className={styles.searchButton}><i className="fas fa-search"></i></button>
            </div>
        </div>
    );
};
export default DocumentToolbar;