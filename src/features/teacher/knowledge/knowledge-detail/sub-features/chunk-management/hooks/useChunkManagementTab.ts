// src/features/teacher/knowledge/knowledge-detail/sub-features/chunk-management/hooks/useChunkManagementTab.ts
"use client";

import { useState, useCallback } from 'react';
import { useDebounce } from '@/shared/hooks/useDebounce';
import { useChunkManagement } from '@/features/teacher/knowledge/knowledge-detail/services/useChunkManagement';
import { ViewMode } from '@/features/teacher/knowledge/knowledge-detail/sub-features/chunk-management/components/toolbar-parts/ViewModeToggle';


interface UseChunkManagementTabProps {
    kbId: number | string;
}

/**
 * 管理“切片详情”标签页的 UI 逻辑和状态。
 *
 * @param {UseChunkManagementTabProps} props - 包含知识库 ID。
 * @returns {object} - 返回给组件渲染所需的所有状态和处理函数。
 */
export const useChunkManagementTab = ({ kbId }: UseChunkManagementTabProps) => {
    // 业务逻辑 Hooks
    const chunkManager = useChunkManagement(kbId);

    // --- UI 状态管理 ---
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [viewMode, setViewMode] = useState<ViewMode>('grid');
    // 用于即时反馈给输入框的本地搜索词
    const [localSearchInput, setLocalSearchInput] = useState('');

    // --- 逻辑处理 ---
    const hasActiveFilters = chunkManager.filters.sourceFilter !== 'ALL' || !!chunkManager.filters.searchTerm;

    // 创建 setSearchTerm 的防抖版本
    const debouncedSetSearchTerm = useDebounce(chunkManager.actions.setSearchTerm, 300);

    // 输入框 onChange 事件处理器
    const handleSearchInputChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        const term = event.target.value;
        setLocalSearchInput(term); // 立即更新UI
        debouncedSetSearchTerm(term); // 延迟更新业务逻辑状态
    }, [debouncedSetSearchTerm]);

    return {
        // 数据
        chunks: chunkManager.chunks,
        isLoading: chunkManager.isLoading,
        pagination: chunkManager.pagination,
        hasActiveFilters,

        // 状态
        isAddModalOpen,
        viewMode,
        localSearchInput,

        // 筛选相关
        sourceFilter: chunkManager.filters.sourceFilter,

        // 操作函数
        actions: {
            handleFilterChange: chunkManager.actions.handleFilterChange,
            handleDeleteChunk: chunkManager.actions.handleDeleteChunk,
            handleAddChunk: chunkManager.actions.handleAddChunk,
            setCurrentPage: chunkManager.actions.setCurrentPage,
            handleSearchInputChange,
            openAddModal: () => setIsAddModalOpen(true),
            closeAddModal: () => setIsAddModalOpen(false),
            onViewModeChange: setViewMode,
        },
    };
};