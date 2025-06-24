// src/app/teacher/(dashboard)/courses/page.tsx
"use client";

import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { teacherCourseData } from '@/lib/data/teacherCourseData';
import styles from './courses.module.css';

import MyCoursesHeader from '@/components/teacher/my-courses/MyCoursesHeader';
import MyCoursesToolbar from '@/components/teacher/my-courses/MyCoursesToolbar';
import CourseCard from '@/components/teacher/my-courses/CourseCard';
import Pagination from '@/components/common/Pagination/Pagination';

const ITEMS_PER_PAGE = 6;

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.08,
        },
    },
};

export default function MyCoursesPage() {
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = Math.ceil(teacherCourseData.length / ITEMS_PER_PAGE);

    const currentCourses = useMemo(() => {
        const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
        const endIndex = startIndex + ITEMS_PER_PAGE;
        return teacherCourseData.slice(startIndex, endIndex);
    }, [currentPage]);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        window.scrollTo({ top: 400, behavior: 'smooth' }); // 滚动到卡片区域顶部
    };

    return (
        <div className={styles.pageContainer}>
            <MyCoursesHeader />
            <MyCoursesToolbar />

            <h2 className={styles.sectionTitle}>全部课程 ({teacherCourseData.length})</h2>

            <motion.div
                className={styles.courseGrid}
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                {currentCourses.map(course => (
                    <CourseCard key={course.id} course={course} />
                ))}
            </motion.div>

            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
            />
        </div>
    );
}