/**
 * @file src/features/teacher/course/course-management/sub-features/introduction/hooks/useCourseIntroduction.ts
 * @description “课程介绍”页面的核心逻辑钩子 (Hook)。
 * 负责并发获取课程核心信息和详情，管理加载、错误状态，并提供刷新机制。
 */

import { useState, useEffect, useCallback } from 'react';
import { useParams } from 'next/navigation';
import {CourseDetail, CourseVO} from "@/shared/types";
import {useToast} from "@/shared/hooks/useToast";
import {getCourseDetail, getCourseVOById} from "@/shared/services";

type FullCourseInfo = CourseVO & {
    details: CourseDetail | null;
};

// Hook 返回值的类型定义，作为其对外的“契约”
interface UseCourseIntroductionReturn {
    /** 聚合后的完整课程信息，可能为 null */
    fullCourseInfo: FullCourseInfo | null;
    /**
     * 初始加载状态。仅在首次进入页面时为 true，
     * 手动刷新时保持为 false，以便UI区分“首次加载”和“后台刷新”。
     */
    isInitialLoading: boolean;
    /** 刷新状态。在手动调用 refetch 时为 true。 */
    isRefreshing: boolean;
    /** 错误信息，如果获取失败则包含错误消息。 */
    error: string | null;
    /** 手动触发数据重新获取的函数。 */
    refetch: () => void;
}

export const useCourseIntroduction = (): UseCourseIntroductionReturn => {
    // 1. 从路由中获取课程ID
    const params = useParams();
    const courseId = params.id as unknown as number;

    // 2. 状态管理
    const [fullCourseInfo, setFullCourseInfo] = useState<FullCourseInfo | null>(null);
    const [isInitialLoading, setIsInitialLoading] = useState<boolean>(true);
    const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const showToast = useToast();

    // 3. 核心数据获取逻辑
    const fetchCourseData = useCallback(async () => {
        // 参数校验
        if (!courseId) {
            setError("无效的课程ID");
            setIsInitialLoading(false);
            return;
        }

        // 根据是首次加载还是手动刷新，设置不同的加载状态
        if (!fullCourseInfo) {
            setIsInitialLoading(true);
        } else {
            setIsRefreshing(true);
        }
        setError(null);

        try {
            // **【核心优化】: 使用 Promise.allSettled 并发获取数据**
            // allSettled 保证即使其中一个请求失败，另一个成功的结果也能被获取。
            const [courseResult, detailResult] = await Promise.allSettled([
                getCourseVOById(courseId),
                getCourseDetail(courseId)
            ]);

            // **处理 CourseVO 的结果**
            if (courseResult.status === 'rejected') {
                // 如果获取课程核心信息失败，则整个页面都无法展示，这是一个致命错误。
                throw new Error(courseResult.reason?.message || "无法加载课程核心信息");
            }
            const courseVO: CourseVO = courseResult.value;

            // **处理 CourseDetail 的结果**
            let courseDetail: CourseDetail | null = null;
            if (detailResult.status === 'fulfilled') {
                courseDetail = detailResult.value;
            } else {
                // 如果详情获取失败（例如404），这不是致命错误。
                // 我们仍然可以展示课程的核心信息，只是详情部分为空。
                // 可以在控制台记录一个警告，但不需要中断页面渲染。
                console.warn(`获取课程详情失败 (Course ID: ${courseId}):`, detailResult.reason?.message);
                // 可以选择性地给用户一个非阻塞的提示
                // showToast({ message: "课程详情加载失败，部分信息可能无法显示", type: 'warning' });
            }

            // **【核心】数据聚合**
            setFullCourseInfo({
                ...courseVO,
                details: courseDetail
            });

        } catch (err: any) {
            // 捕获致命错误（如获取CourseVO失败或网络问题）
            console.error("加载课程介绍页面数据时发生严重错误:", err);
            setError(err.message);
            setFullCourseInfo(null); // 清空数据
        } finally {
            // 无论成功与否，都结束加载状态
            setIsInitialLoading(false);
            setIsRefreshing(false);
        }
    }, [courseId, fullCourseInfo]); // fullCourseInfo 用于判断是首次加载还是刷新

    // 4. 使用 useEffect 在组件挂载或 courseId 变化时自动触发数据获取
    useEffect(() => {
        fetchCourseData();
    }, [courseId]); // 仅当 courseId 变化时才重新执行首次获取

    // 5. 提供给外部的手动刷新方法
    const refetch = useCallback(() => {
        fetchCourseData();
    }, [fetchCourseData]);

    // 6. 返回所有状态和方法，形成对外的稳定“契约”
    return {
        fullCourseInfo,
        isInitialLoading,
        isRefreshing,
        error,
        refetch,
    };
};