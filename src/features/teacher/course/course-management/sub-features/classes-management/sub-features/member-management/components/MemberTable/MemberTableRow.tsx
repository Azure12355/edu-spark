// [!file src/features/teacher/course/course-management/sub-features/classes-management/sub-features/member-management/components/MemberTable/MemberTableRow.tsx]
"use client";

import React from 'react';
import Image from 'next/image';
import styles from './MemberTable.module.css';
import { ClassMemberVO } from '@/shared/types';
import Tooltip from "@/shared/components/ui/Tooltip/Tooltip";
import { ClassMemberRoleEnum } from '@/shared/types/enums/course/ClassMemberRoleEnum';
import { ClassMemberStatusEnum } from '@/shared/types/enums/course/ClassMemberStatusEnum';

interface TableRowProps {
    member: ClassMemberVO;
    onRemove: (member: ClassMemberVO) => void;
}

// 角色文本映射
const roleTextMap: Record<string, string> = {
    [ClassMemberRoleEnum.STUDENT]: '学生',
    [ClassMemberRoleEnum.TEACHER]: '教师/助教',
};

// 状态文本和样式映射
const statusMap: { [key: string]: { text: string; color: string; bgColor: string; } } = {
    [ClassMemberStatusEnum.ACTIVE]: { text: '正常', color: '#00B42A', bgColor: '#E8FFEA' },
    [ClassMemberStatusEnum.INACTIVE]: { text: '已停用', color: '#86909C', bgColor: '#F2F3F5' },
    [ClassMemberStatusEnum.REMOVED]: { text: '已移除', color: '#F53F3F', bgColor: '#FFECE8' },
};

const MemberTableRow: React.FC<TableRowProps> = ({ member, onRemove }) => {
    const { user, role, status, joinedAt } = member;

    const roleInfo = roleTextMap[role] || '未知角色';
    const statusInfo = statusMap[status] || { text: '未知状态', color: '#86909C', bgColor: '#F2F3F5' };

    return (
        <tr className={styles.tableRow}>
            {/* 成员信息 */}
            <td className={styles.cell}>
                <div className={styles.memberCell}>
                    <Image
                        src={user.avatarUrl || '/default-avatar.jpg'}
                        alt={user.nickname}
                        width={36}
                        height={36}
                        className={styles.memberAvatar}
                    />
                    <div className={styles.memberInfo}>
                        <span className={styles.memberName}>{user.nickname}</span>
                        <span className={styles.memberUsername}>@{user.username}</span>
                    </div>
                </div>
            </td>

            {/* 角色 */}
            <td className={styles.cell}>
                <span>{roleInfo}</span>
            </td>

            {/* 状态 */}
            <td className={styles.cell}>
                <span className={styles.statusBadge} style={{ color: statusInfo.color, backgroundColor: statusInfo.bgColor }}>
                    {statusInfo.text}
                </span>
            </td>

            {/* 加入时间 */}
            <td className={styles.cell}>
                <span>{new Date(joinedAt).toLocaleDateString()}</span>
            </td>

            {/* 操作列 */}
            <td className={`${styles.cell} ${styles.actionsCell}`}>
                <Tooltip content="查看详情" position="top">
                    <button className={styles.actionButton}><i className="fas fa-eye"></i></button>
                </Tooltip>
                <Tooltip content="编辑成员" position="top">
                    <button className={styles.actionButton}><i className="fas fa-edit"></i></button>
                </Tooltip>
                <Tooltip content="移除成员" position="top">
                    <button
                        className={`${styles.actionButton} ${styles.deleteButton}`}
                        onClick={() => onRemove(member)}
                    >
                        <i className="fas fa-user-minus"></i>
                    </button>
                </Tooltip>
            </td>
        </tr>
    );
};

export default MemberTableRow;