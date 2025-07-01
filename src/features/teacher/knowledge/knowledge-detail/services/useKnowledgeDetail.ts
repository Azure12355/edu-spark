import { useState, useEffect, useCallback } from 'react';
// 【核心修改】: 直接从 service 中导入 API 调用函数
import { KnowledgeBaseVO, getKnowledgeBaseById } from '@/features/teacher/knowledge/knowledge-list/services/knowledgeService';
import { DocumentVO, listDocumentsByKbId } from '@/features/teacher/knowledge/knowledge-detail/services/documentService';
import { Page } from '@/features/teacher/knowledge/knowledge-list/services/knowledgeService';

/**
 * @description 获取并管理单个知识库及其关联文档的核心数据 Hook
 * @param kbId - 知识库 ID
 */
export const useKnowledgeDetail = (kbId: string | number) => {
    // --- 状态定义 ---
    const [kb, setKb] = useState<KnowledgeBaseVO | null>(null);
    // 【新增】: 将文档列表的管理也移到这个主 Hook 中
    const [documents, setDocuments] = useState<DocumentVO[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isNotFound, setIsNotFound] = useState(false);

    // --- 数据获取逻辑 ---
    const fetchData = useCallback(async () => {
        // 确保 kbId 有效
        if (!kbId) {
            setIsLoading(false);
            setIsNotFound(true);
            return;
        }

        setIsLoading(true);
        setIsNotFound(false);
        try {
            // 【核心修改】: 并行获取知识库详情和其第一页的文档
            const [kbData, docPageData] = await Promise.all([
                getKnowledgeBaseById(kbId),
                listDocumentsByKbId({ kbId: kbId, current: 1, pageSize: 100 }) // 假设文档不多，一次性获取
            ]);

            if (kbData) {
                setKb(kbData);
                setDocuments(docPageData.records);
            } else {
                setIsNotFound(true);
            }
        } catch (error) {
            console.error("Failed to fetch knowledge base details:", error);
            setIsNotFound(true); // API 调用失败也视为未找到
        } finally {
            setIsLoading(false);
        }
    }, [kbId]);

    // --- Effect ---
    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return { kb, documents, isLoading, isNotFound, refresh: fetchData };
};