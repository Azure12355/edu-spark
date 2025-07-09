// [!file src/features/teacher/course/course-management/sub-features/knowledge-linking/hooks/useKnowledgeLinking.ts]
"use client";

import { useState, useEffect, useCallback, useMemo } from 'react';
import { useParams } from 'next/navigation';
import { useToast } from '@/shared/hooks/useToast';
import { KnowledgeBase, KnowledgeBaseVO } from '@/shared/types';
import { useDebounce } from '@/shared/hooks/useDebounce';
import {
    linkKnowledgeBasesToCourse,
    listKnowledgeBaseVOByPage,
    listLinkedKnowledgeBases,
    unlinkKnowledgeBaseFromCourse
} from "@/shared/services";

/**
 * 课程知识库关联页面的核心逻辑 Hook。
 */
export const useKnowledgeLinking = () => {
    // 1. 路由与依赖
    const params = useParams();
    const courseId = Number(params.id);
    const showToast = useToast();

    // 2. 状态管理
    const [linkedKBs, setLinkedKBs] = useState<KnowledgeBase[]>([]);
    const [availableKBs, setAvailableKBs] = useState<KnowledgeBaseVO[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState('');

    const debouncedSearchTerm = useDebounce(searchTerm, 500);

    // 3. 数据获取函数
    const fetchData = useCallback(async () => {
        if (isNaN(courseId) || courseId <= 0) {
            setError('无效的课程ID');
            setIsLoading(false);
            return;
        }
        setIsLoading(true);
        setError(null);
        try {
            // 使用 Promise.all 并行获取“已关联”和“所有可用”的知识库列表
            const [linkedData, availableDataPage] = await Promise.all([
                listLinkedKnowledgeBases(courseId),
                listKnowledgeBaseVOByPage({ current: 1, pageSize: 100, name: debouncedSearchTerm }) // 获取所有，可以加上筛选
            ]);

            setLinkedKBs(linkedData);

            // 从“所有可用”中过滤掉“已关联”的
            const linkedIds = new Set(linkedData.map(kb => kb.id));
            const filteredAvailable = availableDataPage.records.filter(kb => !linkedIds.has(kb.id));
            setAvailableKBs(filteredAvailable);

        } catch (err: any) {
            setError(err.message || '获取知识库列表失败');
        } finally {
            setIsLoading(false);
        }
    }, [courseId, debouncedSearchTerm]);

    // 4. Effect Hook: 监听变化并触发数据获取
    useEffect(() => {
        fetchData();
    }, [fetchData]);

    // 5. 核心操作函数
    /**
     * 关联一个知识库到当前课程
     */
    const handleLinkKnowledgeBase = useCallback(async (kbId: number) => {
        try {
            await linkKnowledgeBasesToCourse(courseId, [kbId]);
            showToast({ message: '关联成功！', type: 'success' });

            // 乐观更新UI，提升体验
            const kbToLink = availableKBs.find(kb => kb.id === kbId);
            if (kbToLink) {
                // 将其从可用列表移动到已关联列表
                setAvailableKBs(prev => prev.filter(kb => kb.id !== kbId));
                // 注意：需要将VO转换为Entity类型，或调整后端接口
                const newLinkedKB: KnowledgeBase = { ...kbToLink, cozeDatasetId: kbToLink.cozeDatasetId || '' };
                setLinkedKBs(prev => [...prev, newLinkedKB]);
            } else {
                // 如果在本地状态中找不到，则重新fetch以保证数据一致性
                await fetchData();
            }
        } catch (err: any) {
            // 错误已由 apiClient 处理
        }
    }, [courseId, availableKBs, showToast, fetchData]);

    /**
     * 从当前课程解除一个知识库的关联
     */
    const handleUnlinkKnowledgeBase = useCallback(async (kbId: number) => {
        try {
            await unlinkKnowledgeBaseFromCourse(courseId, kbId);
            showToast({ message: '解除关联成功', type: 'info' });

            // 乐观更新UI
            const kbToUnlink = linkedKBs.find(kb => kb.id === kbId);
            if (kbToUnlink) {
                setLinkedKBs(prev => prev.filter(kb => kb.id !== kbId));
                // 将其移回到可用列表
                const newAvailableKB: KnowledgeBaseVO = { ...kbToUnlink, owner: {id: 0, username:'', nickname: '' , role: '', status: ''} }; // 简化处理，真实项目需要完整UserVO
                setAvailableKBs(prev => [newAvailableKB, ...prev]);
            } else {
                await fetchData();
            }
        } catch (err: any) {
            // 错误已由 apiClient 处理
        }
    }, [courseId, linkedKBs, showToast, fetchData]);


    // 6. 返回接口
    return {
        linkedKBs,
        availableKBs,
        isLoading,
        error,
        searchTerm,
        setSearchTerm,
        handleLinkKnowledgeBase,
        handleUnlinkKnowledgeBase,
    };
};