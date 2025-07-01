import { useState, useEffect, useMemo } from 'react';
import { listKnowledgeBasesByPage, KnowledgeBaseVO, Page } from '@/services/knowledgeService';

// 定义 Hook 返回的状态类型
export interface KnowledgeStats {
    kbCount: number;
    docCount: number;
    sliceCount: number;
    isLoading: boolean;
}

/**
 * @description 获取并计算所有知识库的全局统计数据的业务逻辑 Hook
 */
export const useKnowledgeStats = (): KnowledgeStats => {
    const [stats, setStats] = useState({ kbCount: 0, docCount: 0, sliceCount: 0 });
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchAllStats = async () => {
            setIsLoading(true);
            try {
                // 为了获取总数，我们请求第一页，size为1，后端会返回总数total
                const data: Page<KnowledgeBaseVO> = await listKnowledgeBasesByPage({ current: 1, pageSize: 1 });

                // 在真实场景中，后端应该提供一个专门的统计接口
                // GET /api/kb/stats -> { kbCount: 10, docCount: 150, sliceCount: 25000 }
                // 这里我们暂时用分页返回的总数来模拟
                const kbCount = data.total;

                // 由于无法通过分页获取所有知识库的文档和切片总数，我们这里使用模拟数据
                // 真实场景下，这些数据应该由后端统计接口直接提供
                const mockTotalDocs = 150 + Math.floor(Math.random() * 50);
                const mockTotalSlices = 25000 + Math.floor(Math.random() * 5000);

                setStats({
                    kbCount: kbCount,
                    docCount: mockTotalDocs,
                    sliceCount: mockTotalSlices,
                });

            } catch (error) {
                console.error("Failed to fetch knowledge base stats:", error);
                // 即使失败也设置一个默认值，防止UI崩溃
                setStats({ kbCount: 0, docCount: 0, sliceCount: 0 });
            } finally {
                setIsLoading(false);
            }
        };

        fetchAllStats();
    }, []);

    return {
        ...stats,
        isLoading,
    };
};