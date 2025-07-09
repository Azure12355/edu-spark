// [!file src/features/teacher/course/course-management/sub-features/assignments-management/hooks/useAssignmentManagement.ts]
"use client";

import { useState, useEffect, useCallback } from 'react';
import { useParams } from 'next/navigation';
import { useToast } from '@/shared/hooks/useToast';
import { AssignmentVO, ClassActivityVO, Page } from '@/shared/types';
import { AssignmentQueryRequestDTO, ActivityQueryRequestDTO } from '@/shared/types';
import { useDebounce } from '@/shared/hooks/useDebounce';
import {listAssignmentTemplatesByPage} from "@/shared/services";

/**
 * 在线作业与考试管理页面的核心逻辑 Hook。
 */
export const useAssignmentManagement = () => {
    // 1. 状态管理
    // 作业模板相关状态
    const [templates, setTemplates] = useState<AssignmentVO[]>([]);
    const [templatePagination, setTemplatePagination] = useState({ current: 1, pageSize: 8 });
    const [templateTotal, setTemplateTotal] = useState(0);
    const [isTemplatesLoading, setIsTemplatesLoading] = useState(true);

    // 已发布活动相关状态
    const [activities, setActivities] = useState<ClassActivityVO[]>([]);
    const [activityPagination, setActivityPagination] = useState({ current: 1, pageSize: 10 });
    const [activityTotal, setActivityTotal] = useState(0);
    const [isActivitiesLoading, setIsActivitiesLoading] = useState(true);

    // 通用状态
    const [error, setError] = useState<string | null>(null);
    const [activeTab, setActiveTab] = useState<'templates' | 'activities'>('templates');
    const [searchTerm, setSearchTerm] = useState('');

    // 2. 依赖与路由
    const params = useParams();
    const courseId = Number(params.id);
    const showToast = useToast();
    const debouncedSearchTerm = useDebounce(searchTerm, 500);

    // 3. 数据获取函数
    // a. 获取作业模板列表
    const fetchTemplates = useCallback(async () => {
        if (isNaN(courseId)) return;
        setIsTemplatesLoading(true);
        try {
            const query: AssignmentQueryRequestDTO = {
                courseId,
                current: templatePagination.current,
                pageSize: templatePagination.pageSize,
                title: debouncedSearchTerm,
            };
            const response = await listAssignmentTemplatesByPage(query);
            setTemplates(response.records);
            setTemplateTotal(response.total);
        } catch (err: any) {
            setError(err.message || '获取作业模板失败');
        } finally {
            setIsTemplatesLoading(false);
        }
    }, [courseId, templatePagination, debouncedSearchTerm]);

    // b. 获取已发布活动列表
    const fetchActivities = useCallback(async () => {
        if (isNaN(courseId)) return;

        // TODO: 当前端点是 /classes/{classId}/activities, 无法直接按courseId查询
        // 这是一个待办事项，暂时用模拟数据代替
        console.warn("fetchActivities 需要后端提供按 courseId 查询已发布活动的能力，暂时跳过。");
        // setIsActivitiesLoading(true);
        // try {
        //     const query: ActivityQueryRequestDTO = { ... };
        //     const response = await classActivityService.listActivitiesByCourse(query);
        //     setActivities(response.records);
        //     setActivityTotal(response.total);
        // } catch (err: any) {
        //     setError(err.message || '获取已发布活动失败');
        // } finally {
        //     setIsActivitiesLoading(false);
        // }

        // 临时解决方案：暂时返回空数据
        setActivities([]);
        setActivityTotal(0);
        setIsActivitiesLoading(false);

    }, [courseId, activityPagination]);


    // 4. Effect Hook - 监听变化并触发数据获取
    useEffect(() => {
        fetchTemplates();
    }, [fetchTemplates]);

    useEffect(() => {
        fetchActivities();
    }, [fetchActivities]);

    // 5. 事件处理函数
    const handleTemplatePageChange = (page: number, pageSize?: number) => {
        setTemplatePagination(prev => ({ ...prev, current: page, pageSize: pageSize || prev.pageSize }));
    };

    const handleActivityPageChange = (page: number, pageSize?: number) => {
        setActivityPagination(prev => ({ ...prev, current: page, pageSize: pageSize || prev.pageSize }));
    };

    const handleSearch = (term: string) => {
        setSearchTerm(term);
        // 重置两个列表的分页
        setTemplatePagination(prev => ({ ...prev, current: 1 }));
        setActivityPagination(prev => ({ ...prev, current: 1 }));
    };

    const handleTabChange = (tab: 'templates' | 'activities') => {
        setActiveTab(tab);
    };

    // 6. 返回接口
    return {
        // 状态
        templates,
        isTemplatesLoading,
        templateTotal,
        templatePagination,
        activities,
        isActivitiesLoading,
        activityTotal,
        activityPagination,
        error,
        activeTab,
        searchTerm,
        // 操作函数
        handleTemplatePageChange,
        handleActivityPageChange,
        handleSearch,
        handleTabChange,
    };
};