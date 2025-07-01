// src/hooks/useKnowledgeDetail.ts
import { useState, useEffect } from 'react';
import { useKnowledgeStore } from '@/store/knowledgeStore';
import { KnowledgeBaseVO } from '@/services/knowledgeService';

/**
 * @description 获取并管理单个知识库详情页的核心状态
 * @param kbId - 知识库 ID
 */
export const useKnowledgeDetail = (kbId: string | number) => {
    const [kb, setKb] = useState<KnowledgeBaseVO | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isNotFound, setIsNotFound] = useState(false);

    const getKnowledgeBaseById = useKnowledgeStore(state => state.getKnowledgeBaseById);

    useEffect(() => {
        setIsLoading(true);
        // 在真实应用中，这里会是一个异步 API 请求
        // const fetchKb = async () => { ... }
        // fetchKb();

        // 使用 setTimeout 模拟异步获取和确保 Zustand store 已水合
        const timer = setTimeout(() => {
            const knowledgeBase = getKnowledgeBaseById(String(kbId));
            if (knowledgeBase) {
                setKb(knowledgeBase);
                setIsNotFound(false);
            } else {
                setIsNotFound(true);
            }
            setIsLoading(false);
        }, 150); // 150ms 的延迟足以应对大多数水合场景

        return () => clearTimeout(timer);
    }, [kbId, getKnowledgeBaseById]);

    return { kb, isLoading, isNotFound };
};