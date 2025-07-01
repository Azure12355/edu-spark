import { useState, useEffect } from 'react';
import { ChunkDetailVO, getChunkDetailById } from '@/services/chunkService';

/**
 * @description 获取单个切片详细信息的自定义 Hook
 * @param chunkId - 要查询的切片 ID
 */
export const useChunkDetail = (chunkId: number | string | null) => {
    const [chunkDetail, setChunkDetail] = useState<ChunkDetailVO | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!chunkId) {
            setIsLoading(false);
            return;
        }

        const fetchDetail = async () => {
            setIsLoading(true);
            setError(null);
            try {
                const data = await getChunkDetailById(Number(chunkId));
                setChunkDetail(data);
            } catch (err: any) {
                console.error(`Failed to fetch chunk detail for id ${chunkId}:`, err);
                setError(err.message || '获取切片详情失败');
            } finally {
                setIsLoading(false);
            }
        };

        fetchDetail();
    }, [chunkId]);

    return { chunkDetail, isLoading, error };
};