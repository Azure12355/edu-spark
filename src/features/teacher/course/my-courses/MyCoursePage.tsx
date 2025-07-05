"use client";

import React from 'react';
import {AnimatePresence, motion} from 'framer-motion';
import {useMyCourses} from './hooks/useMyCourses';
import styles from './MyCoursePage.module.css';

// 导入所有需要的组件
import MyCoursesHeader from './components/MyCoursesHeader/MyCoursesHeader';
import MyCoursesToolbar from './components/MyCoursesToolbar/MyCoursesToolbar';
import CourseCard from './components/CourseCard/CourseCard';
import Pagination from '@/shared/components/ui/Pagination/Pagination';

// 骨架屏组件
const SkeletonGrid = () => (
    <div className={styles.courseGrid}>
        {Array.from({length: 8}).map((_, index) => (
            <div key={index} className={styles.skeletonCard}/>
        ))}
    </div>
);

// 空状态组件
const NoResults = () => (
    <div className={styles.noResults}>
        <i className="fas fa-ghost"></i>
        <p>没有找到匹配的课程。</p>
    </div>
);

/**
 * 【最终版本】我的课程页面
 *
 * 职责:
 * 1. 作为容器，装配 Header, Toolbar, Grid, Pagination 等子组件。
 * 2. 调用 useMyCourses Hook，并将状态和方法分发给子组件。
 * 3. 处理顶层的加载和错误状态。
 */
export default function MyCoursesPage() {
    const {
        courses,
        isLoading,
        error,
        pagination,
        searchTerm,
        selectedRowKeys,
        filterStatus,
        sorter,
        handleSearch,
        handlePageChange,
        handleBatchDelete,
        setSelectedRowKeys, // 我们需要这个来让 CourseCard 可勾选
        handleFilterChange,
        handleSorterChange,
    } = useMyCourses();

    if (error) {
        return <div className="error-message">错误: {error}</div>;
    }

    // CourseCard 勾选逻辑
    const handleSelectChange = (courseId: number, isSelected: boolean) => {
        setSelectedRowKeys(prev =>
            isSelected ? [...prev, courseId] : prev.filter(key => key !== courseId)
        );
    };

    return (
        <div className={styles.pageContainer}>
            <MyCoursesHeader/>

            <MyCoursesToolbar
                searchTerm={searchTerm}
                onSearchChange={handleSearch}
                filterStatus={filterStatus}
                onFilterChange={handleFilterChange}
                sorter={sorter}
                //@ts-ignore
                onSorterChange={handleSorterChange}
                onBatchDelete={handleBatchDelete}
                selectedCount={selectedRowKeys.length}
            />

            {isLoading && courses.length === 0 ? (
                <SkeletonGrid/>
            ) : (
                <AnimatePresence>
                    {courses.length > 0 ? (
                        <motion.div
                            className={styles.courseGrid}
                            initial={{opacity: 0}}
                            animate={{opacity: 1, transition: {staggerChildren: 0.07}}}
                        >
                            {courses.map(course => (
                                <CourseCard
                                    key={course.id}
                                    course={course}
                                    isSelected={selectedRowKeys.includes(course.id)}
                                    onSelectChange={handleSelectChange}
                                />
                            ))}
                        </motion.div>
                    ) : (
                        <NoResults/>
                    )}
                </AnimatePresence>
            )}

            {pagination.total > pagination.pageSize && (
                <div className={styles.paginationWrapper}>
                    <Pagination
                        currentPage={pagination.current}
                        totalPages={Math.ceil(pagination.total / pagination.pageSize)}
                        onPageChange={(page, pageSize) => handlePageChange(page, pageSize || pagination.pageSize)}
                    />
                </div>
            )}
        </div>
    );
}