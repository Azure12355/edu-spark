// src/features/teacher/knowledge/knowledge-detail/sub-features/document-management/services/useDocumentManagement.ts
"use client";

import { useState, useEffect, useCallback, useMemo } from 'react';
import { useDebounce } from '@/shared/hooks/useDebounce'; // [!code ++] 确保导入防抖 Hook
import { useToast } from '@/shared/hooks/useToast';
import { Page } from '@/features/teacher/knowledge/knowledge-list/services/knowledgeService';
import {
    DocumentVO,
    DocumentQueryRequest,
    listDocumentsByPage,
    batchDeleteDocuments,
} from './documentService';

const ITEMS_PER_PAGE = 10;

/**
 * @description 管理文档管理标签页所有业务逻辑的 Hook。
 * @param kbId - 当前知识库的 ID。
 */
export const useDocumentManagement = (kbId: string | number) => {
    // --- 核心数据状态 ---
    const [documentsPage, setDocumentsPage] = useState<Page<DocumentVO> | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [isDeleting, setIsDeleting] = useState<boolean>(false);

    // --- 筛选、排序与分页状态 ---
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [statusFilter, setStatusFilter] = useState<number | 'ALL'>('ALL');
    // [!code focus start]
    // 1. searchTerm 现在是本地的、立即更新的UI状态
    const [searchTerm, setSearchTerm] = useState<string>('');
    // 2. 使用 useDebounce 创建一个延迟更新的、用于触发API请求的状态
    const debouncedSearchTerm = useDebounce(searchTerm, 500); // 延迟500毫秒
    // [!code focus end]
    const [sort, setSort] = useState<string>('created_at:descend');

    // --- 外部依赖 ---
    const showToast = useToast();

    // --- 数据获取逻辑 ---
    // [!code focus start]
    // 3. fetchDocuments 现在依赖 debouncedSearchTerm
    const fetchDocuments = useCallback(async () => {
        // [!code focus end]
        if (!kbId) {
            setDocumentsPage(null);
            setIsLoading(false);
            return;
        }

        setIsLoading(true);
        try {
            const [sortField, sortOrder] = sort.split(':');

            const params: DocumentQueryRequest = {
                knowledgeBaseId: kbId,
                current: currentPage,
                pageSize: ITEMS_PER_PAGE,
                // [!code focus start]
                name: debouncedSearchTerm, // 4. 使用防抖后的搜索词构建请求
                // [!code focus end]
                status: statusFilter === 'ALL' ? undefined : statusFilter,
                sortField: sortField as any,
                sortOrder: sortOrder as any,
            };

            const data = await listDocumentsByPage(params);
            setDocumentsPage(data);
        } catch (error) {
            console.error("Failed to fetch documents:", error);
        } finally {
            setIsLoading(false);
        }
        // [!code focus start]
        // 5. 更新 useCallback 的依赖项
    }, [kbId, currentPage, statusFilter, debouncedSearchTerm, sort]);
    // [!code focus end]

    // --- Effect Hooks ---
    // [!code focus start]
    // 6. 主数据获取的 Effect 依赖于 debouncedSearchTerm
    useEffect(() => {
        // 当筛选、排序或防抖后的搜索词变化时，重置到第一页
        // 这样做可以避免在用户输入时就重置页码
        if (currentPage !== 1) {
            setCurrentPage(1);
        } else {
            // 如果已经在第一页，直接获取数据
            fetchDocuments();
        }
        // 注意：这里不能把 fetchDocuments 放入依赖数组，否则会因 currentPage 变化导致无限循环
    }, [statusFilter, debouncedSearchTerm, sort]);

    useEffect(() => {
        // 这个 effect 只负责响应页码变化
        fetchDocuments();
    }, [currentPage, fetchDocuments]);
    // [!code focus end]

    // --- 业务操作与事件处理器 ---
    const handleDeleteSelected = async (idsToDelete: Set<number | string>): Promise<boolean> => {
        if (idsToDelete.size === 0) {
            showToast({ message: '请至少选择一个文档进行删除', type: 'warning' });
            return false;
        }

        setIsDeleting(true);
        try {
            await batchDeleteDocuments({ ids: Array.from(idsToDelete) });
            showToast({ message: `成功删除 ${idsToDelete.size} 个文档`, type: 'success' });

            if (documentsPage && idsToDelete.size === documentsPage.records.length && currentPage > 1) {
                setCurrentPage(p => p - 1);
            } else {
                fetchDocuments();
            }
            return true;
        } catch (error) {
            return false;
        } finally {
            setIsDeleting(false);
        }
    };

    // ... handleSortChange 保持不变 ...
    const handleSortChange = (newSortKey: string) => {
        const [currentField] = sort.split(':');
        if (currentField === newSortKey) {
            setSort(prev => {
                const [field, order] = prev.split(':');
                return `${field}:${order === 'ascend' ? 'descend' : 'ascend'}`;
            });
        } else {
            setSort(`${newSortKey}:descend`);
        }
    };

    const pagination = useMemo(() => ({
        currentPage: documentsPage?.current ?? 1,
        totalPages: documentsPage ? Math.ceil(documentsPage.total / documentsPage.size) : 1,
        totalItems: documentsPage?.total ?? 0,
    }), [documentsPage]);

    return {
        documents: documentsPage?.records ?? [],
        isLoading,
        isDeleting,
        pagination,

        // 筛选、排序、搜索状态 (传递给 Toolbar)
        statusFilter,
        searchTerm, // 依然传递原始的 searchTerm 给输入框，保证UI响应
        sort,

        // 事件处理器
        handleStatusChange: setStatusFilter,
        handleSearchTermChange: setSearchTerm, // Toolbar 的 onChange 直接调用这个
        handleSortChange,
        handlePageChange: setCurrentPage,
        handleDeleteSelected,

        refresh: fetchDocuments,
    };
};