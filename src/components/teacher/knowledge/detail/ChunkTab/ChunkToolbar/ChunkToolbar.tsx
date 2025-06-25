"use client";
import React from 'react';
import styles from './ChunkToolbar.module.css';

// 新增 Props 接口
interface ChunkToolbarProps {
    chunkCount: number;
    onOpenAddModal: () => void;
}

const ChunkToolbar: React.FC<ChunkToolbarProps> = ({ chunkCount, onOpenAddModal }) => {
    return (
        <div className={styles.toolbar}>
            <div className={styles.leftSection}>
                {/* 修改 onClick 事件 */}
                <button className={styles.newButton} onClick={onOpenAddModal}>
                    <i className="fas fa-plus"></i> 新增切片
                </button>
                <span className={styles.countInfo}>共 {chunkCount} 切片</span>
            </div>
            <div className={styles.rightSection}>
                <select className={styles.filterSelect}>
                    <option>全部文档</option>
                    <option>Python基本语法.docx</option>
                    <option>Python基本语法.pdf</option>
                </select>
                <div className={styles.searchBar}>
                    <i className={`fas fa-search ${styles.searchIcon}`}></i>
                    <input type="text" placeholder="搜索切片 ID" className={styles.searchInput} />
                </div>
                <div className={styles.viewToggle}>
                    <button className={styles.toggleButton}><i className="fas fa-list"></i></button>
                    <button className={`${styles.toggleButton} ${styles.active}`}><i className="fas fa-th-large"></i></button>
                </div>
            </div>
        </div>
    );
};

export default ChunkToolbar;