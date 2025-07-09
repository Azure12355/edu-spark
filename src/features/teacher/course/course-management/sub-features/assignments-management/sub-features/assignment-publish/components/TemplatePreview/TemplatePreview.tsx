// [!file src/features/teacher/course/course-management/sub-features/assignments-management/sub-features/assignment-publish/components/TemplatePreview/TemplatePreview.tsx]
"use client";

import React from 'react';
import styles from './TemplatePreview.module.css';
import { AssignmentVO } from '@/shared/types';
import { AssignmentTypeEnum } from '@/shared/types/enums/assignment/AssignmentTypeEnum';

// 定义 Props 类型
interface TemplatePreviewProps {
    template: AssignmentVO;
}

// 模板类型的文本映射
const typeTextMap: Record<string, string> = {
    [AssignmentTypeEnum.HOMEWORK]: '课后作业',
    [AssignmentTypeEnum.QUIZ]: '随堂测验',
    [AssignmentTypeEnum.MIDTERM_EXAM]: '期中考试',
    [AssignmentTypeEnum.FINAL_EXAM]: '期末考试',
};

// 模板类型到图标的映射
const typeIconMap: Record<string, string> = {
    [AssignmentTypeEnum.HOMEWORK]: 'fas fa-pencil-ruler',
    [AssignmentTypeEnum.QUIZ]: 'fas fa-stopwatch',
    [AssignmentTypeEnum.MIDTERM_EXAM]: 'fas fa-file-signature',
    [AssignmentTypeEnum.FINAL_EXAM]: 'fas fa-award',
};

const TemplatePreview: React.FC<TemplatePreviewProps> = ({ template }) => {
    const { title, description, type, questionCount, totalScore, creator, createdAt } = template;

    const typeText = typeTextMap[type] || '未知类型';
    const typeIcon = typeIconMap[type] || 'fas fa-question-circle';

    return (
        <aside className={styles.previewContainer}>
            <div className={styles.header}>
                <div className={styles.typeIconWrapper}>
                    <i className={typeIcon}></i>
                </div>
                <div className={styles.typeText}>{typeText}</div>
            </div>

            <h2 className={styles.title}>{title}</h2>
            <p className={styles.description}>{description || '暂无描述信息。'}</p>

            <div className={styles.divider}></div>

            <div className={styles.statsGrid}>
                <div className={styles.statItem}>
                    <span className={styles.statLabel}>题目总数</span>
                    <span className={styles.statValue}>{questionCount || 0}</span>
                </div>
                <div className={styles.statItem}>
                    <span className={styles.statLabel}>模板总分</span>
                    <span className={styles.statValue}>{totalScore || 0}</span>
                </div>
                <div className={styles.statItem}>
                    <span className={styles.statLabel}>创建者</span>
                    <span className={styles.statValue}>{creator.nickname}</span>
                </div>
                <div className={styles.statItem}>
                    <span className={styles.statLabel}>创建日期</span>
                    <span className={styles.statValue}>{new Date(createdAt).toLocaleDateString()}</span>
                </div>
            </div>

            <div className={styles.footerNote}>
                <i className="fas fa-info-circle"></i>
                <span>请在右侧为班级配置发布时间并确认发布。</span>
            </div>
        </aside>
    );
};

export default TemplatePreview;