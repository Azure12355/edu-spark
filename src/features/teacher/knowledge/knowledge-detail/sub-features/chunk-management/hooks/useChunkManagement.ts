// src/features/teacher/knowledge/knowledge-detail/sub-features/chunk-management/hooks/useChunkManagement.ts
"use client";

import { useState, useEffect, useCallback, useMemo } from 'react';
import { useDebounce } from '@/shared/hooks/useDebounce';
import { useToast } from '@/shared/hooks/useToast';
import { Page } from '@/features/teacher/knowledge/knowledge-list/services/knowledgeService';
import {
    ChunkVO,
    AddChunkRequest,
    listChunksByPage,
    batchDeleteChunks,
    addChunk
} from '../service/chunkService';
import { ViewMode } from '../components/toolbar-parts/ViewModeToggle';

// 定义 Hook 的输入参数类型
interface UseChunkManagementProps {
    kbId: number | string;
}

// 定义 Hook 的返回值类型，方便组件解构
interface UseChunkManagementReturn {
    // 数据
    chunks: ChunkVO[];
    pagination: {
        currentPage: number;
        totalPages: number;
        totalItems: number;
    };

    // UI 状态
    isLoading: boolean;
    isSubmitting: boolean;
    viewMode: ViewMode;
    isAddModalOpen: boolean;

    // 工具栏状态
    sourceFilter: number | 'ALL';
    searchTerm: string;

    // 添加切片模态框状态
    addModalState: {
        selectedDocId: number | null;
        content: string;
    };

    // 事件处理器
    actions: {
        handlePageChange: (page: number) => void;
        handleFilterChange: (id: number | 'ALL') => void;
        handleSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
        handleViewModeChange: (mode: ViewMode) => void;
        handleDeleteChunk: (chunkId: number) => Promise<void>;

        // 模态框相关
        openAddModal: () => void;
        closeAddModal: () => void;
        handleAddModalDocChange: (id: number | null) => void;
        handleAddModalContentChange: (content: string) => void;
        handleAddModalSubmit: () => Promise<void>;
    };
}


const ITEMS_PER_PAGE = 12;

/**
 * @description 管理“切片管理”标签页所有业务逻辑的 Hook。
 * @param {UseChunkManagementProps} props - 包含知识库 ID。
 * @returns {UseChunkManagementReturn} - 返回给组件渲染所需的所有状态和处理函数。
 */
export const useChunkManagement = ({ kbId }: UseChunkManagementProps): UseChunkManagementReturn => {
    // --- 核心数据状态 ---
    const [pageData, setPageData] = useState<Page<ChunkVO> | null>(null);

    // --- UI 状态 ---
    const [isLoading, setIsLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false); // 通用于删除和添加操作
    const [viewMode, setViewMode] = useState<ViewMode>('grid');
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);

    // --- 筛选与分页状态 ---
    const [currentPage, setCurrentPage] = useState(1);
    const [sourceFilter, setSourceFilter] = useState<number | 'ALL'>('ALL');
    const [searchTerm, setSearchTerm] = useState('');
    const debouncedSearchTerm = useDebounce(searchTerm, 500);

    // --- 添加切片模态框的独立状态 ---
    const [addModalState, setAddModalState] = useState({
        selectedDocId: null as number | null,
        content: ''
    });

    // --- 外部依赖 ---
    const showToast = useToast();

    // --- 数据获取逻辑 ---
    const fetchChunks = useCallback(async () => {
        setIsLoading(true);
        try {
            const response = await listChunksByPage({
                current: currentPage,
                pageSize: ITEMS_PER_PAGE,
                knowledgeBaseId: kbId,
                documentId: sourceFilter === 'ALL' ? undefined : sourceFilter,
                searchText: debouncedSearchTerm,
                sortField: 'created_at',
                sortOrder: 'descend'
            });
            setPageData(response);
        } catch (error) {
            console.error("Failed to fetch chunks:", error);
            // 错误已由 apiClient 统一处理
        } finally {
            setIsLoading(false);
        }
    }, [kbId, currentPage, sourceFilter, debouncedSearchTerm]);

    // --- 副作用 Hooks ---
    // 当筛选条件或搜索词变化时，重置到第一页
    useEffect(() => {
        setCurrentPage(1);
    }, [sourceFilter, debouncedSearchTerm]);

    // 当任何会影响查询的参数变化时，重新获取数据
    useEffect(() => {
        fetchChunks();
    }, [fetchChunks]);

    // --- 事件处理器 ---
    const handlePageChange = (page: number) => setCurrentPage(page);
    const handleFilterChange = (id: number | 'ALL') => setSourceFilter(id);
    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(event.target.value);
    const handleViewModeChange = (mode: ViewMode) => setViewMode(mode);

    const openAddModal = () => setIsAddModalOpen(true);
    const closeAddModal = () => {
        setIsAddModalOpen(false);
        // 关闭时重置模态框状态
        setAddModalState({ selectedDocId: null, content: '' });
    };

    const handleAddModalDocChange = (id: number | null) => setAddModalState(prev => ({ ...prev, selectedDocId: id }));
    const handleAddModalContentChange = (content: string) => setAddModalState(prev => ({ ...prev, content }));

    const handleAddModalSubmit = async () => {
        if (!addModalState.selectedDocId || !addModalState.content.trim()) {
            showToast({ message: '请完整填写表单！', type: 'warning' });
            return;
        }
        setIsSubmitting(true);
        try {
            await addChunk({
                documentId: addModalState.selectedDocId,
                content: addModalState.content
            });
            showToast({ message: '新切片已成功添加！', type: 'success' });
            closeAddModal();
            // 刷新列表，并跳转到第一页看最新结果
            if (currentPage === 1) {
                fetchChunks();
            } else {
                setCurrentPage(1);
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleDeleteChunk = async (chunkId: number) => {
        setIsSubmitting(true);
        try {
            await batchDeleteChunks({ ids: [chunkId] });
            showToast({ message: '切片已成功删除', type: 'success' });
            // 优化：如果当前页只剩一项且不是第一页，则跳转到前一页
            if (pageData?.records.length === 1 && currentPage > 1) {
                setCurrentPage(p => p - 1);
            } else {
                fetchChunks();
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    // --- 派生状态 ---
    const pagination = useMemo(() => ({
        currentPage: pageData?.current ?? 1,
        totalPages: pageData ? Math.ceil(pageData.total / pageData.size) : 1,
        totalItems: pageData?.total ?? 0,
    }), [pageData]);

    // --- 返回给组件的接口 ---
    return {
        chunks: pageData?.records ?? [],
        pagination,
        isLoading,
        isSubmitting,
        viewMode,
        isAddModalOpen,
        sourceFilter,
        searchTerm,
        addModalState,
        actions: {
            handlePageChange,
            handleFilterChange,
            handleSearchChange,
            handleViewModeChange,
            handleDeleteChunk,
            openAddModal,
            closeAddModal,
            handleAddModalDocChange,
            handleAddModalContentChange,
            handleAddModalSubmit,
        },
    };
};