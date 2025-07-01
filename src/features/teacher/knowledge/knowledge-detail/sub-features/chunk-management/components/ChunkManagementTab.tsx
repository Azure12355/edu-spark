// src/features/teacher/knowledge/knowledge-detail/sub-features/chunk-management/components/ChunkManagementTab.tsx
"use client";

import React from 'react';
import { useChunkManagementTab } from '../hooks/useChunkManagementTab';

// 导入所有需要的 UI 子组件
import ChunkToolbar from './ChunkToolbar'; // 导入重构后的 Toolbar
import ChunkGrid from '@/features/teacher/knowledge/knowledge-detail/components/tabs/chunks/ChunkGrid';
import Pagination from '@/shared/components/ui/Pagination/Pagination';
import AddChunkModal from '@/features/teacher/knowledge/knowledge-detail/components/tabs/chunks/AddChunkModal';

import styles from '../styles/ChunkManagementTab.module.css';
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
                    <ChunkGrid
                        chunks={chunks}
                        isLoading={isLoading}
                        onDeleteChunk={actions.handleDeleteChunk}
                        viewMode={viewMode}
                        hasActiveFilters={hasActiveFilters}
                    />
                </div>
                {pagination.totalItems > 0 && !isLoading && (
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