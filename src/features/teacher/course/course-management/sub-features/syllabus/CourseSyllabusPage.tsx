"use client";

import React from 'react';
import styles from './CourseSyllabus.module.css';
// 1. 导入我们新创建的 Hook
import { useSyllabus } from './hooks/useSyllabus';
import SyllabusHeader from './components/SyllabusHeader/SyllabusHeader';
import SyllabusTree from './components/SyllabusTree/SyllabusTree';

// 加载和错误状态的组件 (可复用)
const LoadingState = () => (
    <div className={styles.stateContainer}>
        <div className={styles.spinner}></div>
        <p>正在加载课程大纲...</p>
    </div>
);
const ErrorState = ({ onRetry }: { onRetry: () => void }) => (
    <div className={styles.stateContainer}>
        <i className={`fas fa-exclamation-triangle ${styles.errorIcon}`}></i>
        <h3>加载失败</h3>
        <p>无法获取课程大纲，请检查网络或稍后重试。</p>
        <button onClick={onRetry} className={styles.retryButton}>点击重试</button>
    </div>
);


export default function CourseSyllabusPage() {
    // 2. 调用 Hook，获取所有数据、状态和方法
    const {
        syllabus,
        isLoading,
        error,
        expandedItems,
        toggleItem,
        expandAll,
        collapseAll,
        refetch
    } = useSyllabus();

    return (
        <div className={styles.pageContainer}>
            {/* 3. 将方法传递给 Header */}
            <SyllabusHeader onExpandAll={expandAll} onCollapseAll={collapseAll} />

            <div className={styles.contentArea}>
                {/* 4. 根据状态进行条件渲染 */}
                {isLoading && !syllabus && <LoadingState />}

                {error && <ErrorState onRetry={refetch} />}

                {!isLoading && !error && syllabus && (
                    <SyllabusTree
                        chapters={syllabus.chapters}
                        expandedItems={expandedItems}
                        toggleItem={toggleItem}
                    />
                )}
            </div>
        </div>
    );
}