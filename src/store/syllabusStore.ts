// src/store/syllabusStore.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware'; // 1. 导入 persist 中间件
import { syllabusData as initialSyllabusData, SyllabusChapter } from '@/lib/data/syllabusData';

// 定义 Store 的状态和操作类型
interface SyllabusState {
    syllabus: SyllabusChapter[];
    setSyllabus: (newSyllabus: SyllabusChapter[]) => void;
    resetSyllabus: () => void;
}

// 2. 使用 persist 中间件包裹你的 store 定义
export const useSyllabusStore = create<SyllabusState>()(
    persist(
        (set) => ({
            // 初始状态为从数据文件中导入的数据
            syllabus: initialSyllabusData,

            // 操作：设置/更新整个大纲数据
            setSyllabus: (newSyllabus) => set({ syllabus: newSyllabus }),

            // 操作：重置为初始数据（用于演示或测试）
            resetSyllabus: () => set({ syllabus: initialSyllabusData }),
        }),
        {
            name: 'syllabus-storage', // 3. 在 localStorage 中存储的唯一键名
        }
    )
);