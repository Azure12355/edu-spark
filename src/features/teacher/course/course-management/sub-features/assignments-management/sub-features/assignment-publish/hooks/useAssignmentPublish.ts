// [!file src/features/teacher/course/course-management/sub-features/assignments-management/sub-features/assignment-publish/hooks/useAssignmentPublish.ts]
"use client";

import { useState, useEffect, useCallback } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useToast } from '@/shared/hooks/useToast';
import { useConfirmationModal } from '@/shared/hooks/useConfirmationModal';
import { AssignmentVO, ClassVO, ActivityPublishRequestDTO } from '@/shared/types';
import {getAssignmentTemplate, listClassesByPage, publishActivity} from "@/shared/services";

// 定义单个班级的发布配置状态接口
export interface ClassPublishConfig {
    classId: number;
    className: string; // 冗余班级名称用于UI显示
    isSelected: boolean;
    publishAt?: string;
    startAt?: string;
    dueAt?: string;
    settingsOverride?: Record<string, any>;
    error?: string; // 用于存储该行的校验错误
}

/**
 * 作业发布设置页面的核心逻辑 Hook。
 */
export const useAssignmentPublish = () => {
    // 1. 路由与依赖
    const router = useRouter();
    const params = useParams();
    const courseId = Number(params.id);
    const templateId = Number(params.templateId);

    // 2. 状态管理
    const [template, setTemplate] = useState<AssignmentVO | null>(null);
    const [classConfigs, setClassConfigs] = useState<ClassPublishConfig[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isPublishing, setIsPublishing] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const showToast = useToast();
    const showConfirmationModal = useConfirmationModal();

    // 3. 数据获取
    const fetchData = useCallback(async () => {
        if (isNaN(templateId) || isNaN(courseId)) {
            setError('无效的URL参数');
            setIsLoading(false);
            return;
        }
        setIsLoading(true);
        setError(null);
        try {
            // 并行获取模板详情和班级列表
            const [templateData, classPage] = await Promise.all([
                getAssignmentTemplate(templateId),
                listClassesByPage({ courseId, pageSize: 999 }) // 获取所有班级
            ]);

            setTemplate(templateData);

            // 初始化班级配置列表
            const initialConfigs = classPage.records.map(cls => ({
                classId: cls.id,
                className: cls.name,
                isSelected: true, // 默认全选
                publishAt: new Date().toISOString(), // 默认立即发布
                startAt: new Date().toISOString(),   // 默认立即开始
                dueAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), // 默认7天后截止
                settingsOverride: {},
            }));
            setClassConfigs(initialConfigs);

        } catch (err: any) {
            setError(err.message || '获取页面数据失败');
            showToast({ message: '获取数据失败', type: 'error' });
        } finally {
            setIsLoading(false);
        }
    }, [templateId, courseId, showToast]);

    // 4. Effect Hook - 页面加载时获取数据
    useEffect(() => {
        fetchData();
    }, [fetchData]);

    // 5. 班级配置更新逻辑
    const updateClassConfig = useCallback((classId: number, newConfig: Partial<ClassPublishConfig>) => {
        setClassConfigs(prev =>
            prev.map(config =>
                config.classId === classId ? { ...config, ...newConfig, error: undefined } : config
            )
        );
    }, []);

    // 6. 批量设置逻辑
    const applyToAll = (newConfig: Partial<Omit<ClassPublishConfig, 'classId' | 'className'>>) => {
        setClassConfigs(prev =>
            prev.map(config =>
                config.isSelected ? { ...config, ...newConfig } : config
            )
        );
        showToast({ message: '已应用到所有选中班级', type: 'info' });
    };

    // 7. 发布逻辑
    const validateAllConfigs = (): boolean => {
        let isValid = true;
        const newConfigs = classConfigs.map(config => {
            if (!config.isSelected) return config; // 未选中的不校验
            if (!config.startAt || !config.dueAt) {
                config.error = '必须设置起止时间';
                isValid = false;
            } else if (new Date(config.startAt) >= new Date(config.dueAt)) {
                config.error = '截止时间必须晚于开始时间';
                isValid = false;
            } else {
                config.error = undefined;
            }
            return config;
        });
        setClassConfigs(newConfigs);
        return isValid;
    };

    const handlePublish = () => {
        const selectedConfigs = classConfigs.filter(c => c.isSelected);
        if (selectedConfigs.length === 0) {
            showToast({ message: '请至少选择一个班级进行发布', type: 'warning' });
            return;
        }

        if (!validateAllConfigs()) {
            showToast({ message: '请检查各班级的配置项', type: 'warning' });
            return;
        }

        showConfirmationModal({
            title: '确认发布',
            message: `您确定要将作业《${template?.title}》发布到 ${selectedConfigs.length} 个班级吗？`,
            type: 'info',
            onConfirm: async () => {
                setIsPublishing(true);
                try {
                    // 构建多个API请求
                    const publishPromises = selectedConfigs.map(config => {
                        const request: ActivityPublishRequestDTO = {
                            activityTemplateId: templateId,
                            title: template?.title, // 默认使用模板标题
                            publishAt: config.publishAt!,
                            startAt: config.startAt!,
                            dueAt: config.dueAt!,
                            settingsOverride: config.settingsOverride,
                        };
                        return publishActivity(config.classId, request);
                    });

                    // 并行执行所有发布请求
                    await Promise.all(publishPromises);

                    showToast({ message: '发布成功！', type: 'success' });
                    router.push(`/teacher/courses/${courseId}/assignments`);
                } catch (err: any) {
                    // 错误已由拦截器处理
                } finally {
                    setIsPublishing(false);
                }
            }
        });
    };

    // 8. 返回接口
    return {
        template,
        classConfigs,
        isLoading,
        isPublishing,
        error,
        updateClassConfig,
        applyToAll,
        handlePublish,
    };
};