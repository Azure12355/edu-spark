// [!file src/features/teacher/assistant/ai-assistant/components/CourseSelectionModal/CourseSelectionModal.tsx]
"use client";

import React, { useState, useEffect } from 'react';
import Modal from '@/shared/components/ui/Modal/Modal';
import { CourseVO } from '@/shared/types';
import styles from './CourseSelectionModal.module.css';
import { motion } from 'framer-motion';

// --- 1. Prop Definition ---
interface CourseSelectionModalProps {
    isOpen: boolean;
    onClose: () => void;
    courses: CourseVO[];
    selectedCourse: CourseVO | null;
    onSelectCourse: (course: CourseVO) => void;
    isLoading: boolean;
}

// --- 2. Local Sub-Components for Different States ---

const CourseListSkeleton = () => (
    <div className={styles.skeletonContainer}>
        {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className={styles.skeletonItem}>
                <div className={styles.skeletonIcon}></div>
                <div className={styles.skeletonDetails}>
                    <div className={styles.skeletonText} style={{ width: '60%' }}></div>
                    <div className={styles.skeletonText} style={{ width: '40%' }}></div>
                </div>
            </div>
        ))}
    </div>
);

const EmptyState = () => (
    <div className={styles.emptyState}>
        <div className={styles.emptyIcon}>
            <i className="fas fa-book-dead"></i>
        </div>
        <h4 className={styles.emptyTitle}>暂无课程</h4>
        <p className={styles.emptyText}>
            您还没有创建任何课程。请前往“我的课程”页面开始创建您的第一个课程。
        </p>
    </div>
);

// --- 3. Main Component ---

const CourseSelectionModal: React.FC<CourseSelectionModalProps> = ({
                                                                       isOpen,
                                                                       onClose,
                                                                       courses,
                                                                       selectedCourse,
                                                                       onSelectCourse,
                                                                       isLoading
                                                                   }) => {
    const [tempSelectedCourse, setTempSelectedCourse] = useState(selectedCourse);

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

    const renderBody = () => {
        if (isLoading) {
            return <CourseListSkeleton />;
        }
        if (courses.length === 0) {
            return <EmptyState />;
        }
        return (
            <div className={styles.courseList}>
                {courses.map((course) => (
                    <motion.div
                        key={course.id}
                        className={`${styles.courseItem} ${tempSelectedCourse?.id === course.id ? styles.selected : ''}`}
                        onClick={() => setTempSelectedCourse(course)}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        <div className={styles.courseIcon} style={{ backgroundColor: course.colorTheme || '#4f46e5' }}>
                            <i className={'fas fa-book-reader'}></i>
                        </div>
                        <div className={styles.courseInfo}>
                            <h4 className={styles.courseName}>{course.name}</h4>
                            <p className={styles.courseTerm}>{course.term}</p>
                        </div>
                        <div className={styles.courseMeta}>
                            {tempSelectedCourse?.id === course.id && (
                                <motion.div
                                    className={styles.checkIcon}
                                    initial={{ scale: 0.5, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                >
                                    <i className="fas fa-check-circle"></i>
                                </motion.div>
                            )}
                        </div>
                    </motion.div>
                ))}
            </div>
        );
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title="切换课程上下文"
            footer={
                <>
                    <button className={`${styles.footerButton} ${styles.cancelButton}`} onClick={onClose}>
                        取消
                    </button>
                    <button
                        className={`${styles.footerButton} ${styles.confirmButton}`}
                        onClick={handleConfirm}
                        disabled={isLoading || !tempSelectedCourse || tempSelectedCourse.id === selectedCourse?.id}
                    >
                        确认切换
                    </button>
                </>
            }
        >
            {renderBody()}
        </Modal>
    );
};

export default CourseSelectionModal;