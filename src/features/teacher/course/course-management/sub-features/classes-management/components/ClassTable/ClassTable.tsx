// [!file src/features/teacher/course/course-management/sub-features/classes-management/components/ClassTable/ClassTable.tsx]
"use client";

import React from 'react';
import styles from './ClassTable.module.css';
import { ClassVO } from '@/shared/types';
import TableRow from './TableRow';

interface ClassTableProps {
    classes: ClassVO[];
    isLoading: boolean;
    onDelete: (classId: number) => void;
}

const ClassTable: React.FC<ClassTableProps> = ({ classes, isLoading, onDelete }) => {
    return (
        <div className={styles.tableContainer}>
            <table className={styles.table}>
                <thead>
                <tr className={styles.tableHeader}>
                    <th className={styles.th}>班级名称</th>
                    <th className={styles.th}>状态</th>
                    <th className={styles.th}>授课教师</th>
                    <th className={styles.th}>班级人数</th>
                    <th className={styles.th}>开设学期</th>
                    <th className={styles.th}>创建时间</th>
                    <th className={`${styles.th} ${styles.actionsHeader}`}>操作</th>
                </tr>
                </thead>
                <tbody>
                {classes.map(classInfo => (
                    <TableRow key={classInfo.id} classInfo={classInfo} onDelete={onDelete} />
                ))}
                {/* 当仍在加载（例如，翻页时），显示一个模糊的加载遮罩 */}
                {isLoading && classes.length > 0 && (
                    <tr className={styles.loadingOverlayRow}>
                        <td colSpan={7}>
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

export default ClassTable;