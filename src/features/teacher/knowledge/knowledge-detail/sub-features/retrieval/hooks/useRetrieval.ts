//[! code start]
// src/features/teacher/knowledge/knowledge-detail/sub-features/retrieval/hooks/useRetrieval.ts
"use client";

import { useState, useCallback } from 'react';
import { useToast } from '@/shared/hooks/useToast';
import { listChunksByPage, ChunkQueryRequest } from '@/features/teacher/knowledge/knowledge-detail/sub-features/chunk-management/service/chunkService';
import { SearchResult } from '../components/SearchAndResults';
import { RetrievalParams } from '../components/RetrievalParameters';

/**
 * @interface UseRetrievalProps
 * @description useRetrieval Hook 的输入参数。
 */
interface UseRetrievalProps {
    kbId: number | string;
}

/**
 * @description 管理知识检索Tab所有业务逻辑的自定义 Hook。
 * @param {UseRetrievalProps} props - 包含知识库ID。
 */
export const useRetrieval = ({ kbId }: UseRetrievalProps) => {
    const showToast = useToast();

    // --- 状态管理 ---
    const [params, setParams] = useState<RetrievalParams>({
        query: '',
        topK: 10,
    });
    const [results, setResults] = useState<SearchResult[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isInitialState, setIsInitialState] = useState(true);
    const [totalHits, setTotalHits] = useState(0);
    const [responseTime, setResponseTime] = useState(0);

    // --- 事件处理函数 ---

    const handleParamsChange = useCallback(<K extends keyof RetrievalParams>(key: K, value: RetrievalParams[K]) => {
        setParams(prev => ({ ...prev, [key]: value }));
    }, []);

    const handleClearQuery = useCallback(() => {
        setParams(prev => ({ ...prev, query: '' }));
    }, []);

    const handleSearch = useCallback(async () => {
        // ... (handleSearch 逻辑保持不变)
        if (!params.query.trim()) {
            showToast({ message: '请输入要检索的内容', type: 'warning' });
            return;
        }
        if (isLoading) return;

        setIsLoading(true);
        if (isInitialState) {
            setIsInitialState(false);
        }
        const startTime = Date.now();

        try {
            const request: ChunkQueryRequest = {
                current: 1,
                pageSize: params.topK,
                knowledgeBaseId: kbId,
                vectorSearchText: params.query,
            };

            const response = await listChunksByPage(request);

            setResults(response.records || []);
            setTotalHits(response.total || 0);
            showToast({ message: `检索成功，找到 ${response.total || 0} 条相关结果`, type: 'success' });
        } catch (error) {
            console.error("Retrieval search failed:", error);
            setResults([]);
            setTotalHits(0);
        } finally {
            const endTime = Date.now();
            setResponseTime(endTime - startTime);
            setIsLoading(false);
        }
    }, [kbId, params, isLoading, isInitialState, showToast]);

    /**
     * 新增：处理预览请求的占位函数
     * @param result - 被点击预览的搜索结果项
     */
    const handlePreview = useCallback((result: SearchResult) => {
        console.log('Previewing result:', result);
        showToast({ message: `正在预览切片 #${result.id}`, type: 'info' });
        // 在这里可以实现打开预览模态框的逻辑
    }, [showToast]);

    // --- 返回给组件的接口 ---
    return {
        params,
        results,
        isLoading,
        isInitialState,
        totalHits,
        responseTime,
        actions: {
            handleParamsChange,
            handleClearQuery,
            handleSearch,
            handlePreview, // 将新的处理函数暴露出去
        },
    };
};
//[! code end]