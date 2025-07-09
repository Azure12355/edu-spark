// [!file src/features/teacher/course/course-management/sub-features/assignments-management/components/PublishedActivityList/ActivityRow.tsx]
"use client";

import React from 'react';
import styles from './ActivityRow.module.css';
import { ClassActivityVO } from '@/shared/types';
import Tooltip from "@/shared/components/ui/Tooltip/Tooltip";
import { ActivityStatusEnum } from '@/shared/types/enums/activity/ActivityStatusEnum';
import Link from 'next/link';
import Image from 'next/image'; // Assuming Image component is used for publisher avatar

interface ActivityRowProps {
    activity: ClassActivityVO;
    onEdit: (activityId: number) => void;
    onDelete: (activityId: number) => void;
    onViewSubmissions: (activityId: number) => void;
}

// 活动状态的文本和颜色映射
const statusMap: { [key: string]: { text: string; color: string; bgColor: string; } } = {
    [ActivityStatusEnum.PENDING]: { text: '待发布', color: '#86909C', bgColor: '#F2F3F2' },
    [ActivityStatusEnum.NOT_STARTED]: { text: '未开始', color: '#F59E0B', bgColor: '#FFF7E8' },
    [ActivityStatusEnum.ONGOING]: { text: '进行中', color: '#00B42A', bgColor: '#E8FFEA' },
    [ActivityStatusEnum.ENDED]: { text: '已结束', color: '#C9CDD4', bgColor: '#F7F8FA' },
};

const ActivityRow: React.FC<ActivityRowProps> = ({
                                                     activity,
                                                     onEdit,
                                                     onDelete,
                                                     onViewSubmissions
                                                 }) => {
    const { id, title, activityTemplate, publisher, publishAt, dueAt, status } = activity;
    const statusInfo = statusMap[status] || statusMap.ENDED;

    return (
        <tr className={styles.tableRow}>
            {/* 活动标题 */}
            <td className={styles.cell}>
                <Link href={`/teacher/courses/${activity.classId}/activities/${id}/detail`} className={styles.activityTitleLink}> {/* 假设有详情页路由 */}
                    {title}
                </Link>
            </td>
            {/* 源模板 */}
            <td className={styles.cell}>
                <span className={styles.templateTitle}>{activityTemplate.originalTitle}</span>
            </td>
            {/* 发布人 */}
            <td className={styles.cell}>
                <div className={styles.publisherCell}>
                    <Image
                        src={publisher.avatarUrl || '/default-avatar.jpg'}
                        alt={publisher.nickname}
                        width={24} height={24}
                        className={styles.publisherAvatar}
                    />
                    <span>{publisher.nickname}</span>
                </div>
            </td>
            {/* 截止时间 */}
            <td className={styles.cell}>
                <span>{new Date(dueAt).toLocaleDateString()}</span>
            </td>
            {/* 状态 */}
            <td className={styles.cell}>
                <span className={styles.statusBadge} style={{ color: statusInfo.color, backgroundColor: statusInfo.bgColor }}>
                    {statusInfo.text}
                </span>
            </td>
            {/* 操作列 */}
            <td className={`${styles.cell} ${styles.actionsCell}`}>
                <Tooltip content="编辑活动" position="top">
                    <button onClick={() => onEdit(id)} className={styles.actionButton}>
                        <i className="fas fa-edit"></i>
                    </button>
                </Tooltip>
                <Tooltip content="查看提交" position="top">
                    <button onClick={() => onViewSubmissions(id)} className={styles.actionButton}>
                        <i className="fas fa-tasks"></i>
                    </button>
                </Tooltip>
                <Tooltip content="删除/撤回活动" position="top">
                    <button onClick={() => onDelete(id)} className={`${styles.actionButton} ${styles.deleteButton}`}>
                        <i className="fas fa-trash-alt"></i>
                    </button>
                </Tooltip>
            </td>
        </tr>
    );
};

export default ActivityRow;