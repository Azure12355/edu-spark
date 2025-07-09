// [!file src/features/teacher/course/course-management/sub-features/knowledge-linking/KnowledgeLinkingPage.tsx]
"use client";

import React from 'react';
import styles from './KnowledgeLinking.module.css';
import { useKnowledgeLinking } from './hooks/useKnowledgeLinking';

// 导入真实的UI组件（我们稍后会创建它们）
import LinkingToolbar from './components/LinkingToolbar/LinkingToolbar';
import LinkedKnowledgeBases from './components/LinkedKnowledgeBases/LinkedKnowledgeBases';
import AvailableKnowledgeBases from './components/AvailableKnowledgeBases/AvailableKnowledgeBases';

/**
 * 课程知识库关联页面的主组件。
 */
export default function KnowledgeLinkingPage() {
    // 1. 调用核心 Hook 获取所有状态和操作函数
    const {
        linkedKBs,
        availableKBs,
        isLoading,
        error,
        searchTerm,
        setSearchTerm,
        handleLinkKnowledgeBase,
        handleUnlinkKnowledgeBase,
    } = useKnowledgeLinking();

    // 2. 渲染主内容区域的逻辑
    const renderContent = () => {
        if (error) {
            return (
                <div className={styles.feedbackContainer}>
                    <i className="fas fa-exclamation-circle"></i>
                    <p>加载知识库数据失败: {error}</p>
                </div>
            );
        }

        // 正常渲染双栏布局
        return (
            <div className={styles.mainLayout}>
                <LinkedKnowledgeBases
                    linkedKBs={linkedKBs}
                    onUnlink={handleUnlinkKnowledgeBase}
                    isLoading={isLoading} // 传递加载状态
                />
                <AvailableKnowledgeBases
                    availableKBs={availableKBs}
                    onLink={handleLinkKnowledgeBase}
                    isLoading={isLoading} // 传递加载状态
                />
            </div>
        );
    };

    return (
        <div className={styles.pageContainer}>
            <header className={styles.header}>
                <h1 className={styles.title}>关联知识库</h1>
                <p className={styles.subtitle}>
                    将知识库关联到当前课程，为AI助教和智能出题提供知识源。
                </p>
            </header>

            <LinkingToolbar
                searchTerm={searchTerm}
                onSearchChange={setSearchTerm}
            />

            {renderContent()}
        </div>
    );
}