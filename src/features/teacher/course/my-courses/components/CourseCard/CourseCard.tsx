"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import styles from './CourseCard.module.css';
import { CourseVO } from '../../types';
import Tooltip from '@/shared/components/ui/Tooltip/Tooltip';

interface CourseCardProps {
    course: CourseVO;
    isSelected: boolean;
    onSelectChange: (id: number, selected: boolean) => void;
}

const CourseCard: React.FC<CourseCardProps> = ({ course, isSelected, onSelectChange }) => {
    const statusMap = {
        PUBLISHED: { text: '进行中', className: styles.statusPUBLISHED, icon: 'fas fa-spinner fa-spin' },
        DRAFT: { text: '草稿', className: styles.statusDRAFT, icon: 'fas fa-pencil-alt' },
        ARCHIVED: { text: '已归档', className: styles.statusARCHIVED, icon: 'fas fa-archive' },
    };
    const statusInfo = statusMap[course.status];

    const cardStyle = {
        '--card-color': course.colorTheme || '#4f46e5',
    } as React.CSSProperties;

    // 阻止事件冒泡的函数
    const handleCheckboxClick = (e: React.MouseEvent) => {
        e.stopPropagation(); // 阻止点击事件传递到外层 div
        onSelectChange(course.id, !isSelected);
    };

    return (
        <motion.div
            className={`${styles.card} ${isSelected ? styles.selected : ''}`}
            style={cardStyle}
            layout
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 200, damping: 25 }}
        >
            {/* 1. 自定义勾选框 */}
            <div className={styles.checkboxWrapper} onClick={handleCheckboxClick}>
                <input
                    type="checkbox"
                    checked={isSelected}
                    onChange={() => {}} // onChange 由外层 div 处理
                    className={styles.checkboxInput}
                    aria-label={`选择课程 ${course.name}`}
                />
                <div className={styles.customCheckbox}>
                    <i className={`fas fa-check ${styles.icon}`}></i>
                </div>
            </div>

            {/* 2. 卡片头部 */}
            <div className={styles.cardHeader}>
                <div className={styles.titleGroup}>
                    <h3 className={styles.courseName}>{course.name}</h3>
                    <p className={styles.courseTerm}>{course.term}</p>
                </div>
                {statusInfo && (
                    <div className={`${styles.statusTag} ${statusInfo.className}`}>
                        <i className={statusInfo.icon}></i>
                        <span>{statusInfo.text}</span>
                    </div>
                )}
            </div>

            {/* 3. 统计数据网格优化 */}
            <div className={styles.statsGrid}>
                <div className={styles.statItem}>
                    <span className={styles.statValue}>{course.metadata?.studentCount || 85}</span>
                    <span className={styles.statLabel}>学生数</span>
                </div>
                <div className={styles.statItem}>
                    <span className={styles.statValue}>{course.metadata?.classCount || 2}</span>
                    <span className={styles.statLabel}>班级数</span>
                </div>
                <div className={styles.statItem}>
                    <span className={styles.statValue}>{course.metadata?.completionRate || '92%'}</span>
                    <span className={styles.statLabel}>完成率</span>
                </div>
            </div>

            {/* 4. 卡片底部，修复按钮布局 */}
            <div className={styles.cardFooter}>
                <div className={styles.creatorInfo}>
                    <Image
                        src={course.creator.avatarUrl || '/default-avatar.jpg'}
                        alt={course.creator.nickname}
                        width={36}
                        height={36}
                        className={styles.creatorAvatar}
                    />
                    <div className={styles.creatorDetails}>
                        <span className={styles.creatorNickname}>{course.creator.nickname}</span>
                        <span className={styles.creatorUsername}>@{course.creator.username}</span>
                    </div>
                </div>

                <div className={styles.actionButtons}>
                    <Tooltip content="收藏" position="top">
                        <button className={styles.actionButton}><i className="far fa-star"></i></button>
                    </Tooltip>
                    <Tooltip content="分享" position="top">
                        <button className={styles.actionButton}><i className="fas fa-share-alt"></i></button>
                    </Tooltip>
                    <Tooltip content="更多" position="top">
                        <button className={styles.actionButton}><i className="fas fa-ellipsis-h"></i></button>
                    </Tooltip>
                    <Link href={`/teacher/courses/${course.id}/introduction`} passHref>
                        <motion.button
                            className={`${styles.actionButton} ${styles.manageButton}`}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <span>进入管理</span>
                            <i className="fas fa-arrow-right"></i>
                        </motion.button>
                    </Link>
                </div>
            </div>
        </motion.div>
    );
};

export default CourseCard;