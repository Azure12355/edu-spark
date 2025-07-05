/**
 * @file src/features/teacher/course/course-management/sub-features/syllabus/hooks/useSyllabusEdit.ts
 * @description 课程大纲编辑页面的核心逻辑钩子 (Hook)。
 */

import { useState, useEffect, useCallback } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useSyllabusStore } from '../store/syllabusStore';
import { useToast } from '@/shared/hooks/useToast';
import { ChapterVO, SectionVO, KnowledgePoint } from '../types';
import * as syllabusService from '../services/syllabusService'; // 导入所有 service 函数

// 使用 immer 来简化深层嵌套状态的更新
import { useImmer } from 'use-immer';

interface UseSyllabusEditReturn {
    localSyllabus: ChapterVO[];
    isLoading: boolean;
    isSaving: boolean;
    handleSyllabusReorder: (reorderedChapters: ChapterVO[]) => void;
    handleNodeUpdate: (path: (number | string)[], value: any) => void;
    handleNodeAdd: (type: 'chapter' | 'section' | 'point', path?: number[]) => void;
    handleNodeDelete: (type: 'chapter' | 'section' | 'point', path: number[]) => void;
    handleSave: () => Promise<void>;
}

export const useSyllabusEdit = (): UseSyllabusEditReturn => {
    const params = useParams();
    const courseId = params.id as string;
    const router = useRouter();
    const showToast = useToast();

    // 从 Zustand Store 获取全局大纲数据
    const { syllabus: globalSyllabus, fetchSyllabus } = useSyllabusStore();

    // 使用 useImmer 来管理本地的、可编辑的大纲副本
    const [localSyllabus, setLocalSyllabus] = useImmer<ChapterVO[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);

    // 初始化本地状态
    useEffect(() => {
        if (globalSyllabus) {
            setLocalSyllabus(globalSyllabus.chapters);
            setIsLoading(false);
        } else {
            // 如果全局状态为空，则尝试从API获取
            const loadSyllabus = async () => {
                try {
                    await fetchSyllabus(courseId);
                } finally {
                    setIsLoading(false);
                }
            };
            loadSyllabus();
        }
    }, [globalSyllabus, fetchSyllabus, courseId, setLocalSyllabus]);

    // --- 核心业务逻辑处理函数 ---

    const handleSyllabusReorder = (reorderedChapters: ChapterVO[]) => {
        setLocalSyllabus(reorderedChapters);
    };

    // 使用路径来精确定位和更新节点
    const handleNodeUpdate = (path: (number | string)[], value: any) => {
        setLocalSyllabus(draft => {
            let current: any = draft;
            for (let i = 0; i < path.length - 1; i++) {
                current = current[path[i]];
            }
            current[path[path.length - 1]] = value;
        });
    };

    const handleNodeAdd = (type: 'chapter' | 'section' | 'point', path: number[] = []) => {
        setLocalSyllabus(draft => {
            const newItemId = `temp-${Date.now()}`; // 临时ID
            if (type === 'chapter') {
                draft.push({ id: newItemId, title: '新章节', description: '', sections: [] } as unknown as ChapterVO);
            } else if (type === 'section') {
                draft[path[0]].sections.push({ id: newItemId, title: '新小节', points: [] } as unknown as SectionVO);
            } else if (type === 'point') {
                draft[path[0]].sections[path[1]].points.push({ id: newItemId, title: '新知识点', type: '重点' } as unknown as KnowledgePoint);
            }
        });
        showToast({ message: "添加成功，请记得保存。", type: 'info' });
    };

    const handleNodeDelete = (type: 'chapter' | 'section' | 'point', path: number[]) => {
        setLocalSyllabus(draft => {
            if (type === 'chapter') {
                draft.splice(path[0], 1);
            } else if (type === 'section') {
                draft[path[0]].sections.splice(path[1], 1);
            } else if (type === 'point') {
                draft[path[0]].sections[path[1]].points.splice(path[2], 1);
            }
        });
        showToast({ message: "已删除，请记得保存。", type: 'info' });
    };

    const handleSave = async () => {
        setIsSaving(true);
        try {
            // 此处应该是调用后端的批量更新/同步接口
            // 为了演示，我们先假设一个 mock service
            console.log("Saving syllabus to backend:", localSyllabus);
            await new Promise(resolve => setTimeout(resolve, 1000)); // 模拟API延时

            //todo: 后续考虑新增批量更新的请求
            // 成功后，用本地数据更新全局Zustand Store
            fetchSyllabus(courseId); // 或者直接 setSyllabus({ chapters: localSyllabus })

            showToast({ message: "课程大纲已成功保存！", type: 'success' });
            router.push(`/teacher/courses/${courseId}/syllabus`);
        } catch (error: any) {
            showToast({ message: error.message || "保存失败，请稍后重试", type: 'error' });
        } finally {
            setIsSaving(false);
        }
    };

    return {
        localSyllabus,
        isLoading,
        isSaving,
        handleSyllabusReorder,
        handleNodeUpdate,
        handleNodeAdd,
        handleNodeDelete,
        handleSave,
    };
};