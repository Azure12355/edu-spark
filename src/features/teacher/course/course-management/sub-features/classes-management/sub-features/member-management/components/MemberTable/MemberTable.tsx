// [!file src/features/teacher/course/course-management/sub-features/classes-management/sub-features/member-management/components/MemberTable/MemberTable.tsx]
"use client";

import React from 'react';
import styles from './MemberTable.module.css';
import { ClassMemberVO } from '@/shared/types';
import MemberTableRow from './MemberTableRow';

interface MemberTableProps {
    members: ClassMemberVO[];
    isLoading: boolean;
    onRemove: (member: ClassMemberVO) => void;
}

const MemberTable: React.FC<MemberTableProps> = ({ members, isLoading, onRemove }) => {
    return (
        <div className={styles.tableContainer}>
            <table className={styles.table}>
                <thead>
                <tr className={styles.tableHeader}>
                    <th className={styles.th}>成员</th>
                    <th className={styles.th}>角色</th>
                    <th className={styles.th}>状态</th>
                    <th className={styles.th}>加入时间</th>
                    <th className={`${styles.th} ${styles.actionsHeader}`}>操作</th>
                </tr>
                </thead>
                <tbody>
                {members.map(member => (
                    <MemberTableRow key={member.user.id} member={member} onRemove={onRemove} />
                ))}
                {/* 加载遮罩层，用于翻页等局部加载场景 */}
                {isLoading && members.length > 0 && (
                    <tr className={styles.loadingOverlayRow}>
                        <td colSpan={5}>
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

export default MemberTable;