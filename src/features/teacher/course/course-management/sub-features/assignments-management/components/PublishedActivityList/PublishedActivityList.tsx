// [!file src/features/teacher/course/course-management/sub-features/assignments-management/components/PublishedActivityList/PublishedActivityList.tsx]
"use client";

import React from 'react';
import styles from './PublishedActivityList.module.css';
import { ClassActivityVO } from '@/shared/types';
import ActivityRow from './ActivityRow';

interface PublishedActivityListProps {
    activities: ClassActivityVO[];
    isLoading: boolean;
    onEditActivity: (activityId: number) => void;
    onDeleteActivity: (activityId: number) => void;
    onViewSubmissions: (activityId: number) => void;
}

const PublishedActivityList: React.FC<PublishedActivityListProps> = ({
                                                                         activities,
                                                                         isLoading,
                                                                         onEditActivity,
                                                                         onDeleteActivity,
                                                                         onViewSubmissions,
                                                                     }) => {
    return (
        <div className={styles.listContainer}>
            <table className={styles.table}>
                <thead>
                <tr className={styles.tableHeader}>
                    <th className={styles.th}>活动标题</th>
                    <th className={styles.th}>源模板</th>
                    <th className={styles.th}>发布人</th>
                    <th className={styles.th}>截止时间</th>
                    <th className={styles.th}>状态</th>
                    <th className={`${styles.th} ${styles.actionsHeader}`}>操作</th>
                </tr>
                </thead>
                <tbody>
                {activities.map(activity => (
                    <ActivityRow
                        key={activity.id}
                        activity={activity}
                        onEdit={onEditActivity}
                        onDelete={onDeleteActivity}
                        onViewSubmissions={onViewSubmissions}
                    />
                ))}
                {/* 加载遮罩层，用于翻页等局部加载场景 */}
                {isLoading && activities.length > 0 && (
                    <tr className={styles.loadingOverlayRow}>
                        <td colSpan={6}>
                            <div className={styles.loadingOverlay}>
                                <i className="fas fa-spinner fa-spin"></i>
                            </div>
                        </td>
                    </tr>
                )}
                </tbody>
            </table>
        </div>
    );
};

export default PublishedActivityList;