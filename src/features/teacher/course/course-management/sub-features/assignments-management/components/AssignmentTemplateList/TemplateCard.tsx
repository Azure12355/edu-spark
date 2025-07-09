// [!file src/features/teacher/course/course-management/sub-features/assignments-management/components/AssignmentTemplateList/TemplateCard.tsx]
"use client";

import React from 'react';
import styles from './TemplateCard.module.css';
import { AssignmentVO } from '@/shared/types';
import Tooltip from "@/shared/components/ui/Tooltip/Tooltip";
import { AssignmentTemplateStatusEnum } from '@/shared/types/enums/assignment/AssignmentTemplateStatusEnum';
import { AssignmentTypeEnum } from '@/shared/types/enums/assignment/AssignmentTypeEnum';
// [code focus start ++]
import Link from 'next/link'; // 导入 Link 组件
// [code focus end ++]

interface TemplateCardProps {
    template: AssignmentVO;
    // [code focus start --]
    // onEdit: (templateId: number) => void; // 这个回调不再需要直接触发路由，因为 Link 会处理
    // [code focus end --]
    onDelete: (templateId: number) => void;
    onView: (templateId: number) => void;
    onPublish: (template: AssignmentVO) => void;
}

// 模板状态的文本和颜色映射 (保持不变)
const statusMap: { [key: string]: { text: string; color: string; bgColor: string; } } = {
    [AssignmentTemplateStatusEnum.DRAFT]: { text: '草稿', color: '#86909C', bgColor: '#F2F3F5' },
    [AssignmentTemplateStatusEnum.READY]: { text: '就绪可用', color: '#00B42A', bgColor: '#E8FFEA' },
};

// 模板类型的文本映射 (保持不变)
const typeTextMap: Record<string, string> = {
    [AssignmentTypeEnum.HOMEWORK]: '课后作业',
    [AssignmentTypeEnum.QUIZ]: '随堂测验',
    [AssignmentTypeEnum.MIDTERM_EXAM]: '期中考试',
    [AssignmentTypeEnum.FINAL_EXAM]: '期末考试',
};

const TemplateCard: React.FC<TemplateCardProps> = ({
                                                       template,
                                                       // [code focus start --]
                                                       // onEdit, // 移除 onEdit prop
                                                       // [code focus end --]
                                                       onDelete,
                                                       onView,
                                                       onPublish
                                                   }) => {
    // [code focus start --]
    // const { id, title, description, type, templateStatus, questionCount, totalScore, createdAt } = template;
    // [code focus end --]
    // [code focus start ++]
    const { id, title, description, type, templateStatus, questionCount, totalScore, createdAt, courseId } = template; // 解构出 courseId
    // [code focus end ++]
    const statusInfo = statusMap[templateStatus] || statusMap.DRAFT;
    const typeText = typeTextMap[type] || '未知类型';

    return (
        <div className={styles.cardContainer}>
            {/* 状态徽章 */}
            <div
                className={styles.statusBadge}
                style={{ color: statusInfo.color, backgroundColor: statusInfo.bgColor }}
            >
                {statusInfo.text}
            </div>

            {/* 标题和描述 */}
            <h3 className={styles.title}>{title}</h3>
            <p className={styles.description}>{description || '暂无描述'}</p>

            {/* 统计信息 */}
            <div className={styles.statsRow}>
                <div className={styles.statItem}>
                    <i className="fas fa-question-circle"></i>
                    <span>{questionCount || 0} 题</span>
                </div>
                <div className={styles.statItem}>
                    <i className="fas fa-calculator"></i>
                    <span>{totalScore || 0} 分</span>
                </div>
                <div className={styles.statItem}>
                    <i className="fas fa-calendar-alt"></i>
                    <span>{new Date(createdAt).toLocaleDateString()}</span>
                </div>
            </div>

            {/* 操作按钮 */}
            <div className={styles.actions}>
                {/* [code focus start ++] */}
                {/* 核心修改：将“编辑模板”按钮包裹在 Link 组件中 */}
                <Link href={`/teacher/courses/${courseId}/assignments/${id}/edit`} passHref>
                    <Tooltip content="编辑模板" position="top">
                        <button className={styles.actionButton}>
                            <i className="fas fa-edit"></i>
                        </button>
                    </Tooltip>
                </Link>
                {/* [code focus end ++] */}

                <Tooltip content="查看详情" position="top">
                    <button onClick={() => onView(id)} className={styles.actionButton}>
                        <i className="fas fa-eye"></i>
                    </button>
                </Tooltip>
                {templateStatus === AssignmentTemplateStatusEnum.READY && (
                    <Tooltip content="发布到班级" position="top">
                        <button onClick={() => onPublish(template)} className={`${styles.actionButton} ${styles.publishButton}`}>
                            <i className="fas fa-paper-plane"></i>
                        </button>
                    </Tooltip>
                )}
                <Tooltip content="删除模板" position="top">
                    <button onClick={() => onDelete(id)} className={`${styles.actionButton} ${styles.deleteButton}`}>
                        <i className="fas fa-trash-alt"></i>
                    </button>
                </Tooltip>
            </div>
        </div>
    );
};

export default TemplateCard;