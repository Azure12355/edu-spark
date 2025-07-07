/**
 * @file src/features/teacher/course/my-courses/hooks/useMyCourses.ts
 * @description “我的课程”页面的核心逻辑钩子 (Hook) v2.0。
 * 增加了对当前登录教师的身份验证和数据过滤。
 */

import { useState, useEffect, useCallback } from 'react';
import { useToast } from '@/shared/hooks/useToast';
import { useDebounce } from '@/shared/hooks/useDebounce';
import { useUserStore } from '@/shared/store/userStore';
import {CourseVO, CourseQueryRequestDTO, Page} from "@/shared/types";
import {batchDeleteCourses, listCourseVOByPage} from "@/shared/services";

// 定义排序状态的类型 (无变化)
type Sorter = {
    field: 'updated_at' | 'name' | 'created_at' | any; // 明确可排序的字段
    order: 'ascend' | 'descend';
};

export type FilterStatus = '全部课程' | '进行中' | '已结束' | '我的草稿';

// Hook 返回值的类型定义 (无变化)
interface UseMyCoursesReturn {
    courses: CourseVO[];
    isLoading: boolean;
    error: string | null;
    pagination: {
        current: number;
        pageSize: number;
        total: number;
    };
    searchTerm: string;
    filterStatus: FilterStatus; // 新增：筛选状态
    sorter: Sorter | null; // 新增：排序状态
    selectedRowKeys: number[];
    handleSearch: (term: string) => void;
    handlePageChange: (page: number, pageSize: number) => void;
    handleTableChange: (pagination: any, filters: any, sorter: any) => void;
    handleFilterChange: (status: FilterStatus) => void; // 新增：处理筛选变化
    handleSorterChange: (sorter: Sorter | null) => void; // 新增：处理排序变化
    handleBatchDelete: () => Promise<void>;
    setSelectedRowKeys: React.Dispatch<React.SetStateAction<number[]>>;
    refetch: () => void;
}

const INITIAL_PAGE = 1;
const INITIAL_PAGE_SIZE = 6;

