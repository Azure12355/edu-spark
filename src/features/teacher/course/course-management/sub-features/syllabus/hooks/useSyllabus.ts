/**
 * @file src/features/teacher/course/course-management/sub-features/syllabus/hooks/useSyllabus.ts
 * @description 课程大纲页面的核心逻辑钩子 (Hook)。
 */
import { useState, useEffect, useCallback } from 'react';
import { useParams } from 'next/navigation';
import {SyllabusVO} from "@/shared/types";
import {getSyllabusByCourseId} from "@/shared/services";

interface UseSyllabusReturn {
    syllabus: SyllabusVO | null;
    isLoading: boolean;
    error: string | null;
    expandedItems: Set<string | number>;
    toggleItem: (id: string | number) => void;
    expandAll: () => void;
    collapseAll: () => void;
    refetch: () => void;
}

export const useSyllabus = (): UseSyllabusReturn => {
    const params = useParams();
    const courseId = params.id as unknown as number;

    const [syllabus, setSyllabus] = useState<SyllabusVO | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [expandedItems, setExpandedItems] = useState<Set<string | number>>(new Set());

    const fetchSyllabus = useCallback(async () => {
        if (!courseId) {
            setError("无效的课程ID");
            setIsLoading(false);
            return;
        }
        setIsLoading(true);
        setError(null);
        try {
            const data = await getSyllabusByCourseId(courseId);
            setSyllabus(data);
            // 默认展开第一章和第一章的第一个小节
            if (data.chapters.length > 0) {
                const firstChapterId = data.chapters[0].id;
                const newExpanded = new Set<string|number>([firstChapterId]);
                if (data.chapters[0].sections.length > 0) {
                    newExpanded.add(data.chapters[0].sections[0].id);
                }
                setExpandedItems(newExpanded);
            }
        } catch (err: any) {
            console.error("Failed to fetch syllabus:", err);
            setError(err.message || '获取课程大纲失败');
        } finally {
            setIsLoading(false);
        }
    }, [courseId]);

    useEffect(() => {
        fetchSyllabus();
    }, [fetchSyllabus]);

    const toggleItem = (id: string | number) => {
        setExpandedItems(prev => {
            const newSet = new Set(prev);
            if (newSet.has(id)) {
                newSet.delete(id);
            } else {
                newSet.add(id);
            }
            return newSet;
        });
    };

    const expandAll = () => {
        if (!syllabus) return;
        const allIds = new Set<string | number>();
        syllabus.chapters.forEach(chapter => {
            allIds.add(chapter.id);
            chapter.sections.forEach(section => {
                allIds.add(section.id);
            });
        });
        setExpandedItems(allIds);
    };

    const collapseAll = () => {
        setExpandedItems(new Set());
    };

    return {
        syllabus,
        isLoading,
        error,
        expandedItems,
        toggleItem,
        expandAll,
        collapseAll,
        refetch: fetchSyllabus,
    };
};