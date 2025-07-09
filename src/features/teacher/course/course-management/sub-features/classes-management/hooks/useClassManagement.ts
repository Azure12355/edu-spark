// [!file src/features/teacher/course/course-management/sub-features/classes-management/hooks/useClassManagement.ts]
"use client";

import { useState, useEffect, useCallback } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useToast } from '@/shared/hooks/useToast';
import { ClassVO, Page } from '@/shared/types';
import { useDebounce } from '@/shared/hooks/useDebounce';
import {ClassQueryRequestDTO} from "@/shared/types/dto/course/classes";
import {deleteClass, listClassesByPage} from "@/shared/services";
import { useConfirmationModal } from '@/shared/hooks/useConfirmationModal'; // 假设你有一个通用的确认弹窗

/**
 * 班级管理页面的核心逻辑 Hook。
 * 负责获取班级列表、处理分页、搜索、筛选，以及管理加载和错误状态。
 */
export const useClassManagement = () => {
    // 1. 状态管理
    const [classes, setClasses] = useState<ClassVO[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [pagination, setPagination] = useState({
        current: 1,
        pageSize: 10,
        total: 0,
    });
    const [filters, setFilters] = useState<Partial<ClassQueryRequestDTO>>({});
    const [searchTerm, setSearchTerm] = useState('');
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false); // 控制创建弹窗的开关状态

    // 2. 依赖注入和路由
    const router = useRouter();
    const params = useParams();
    const courseId = Number(params.id); // 从URL中获取当前课程ID
    const showToast = useToast();
    const debouncedSearchTerm = useDebounce(searchTerm, 500); // 防抖搜索词
    const showConfirmationModal = useConfirmationModal(); // 引入确认弹窗Hook

    // 3. 数据获取函数
    const fetchClasses = useCallback(async (query: ClassQueryRequestDTO) => {
        setIsLoading(true);
        setError(null);
        try {
            const response: Page<ClassVO> = await listClassesByPage(query);
            setClasses(response.records);
            setPagination(prev => ({
                ...prev,
                total: response.total,
                current: response.current,
                pageSize: response.size,
            }));
        } catch (err: any) {
            setError(err.message || '获取班级列表失败');
            // 错误提示已由 apiClient 的拦截器统一处理，此处无需再次 showToast
        } finally {
            setIsLoading(false);
        }
    }, []);

    // 4. Effect Hook: 监听依赖项变化并触发数据获取
    useEffect(() => {
        if (!courseId || isNaN(courseId)) {
            setError('无效的课程ID');
            setIsLoading(false);
            return;
        }

        const query: ClassQueryRequestDTO = {
            courseId: courseId,
            current: pagination.current,
            pageSize: pagination.pageSize,
            name: debouncedSearchTerm,
            ...filters,
        };
        fetchClasses(query);
    }, [courseId, pagination.current, pagination.pageSize, debouncedSearchTerm, filters, fetchClasses]);

    // 5. 事件处理函数
    const handlePageChange = (page: number, pageSize?: number) => {
        setPagination(prev => ({
            ...prev,
            current: page,
            pageSize: pageSize || prev.pageSize,
        }));
    };

    const handleSearchChange = (term: string) => {
        setSearchTerm(term);
        setPagination(prev => ({ ...prev, current: 1 })); // 搜索时重置到第一页
    };

    const handleFilterChange = (newFilters: Partial<ClassQueryRequestDTO>) => {
        setFilters(prev => ({ ...prev, ...newFilters }));
        setPagination(prev => ({ ...prev, current: 1 })); // 筛选时重置到第一页
    };

    // 打开创建弹窗
    const openCreateModal = () => setIsCreateModalOpen(true);

    // 关闭创建弹窗
    const closeCreateModal = () => setIsCreateModalOpen(false);

    // 创建成功后的回调函数
    const handleCreationSuccess = (newClass: ClassVO) => {
        // 刷新列表数据，可以简单地通过重置页码到第一页来触发useEffect
        setPagination(prev => ({ ...prev, current: 1 }));
        // 或者更优化的方式是直接将新数据插入到列表顶部
        // setClasses(prev => [newClass, ...prev]);
        // setPagination(prev => ({ ...prev, total: prev.total + 1 }));
    };

    const handleDeleteClass = (classId: number) => {
        showConfirmationModal({
            title: '确认删除班级',
            message: '您确定要删除这个班级吗？此操作将无法撤销，所有关联的成员和活动数据都将被清除。',
            confirmText: '确认删除',
            type: 'danger',
            onConfirm: async () => {
                try {
                    await deleteClass(classId);
                    showToast({ message: `班级 ${classId} 删除成功`, type: 'success' });
                    // 刷新列表
                    fetchClasses({ courseId, current: pagination.current, pageSize: pagination.pageSize, name: debouncedSearchTerm, ...filters });
                } catch (err) {
                    // 错误已由拦截器处理
                }
            }
        });
    };

    // 6. 返回UI组件所需的所有状态和操作函数
    return {
        classes,
        isLoading,
        error,
        pagination,
        searchTerm,
        isCreateModalOpen,      // 导出弹窗状态
        openCreateModal,        // 导出打开弹窗的函数
        closeCreateModal,       // 导出关闭弹窗的函数
        handleCreationSuccess,  // 导出成功回调
        handlePageChange,
        handleSearchChange,
        handleFilterChange,
        handleDeleteClass,
    };
};