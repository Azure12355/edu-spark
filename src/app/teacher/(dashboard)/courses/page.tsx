// src/app/teacher/(dashboard)/courses/page.tsx
"use client";

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { teacherCourseData, TeacherCourse, CourseStatus } from '@/lib/data/teacherCourseData';
import styles from './courses.module.css';

// 导入所有需要的组件
import MyCoursesHeader from '@/components/teacher/my-courses/MyCoursesHeader/MyCoursesHeader';
import MyCoursesToolbar from '@/components/teacher/my-courses/MyCoursesToolbar/MyCoursesToolbar';
import CourseCard from '@/components/teacher/my-courses/CourseCard/CourseCard';
import Pagination from '@/components/common/Pagination/Pagination';

const ITEMS_PER_PAGE = 6;
type FilterType = '全部课程' | '进行中' | '已结束' | '我的收藏';

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.05,
        },
    },
};

export default function MyCoursesPage() {
    const [currentPage, setCurrentPage] = useState(1);
    const [activeFilter, setActiveFilter] = useState<FilterType>('全部课程');
    const [searchTerm, setSearchTerm] = useState('');

    const filteredCourses = useMemo(() => {
        let courses = teacherCourseData;

        // 1. 根据筛选器过滤
        if (activeFilter === '进行中') {
            courses = courses.filter(c => c.status === '进行中');
        } else if (activeFilter === '已结束') {
            courses = courses.filter(c => c.status === '已结束');
        } else if (activeFilter === '我的收藏') {
            courses = courses.filter(c => c.isFavorite);
        }

        // 2. 根据搜索词过滤
        if (searchTerm.trim() !== '') {
            const lowercasedTerm = searchTerm.toLowerCase();
            courses = courses.filter(c =>
                c.name.toLowerCase().includes(lowercasedTerm) ||
                c.creator.toLowerCase().includes(lowercasedTerm)
            );
        }

        return courses;
    }, [activeFilter, searchTerm]);

    const totalPages = Math.ceil(filteredCourses.length / ITEMS_PER_PAGE);

    const currentCourses = useMemo(() => {
        const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
        const endIndex = startIndex + ITEMS_PER_PAGE;
        return filteredCourses.slice(startIndex, endIndex);
    }, [currentPage, filteredCourses]);

    // 当筛选条件改变时，重置到第一页
    React.useEffect(() => {
        setCurrentPage(1);
    }, [activeFilter, searchTerm]);


    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        // 此处可以添加滚动到页面顶部的逻辑
    };

    return (
        <div className={styles.pageContainer}>
            <MyCoursesHeader />
            {/* 将状态和回调函数传递给工具栏 */}
            <MyCoursesToolbar
                activeFilter={activeFilter}
                onFilterChange={setActiveFilter}
                searchTerm={searchTerm}
                onSearchChange={setSearchTerm}
            />

            <motion.div
                key={activeFilter + searchTerm} // 当筛选条件改变时，让整个网格重新执行入场动画
                className={styles.courseGrid}
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                <AnimatePresence>
                    {currentCourses.map(course => (
                        <motion.div
                            key={course.id}
                            layout
                            variants={containerVariants} // 使用 item 变体
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20, transition: { duration: 0.2 } }}
                        >
                            <CourseCard course={course} />
                        </motion.div>
                    ))}
                </AnimatePresence>
            </motion.div>

            {filteredCourses.length > 0 ? (
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                />
            ) : (
                <div className={styles.noResults}>
                    <p>没有找到匹配的课程。</p>
                </div>
            )}
        </div>
    );
}