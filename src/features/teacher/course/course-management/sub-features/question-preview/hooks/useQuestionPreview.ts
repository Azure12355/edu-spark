// [!file src/features/teacher/course/course-management/sub-features/question-preview/hooks/useQuestionPreview.ts]
/**
 * @file src/features/teacher/course/course-management/sub-features/question-preview/hooks/useQuestionPreview.ts
 * @description 题目预览页面的核心业务逻辑钩子 (Hook)。
 */

import { useState, useEffect, useCallback } from 'react';
import { useParams } from 'next/navigation';
import {QuestionVO} from "@/shared/types";
import {getQuestionVOById} from "@/shared/services";

// 2. 定义 Hook 返回值类型，作为对外的“契约”
interface UseQuestionPreviewReturn {
    /** 题目详情数据，可能为 null */
    question: QuestionVO | null;
    /** 页面是否正在加载数据 */
    isLoading: boolean;
    /** 加载过程中发生的错误信息 */
    error: string | null;
    /** 手动触发数据重新获取的函数 */
    refetch: () => void;
}

export const useQuestionPreview = (): UseQuestionPreviewReturn => {
    // 3. 从路由中获取 questionId
    const params = useParams();
    const questionId = params.questionId as any;

    // 4. 定义组件的状态
    const [question, setQuestion] = useState<QuestionVO | null>(null);
    const [isLoading, setIsLoading] = useState(true); // 初始默认为加载中
    const [error, setError] = useState<string | null>(null);

    // 5. 核心数据获取逻辑，使用 useCallback 进行性能优化
    const fetchQuestionData = useCallback(async () => {
        // a. 参数校验
        if (!questionId) {
            setError("无效的题目ID");
            setIsLoading(false);
            return;
        }

        // b. 开始获取数据，设置加载状态
        setIsLoading(true);
        setError(null);
        setQuestion(null); // 在重新获取前清空旧数据，防止UI显示旧内容

        try {
            // c. 调用 Service 发送 API 请求
            const data = await getQuestionVOById(questionId);
            setQuestion(data);
        } catch (err: any) {
            // d. 捕获错误， apiClient 的拦截器已经处理了 toast 提示
            console.error(`获取题目(ID: ${questionId})详情失败:`, err);
            setError(err.message || "无法加载题目详情，请稍后重试。");
        } finally {
            // e. 无论成功与否，都结束加载状态
            setIsLoading(false);
        }
    }, [questionId]); // 仅当 questionId 变化时，fetchQuestionData 函数的引用才会改变

    // 6. 使用 useEffect 在组件挂载或 questionId 变化时自动触发数据获取
    useEffect(() => {
        fetchQuestionData();
    }, [fetchQuestionData]); // 依赖于 useCallback 创建的稳定函数引用

    // 7. 返回所有状态和方法
    return {
        question,
        isLoading,
        error,
        refetch: fetchQuestionData, // 提供给外部的手动刷新方法
    };
};