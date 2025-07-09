// [!file src/features/teacher/course/course-management/sub-features/classes-management/components/ClassTable/TableRow.tsx]
"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './ClassTable.module.css';
import { ClassVO } from '@/shared/types';
import Tooltip from "@/shared/components/ui/Tooltip/Tooltip"; // 导入我们强大的 Tooltip 组件

interface TableRowProps {
    classInfo: ClassVO;
    onDelete: (classId: number) => void;
}

// 状态文本和颜色的映射
const statusMap: { [key: string]: { text: string; color: string; bgColor: string; } } = {
    PREPARING: { text: '准备中', color: '#4E5969', bgColor: '#F2F3F5' },
    ONGOING: { text: '进行中', color: '#00B42A', bgColor: '#E8FFEA' },
    FINISHED: { text: '已结课', color: '#86909C', bgColor: '#F7F8FA' },
    ARCHIVED: { text: '已归档', color: '#C9CDD4', bgColor: '#F7F8FA' },
};

const TableRow: React.FC<TableRowProps> = ({ classInfo, onDelete }) => {
    const { id, name, term, status, memberCount, maxMembers, teacher, createdAt } = classInfo;
    const statusInfo = statusMap[status] || statusMap.ARCHIVED;

    return (
        <tr className={styles.tableRow}>
            {/* 班级名称 */}
            <td className={styles.cell}>
                <Link href={`/teacher/courses/${classInfo.courseTemplate.id}/classes/${id}/dashboard`} className={styles.classNameLink}>
                    {name}
                </Link>
            </td>
            {/* 状态 */}
            <td className={styles.cell}>
                <span className={styles.statusBadge} style={{ color: statusInfo.color, backgroundColor: statusInfo.bgColor }}>
                    {statusInfo.text}
                </span>
            </td>
            {/* 授课教师 */}
            <td className={styles.cell}>
                <div className={styles.teacherCell}>
                    <Image
                        src={teacher.avatarUrl || '/default-avatar.jpg'}
                        alt={teacher.nickname}
                        width={24} height={24}
                        className={styles.teacherAvatar}
                    />
                    <span>{teacher.nickname}</span>
                </div>
            </td>
            {/* 班级人数 */}
            <td className={styles.cell}>
                <span>{memberCount || 0} / {maxMembers || '∞'}</span>
            </td>
            {/* 开设学期 */}
            <td className={styles.cell}>
                <span>{term}</span>
            </td>
            {/* 创建时间 */}
            <td className={styles.cell}>
                <span>{new Date(createdAt).toLocaleDateString()}</span>
            </td>
            {/* 操作列 */}
            <td className={`${styles.cell} ${styles.actionsCell}`}>
                <Tooltip content="成员管理" position="top">
                    <button className={styles.actionButton}><i className="fas fa-users"></i></button>
                </Tooltip>
                <Tooltip content="活动发布" position="top">
                    <button className={styles.actionButton}><i className="fas fa-paper-plane"></i></button>
                </Tooltip>
                <Tooltip content="班级设置" position="top">
                    <button className={styles.actionButton}><i className="fas fa-cog"></i></button>
                </Tooltip>
                <Tooltip content="删除班级" position="top">
                    <button
                        className={`${styles.actionButton} ${styles.deleteButton}`}
                        onClick={() => onDelete(id)}
                    >
                        <i className="fas fa-trash-alt"></i>
                    </button>
                </Tooltip>
            </td>
        </tr>
    );
};

export default TableRow;