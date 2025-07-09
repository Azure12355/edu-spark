// [!file src/features/teacher/shared-resources/SharedResourcesPage.tsx]
"use client";

import React from 'react';
import styles from './SharedResources.module.css';
import { useSharedResources } from './hooks/useSharedResources';

// 导入真实的UI组件
import ResourceToolbar from './components/ResourceToolbar/ResourceToolbar';
import ResourceGrid from './components/ResourceGrid/ResourceGrid';
import Pagination from '@/shared/components/ui/Pagination/Pagination';
import HeroHeader from "@/features/teacher/shared-resources/components/HeroHeader/HeroHeader";

/**
 * 共享资源页面的主组件。
 */
export default function SharedResourcesPage() {
    // 1. 调用核心 Hook 获取所有状态和操作函数
    const {
        resources,
        isLoading,
        error,
        pagination,
        activeTab,
        searchTerm,
        handlePageChange,
        handleSearch,
        handleTabChange,
    } = useSharedResources();

    // 2. 渲染主内容区域的逻辑
    const renderMainContent = () => {
        if (error) {
            return (
                <div className={styles.feedbackContainer}>
                    <i className="fas fa-exclamation-circle"></i>
                    <p>加载共享资源失败: {error}</p>
                </div>
            );
        }

        return (
            <>
                <ResourceGrid
                    resources={resources}
                    isLoading={isLoading}
                />
                {pagination.total > pagination.pageSize && (
                    <Pagination
                        currentPage={pagination.current}
                        totalPages={Math.ceil(pagination.total / pagination.pageSize)}
                        onPageChange={handlePageChange}
                    />
                )}
            </>
        );
    };

    return (
        <div className={styles.pageContainer}>
            <HeroHeader />

            <main className={styles.mainContent}>
                <ResourceToolbar
                    searchTerm={searchTerm}
                    onSearchChange={handleSearch}
                    activeTab={activeTab}
                    onTabChange={handleTabChange}
                />

                {renderMainContent()}
            </main>
        </div>
    );
}