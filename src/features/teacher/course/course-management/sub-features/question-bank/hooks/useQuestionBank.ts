// [!file src/features/teacher/course/course-management/sub-features/question-bank/hooks/useQuestionBank.ts]
/**
 * @file src/features/teacher/course/course-management/sub-features/question-bank/hooks/useQuestionBank.ts
 * @description 题库管理页面的核心业务逻辑钩子 (Hook)。
 */

import { useState, useEffect, useCallback, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { useImmer } from 'use-immer';

// 1. 导入类型、Service 和共享 Hooks
import { QuestionVO, Page, QuestionTypeEnum } from '../types';
import { getQuestionsByPointIdPaginated, batchDeleteQuestions, deleteQuestionById } from '../services/questionBankService';
import { useToast } from '@/shared/hooks/useToast';
import { useDebounce } from '@/shared/hooks/useDebounce';

// 2. 定义 Hook 返回值类型
interface UseQuestionBankReturn {
    questions: QuestionVO[];
    pagination: {
        current: number;
        pageSize: number;
        total: number;
    };
    isLoading: boolean;
    error: string | null;
    selectedPointId: string | null | number;
    searchTerm: string;
    filterType: '全部' | QuestionTypeEnum;
    selectedRowKeys: React.Key[];

    // Actions
    handlePointSelect: (pointId: string | number) => void;
    handleSearch: (term: string) => void;
    handleFilterChange: (type: '全部' | QuestionTypeEnum) => void;
    handlePageChange: (page: number, pageSize?: number) => void;
    handleDeleteQuestion: (questionId: number) => Promise<void>;
    handleBatchDelete: () => Promise<void>;
    setSelectedRowKeys: React.Dispatch<React.SetStateAction<React.Key[]>>;
    refetch: () => void;
}

// 定义分页初始值
const INITIAL_PAGE = 1;
const INITIAL_PAGE_SIZE = 10;

export const useQuestionBank = (initialPointId: number | string | null): UseQuestionBankReturn => {
    // 3. 状态管理
    const [questions, setQuestions] = useImmer<QuestionVO[]>([]);
    const [pagination, setPagination] = useState({
        current: INITIAL_PAGE,
        pageSize: INITIAL_PAGE_SIZE,
        total: 0,
    });
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // -- 交互状态 --
    const [selectedPointId, setSelectedPointId] = useState<string | null | number>(initialPointId);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterType, setFilterType] = useState<'全部' | QuestionTypeEnum>('全部');
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

    const debouncedSearchTerm = useDebounce(searchTerm, 500);
    const showToast = useToast();
    const router = useRouter();

    // 4. 核心数据获取逻辑
    const fetchQuestions = useCallback(async () => {
        if (!selectedPointId) {
            setQuestions([]);
            setPagination(p => ({ ...p, total: 0, current: 1 }));
            setIsLoading(false);
            return;
        }

        setIsLoading(true);
        setError(null);
        try {
            // 在实际项目中，searchTerm 和 filterType 应该作为参数传给后端
            // 这里我们暂时在前端进行模拟筛选
            const pageData: Page<QuestionVO> = await getQuestionsByPointIdPaginated(selectedPointId, {
                current: pagination.current,
                pageSize: pagination.pageSize,
            });
            setQuestions(pageData.records);
            setPagination(p => ({ ...p, total: pageData.total }));
        } catch (err: any) {
            setError(err.message || '获取题目列表失败');
            showToast({ message: err.message || '数据加载失败', type: 'error' });
        } finally {
            setIsLoading(false);
        }
    }, [selectedPointId, pagination.current, pagination.pageSize, setQuestions, showToast]);

    // 5. 使用 useEffect 监听依赖变化，自动触发数据获取
    useEffect(() => {
        fetchQuestions();
    }, [fetchQuestions]);

    // 6. 前端模拟筛选和搜索逻辑 (未来可以迁移到后端)
    const filteredAndSearchedQuestions = useMemo(() => {
        let result = [...questions];
        if (filterType !== '全部') {
            result = result.filter(q => q.type === filterType);
        }
        if (debouncedSearchTerm) {
            result = result.filter(q => q.stem.toLowerCase().includes(debouncedSearchTerm.toLowerCase()));
        }
        return result;
    }, [questions, filterType, debouncedSearchTerm]);


    // 7. 定义所有交互回调函数
    const handlePointSelect = (pointId: string | number) => {
        setSelectedPointId(pointId);
        setPagination({ ...pagination, current: 1 }); // 切换知识点时重置分页
        setSelectedRowKeys([]); // 清空勾选
    };

    const handleSearch = (term: string) => {
        setSearchTerm(term);
    };

    const handleFilterChange = (type: '全部' | QuestionTypeEnum) => {
        setFilterType(type);
    };

    const handlePageChange = (page: number, pageSize?: number) => {
        setPagination(prev => ({
            ...prev,
            current: page,
            pageSize: pageSize || prev.pageSize,
        }));
    };

    const handleDeleteQuestion = async (questionId: number) => {
        try {
            await deleteQuestionById(questionId);
            showToast({ message: '题目删除成功！', type: 'success' });
            refetch(); // 重新加载数据
        } catch (error: any) {
            // 错误提示已由 apiClient 统一处理
        }
    };

    const handleBatchDelete = async () => {
        if (selectedRowKeys.length === 0) {
            showToast({ message: '请至少选择一个要删除的题目', type: 'warning' });
            return;
        }
        try {
            await batchDeleteQuestions(selectedRowKeys as number[]);
            showToast({ message: `成功删除 ${selectedRowKeys.length} 道题目`, type: 'success' });
            setSelectedRowKeys([]); // 清空选择
            refetch(); // 重新加载数据
        } catch (error: any) {
            // 错误提示已由 apiClient 统一处理
        }
    };

    const refetch = useCallback(() => {
        // 清空并重新获取
        setQuestions([]);
        fetchQuestions();
    }, [fetchQuestions, setQuestions]);

    // 8. 返回对外的接口
    return {
        questions: filteredAndSearchedQuestions, // 返回经过筛选和搜索的结果
        pagination,
        isLoading,
        error,
        selectedPointId,
        searchTerm,
        filterType,
        selectedRowKeys,
        handlePointSelect,
        handleSearch,
        handleFilterChange,
        handlePageChange,
        handleDeleteQuestion,
        handleBatchDelete,
        setSelectedRowKeys,
        refetch,
    };
};