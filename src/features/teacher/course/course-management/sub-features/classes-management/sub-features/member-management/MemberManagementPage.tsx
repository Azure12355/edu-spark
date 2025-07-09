// [!file src/features/teacher/course/course-management/sub-features/classes-management/sub-features/member-management/MemberManagementPage.tsx]
"use client";

import React from 'react';
import styles from './MemberManagement.module.css';
import { useMemberManagement } from './hooks/useMemberManagement';

// 导入真实的组件（我们稍后会创建它们的真实版本）
import MemberToolbar from './components/MemberToolbar/MemberToolbar';
import MemberTable from './components/MemberTable/MemberTable';
import Pagination from '@/shared/components/ui/Pagination/Pagination';
import InviteMemberModal from './components/InviteMemberModal/InviteMemberModal';

/**
 * 班级成员管理页面的主组件。
 * 负责调用 useMemberManagement Hook，并管理页面整体布局和状态渲染。
 */
export default function MemberManagementPage() {
    // 1. 调用核心 Hook 获取所有状态和操作函数
    const {
        classId,
        members,
        isLoading,
        error,
        pagination,
        searchTerm,
        isInviteModalOpen,
        handlePageChange,
        handleSearchChange,
        handleFilterChange,
        openInviteModal,
        closeInviteModal,
        handleInviteSuccess,
        handleRemoveMember,
    } = useMemberManagement();

    // 2. 渲染主内容区域的逻辑
    const renderMainContent = () => {
        if (error) {
            return (
                <div className={styles.feedbackContainer}>
                    <i className="fas fa-exclamation-circle"></i>
                    <p>加载成员列表失败: {error}</p>
                </div>
            );
        }

        // 初始加载时显示骨架屏
        if (isLoading && members.length === 0) {
            return <TableSkeleton />;
        }

        // 数据为空状态
        if (!isLoading && members.length === 0) {
            return (
                <div className={styles.feedbackContainer}>
                    <i className="fas fa-user-friends"></i>
                    <p>该班级还没有任何成员</p>
                    <button onClick={openInviteModal} className={styles.inviteButton}>
                        <i className="fas fa-plus"></i> 邀请第一个成员
                    </button>
                </div>
            );
        }

        // 正常渲染表格
        return (
            <>
                <MemberTable
                    members={members}
                    isLoading={isLoading} // 传递加载状态，用于翻页时的加载遮罩
                    onRemove={handleRemoveMember}
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
                <div>
                    <h1 className={styles.title}>班级成员</h1>
                    <p className={styles.subtitle}>
                        管理班级中的学生和助教，监控他们的状态和活动。
                    </p>
                </div>
                {/* 在 Header 中也放置一个邀请按钮，方便操作 */}
                <button onClick={openInviteModal} className={styles.inviteButtonHeader}>
                    <i className="fas fa-user-plus"></i>
                    <span>邀请成员</span>
                </button>
            </header>

            <main className={styles.mainContent}>
                <MemberToolbar
                    searchTerm={searchTerm}
                    onSearchChange={handleSearchChange}
                    onFilterChange={handleFilterChange}
                />

                {renderMainContent()}
            </main>

            {/* 渲染邀请成员的弹窗 */}
            <InviteMemberModal
                classId={classId}
                isOpen={isInviteModalOpen}
                onClose={closeInviteModal}
                onSuccess={handleInviteSuccess}
            />
        </div>
    );
}

// 骨架屏组件 (保持不变)
const TableSkeleton = () => (
    <div className={styles.table_skeleton}>
        <div className={styles.table_header_skeleton}>
            {Array.from({ length: 5 }).map((_, index) => (
                <div key={index} className={styles.table_cell_skeleton}></div>
            ))}
        </div>
        {Array.from({ length: 10 }).map((_, rowIndex) => (
            <div key={rowIndex} className={styles.table_row_skeleton}>
                {Array.from({ length: 5 }).map((_, colIndex) => (
                    <div key={colIndex} className={styles.table_cell_skeleton}></div>
                ))}
            </div>
        ))}
    </div>
);