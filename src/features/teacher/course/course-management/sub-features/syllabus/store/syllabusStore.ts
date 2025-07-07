/**
 * @file src/features/teacher/course/course-management/sub-features/syllabus/store/syllabusStore.ts
 * @description 使用 Zustand 管理课程大纲的全局状态。
 * v2.0: 增加了异步 action 来获取数据，并优化了状态结构。
 */

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import {SyllabusVO} from "@/shared/types";
import {getSyllabusByCourseId} from "@/shared/services";


// 2. 更新 Store 的状态和操作类型
interface SyllabusState {
    /**
     * 当前正在查看或编辑的课程大纲数据。
     * 可以为 null，表示尚未加载或加载失败。
     */
    syllabus: SyllabusVO | null;

    /**
     * 记录当前 syllabus 数据对应的 courseId，避免重复获取。
     */
    currentCourseId: number | null;

    /**
     * 数据是否正在加载中。
     */
    isLoading: boolean;

    /**
     * 【Action】异步获取指定课程的大纲数据，并更新到 store 中。
     * @param courseId - 要获取的课程的ID。
     * @param forceRefetch - 是否强制重新获取，即使 courseId 未改变。
     */
    fetchSyllabus: (courseId: string | number, forceRefetch?: boolean) => Promise<void>;

    /**
     * 【Action】直接设置大纲数据，用于本地乐观更新。
     * @param newSyllabus - 新的课程大纲对象。
     */
    setSyllabus: (newSyllabus: SyllabusVO) => void;

    /**
     * 【Action】重置/清空大纲数据。
     */
    clearSyllabus: () => void;
}

export const useSyllabusStore = create<SyllabusState>()(
    // 3. 【核心修改】移除 persist 中间件
    // 大纲数据是与特定课程相关的，不适合在 localStorage 中全局持久化。
    // 每次进入页面时都应该重新获取，以保证数据的最新性。
    (set, get) => ({
        // 初始状态
        syllabus: null,
        currentCourseId: null,
        isLoading: false,

        // 异步 Action: fetchSyllabus
        fetchSyllabus: async (courseId: string | number, forceRefetch: boolean = false) => {
            const numCourseId = Number(courseId);

            // 如果正在加载，或者 courseId 相同且不强制刷新，则直接返回，防止重复请求
            if (get().isLoading || (get().currentCourseId === numCourseId && !forceRefetch)) {
                return;
            }

            set({ isLoading: true });
            try {
                const data = await getSyllabusByCourseId(numCourseId);
                set({
                    syllabus: data,
                    currentCourseId: numCourseId,
                    isLoading: false
                });
            } catch (error) {
                console.error(`Failed to fetch syllabus for course ${courseId} into store:`, error);
                set({
                    syllabus: null,
                    currentCourseId: numCourseId, // 即使失败也更新ID，避免无限重试
                    isLoading: false
                });
            }
        },

        // 同步 Action: setSyllabus
        setSyllabus: (newSyllabus: SyllabusVO) => {
            set({ syllabus: newSyllabus });
        },

        // 同步 Action: clearSyllabus
        clearSyllabus: () => {
            set({ syllabus: null, currentCourseId: null, isLoading: false });
        },
    })
);