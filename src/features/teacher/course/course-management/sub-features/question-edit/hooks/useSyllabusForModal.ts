// [!file src/features/teacher/course/course-management/sub-features/question-edit/hooks/useSyllabusForModal.ts]
/**
 * @file src/features/teacher/course/course-management/sub-features/question-edit/hooks/useSyllabusForModal.ts
 * @description 专用于知识点选择模态框的 Hook，负责获取和管理课程大纲数据。
 */

import { useState, useEffect, useCallback } from 'react';
import { useParams } from 'next/navigation';

// 1. 导入本领域的 Service 和类型
import { getSyllabusForModal } from '../services/syllabusServiceForModal';
import { SyllabusVO } from '../types';

// 2. 定义 Hook 的返回值类型
interface UseSyllabusForModalReturn {
    /** 完整的课程大纲数据，可能为 null */
    syllabus: SyllabusVO | null;
    /** 是否正在加载大纲数据 */
    isLoading: boolean;
    /** 加载过程中发生的错误 */
    error: string | null;
    /** 手动触发重新加载的函数 */
    refetch: () => void;
}

// 3. 使用一个简单的内存缓存来避免在同一次会话中重复请求同一个课程的大纲
const syllabusCache = new Map<string, SyllabusVO>();

export const useSyllabusForModal = (): UseSyllabusForModalReturn => {
    // 4. 获取当前页面的 courseId
    const params = useParams();
    const courseId = params.id as string;

    // 5. 定义状态
    const [syllabus, setSyllabus] = useState<SyllabusVO | null>(() => {
        // 初始化时尝试从缓存读取
        return syllabusCache.get(courseId) || null;
    });
    const [isLoading, setIsLoading] = useState<boolean>(!syllabus); // 如果缓存中有数据，则初始不加载
    const [error, setError] = useState<string | null>(null);

    // 6. 核心数据获取逻辑
    const fetchSyllabus = useCallback(async () => {
        if (!courseId) {
            setError("课程ID无效，无法加载知识点列表");
            return;
        }

        // 检查缓存，如果存在则直接使用，不再发起网络请求
        if (syllabusCache.has(courseId)) {
            setSyllabus(syllabusCache.get(courseId)!);
            setIsLoading(false);
            return;
        }

        setIsLoading(true);
        setError(null);
        try {
            const data = await getSyllabusForModal(courseId);
            setSyllabus(data);
            syllabusCache.set(courseId, data); // 成功后存入缓存
        } catch (err: any) {
            console.error("useSyllabusForModal hook failed to fetch data:", err);
            setError(err.message || '加载知识点列表失败');
        } finally {
            setIsLoading(false);
        }
    }, [courseId]);

    // 7. 在组件挂载或 courseId 变化时触发数据获取
    useEffect(() => {
        fetchSyllabus();
    }, [fetchSyllabus]);

    // 8. 提供手动刷新功能，刷新时会清除缓存
    const refetch = useCallback(() => {
        if (courseId) {
            syllabusCache.delete(courseId); // 清除缓存以强制重新获取
            fetchSyllabus();
        }
    }, [courseId, fetchSyllabus]);

    // 9. 返回对外的接口
    return {
        syllabus,
        isLoading,
        error,
        refetch,
    };
};