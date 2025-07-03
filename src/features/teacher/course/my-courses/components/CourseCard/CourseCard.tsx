// src/components/teacher/my-courses/CourseCard.tsx
"use client";
import React from 'react';
import { motion } from 'framer-motion';
import styles from './CourseCard.module.css';
import { TeacherCourse, CourseStatus } from '@/shared/lib/data/teacherCourseData';
import Link from 'next/link'; // 1. 导入 Link 组件

interface CourseCardProps {
    course: TeacherCourse;
}

const CourseCard: React.FC<CourseCardProps> = ({ course }) => {
    const getAvatarInitial = (name: string) => name.charAt(0).toUpperCase();

    const getStatusIcon = (status: CourseStatus) => {
        switch (status) {
            case '进行中':
                return <i className={`fas fa-spinner fa-spin ${styles.statusInProgress}`}></i>;
            case '已结束':
                return <i className={`fas fa-check-circle ${styles.statusFinished}`}></i>;
            default:
                return null;
        }
    };

    return (
        <motion.div
            className={styles.card}
            whileHover={{ scale: 1.02 }}
            transition={{ type: 'spring', stiffness: 300 }}
            layout
        >
            <div className={styles.header}>
                <div className={styles.avatar} style={{ backgroundColor: course.color }}>
                    {getAvatarInitial(course.name)}
                </div>
                <div className={styles.titleGroup}>
                    <h3 className={styles.courseName}>{course.name}</h3>
                    <p className={styles.creator}>主讲：{course.creator}</p>
                </div>
                <button className={styles.menuButton} onClick={(e) => { e.stopPropagation(); alert('菜单'); }} title="更多选项">
                    <i className="fas fa-ellipsis-h"></i>
                </button>
            </div>
            <p className={styles.description}>
                {course.description}
            </p>
            <div className={styles.footer}>
                <div className={styles.stats}>
                    <div className={styles.statItem} title="班级数">
                        <i className="fas fa-chalkboard-teacher"></i>
                        <span>{course.classCount} 班级</span>
                    </div>
                    <div className={styles.statItem} title="学生数">
                        <i className="fas fa-users"></i>
                        <span>{course.studentCount} 学生</span>
                    </div>
                    <div className={styles.statItem} title="状态">
                        {getStatusIcon(course.status)}
                        <span>{course.status}</span>
                    </div>
                </div>
                {/* 2. 将 button 替换为 Link 包裹的 a 标签 */}
                <Link href={`/teacher/courses/${course.id}`} className={styles.actionButton}>
                    进入管理
                </Link>
            </div>
        </motion.div>
    );
};

export default CourseCard;