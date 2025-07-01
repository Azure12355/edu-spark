import { useState, useEffect, useCallback } from 'react';
import { useKnowledgeStore } from '@/store/knowledgeStore';
import { useToast } from '@/hooks/useToast';
import { Page } from '@/services/knowledgeService';
import { DocumentVO } from '@/services/documentService';
import { ChunkVO, listChunksByKbId, addChunk, deleteChunks, AddChunkRequest } from '@/services/chunkService';

const ITEMS_PER_PAGE = 12;

/**
 * @description 管理知识库切片的自定义 Hook
 * @param kbId - 当前知识库的 ID
 */
export const useChunkManagement = (kbId: number | string) => {
    // --- 状态定义 ---
    const [page, setPage] = useState<Page<ChunkVO> | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [sourceFilter, setSourceFilter] = useState<number | 'ALL'>('ALL');
    const [searchTerm, setSearchTerm] = useState('');

    // --- 外部依赖 ---
    const showToast = useToast();
    const documents = useKnowledgeStore(state => state.getDocumentsByKbId(String(kbId))) as unknown as  DocumentVO[];

    // --- 数据获取 ---
    const fetchChunks = useCallback(async (page: number, filter: number | 'ALL', term: string) => {
        setIsLoading(true);
        try {
            const params = {
                kbId: Number(kbId),
                current: page,
                pageSize: ITEMS_PER_PAGE,
                ...(filter !== 'ALL' && { documentId: filter }),
                ...(term.trim() && { searchTerm: term.trim() }),
            };
            const data = await listChunksByKbId(params);
            setPage(data);
        } catch (error) {
            console.error("Failed to fetch chunks:", error);
            // 错误已由 apiClient 统一处理
        } finally {
            setIsLoading(false);
        }
    }, [kbId]);

    // --- Effects ---
    useEffect(() => {
        fetchChunks(currentPage, sourceFilter, searchTerm);
    }, [currentPage, sourceFilter, searchTerm, fetchChunks]);

    // --- 回调函数 ---
    const handleAddChunk = async (data: AddChunkRequest): Promise<boolean> => {
        try {
            await addChunk(data);
            showToast({ message: '新切片已添加成功！', type: 'success' });
            fetchChunks(1, 'ALL', ''); // 刷新并回到第一页
            setCurrentPage(1);
            setSourceFilter('ALL');
            setSearchTerm('');
            return true;
        } catch (error) {
            console.error("Failed to add chunk:", error);
            return false;
        }
    };

    const handleDeleteChunk = async (chunkId: number): Promise<boolean> => {
        try {
            await deleteChunks({ ids: [chunkId] });
            showToast({ message: '切片已删除', type: 'success' });

            // 优化刷新逻辑
            if (page && page.records.length === 1 && currentPage > 1) {
                setCurrentPage(currentPage - 1);
            } else {
                fetchChunks(currentPage, sourceFilter, searchTerm);
            }
            return true;
        } catch (error) {
            console.error("Failed to delete chunk:", error);
            return false;
        }
    };

    const handleFilterChange = (docId: number | 'ALL') => {
        setCurrentPage(1);
        setSourceFilter(docId);
    };

    // 简单的防抖搜索
    const handleSearchChange = (term: string) => {
        setSearchTerm(term);
        setCurrentPage(1);
    };

    // --- 返回接口 ---
    return {
        chunks: page?.records ?? [],
        isLoading,
        pagination: {
            currentPage: page?.current ?? 1,
            totalPages: page ? Math.ceil(page.total / page.size) : 1,
            totalItems: page?.total ?? 0,
        },
        filters: {
            documents,
            sourceFilter,
            searchTerm,
        },
        actions: {
            setCurrentPage,
            handleFilterChange,
            handleSearchChange,
            handleAddChunk,
            handleDeleteChunk,
        },
    };
};