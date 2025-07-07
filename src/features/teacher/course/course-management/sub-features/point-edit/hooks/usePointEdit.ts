// [!file src/features/teacher/course/course-management/sub-features/point-edit/hooks/usePointEdit.ts]
/**
 * @file src/features/teacher/course/course-management/sub-features/point-edit/hooks/usePointEdit.ts
 * @description 知识点编辑页面的核心业务逻辑钩子 (Hook)。
 */

import { useState, useEffect, useCallback } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useImmer } from 'use-immer'; // 使用 Immer 来简化状态更新


// 2. 导入共享 Hooks 和 Store
import { useToast } from '@/shared/hooks/useToast';
import { useSyllabusStore } from '@/features/teacher/course/course-management/sub-features/syllabus/store/syllabusStore';
import {LocalEditablePoint} from "@/features/teacher/course/course-management/sub-features/point-edit/types";
import {PointUpdateRequestDTO} from "@/shared/types";
import {getKnowledgePointDetail, updatePoint} from "@/shared/services";

// 3. 定义 Hook 的返回值类型
interface UsePointEditReturn {
    localPoint: LocalEditablePoint | null;
    isLoading: boolean;
    isSaving: boolean;
    isMetadataModalOpen: boolean;
    handleFieldChange: <K extends keyof LocalEditablePoint>(field: K, value: LocalEditablePoint[K]) => void;
    handleSave: () => Promise<void>;
    openMetadataModal: () => void;
    closeMetadataModal: () => void;
}

export const usePointEdit = (): UsePointEditReturn => {
    // 4. 初始化 Hooks 和状态
    const params = useParams();
    const router = useRouter();
    const showToast = useToast();
    const { fetchSyllabus } = useSyllabusStore(); // 用于保存成功后刷新全局大纲

    const courseId = params.id as any;
    const pointId = params.pointId as any;

    const [localPoint, setLocalPoint] = useImmer<LocalEditablePoint | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [isMetadataModalOpen, setIsMetadataModalOpen] = useState(false);

    // 5. 数据获取与初始化逻辑
    useEffect(() => {
        if (!pointId) return;

        const loadPointData = async () => {
            setIsLoading(true);
            try {
                const data = await getKnowledgePointDetail(pointId);
                // 将获取到的完整 VO 数据转换为本地可编辑的状态模型
                setLocalPoint({
                    id: data.id,
                    title: data?.title || '未知标题',
                    content: data.content || '', // 确保 content 不为 undefined
                    type: data.type,
                    difficulty: data.difficulty || '中等', // 提供默认值
                    tags: data.metadata?.tags || [], // 提供默认值
                });
            } catch (error: any) {
                showToast({ message: error.message || '加载知识点数据失败', type: 'error' });
                // 加载失败时可以考虑跳转回上一页
                router.back();
            } finally {
                setIsLoading(false);
            }
        };

        loadPointData();
    }, [pointId, setLocalPoint, showToast, router]);


    // 6. 状态更新与业务逻辑处理函数

    // 使用 Immer 更新状态，支持任意字段
    const handleFieldChange = useCallback(<K extends keyof LocalEditablePoint>(field: K, value: LocalEditablePoint[K]) => {
        setLocalPoint(draft => {
            if (draft) {
                draft[field] = value;
            }
        });
    }, [setLocalPoint]);

    // 保存逻辑
    const handleSave = async () => {
        if (!localPoint) {
            showToast({ message: '没有可保存的数据', type: 'warning' });
            return;
        }

        setIsSaving(true);
        try {
            // 将本地状态转换为后端需要的 DTO
            const updateDto: PointUpdateRequestDTO = {
                id: localPoint.id,
                title: localPoint.title,
                content: localPoint.content,
                type: localPoint.type,
                difficulty: localPoint.difficulty,
                metadata: {
                    tags: localPoint.tags,
                },
            };

            await updatePoint(updateDto);

            showToast({ message: '知识点已成功保存！', type: 'success' });

            // 刷新 syllabus store 中的数据，确保返回后看到最新状态
            await fetchSyllabus(courseId, true);

            // 保存成功后跳转回详情页
            router.push(`/teacher/courses/${courseId}/syllabus/${pointId}`);

        } catch (error: any) {
            showToast({ message: error.message || '保存失败，请稍后重试', type: 'error' });
        } finally {
            setIsSaving(false);
        }
    };

    const openMetadataModal = useCallback(() => setIsMetadataModalOpen(true), []);
    const closeMetadataModal = useCallback(() => setIsMetadataModalOpen(false), []);

    // 7. 返回所有状态和方法
    return {
        localPoint,
        isLoading,
        isSaving,
        isMetadataModalOpen,
        handleFieldChange,
        handleSave,
        openMetadataModal,
        closeMetadataModal,
    };
};