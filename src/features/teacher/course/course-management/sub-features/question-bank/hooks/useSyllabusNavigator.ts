// [!file src/features/teacher/course/course-management/sub-features/question-bank/hooks/useSyllabusNavigator.ts]
/**
 * @file src/features/teacher/course/course-management/sub-features/question-bank/hooks/useSyllabusNavigator.ts
 * @description 题库页面左侧大纲导航器的专属 Hook。
 */

import { useState, useEffect, useCallback } from 'react';
import { useParams } from 'next/navigation';

// 1. 导入本领域内的 Service 和类型
import { getSyllabusByCourseId } from '../services/syllabusService';
import {SyllabusVO} from "@/features/teacher/course/course-management/sub-features/syllabus/types";

interface UseSyllabusNavigatorReturn {
    syllabus: SyllabusVO | null | any;
    isLoading: boolean;
    error: string | null;
    expandedItems: Set<string | number>;
    handleToggleItem: (id: string | number) => void;
}

export const useSyllabusNavigator = (): UseSyllabusNavigatorReturn => {
    const params = useParams();
    const courseId = params.id as string;

    const [syllabus, setSyllabus] = useState<SyllabusVO | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [expandedItems, setExpandedItems] = useState<Set<string | number | any>>(new Set());

    // 核心数据获取逻辑
    const fetchSyllabusData = useCallback(async () => {
        if (!courseId) {
            setError("课程ID无效");
            setIsLoading(false);
            return;
        }
        setIsLoading(true);
        setError(null);
        try {
            const data = await getSyllabusByCourseId(courseId);
            setSyllabus(data);
            // 默认展开所有章节，方便用户浏览
            if (data && data.chapters) {
                const allChapterIds = new Set(data.chapters.map((c: any) => c.id));
                setExpandedItems(allChapterIds);
            }
        } catch (err: any) {
            console.error("Failed to fetch syllabus for navigator:", err);
            setError(err.message || '加载课程大纲失败');
        } finally {
            setIsLoading(false);
        }
    }, [courseId]);

    // 组件挂载时自动获取数据
    useEffect(() => {
        fetchSyllabusData();
    }, [fetchSyllabusData]);

    const handleToggleItem = useCallback((id: string | number) => {
        setExpandedItems(prev => {
            const newSet = new Set(prev);
            if (newSet.has(id)) {
                newSet.delete(id);
            } else {
                newSet.add(id);
            }
            return newSet;
        });
    }, []);

    return {
        syllabus,
        isLoading,
        error,
        expandedItems,
        handleToggleItem,
    };
};