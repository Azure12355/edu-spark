// src/features/teacher/knowledge/knowledge-detail/sub-features/chunk-management/components/ChunkManagementTab.tsx
"use client";

import React from 'react';
import { useChunkManagementTab } from './hooks/useChunkManagementTab';

// 导入所有需要的 UI 子组件
import ChunkToolbar from './components/ChunkToolbar';
import ChunkGrid from '@/features/teacher/knowledge/knowledge-detail/sub-features/chunk-management/components/ChunkGrid';
import Pagination from '@/shared/components/ui/Pagination/Pagination';
import AddChunkModal from '@/features/teacher/knowledge/knowledge-detail/sub-features/chunk-management/components/AddChunkModal';
// 导入骨架屏和空状态组件
import ChunkGridSkeleton from '@/features/teacher/knowledge/knowledge-detail/sub-features/chunk-management/components/ChunkGridSkeleton';
import EmptyState from '@/features/teacher/knowledge/knowledge-detail/sub-features/chunk-management/components/EmptyState';


import styles from './styles/ChunkManagementTab.module.css';
import { DocumentVO } from '@/features/teacher/knowledge/knowledge-detail/services/documentService';

interface ChunkManagementTabProps {
    kbId: number | string;
    documents: DocumentVO[];
}

const ChunkManagementTab: React.FC<ChunkManagementTabProps> = ({ kbId, documents }) => {
    // 从自定义 Hook 中获取所有所需的数据和操作函数
    const {
        chunks,
        isLoading,
        pagination,
        hasActiveFilters,
        isAddModalOpen,
        viewMode,
        localSearchInput,
        sourceFilter,
        actions,
    } = useChunkManagementTab({ kbId });

    /**
     * @description 根据当前状态决定渲染哪个主内容组件。
     * 这将加载、空状态和实际内容的渲染逻辑集中在了父组件中。
     */
    const renderMainContent = () => {
        if (isLoading) {
            return <ChunkGridSkeleton viewMode={viewMode} />;
        }
        if (chunks.length === 0) {
            return <EmptyState hasFilters={hasActiveFilters} />;
        }
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
            <div className={styles.tabContentContainer}>
                <ChunkToolbar
                    chunkCount={pagination.totalItems}
                    documents={documents}
                    activeFilterId={sourceFilter}
                    onFilterChange={actions.handleFilterChange}
                    searchTerm={localSearchInput}
                    onSearchChange={actions.handleSearchInputChange}
                    viewMode={viewMode}
                    onViewModeChange={actions.onViewModeChange}
                    onOpenAddModal={actions.openAddModal}
                    isSearching={isLoading}
                />
                <div className={styles.gridContainer}>
                    {renderMainContent()}
                </div>
                {/* 仅在不加载且有内容时显示分页 */}
                {!isLoading && pagination.totalItems > 0 && (
                    <Pagination {...pagination} onPageChange={actions.setCurrentPage} />
                )}
            </div>
            <AddChunkModal
                isOpen={isAddModalOpen}
                onClose={actions.closeAddModal}
                onAddChunk={actions.handleAddChunk}
                documents={documents}
            />
        </>
    );
};

export default ChunkManagementTab;