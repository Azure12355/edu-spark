// src/app/teacher/(dashboard)/knowledge/[id]/page.tsx
"use client";

import React, { useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';

// --- 新的 Hooks 和组件 ---
import { useKnowledgeDetail } from '@/hooks/useKnowledgeDetail';
import KnowledgeDetailView from '@/components/teacher/knowledge/detail/view/KnowledgeDetailView';

// --- 样式和辅助组件 ---
import styles from './knowledgeDetail.module.css'; // 复用原有的 centeredState, spinner 等样式

// --- 可复用的状态显示组件 ---
const LoadingState: React.FC<{ message: string }> = ({ message }) => (
    <div className={styles.centeredState}>
        <div className={styles.spinner}></div>
        <p>{message}</p>
    </div>
);

const NotFoundState: React.FC = () => {
    const router = useRouter();

    useEffect(() => {
        const timer = setTimeout(() => {
            router.push('/teacher/knowledge');
        }, 2500);
        return () => clearTimeout(timer);
    }, [router]);

    return (
        <div className={styles.centeredState}>
            <i className="fas fa-exclamation-triangle" style={{ fontSize: '48px', color: '#f59e0b' }}></i>
            <p style={{ fontSize: '18px', fontWeight: 600 }}>知识库不存在</p>
            <p>无法找到您要访问的资源，即将返回列表页...</p>
        </div>
    );
};


export default function KnowledgeDetailPage() {
    const params = useParams();
    const kbId = params.id as string;

    // --- 核心：只调用一个 Hook 来管理页面核心状态 ---
    const { kb, isLoading, isNotFound } = useKnowledgeDetail(kbId);

    // --- 根据状态进行渲染决策 ---
    if (isLoading) {
        return <LoadingState message="正在加载知识库数据..." />;
    }

    if (isNotFound || !kb) {
        return <NotFoundState />;
    }

    // --- 数据加载成功，渲染主视图组件 ---
    return <KnowledgeDetailView kb={kb} />;
}