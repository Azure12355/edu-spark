// src/features/teacher/course/course-management/sub-features/ai-question-generator/hooks/useSyllabusForModal.ts
import { useState, useEffect, useCallback } from 'react';
import { useParams } from 'next/navigation';
import { SyllabusVO } from '@/shared/types';
import { getSyllabusByCourseId } from '@/shared/services/syllabusService'; // 复用已创建的 service

interface UseSyllabusForModalReturn {
    syllabus: SyllabusVO | null;
    isLoading: boolean;
    error: string | null;
    refetch: () => void;
}

// 使用一个简单的内存缓存来避免在同一次会话中重复请求同一个课程的大纲
const syllabusCache = new Map<string, SyllabusVO>();

export const useSyllabusForModal = (): UseSyllabusForModalReturn => {
    const params = useParams();
    const courseId = params.id as string;

    const [syllabus, setSyllabus] = useState<SyllabusVO | null>(() => {
        return syllabusCache.get(courseId) || null;
    });
    const [isLoading, setIsLoading] = useState<boolean>(!syllabus);
    const [error, setError] = useState<string | null>(null);

    const fetchSyllabus = useCallback(async () => {
        if (!courseId) {
            setError("课程ID无效，无法加载知识点列表");
            setIsLoading(false);
            return;
        }

        if (syllabusCache.has(courseId)) {
            setSyllabus(syllabusCache.get(courseId)!);
            setIsLoading(false);
            return;
        }

        setIsLoading(true);
        setError(null);
        try {
            const data: SyllabusVO = await getSyllabusByCourseId(Number(courseId));
            setSyllabus(data);
            syllabusCache.set(courseId, data);
        } catch (err: any) {
            console.error("useSyllabusForModal hook failed to fetch data:", err);
            setError(err.message || '加载知识点列表失败');
        } finally {
            setIsLoading(false);
        }
    }, [courseId]);

    useEffect(() => {
        fetchSyllabus();
    }, [fetchSyllabus]);

    const refetch = useCallback(() => {
        if (courseId) {
            syllabusCache.delete(courseId);
            fetchSyllabus();
        }
    }, [courseId, fetchSyllabus]);

    return { syllabus, isLoading, error, refetch };
};