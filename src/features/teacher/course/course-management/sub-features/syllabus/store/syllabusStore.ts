// src/store/syllabusStore.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { syllabusData as initialSyllabusData, SyllabusChapter } from '@/shared/lib/data/syllabusData';
// 1. 导入知识点详情相关的数据和类型
import { PointDetail, pointDetails as initialPointDetails } from '@/shared/lib/data/pointDetailData';


// 2. 扩展 Store 的状态和操作类型
interface SyllabusState {
    syllabus: SyllabusChapter[];
    pointDetails: Record<string, Omit<PointDetail, 'id' | 'title' | 'type'>>; // 存储详情数据

    setSyllabus: (newSyllabus: SyllabusChapter[]) => void;
    updatePointDetail: (pointId: string, newDetail: Partial<PointDetail>) => void; // 新增：更新单个知识点详情

    resetSyllabus: () => void;
}

// 3. 更新 create 函数
export const useSyllabusStore = create<SyllabusState>()(
    persist(
        (set) => ({
            // 初始状态
            syllabus: initialSyllabusData,
            pointDetails: initialPointDetails,

            // 操作
            setSyllabus: (newSyllabus) => set({ syllabus: newSyllabus }),

            // 新增操作的实现
            updatePointDetail: (pointId, newDetail) =>
                set((state) => ({
                    pointDetails: {
                        ...state.pointDetails,
                        [pointId]: {
                            ...state.pointDetails[pointId],
                            ...newDetail,
                        },
                    },
                })),

            resetSyllabus: () => set({ syllabus: initialSyllabusData, pointDetails: initialPointDetails }),
        }),
        {
            name: 'syllabus-storage', // 使用同一个 localStorage 键名
        }
    )
);