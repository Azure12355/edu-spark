import { useState, useEffect, useCallback, useMemo } from 'react';
import { useToast } from '@/hooks/useToast';
import { useDebounce } from '@/hooks/common/useDebounce'; // 引入我们之前创建的防抖 Hook
import { Page } from '@/services/knowledgeService';
import { ChunkVO, listChunksByKbId, deleteChunk, addChunk, AddChunkRequest } from '@/services/chunkService';

const ITEMS_PER_PAGE = 12;

/**
 * @description 管理知识库下切片列表的完整业务逻辑 Hook。
 * 包含数据获取、分页、筛选、搜索和增删操作。
 * @param kbId - 当前知识库的 ID
 */
export const useChunkManagement = (kbId: number | string) => {
    // --- 状态管理 ---
    const [pageData, setPageData] = useState<Page<ChunkVO> | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);

    // --- 筛选与搜索状态 ---
    const [sourceFilter, setSourceFilter] = useState<number | 'ALL'>('ALL');
    const [searchTerm, setSearchTerm] = useState('');

    // --- 外部依赖 ---
    const showToast = useToast();

    // --- 防抖处理 ---
    // 使用 useDebounce Hook 来获取一个延迟更新的搜索词
    // 这意味着只有当用户停止输入500毫秒后，debouncedSearchTerm 才会更新
    const debouncedSearchTerm = useDebounce(searchTerm as any, 500);

    // --- 数据获取逻辑 ---
    const fetchChunks    = useCallback(async (page: number) => {
        // isLoading 状态现在由 debouncedSearchTerm 的变化来间接控制
        setIsLoading(true);
        try {
            const data = await listChunksByKbId(
                Number(kbId),
                page,
                ITEMS_PER_PAGE,
                // 【注意】: 后端 listChunksByKbId 接口需要支持这些筛选参数
                // sourceFilter,
                // debouncedSearchTerm
            );
            setPageData(data);
        } catch (error) {
            console.error("Failed to fetch chunks:", error);
            // 错误已由 apiClient 统一处理
        } finally {
            setIsLoading(false);
        }
    }, [kbId, sourceFilter, debouncedSearchTerm]); // 依赖项包含防抖后的搜索词

    // --- Effect ---
    // 当筛选条件或防抖后的搜索词变化时，重置到第一页并获取数据
    useEffect(() => {
        setCurrentPage(1);
        fetchChunks(1);
    }, [sourceFilter, debouncedSearchTerm, fetchChunks]);

    // 当只有页码变化时，获取对应页的数据
    useEffect(() => {
        fetchChunks(currentPage);
    }, [currentPage, fetchChunks]);


    // --- 事件处理与业务操作 ---
    const handleDeleteChunk = async (chunkId: number): Promise<boolean> => {
        try {
            await deleteChunk(chunkId);
            showToast({ message: '切片已成功删除', type: 'success' });

            if (pageData && pageData.records.length === 1 && currentPage > 1) {
                setCurrentPage(p => p - 1);
            } else {
                fetchChunks(currentPage);
            }
            return true;
        } catch (error) {
            return false;
        }
    };

    const handleAddChunk = async (data: AddChunkRequest): Promise<boolean> => {
        try {
            await addChunk(data);
            showToast({ message: '新切片已添加成功！', type: 'success' });
            // 操作成功后，重置筛选和搜索，并跳转到第一页看最新结果
            setSourceFilter('ALL');
            setSearchTerm('');
            if (currentPage === 1) {
                fetchChunks(1);
            } else {
                setCurrentPage(1);
            }
            return true;
        } catch (error) {
            return false;
        }
    };

    // --- 返回给组件的接口 ---
    const pagination = useMemo(() => ({
        currentPage: pageData?.current ?? 1,
        totalPages: pageData ? Math.ceil(pageData.total / pageData.size) : 1,
        totalItems: pageData?.total ?? 0,
    }), [pageData]);

    return {
        chunks: pageData?.records ?? [],
        isLoading,
        pagination,
        filters: {
            sourceFilter,
            searchTerm,
        },
        actions: {
            setCurrentPage,
            handleFilterChange: setSourceFilter, // 直接暴露状态更新函数
            setSearchTerm, // 暴露原始的 searchTerm 更新函数，UI可以立即响应输入
            handleDeleteChunk,
            handleAddChunk,
            refresh: () => fetchChunks(currentPage),
        },
    };
};