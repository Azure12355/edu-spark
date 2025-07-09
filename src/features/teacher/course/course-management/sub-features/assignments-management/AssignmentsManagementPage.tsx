// [!file src/features/teacher/course/course-management/sub-features/assignments-management/AssignmentsManagementPage.tsx]
"use client";

import React, { useState } from 'react'; // 引入 useState 用于弹窗
import styles from './AssignmentsManagement.module.css';
import { useAssignmentManagement } from './hooks/useAssignmentManagement';

// 导入真实的组件
import AssignmentToolbar from './components/AssignmentToolbar/AssignmentToolbar';
import AssignmentTemplateList from './components/AssignmentTemplateList/AssignmentTemplateList';
import PublishedActivityList from './components/PublishedActivityList/PublishedActivityList';
import Pagination from '@/shared/components/ui/Pagination/Pagination'; // 通用分页组件
// [code focus start ++]
import CreateAssignmentModal from './components/CreateAssignmentModal/CreateAssignmentModal'; // 假设有这个组件
// [code focus end ++]


/**
 * 在线作业与考试管理页面的主组件。
 * 负责调用 useAssignmentManagement Hook，并管理页面整体布局和状态渲染。
 */
export default function AssignmentsManagementPage() {
    // 1. 调用核心 Hook 获取所有状态和操作函数
    const {
        templates,
        isTemplatesLoading,
        templateTotal,
        templatePagination,
        activities,
        isActivitiesLoading,
        activityTotal,
        activityPagination,
        error,
        activeTab,
        searchTerm,
        handleTemplatePageChange,
        handleActivityPageChange,
        handleSearch,
        handleTabChange,
    } = useAssignmentManagement();

    // [code focus start ++]
    // 2. 弹窗状态管理
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const openCreateModal = () => setIsCreateModalOpen(true);
    const closeCreateModal = () => setIsCreateModalOpen(false);

    // 3. 创建模板成功后的回调
    const handleCreateTemplateSuccess = () => {
        // 刷新模板列表（useAssignmentManagement 中的 fetchTemplates 会在依赖变化时自动触发）
        handleTemplatePageChange(1);
        closeCreateModal(); // 关闭弹窗
    };
    // [code focus end ++]

    // 4. 渲染主内容区域的逻辑
    const renderMainContent = () => {
        if (error) {
            return (
                <div className={styles.feedbackContainer}>
                    <i className="fas fa-exclamation-triangle"></i>
                    <p>加载数据失败: {error}</p>
                </div>
            );
        }

        // 根据当前活动的Tab渲染不同内容
        if (activeTab === 'templates') {
            if (isTemplatesLoading && templates.length === 0) {
                return <TemplateListSkeleton />;
            }
            if (!isTemplatesLoading && templates.length === 0) {
                return (
                    <div className={styles.feedbackContainer}>
                        <i className="fas fa-file-alt"></i>
                        <p>还没有作业/考试模板</p>
                        <button onClick={openCreateModal} className={styles.createButton}>
                            <i className="fas fa-plus"></i> 创建第一个模板
                        </button>
                    </div>
                );
            }
            return (
                <>
                    <AssignmentTemplateList
                        templates={templates}
                        isLoading={isTemplatesLoading}
                        onEditTemplate={() => {}} // TODO: 实现编辑
                        onDeleteTemplate={() => {}} // TODO: 实现删除
                        onViewDetails={() => {}} // TODO: 实现查看详情
                        onPublishTemplate={() => {}} // TODO: 实现发布
                    />
                    <Pagination
                        currentPage={templatePagination.current}
                        totalPages={Math.ceil(templateTotal / templatePagination.pageSize)}
                        onPageChange={handleTemplatePageChange}
                    />
                </>
            );
        } else { // activeTab === 'activities'
            if (isActivitiesLoading && activities.length === 0) {
                return <ActivityListSkeleton />;
            }
            if (!isActivitiesLoading && activities.length === 0) {
                return (
                    <div className={styles.feedbackContainer}>
                        <i className="fas fa-bullhorn"></i>
                        <p>该课程还没有发布任何活动</p>
                    </div>
                );
            }
            return (
                <>
                    <PublishedActivityList
                        activities={activities}
                        isLoading={isActivitiesLoading}
                        onEditActivity={() => {}} // TODO: 实现编辑
                        onDeleteActivity={() => {}} // TODO: 实现删除
                        onViewSubmissions={() => {}} // TODO: 实现查看提交
                    />
                    <Pagination
                        currentPage={activityPagination.current}
                        totalPages={Math.ceil(activityTotal / activityPagination.pageSize)}
                        onPageChange={handleActivityPageChange}
                    />
                </>
            );
        }
    };

    return (
        <div className={styles.pageContainer}>
            <header className={styles.header}>
                <h1 className={styles.title}>在线作业与考试</h1>
                <p className={styles.subtitle}>
                    管理课程的作业/考试模板，并将其发布到不同班级。
                </p>
            </header>

            <main className={styles.mainContent}>
                {/* 5. 将状态和操作函数传递给 Toolbar */}
                <AssignmentToolbar
                    searchTerm={searchTerm}
                    onSearchChange={handleSearch}
                    activeTab={activeTab}
                    onTabChange={handleTabChange}
                    onCreateTemplate={openCreateModal} // 将打开弹窗的函数传递给工具栏
                />

                {renderMainContent()}
            </main>

            {/* 6. 渲染创建模板弹窗 */}
            {/* [code focus start ++] */}
            <CreateAssignmentModal
                isOpen={isCreateModalOpen}
                onClose={closeCreateModal}
                onSuccess={handleCreateTemplateSuccess}
            />
            {/* [code focus end ++] */}
        </div>
    );
}

// 骨架屏组件 (与上面骨架代码保持一致)
const TemplateListSkeleton = () => (
    <div className={styles.templateGrid}>
        {Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className={styles.template_card_skeleton}>
                <div className={styles.card_line_skeleton} style={{ width: '60%', height: '20px' }}></div>
                <div className={styles.card_line_skeleton} style={{ width: '80%' }}></div>
                <div className={styles.card_line_skeleton} style={{ width: '40%' }}></div>
                <div className={styles.card_footer_skeleton}>
                    <div className={styles.card_tag_skeleton}></div>
                    <div className={styles.card_button_skeleton}></div>
                </div>
            </div>
        ))}
    </div>
);

const ActivityListSkeleton = () => (
    <div className={styles.activityList}>
        <div className={styles.activity_header_skeleton}>
            <div style={{ width: '30%' }}>活动标题</div>
            <div style={{ width: '15%' }}>发布班级</div>
            <div style={{ width: '25%' }}>截止时间</div>
            <div style={{ width: '15%' }}>状态</div>
        </div>
        {Array.from({ length: 5 }).map((_, index) => (
            <div key={index} className={styles.activity_row_skeleton}>
                <div className={styles.row_cell_skeleton} style={{ width: '30%' }}></div>
                <div className={styles.row_cell_skeleton} style={{ width: '15%' }}></div>
                <div className={styles.row_cell_skeleton} style={{ width: '25%' }}></div>
                <div className={styles.row_cell_skeleton} style={{ width: '15%' }}></div>
            </div>
        ))}
    </div>
);