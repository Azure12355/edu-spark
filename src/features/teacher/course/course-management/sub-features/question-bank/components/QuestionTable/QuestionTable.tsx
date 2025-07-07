// [!file src/features/teacher/course/course-management/sub-features/question-bank/components/QuestionTable/QuestionTable.tsx]
"use client";

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './QuestionTable.module.css';
import TableRow from './TableRow';
import {QuestionVO} from "@/shared/types";

interface QuestionTableProps {
    questions: QuestionVO[];
    isLoading: boolean;
    selectedRowKeys: React.Key[];
    setSelectedRowKeys: (keys: React.Key[]) => void;
    onDelete: (id: number) => void;
}

// 骨架屏组件
const TableSkeleton = () => (
    <>
        {Array.from({ length: 5 }).map((_, i) => (
            <tr key={i} className={styles.skeletonRow}>
                <td><div className={styles.skeletonBox}></div></td>
                <td><div className={styles.skeletonLine}></div></td>
                <td><div className={styles.skeletonTag}></div></td>
                <td><div className={styles.skeletonTag}></div></td>
                <td><div className={styles.skeletonLineShort}></div></td>
                <td><div className={styles.skeletonLineShort}></div></td>
                <td><div className={styles.skeletonActions}></div></td>
            </tr>
        ))}
    </>
);

// 空状态组件
const EmptyState = () => (
    <div className={styles.emptyState}>
        <i className="fas fa-box-open"></i>
        <p>当前知识点下暂无题目</p>
        <span>尝试切换知识点，或点击右上角“新增题目”</span>
    </div>
);


const QuestionTable: React.FC<QuestionTableProps> = ({
                                                         questions,
                                                         isLoading,
                                                         selectedRowKeys,
                                                         setSelectedRowKeys,
                                                         onDelete
                                                     }) => {

    const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.checked) {
            setSelectedRowKeys(questions.map(q => q.id));
        } else {
            setSelectedRowKeys([]);
        }
    };

    const handleSelectRow = (id: number, checked: boolean) => {
        //@ts-ignore
        setSelectedRowKeys((prev: any) =>
            checked ? [...prev, id] : prev.filter((key: any) => key !== id)
        );
    };

    const isAllSelected = questions.length > 0 && selectedRowKeys.length === questions.length;
    const isIndeterminate = selectedRowKeys.length > 0 && !isAllSelected;

    return (
        <div className={styles.tableContainer}>
            <div className={styles.tableWrapper}>
                <table className={styles.table}>
                    <thead>
                    <tr>
                        <th className={styles.checkboxCell}>
                            <input
                                type="checkbox"
                                checked={isAllSelected}
                                ref={(el: any) => el && (el.indeterminate = isIndeterminate)}
                                onChange={handleSelectAll}
                            />
                        </th>
                        <th>题干</th>
                        <th>类型</th>
                        <th>难度</th>
                        <th>创建人</th>
                        <th>创建时间</th>
                        <th>操作</th>
                    </tr>
                    </thead>
                    <tbody>
                    <AnimatePresence>
                        {isLoading ? (
                            <TableSkeleton />
                        ) : (
                            questions.map(q => (
                                <TableRow
                                    key={q.id}
                                    question={q}
                                    isSelected={selectedRowKeys.includes(q.id)}
                                    onSelectRow={handleSelectRow}
                                    onDelete={onDelete}
                                />
                            ))
                        )}
                    </AnimatePresence>
                    </tbody>
                </table>
            </div>
            {!isLoading && questions.length === 0 && (
                <EmptyState />
            )}
        </div>
    );
};

export default QuestionTable;