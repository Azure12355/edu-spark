/**
 * @file src/features/teacher/course/course-management/hooks/useCourseManagementLayout.ts
 * @description 课程管理布局的专用数据获取 Hook。
 */

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
// 注意：我们需要一个能获取 CourseVO 的 service，这里我们复用 introduction 领域下的
import { getCourseVOById } from '@/features/teacher/course/course-management/sub-features/introduction/services/introductionService';
import { CourseVO } from '@/features/teacher/course/course-management/sub-features/introduction/types';

interface UseCourseManagementLayoutReturn {
    course: CourseVO | null;
    isLoading: boolean;
    error: string | null;
}

export const useCourseManagementLayout = (): UseCourseManagementLayoutReturn => {
    const params = useParams();
    const courseId = params.id as string;

    const [course, setCourse] = useState<CourseVO | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!courseId) {
            setError("无效的课程ID");
            setIsLoading(false);
            return;
        }

        const fetchCourse = async () => {
            setIsLoading(true);
            setError(null);
            try {
                const data = await getCourseVOById(courseId);
                setCourse(data);
            } catch (err: any) {
                console.error(`Failed to fetch course for layout (ID: ${courseId}):`, err);
                setError(err.message || '无法加载课程信息');
            } finally {
                setIsLoading(false);
            }
        };

        fetchCourse();
    }, [courseId]);

    return { course, isLoading, error };
};