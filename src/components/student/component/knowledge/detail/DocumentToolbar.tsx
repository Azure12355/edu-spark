"use client";
import React from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation'; // 引入 useParams
import styles from './DocumentToolbar.module.css';

const DocumentToolbar = () => {
    const params = useParams();
    const kbId = params.id; // 获取当前知识库的 ID

    return (
        <div className={styles.toolbar}>
            {/* --- 核心修改：将 button 替换为 Link --- */}
            <Link href={`/student/knowledge/${kbId}/import`} passHref>
                <button className={styles.importButton}><i className="fas fa-plus"></i> 导入文档</button>
            </Link>
            {/* --- 结束修改 --- */}
            <div className={styles.searchContainer}>
                <div className={styles.filterDropdown}>名称 <i className="fas fa-chevron-down"></i></div>
                <input type="text" placeholder="搜索文档名称" className={styles.searchInput} />
                <button className={styles.searchButton}><i className="fas fa-search"></i></button>
            </div>
        </div>
    );
};
export default DocumentToolbar;