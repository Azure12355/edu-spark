import { useState, useEffect, useCallback } from 'react';
import { Page } from '@/services/knowledgeService';
import { DocumentVO, listDocumentsByKbId, deleteDocuments } from '@/services/documentService';
import { useToast } from '@/hooks/useToast';

const ITEMS_PER_PAGE = 10;

/**
 * @description 独立管理知识库文档数据逻辑（获取、分页、删除等）的 Hook。
 * @param kbId - 当前知识库的 ID
 */
export const useDocumentManagement = (kbId: string | number) => {
    // --- 状态管理 ---
    const [documentsPage, setDocumentsPage] = useState<Page<DocumentVO> | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState<number>(1);

    const showToast = useToast();

    // --- 数据获取逻辑 ---
    const fetchDocuments = useCallback(async (page: number) => {
        if (!kbId) {
            setDocumentsPage(null);
            setIsLoading(false);
            return;
        }

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
            console.error("Failed to fetch documents:", err);
            setError(err.message || '获取文档列表失败');
        } finally {
            setIsLoading(false);
        }
    }, [kbId]);

    // --- Effect ---
    useEffect(() => {
        fetchDocuments(currentPage);
    }, [currentPage, fetchDocuments]);

    // --- 事件处理函数 ---
    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const handleDeleteSelected = async (idsToDelete: Set<string | number>): Promise<boolean> => {
        if (idsToDelete.size === 0) {
            showToast({ message: '请至少选择一个文档进行删除', type: 'warning' });
            return false;
        }

        try {
            const idArray = Array.from(idsToDelete).map(Number);
            await deleteDocuments({ ids: idArray });
            showToast({ message: `成功删除 ${idsToDelete.size} 个文档`, type: 'success' });

            if (documentsPage && idsToDelete.size === documentsPage.records.length && currentPage > 1) {
                setCurrentPage(p => p - 1);
            } else {
                fetchDocuments(currentPage);
            }
            return true;
        } catch (err) {
            console.error("Failed to delete documents:", err);
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
        refresh: () => fetchDocuments(currentPage),
    };
};