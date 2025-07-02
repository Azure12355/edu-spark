// src/features/teacher/knowledge/knowledge-detail/sub-features/chunk-management/ChunkManagementTab.tsx
"use client";

import React from 'react';
// --- 逻辑 Hook ---
import { useChunkManagement } from './hooks/useChunkManagement';

// --- UI 组件 ---
import ChunkToolbar from './components/ChunkToolbar';
import ChunkGrid from './components/ChunkGrid';
import Pagination from '@/shared/components/ui/Pagination/Pagination';
import AddChunkModal from './components/AddChunkModal';
import ChunkGridSkeleton from './components/ChunkGridSkeleton';
import EmptyState from './components/EmptyState';

// --- 样式 ---
import styles from './styles/ChunkManagementTab.module.css';
import { DocumentVO } from '../document-management/services/documentService';

interface ChunkManagementTabProps {
    kbId: number | string;
    documents: DocumentVO[];
}

/**
 * @description “切片管理”标签页的装配组件。
 * 它调用 useChunkManagement Hook 来获取所有业务逻辑和状态，
 * 并将它们传递给纯展示型子组件。
 *
 * @param {ChunkManagementTabProps} props - 包含知识库ID和文档列表。
 * @returns {React.ReactElement}
 */
const ChunkManagementTab: React.FC<ChunkManagementTabProps> = ({ kbId, documents }) => {
    // 1. 调用主逻辑 Hook，获取所有需要的数据、状态和操作函数
    const {
        chunks,
        pagination,
        isLoading,
        isSubmitting,
        viewMode,
        isAddModalOpen,
        sourceFilter,
        searchTerm,
        addModalState,
        actions,
    } = useChunkManagement({ kbId });

    /**
     * @description 根据当前状态决定渲染哪个主内容组件。
     * 这种方式使得主 return 语句的结构非常清晰。
     */
    const renderMainContent = () => {
        // 初始加载时显示骨架屏
        if (isLoading && chunks.length === 0) {
            return <ChunkGridSkeleton viewMode={viewMode} />;
        }
        // 加载完成但无数据时显示空状态
        if (!isLoading && chunks.length === 0) {
            const hasFilters = sourceFilter !== 'ALL' || !!searchTerm;
            return <EmptyState hasFilters={hasFilters} />;
        }
        // 正常显示数据网格
        return (
            <ChunkGrid
                chunks={chunks}
                onDeleteChunk={actions.handleDeleteChunk}
                viewMode={viewMode}
            />
        );
    };

    return (
        <>
            {/* 主内容容器 */}
            <div className={styles.tabContentContainer}>
                {/* 2. 装配工具栏，并传递所需的所有 props */}
                <ChunkToolbar
                    chunkCount={pagination.totalItems}
                    documents={documents}
                    activeFilterId={sourceFilter}
                    searchTerm={searchTerm}
                    viewMode={viewMode}
                    isSearching={isLoading} // 将 isLoading 状态传递给搜索框
                    onFilterChange={actions.handleFilterChange}
                    onSearchChange={actions.handleSearchChange}
                    onViewModeChange={actions.handleViewModeChange}
                    onOpenAddModal={actions.openAddModal}
                />

                {/* 3. 装配网格/列表区域 */}
                <div className={styles.gridContainer}>
                    {renderMainContent()}
                </div>

                {/* 4. 装配分页组件，仅在有数据且不在加载中时显示 */}
                {!isLoading && pagination.totalItems > 0 && (
                    <Pagination {...pagination} onPageChange={actions.handlePageChange} />
                )}
            </div>

            {/* 5. 装配添加切片模态框，并传递所需的所有 props */}
            <AddChunkModal
                isOpen={isAddModalOpen}
                documents={documents}
                selectedDocId={addModalState.selectedDocId}
                content={addModalState.content}
                isSubmitting={isSubmitting} // 将 isSubmitting 状态传递给模态框
                onClose={actions.closeAddModal}
                onSelectedDocIdChange={actions.handleAddModalDocChange}
                onContentChange={actions.handleAddModalContentChange}
                onSubmit={actions.handleAddModalSubmit}
            />
        </>
    );
};

export default ChunkManagementTab;