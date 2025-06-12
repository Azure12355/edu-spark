"use client";
import React from 'react';
import styles from './KnowledgeToolbar.module.css';

interface KnowledgeToolbarProps {
    count: number;
    onOpenCreateModal: () => void; // 新增一个 prop 用于打开弹窗
}

const KnowledgeToolbar: React.FC<KnowledgeToolbarProps> = ({ count, onOpenCreateModal }) => {
    return (
        <div className={styles.toolbarContainer}>
            <div className={styles.leftSection}>
                {/* 修改 onClick 事件 */}
                <button className={styles.createButton} onClick={onOpenCreateModal}>
                    创建知识库 <i className="fas fa-chevron-down"></i>
                </button>
                <span className={styles.countInfo}>共 {count} 个知识库</span>
            </div>
            <div className={styles.searchBar}>
                <i className="fas fa-search"></i>
                <input type="text" placeholder="请输入知识库名称进行搜索" />
            </div>
        </div>
    );
};

export default KnowledgeToolbar;