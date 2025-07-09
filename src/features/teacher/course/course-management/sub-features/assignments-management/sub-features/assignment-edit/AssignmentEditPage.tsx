// [!file src/features/teacher/course/course-management/sub-features/assignments-management/sub-features/assignment-edit/AssignmentEditPage.tsx]
"use client";

import React from 'react';
import styles from './AssignmentEdit.module.css';
import { useAssignmentEdit } from './hooks/useAssignmentEdit';

// 导入真实的子组件
import TemplateInfoEditor from './components/TemplateInfoEditor/TemplateInfoEditor';
import QuestionLinkManager from './components/QuestionLinkManager/QuestionLinkManager';

/**
 * 作业模板编辑页面的主组件。
 * 负责调用 useAssignmentEdit Hook，并管理页面的整体布局和状态渲染。
 */
export default function AssignmentEditPage() {
    // 1. 调用核心 Hook 获取所有状态和操作函数
    const {
        originalTemplate, // 原始模板数据
        formData,         // 编辑表单数据
        questions,        // 题目列表
        isLoading,        // 页面整体加载状态
        isSaving,         // 保存操作加载状态
        error,            // 错误信息
        handleFormChange,
        handleConfigChange, // 未来可能用到
        handleAddQuestion,
        handleUpdateQuestionLink,
        handleRemoveQuestion,
        handleSave,
        handleCancel,
        courseId,         // 课程ID，传递给子组件
        templateId,       // 模板ID
    } = useAssignmentEdit();

    // 2. 渲染头部和操作按钮
    const renderHeader = () => {
        if (isLoading) {
            return (
                <header className={styles.header}>
                    <div className={styles.title_skeleton}></div>
                    <div className={styles.actions}>
                        <div className={styles.saveButton_skeleton}></div>
                        <div className={styles.cancelButton_skeleton}></div>
                    </div>
                </header>
            );
        }

        // 渲染真实头部
        return (
            <header className={styles.header}>
                <h1 className={styles.title}>{originalTemplate?.title || '新模板'}</h1>
                <div className={styles.actions}>
                    <button onClick={handleSave} className={styles.saveButton} disabled={isSaving}>
                        {isSaving ? <><i className="fas fa-spinner fa-spin"></i> 保存中...</> : <><i className="fas fa-save"></i> 保存</>}
                    </button>
                    <button onClick={handleCancel} className={styles.cancelButton} disabled={isSaving}>
                        <i className="fas fa-times"></i> 取消
                    </button>
                </div>
            </header>
        );
    };

    // 3. 渲染主内容区域
    const renderMainContent = () => {
        if (error) {
            return (
                <div className={styles.feedbackContainer}>
                    <i className="fas fa-exclamation-circle"></i>
                    <p>加载模板信息失败: {error}</p>
                </div>
            );
        }

        // 如果正在加载且 formData 为空，则显示骨架屏
        if (isLoading && !formData) {
            return (
                <main className={styles.mainContent}>
                    <SectionSkeleton />
                    <QuestionLinkManagerSkeleton />
                </main>
            );
        }

        // 渲染真实的表单和题目管理器
        return (
            <main className={styles.mainContent}>
                <TemplateInfoEditor
                    formData={formData!} // 确保 formData 不为 null
                    onFormChange={handleFormChange}
                    isSaving={isSaving}
                />
                <QuestionLinkManager
                    questions={questions}
                    onAddQuestion={handleAddQuestion}
                    onUpdateQuestionLink={handleUpdateQuestionLink}
                    onRemoveQuestion={handleRemoveQuestion}
                    courseId={courseId} // 传递 courseId 给 AddQuestionModal 搜索用
                    isLoading={isLoading} // 传递加载状态给题目管理器，用于显示内部加载动画
                />
            </main>
        );
    };

    return (
        <div className={styles.pageContainer}>
            {renderHeader()}
            {renderMainContent()}
        </div>
    );
}

// 骨架屏组件 (来自 AssignmentEdit.module.css)
const SectionSkeleton = () => (
    <div className={styles.section_skeleton}>
        <div className={styles.section_title_skeleton}></div>
        <div className={styles.line_skeleton} style={{ width: '80%' }}></div>
        <div className={styles.line_skeleton} style={{ width: '60%' }}></div>
        <div className={styles.line_skeleton} style={{ width: '70%', height: '80px' }}></div>
        <div className={styles.line_skeleton} style={{ width: '40%' }}></div>
    </div>
);

const QuestionLinkManagerSkeleton = () => (
    <div className={styles.section_skeleton}>
        <div className={styles.section_title_skeleton}></div>
        <div className={styles.button_row_skeleton}>
            <div className={styles.button_skeleton}></div>
            <div className={styles.button_skeleton}></div>
        </div>
        <div className={styles.table_header_skeleton}>
            <div className={styles.line_skeleton} style={{ width: '20%' }}></div>
            <div className={styles.line_skeleton} style={{ width: '15%' }}></div>
            <div className={styles.line_skeleton} style={{ width: '10%' }}></div>
            <div className={styles.line_skeleton} style={{ width: '15%' }}></div>
        </div>
        {Array.from({ length: 3 }).map((_, index) => (
            <div key={index} className={styles.table_row_skeleton}>
                <div className={styles.line_skeleton} style={{ width: '50%' }}></div>
                <div className={styles.line_skeleton} style={{ width: '20%' }}></div>
                <div className={styles.line_skeleton} style={{ width: '10%' }}></div>
                <div className={styles.button_skeleton} style={{ width: '60px' }}></div>
            </div>
        ))}
    </div>
);