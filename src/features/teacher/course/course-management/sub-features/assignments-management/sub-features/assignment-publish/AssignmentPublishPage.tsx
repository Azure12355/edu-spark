// [!file src/features/teacher/course/course-management/sub-features/assignments-management/sub-features/assignment-publish/AssignmentPublishPage.tsx]
"use client";

import React from 'react';
import styles from './AssignmentPublish.module.css';
import { useAssignmentPublish } from './hooks/useAssignmentPublish';

// 导入真实的UI组件（我们稍后会创建它们）
import PublishHeader from './components/PublishHeader/PublishHeader';
import TemplatePreview from './components/TemplatePreview/TemplatePreview';
import ClassPublishSettings from './components/ClassPublishSettings/ClassPublishSettings';

/**
 * 作业发布设置页面的主组件。
 */
export default function AssignmentPublishPage() {
    // 1. 调用核心 Hook 获取所有状态和操作函数
    const {
        template,
        classConfigs,
        isLoading,
        isPublishing,
        error,
        updateClassConfig,
        applyToAll,
        handlePublish,
    } = useAssignmentPublish();

    // 2. 渲染主内容区域的逻辑
    const renderContent = () => {
        if (isLoading) {
            // 如果正在加载，显示完整的骨架屏
            return (
                <div className={styles.mainLayout}>
                    <TemplatePreviewSkeleton />
                    <ClassSettingsSkeleton />
                </div>
            );
        }

        if (error) {
            return (
                <div className={styles.feedbackContainer}>
                    <i className="fas fa-exclamation-circle"></i>
                    <p>加载数据失败: {error}</p>
                </div>
            );
        }

        if (!template) {
            return (
                <div className={styles.feedbackContainer}>
                    <i className="fas fa-question-circle"></i>
                    <p>无法找到该作业模板信息。</p>
                </div>
            );
        }

        // 正常渲染发布设置界面
        return (
            <div className={styles.mainLayout}>
                <TemplatePreview template={template} />
                <ClassPublishSettings
                    configs={classConfigs}
                    onConfigChange={updateClassConfig}
                    onApplyToAll={applyToAll}
                />
            </div>
        );
    };

    return (
        <div className={styles.pageContainer}>
            <PublishHeader
                onPublish={handlePublish}
                isPublishing={isPublishing}
                templateTitle={template?.title || '作业'}
            />
            {renderContent()}
        </div>
    );
}

// 骨架屏组件 (来自之前的静态骨架)
const TemplatePreviewSkeleton = () => (
    <aside className={styles.preview_skeleton}>
        <div className={styles.line_skeleton} style={{ width: '60%', height: '24px', marginBottom: '24px' }}></div>
        <div className={styles.line_skeleton} style={{ width: '80%' }}></div>
        <div className={styles.line_skeleton} style={{ width: '90%' }}></div>
        <div className={styles.line_skeleton} style={{ width: '70%', marginTop: '20px' }}></div>
        <div className={styles.line_skeleton} style={{ width: '50%' }}></div>
    </aside>
);

const ClassSettingsSkeleton = () => (
    <section className={styles.settings_skeleton}>
        <div className={styles.line_skeleton} style={{ width: '40%', height: '24px', marginBottom: '24px' }}></div>
        {Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className={styles.class_row_skeleton}>
                <div className={styles.checkbox_skeleton}></div>
                <div className={styles.class_info_skeleton}>
                    <div className={styles.line_skeleton} style={{ width: '150px', height: '18px' }}></div>
                    <div className={styles.line_skeleton} style={{ width: '100px', height: '14px', marginTop: '8px' }}></div>
                </div>
                <div className={styles.date_picker_skeleton}></div>
                <div className={styles.date_picker_skeleton}></div>
                <div className={styles.config_button_skeleton}></div>
            </div>
        ))}
    </section>
);