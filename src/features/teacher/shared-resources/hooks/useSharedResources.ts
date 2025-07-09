// [!file src/features/teacher/shared-resources/hooks/useSharedResources.ts]
"use client";

import { useState, useEffect, useCallback, useMemo } from 'react';
import { useToast } from '@/shared/hooks/useToast';
import { CourseVO, KnowledgeBaseVO, Page } from '@/shared/types';
import { useDebounce } from '@/shared/hooks/useDebounce';
import {listCourseVOByPage, listKnowledgeBaseVOByPage} from "@/shared/services";

// 定义资源类型
export type ResourceType = 'courses' | 'knowledgeBases';

// 定义统一的资源卡片数据结构
export interface UnifiedResource {
    id: number;
    type: ResourceType;
    title: string;
    description: string;
    colorTheme: string | undefined;
    coverImageUrl?: string;
    creator: {
        nickname: string;
        avatarUrl?: string;
    };
    tags: string[];
    stats: {
        icon: string;
        label: string;
        value: string | number;
    }[];
}

/**
 * 共享资源中心页面的核心逻辑 Hook。
 */
export const useSharedResources = () => {
    // 1. 状态管理
    const [activeTab, setActiveTab] = useState<ResourceType>('courses');
    const [resources, setResources] = useState<UnifiedResource[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [pagination, setPagination] = useState({
        current: 1,
        pageSize: 12,
        total: 0,
    });
    const [searchTerm, setSearchTerm] = useState('');

    // 2. 依赖与路由
    const showToast = useToast();
    const debouncedSearchTerm = useDebounce(searchTerm, 500);

    // 3. 数据转换函数 (将不同类型的VO转换为统一的资源卡片格式)
    const transformCourseToResource = (course: CourseVO): UnifiedResource => ({
        id: course.id,
        type: 'courses',
        title: course.name,
        colorTheme: course.colorTheme,
        description: course.description || '暂无描述',
        coverImageUrl: course.coverImageUrl,
        creator: {
            nickname: course.creator.nickname,
            avatarUrl: course.creator.avatarUrl,
        },
        tags: [course.term || '通用', course.status],
        stats: [
            // 未来可以添加学生数等统计
        ],
    });

    const transformKBToResource = (kb: KnowledgeBaseVO): UnifiedResource => ({
        id: kb.id,
        type: 'knowledgeBases',
        title: kb.name,
        colorTheme: undefined,
        description: kb.description || '暂无描述',
        creator: {
            nickname: kb.owner.nickname,
            avatarUrl: kb.owner.avatarUrl,
        },
        tags: [kb.formatType === 0 ? '文本文档' : '其他类型'],
        stats: [
            { icon: 'far fa-file-alt', label: '文档数', value: kb.metadataStats?.doc_count || 0 },
            { icon: 'fas fa-link', label: '引用数', value: kb.forkCount || 0 },
        ],
    });

    // 4. 数据获取函数
    const fetchData = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        try {
            let response: Page<any>;
            let transformedResources: UnifiedResource[];

            if (activeTab === 'courses') {
                response = await listCourseVOByPage({
                    current: pagination.current,
                    pageSize: pagination.pageSize,
                    name: debouncedSearchTerm,
                    visibility: 'PUBLIC', // 只查询公开的
                });
                transformedResources = response.records.map(transformCourseToResource);
            } else { // activeTab === 'knowledgeBases'
                response = await listKnowledgeBaseVOByPage({
                    current: pagination.current,
                    pageSize: pagination.pageSize,
                    name: debouncedSearchTerm,
                    visibility: 'PUBLIC', // 只查询公开的
                });
                transformedResources = response.records.map(transformKBToResource);
            }

            setResources(transformedResources);
            setPagination(prev => ({ ...prev, total: response.total }));

        } catch (err: any) {
            setError(err.message || '获取共享资源失败');
        } finally {
            setIsLoading(false);
        }
    }, [activeTab, pagination.current, pagination.pageSize, debouncedSearchTerm]);

    // 5. Effect Hook - 监听变化并触发数据获取
    useEffect(() => {
        fetchData();
    }, [fetchData]);

    // 6. 事件处理函数
    const handlePageChange = (page: number, pageSize?: number) => {
        setPagination(prev => ({ ...prev, current: page, pageSize: pageSize || prev.pageSize }));
    };

    const handleSearch = (term: string) => {
        setSearchTerm(term);
        setPagination(prev => ({ ...prev, current: 1 })); // 搜索时重置到第一页
    };

    const handleTabChange = (tab: ResourceType) => {
        setActiveTab(tab);
        setSearchTerm(''); // 切换Tab时清空搜索词
        setPagination(prev => ({ ...prev, current: 1 })); // 切换Tab时重置到第一页
    };

    // 7. 返回接口
    return {
        resources,
        isLoading,
        error,
        pagination,
        activeTab,
        searchTerm,
        handlePageChange,
        handleSearch,
        handleTabChange,
    };
};