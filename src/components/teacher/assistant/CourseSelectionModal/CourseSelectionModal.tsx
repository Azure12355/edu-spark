// src/components/teacher/assistant/CourseSelectionModal/CourseSelectionModal.tsx
"use client";

import React, { useState, useEffect } from 'react';
import Modal from '@/components/common/Modal/Modal';
import { TeacherCourse } from '@/lib/data/teacherAssistantCourseData';
import styles from './CourseSelectionModal.module.css';

interface CourseSelectionModalProps {
    isOpen: boolean;
    onClose: () => void;
    courses: TeacherCourse[];
    selectedCourse: TeacherCourse | null;
    onSelectCourse: (course: TeacherCourse) => void;
}

const CourseSelectionModal: React.FC<CourseSelectionModalProps> = ({ isOpen, onClose, courses, selectedCourse, onSelectCourse }) => {
    // 使用一个临时状态来处理弹窗内的选择，避免在用户确认前就改变外部状态
    const [tempSelectedCourse, setTempSelectedCourse] = useState(selectedCourse);

    // 当弹窗打开时，同步外部选中的课程到临时状态
    useEffect(() => {
        if (isOpen) {
            setTempSelectedCourse(selectedCourse);
        }
    }, [isOpen, selectedCourse]);

    const handleConfirm = () => {
        if (tempSelectedCourse) {
            onSelectCourse(tempSelectedCourse);
        }
        onClose();
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title="切换课程"
            footer={
                <>
                    <button className={`${styles.footerButton} ${styles.cancelButton}`} onClick={onClose}>
                        取消
                    </button>
                    <button
                        className={`${styles.footerButton} ${styles.confirmButton}`}
                        onClick={handleConfirm}
                        disabled={!tempSelectedCourse || tempSelectedCourse.id === selectedCourse?.id}
                    >
                        确认切换
                    </button>
                </>
            }
        >
            <div className={styles.courseList}>
                {courses.map((course) => (
                    <div
                        key={course.id}
                        className={`${styles.courseItem} ${tempSelectedCourse?.id === course.id ? styles.selected : ''}`}
                        onClick={() => setTempSelectedCourse(course)}
                    >
                        <div className={styles.courseIcon} style={{ backgroundColor: course.color }}>
                            <i className={course.icon}></i>
                        </div>
                        <div className={styles.courseInfo}>
                            <h4 className={styles.courseName}>{course.name}</h4>
                            <p className={styles.courseTerm}>{course.term}</p>
                        </div>
                        <div className={styles.courseMeta}>
              <span className={styles.knowledgeCount}>
                <i className="fas fa-database"></i> {course.knowledgeBaseCount}
              </span>
                            {tempSelectedCourse?.id === course.id && (
                                <div className={styles.checkIcon}>
                                    <i className="fas fa-check-circle"></i>
                                </div>
                            )}
                        </div>
                    </div>
                ))}
                {courses.length === 0 && (
                    <div className={styles.noCourses}>
                        <p>暂无可选择的课程，请先在“我的课程”页面创建课程。</p>
                    </div>
                )}
            </div>
        </Modal>
    );
};

export default CourseSelectionModal;