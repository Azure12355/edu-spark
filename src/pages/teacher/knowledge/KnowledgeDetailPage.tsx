// src/pages/teacher/knowledge/KnowledgeDetailPage.tsx
"use client";

import React, { Suspense } from 'react';

// [!code focus start]
// --- 导入新的自定义 Hook ---
import { useKnowledgeDetailPage } from '@/features/teacher/knowledge/knowledge-detail/hooks/useKnowledgeDetailPage';
// [!code focus end]

// --- UI 组件 ---
import KnowledgeDetailView from '@/features/teacher/knowledge/knowledge-detail/components/view/KnowledgeDetailView';
import styles from './KnowledgeDetail.module.css'; // 样式文件保持不变

// --- 可复用的状态显示组件 (保持不变) ---
const LoadingState: React.FC<{ message: string }> = ({ message }) => (
    <div className={styles.centeredState}>
        <div className={styles.spinner}></div>
        <p>{message}</p>
    </div>
);

const NotFoundState: React.FC = () => (
    <div className={styles.centeredState}>
        <i className="fas fa-exclamation-triangle" style={{ fontSize: '48px', color: '#f59e0b' }}></i>
        <p style={{ fontSize: '18px', fontWeight: 600 }}>知识库不存在</p>
        <p>无法找到您要访问的资源，即将返回列表页...</p>
    </div>
);


/**
 * @description 页面核心装配组件。
 * 负责调用主 Hook，并根据返回的状态渲染对应的 UI。
 */
function KnowledgeDetailContent() {
    // 从自定义 Hook 中获取所有页面所需的状态和逻辑
    const { isLoading, isNotFound, kb, activeTab, handleTabChange } = useKnowledgeDetailPage();

    // 根据状态渲染不同的 UI
    if (isLoading) {
        return <LoadingState message="正在加载知识库数据..." />;
    }

    if (isNotFound || !kb) {
        return <NotFoundState />;
    }

    // 渲染主视图
    return <KnowledgeDetailView kb={kb} activeTab={activeTab} onTabChange={handleTabChange} />;
}

/**
 * @description 知识库详情页的根组件。
 * 主要作用是提供 React.Suspense 边界，以支持未来可能的异步组件或数据加载。
 */
export default function KnowledgeDetailPage() {
    return (
        <Suspense fallback={<LoadingState message="正在加载页面..." />}>
            <KnowledgeDetailContent />
        </Suspense>
    );
}