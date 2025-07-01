import { useState, useEffect, useCallback } from 'react';
import { Page } from '@/services/knowledgeService';
import { DocumentVO, listDocumentsByKbId, deleteDocuments } from '@/services/documentService';
import { useDocumentTableStore } from '@/store/documentTableStore'; // 复用选择状态管理
import { useToast } from '@/hooks/useToast';
import {AxiosError} from "axios";

const ITEMS_PER_PAGE = 10;

/**
 * @description 管理知识库文档的自定义 Hook
 * @param kbId - 当前知识库的 ID
 */
export const useDocumentManagement = (kbId: string | number) => {
    // --- 状态管理 ---
    const [documentsPage, setDocumentsPage] = useState<Page<DocumentVO> | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState<number>(1);

    // --- 从 Zustand Store 获取状态和操作 ---
    const { selectedDocIds, clearSelection } = useDocumentTableStore();
    const showToast = useToast();

    // --- 数据获取逻辑 ---
    const fetchDocuments = useCallback(async (page: number) => {
        setIsLoading(true);
        setError(null);
        try {
            const data = await listDocumentsByKbId({
                kbId,
                current: page,
                pageSize: ITEMS_PER_PAGE,
            });
            setDocumentsPage(data);
        } catch (err: any) {
            // 错误已由 apiClient 统一处理并弹窗，此处仅记录日志和设置错误状态
            console.error("Failed to fetch documents:", err);
            setError(err.message || '获取文档列表失败');
        } finally {
            setIsLoading(false);
        }
    }, [kbId]);

    // --- Effect: 当 kbId 或 currentPage 变化时，重新获取数据 ---
    useEffect(() => {
        if (kbId) {
            fetchDocuments(currentPage);
        }
    }, [kbId, currentPage, fetchDocuments]);

    // --- 事件处理函数 ---
    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const handleDeleteSelected = async (): Promise<boolean> => {
        if (selectedDocIds.size === 0) {
            showToast({ message: '请至少选择一个文档', type: 'warning' });
            return false;
        }

        try {
            await deleteDocuments({ ids: Array.from(selectedDocIds) as unknown as number[] });
            showToast({ message: `成功删除 ${selectedDocIds.size} 个文档`, type: 'success' });

            // 删除成功后，清空选择并刷新当前页
            clearSelection();
            // 优化：如果当前页全部被删除，则跳转到前一页
            if (documentsPage && selectedDocIds.size === documentsPage.records.length && currentPage > 1) {
                setCurrentPage(currentPage - 1);
            } else {
                fetchDocuments(currentPage);
            }
            return true;
        } catch (err) {
            // 错误已由 apiClient 统一处理并弹窗
            return false;
        }
    };

    // --- 返回给组件的接口 ---
    return {
        documents: documentsPage?.records ?? [],
        isLoading,
        error,
        pagination: {
            currentPage: documentsPage?.current ?? 1,
            totalPages: documentsPage ? Math.ceil(documentsPage.total / documentsPage.size) : 1,
            totalItems: documentsPage?.total ?? 0,
        },
        handlePageChange,
        handleDeleteSelected,
        selectedDocIds, // 直接透传，方便 Toolbar 使用
    };
};