export const useMyCourses = (): UseMyCoursesReturn => {
    // 1. 状态管理 (无变化)
    const [courses, setCourses] = useState<CourseVO[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true); // 初始为 true，表示首次加载
    const [error, setError] = useState<string | null>(null);

    const [pagination, setPagination] = useState({
        current: INITIAL_PAGE,
        pageSize: INITIAL_PAGE_SIZE,
        total: 0,
    });
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [filterStatus, setFilterStatus] = useState<FilterStatus>('全部课程');
    const [sorter, setSorter] = useState<Sorter | null>({ field: 'updated_at', order: 'descend' }); // 默认按更新时间降序
    const [selectedRowKeys, setSelectedRowKeys] = useState<number[]>([]);

    const showToast = useToast();
    const debouncedSearchTerm = useDebounce(searchTerm, 500);

    // 2. 集成用户状态和认证弹窗
    const { loginUser, isLoggedIn, openAuthModal, hasHydrated } = useUserStore();

    // 3. 核心数据获取逻辑重构
    const fetchCourses = useCallback(async () => {
        // **【核心校验】**: 如果用户未登录，或登录用户信息不完整，则不执行任何操作。
        // useEffect 中会处理未登录时的情况。
        if (!isLoggedIn || !loginUser?.id) {
            setIsLoading(false); // 停止加载状态，防止UI卡在加载中
            return;
        }

        setIsLoading(true);
        setError(null);
        setSelectedRowKeys([]);

        let statusParam: CourseQueryRequestDTO['status'] | undefined;
        switch (filterStatus) {
            case '进行中': statusParam = 'PUBLISHED'; break;
            case '已结束': statusParam = 'ARCHIVED'; break;
            case '我的草稿': statusParam = 'DRAFT'; break;
            default: statusParam = undefined; // '全部课程'
        }

        const query: CourseQueryRequestDTO = {
            current: pagination.current,
            pageSize: pagination.pageSize,
            creatorId: loginUser.id,
            name: debouncedSearchTerm.trim() || undefined,
            status: statusParam, // 使用映射后的状态
            sortField: sorter?.field,
            sortOrder: sorter?.order,
        };

        try {
            const result: Page<CourseVO> = await listCourseVOByPage(query);
            setCourses(result.records);
            setPagination(prev => ({ ...prev, total: result.total }));
        } catch (err: any) {
            setError(err.message || '获取课程列表失败');
            setCourses([]);
            setPagination(prev => ({ ...prev, total: 0 }));
        } finally {
            setIsLoading(false);
        }
        // **【依赖项变更】**: 将 loginUser.id 加入依赖项数组
    }, [isLoggedIn, loginUser?.id, pagination.current, pagination.pageSize, debouncedSearchTerm, sorter, filterStatus]);

    // 4. 使用 useEffect 监听依赖项变化，并处理认证状态
    useEffect(() => {

        if (!hasHydrated) {
            // 如果还没恢复，什么都不做，静静等待
            return;
        }

        // **【核心认证逻辑】**
        if (!isLoggedIn) {
            // 如果用户未登录，则清空数据、停止加载，并打开登录弹窗
            setCourses([]);
            setPagination(prev => ({...prev, total: 0, current: 1}));
            setIsLoading(false);
            openAuthModal(); // 触发登录弹窗
        } else {
            // 如果已登录，则正常获取数据
            fetchCourses();
        }
    }, [isLoggedIn, fetchCourses, openAuthModal, hasHydrated]);

    const handleFilterChange = (status: FilterStatus) => {
        setFilterStatus(status);
        setPagination(prev => ({ ...prev, current: 1 })); // 筛选时重置到第一页
    };

    const handleSorterChange = (newSorter: Sorter | null) => {
        setSorter(newSorter);
        setPagination(prev => ({ ...prev, current: 1 })); // 排序时重置到第一页
    };

    // 5. 业务逻辑处理函数 (这部分逻辑无需大的改动)
    const handleSearch = (term: string) => {
        setSearchTerm(term);
        setPagination(prev => ({ ...prev, current: 1 }));
    };

    const handlePageChange = (page: number, pageSize: number) => {
        setPagination({ ...pagination, current: page, pageSize });
    };

    const handleTableChange = (_: any, __: any, sorter: any) => {
        if (sorter.field && sorter.order) {
            setSorter({ field: String(sorter.field), order: sorter.order });
        } else {
            setSorter(null);
        }
        setPagination(prev => ({ ...prev, current: 1 }));
    };

    const handleBatchDelete = async () => {
        if (selectedRowKeys.length === 0) {
            showToast({ message: '请至少选择一门课程进行删除', type: 'warning' });
            return;
        }
        // 【权限前置校验】虽然Service层有最终校验，但前端也可做一层前置判断
        if (!isLoggedIn) {
            showToast({ message: '请先登录再执行操作', type: 'error' });
            openAuthModal();
            return;
        }
        setIsLoading(true);
        try {
            const success = await batchDeleteCourses({ids: selectedRowKeys});
            if (success) {
                showToast({ message: `成功删除 ${selectedRowKeys.length} 门课程`, type: 'success' });
                const remainingItems = pagination.total - selectedRowKeys.length;
                const newTotalPages = Math.ceil(remainingItems / pagination.pageSize);
                if (pagination.current > newTotalPages && newTotalPages > 0) {
                    setPagination(prev => ({ ...prev, current: newTotalPages }));
                } else {
                    refetch();
                }
            }
        } finally {
            setIsLoading(false);
        }
    };

    const refetch = () => {
        // 确保在调用 fetchCourses 前用户已登录
        if (isLoggedIn) {
            fetchCourses();
        }
    };

    // 6. 返回值 (无变化)
    return {
        courses,
        isLoading,
        error,
        pagination,
        filterStatus, // 新增
        sorter, // 新增
        searchTerm,
        selectedRowKeys,
        handleSearch,
        handlePageChange,
        handleTableChange,
        handleBatchDelete,
        handleFilterChange, // 新增
        handleSorterChange, // 新增
        setSelectedRowKeys,
        refetch,
    };
};