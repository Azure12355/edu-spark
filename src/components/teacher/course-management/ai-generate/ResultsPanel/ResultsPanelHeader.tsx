// src/components/teacher/course-management/ai-generate/ResultsPanel/ResultsPanelHeader.tsx
"use client";
import React, { useState } from 'react';
import styles from './ResultsPanelHeader.module.css';

interface Props {
    total: number;
    onClear?: () => void;
    onAddToBank?: () => void;
    onRefresh?: () => void; // 新增一个刷新回调
}

const ResultsPanelHeader: React.FC<Props> = ({ total, onClear, onAddToBank, onRefresh }) => {
    const [isRefreshing, setIsRefreshing] = useState(false);

    const handleRefresh = () => {
        setIsRefreshing(true);
        if(onRefresh) onRefresh();
        // 模拟一个网络请求
        setTimeout(() => {
            setIsRefreshing(false);
        }, 1000);
    };

    return (
        <header className={styles.header}>
            <div className={styles.titleGroup}>
                <span className={styles.countBadge}>{total}</span>
                <h2 className={styles.title}>已生成题目</h2>
            </div>

            <div className={styles.actions}>
                {/* 刷新和清空按钮组 */}
                <div className={styles.buttonGroup}>
                    <button
                        className={`${styles.iconButton} ${isRefreshing ? styles.spinning : ''}`}
                        onClick={handleRefresh}
                        title="重新生成"
                        disabled={isRefreshing}
                    >
                        <i className="fas fa-sync-alt"></i>
                    </button>
                    <button onClick={onClear} className={styles.textButton}>清空题目</button>
                </div>

                {/* 分隔线 */}
                <div className={styles.divider}></div>

                {/* 加入题库按钮 */}
                <button onClick={onAddToBank} className={`${styles.textButton} ${styles.primaryButton}`}>加入题库</button>
            </div>
        </header>
    );
};

export default ResultsPanelHeader;