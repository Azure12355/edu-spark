// src/components/teacher/my-courses/CourseCard.tsx
"use client";
import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import styles from './CourseCard.module.css';
import { TeacherCourse } from '@/lib/data/teacherCourseData';

interface CourseCardProps {
    course: TeacherCourse;
}

const CourseCard: React.FC<CourseCardProps> = ({ course }) => {
    const cardRef = useRef<HTMLDivElement>(null);

    const getAvatarInitial = (name: string) => {
        return name.charAt(0).toUpperCase();
    }

    // 鼠标移动事件处理光晕效果
    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (cardRef.current) {
            const rect = cardRef.current.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            cardRef.current.style.setProperty('--mouse-x', `${x}px`);
            cardRef.current.style.setProperty('--mouse-y', `${y}px`);
        }
    };

    return (
        <motion.div
            ref={cardRef}
            className={styles.card}
            style={{ '--card-glow-color': course.color + '33' } as React.CSSProperties} // '33' is for ~20% opacity in hex
            onMouseMove={handleMouseMove}
            whileHover={{ scale: 1.03 }}
            transition={{ type: 'spring', stiffness: 300 }}
            layout
        >
            <div className={styles.glow} />
            <div className={styles.cardContent}>
                <div className={styles.header}>
                    <div className={styles.avatar} style={{ background: course.color }}>
                        {getAvatarInitial(course.name)}
                    </div>
                    <div className={styles.titleGroup}>
                        <h3 className={styles.courseName}>{course.name}</h3>
                        <p className={styles.creator}>主讲：王老师</p>
                    </div>
                    <button className={styles.menuButton} onClick={(e) => { e.stopPropagation(); alert('菜单'); }} title="更多选项">
                        <i className="fas fa-ellipsis-h"></i>
                    </button>
                </div>

                <p className={styles.description}>
                    这是一个关于{course.name}的专业智能体。它能够提供知识点问答、模拟测验、时事分析等多种能力，帮助学生全面掌握课程内容。
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
                            <i className={`fas ${course.status === '进行中' ? 'fa-spinner fa-spin' : 'fa-check-circle'}`} style={{color: course.status === '进行中' ? '#F97316' : '#10B981'}}></i>
                            <span>{course.status}</span>
                        </div>
                    </div>
                    <button className={styles.actionButton}>
                        进入管理
                    </button>
                </div>
            </div>
        </motion.div>
    );
};

export default CourseCard;