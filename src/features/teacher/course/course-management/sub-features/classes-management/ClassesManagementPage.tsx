// [!file src/features/teacher/course/course-management/sub-features/classes-management/ClassesManagementPage.tsx]
"use client";

import React from 'react';
import styles from './ClassesManagement.module.css';
import { useClassManagement } from './hooks/useClassManagement';

// 导入真实的组件（我们稍后会创建它们的真实版本）
import ClassToolbar from './components/ClassToolbar/ClassToolbar';
import ClassTable from './components/ClassTable/ClassTable';
import Pagination from '@/shared/components/ui/Pagination/Pagination';
import CreateClassModal
    from "@/features/teacher/course/course-management/sub-features/classes-management/components/CreateClassModal/CreateClassModal"; // 使用通用的分页组件

/**
 * 班级管理页面的主组件。
 * 负责调用 useClassManagement Hook，并管理页面整体布局和状态渲染。
 */
export default function ClassesManagementPage() {
    // 1. 调用核心 Hook 获取所有状态和操作函数
    const {
        classes,
        isLoading,
        error,
        pagination,
        searchTerm,
        isCreateModalOpen,
        openCreateModal,
        closeCreateModal,
        handleCreationSuccess,
        handlePageChange,
        handleSearchChange,
        handleFilterChange,
        handleDeleteClass,
    } = useClassManagement();

    // 2. 渲染主内容区域的逻辑
    const renderMainContent = () => {
        if (error) {
            return (
                <div className={styles.errorContainer}>
                    <i className="fas fa-exclamation-triangle"></i>
                    <p>加载班级列表失败: {error}</p>
                    {/* 可以添加一个重试按钮 */}
                </div>
            );
        }

        // 加载中状态显示骨架屏
        if (isLoading && classes.length === 0) {
            return <TableSkeleton />;
        }

        // 数据为空状态
        if (!isLoading && classes.length === 0) {
            return (
                <div className={styles.emptyState}>
                    <i className="fas fa-school"></i>
                    <p>该课程下还没有任何班级</p>
                    <button onClick={openCreateModal} className={styles.createButton}>
                        <i className="fas fa-plus"></i> 创建第一个班级
                    </button>
                </div>
            );
        }

        // 正常渲染表格
        return (
            <>
                <ClassTable
                    classes={classes}
                    isLoading={isLoading} // 传递加载状态，表格行可以显示自己的加载效果
                    onDelete={handleDeleteClass}
                    // onEdit, onNavigateToMembers 等未来可扩展
                />
                <Pagination
                    currentPage={pagination.current}
                    totalPages={Math.ceil(pagination.total / pagination.pageSize)}
                    onPageChange={handlePageChange}
                />
            </>
        );
    };

    return (
        <div className={styles.pageContainer}>
            <header className={styles.header}>
                <h1 className={styles.title}>班级管理</h1>
                <p className={styles.subtitle}>
                    在这里管理课程下的所有教学班级，包括成员、活动和设置。
                </p>
            </header>

            <main className={styles.mainContent}>
                {/* 3. 将状态和操作函数传递给 Toolbar */}
                <ClassToolbar
                    searchTerm={searchTerm}
                    onSearchChange={handleSearchChange}
                    onFilterChange={handleFilterChange}
                    onCreateClass={openCreateModal}
                />

                {/* 4. 渲染主内容 */}
                {renderMainContent()}
            </main>
            <CreateClassModal
                isOpen={isCreateModalOpen}
                onClose={closeCreateModal}
                onSuccess={handleCreationSuccess}
            />
        </div>
    );
}

// 骨架屏组件，用于初始加载
const TableSkeleton = () => (
    <div className={styles.table_skeleton}>
        <div className={styles.table_header_skeleton}>
            {Array.from({ length: 6 }).map((_, index) => (
                <div key={index} className={styles.table_cell_skeleton}></div>
            ))}
        </div>
        {Array.from({ length: 8 }).map((_, rowIndex) => (
            <div key={rowIndex} className={styles.table_row_skeleton}>
                {Array.from({ length: 6 }).map((_, colIndex) => (
                    <div key={colIndex} className={styles.table_cell_skeleton}></div>
                ))}
            </div>
        ))}
    </div>
);