// [!file src/features/teacher/course/course-management/sub-features/question-bank/components/QuestionTable/TableRow.tsx]
"use client";

import React from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import styles from './QuestionTable.module.css';
import Tooltip from '@/shared/components/ui/Tooltip/Tooltip';
import {QuestionDifficultyTextMap, QuestionTypeTextMap, QuestionVO} from "@/shared/types";
// 1. 导入新的枚举映射

interface TableRowProps {
    question: QuestionVO;
    isSelected: boolean;
    onSelectRow: (id: number, checked: boolean) => void;
    onDelete: (id:number) => void;
}

const TableRow: React.FC<TableRowProps> = ({ question, isSelected, onSelectRow, onDelete }) => {
    const params = useParams();
    const courseId = params.id as string;

    const rowVariants = {
        hidden: { opacity: 0, y: -10 },
        visible: { opacity: 1, y: 0 },
        exit: { opacity: 0, x: -50, transition: { duration: 0.2 } },
    };

    // 2. 从映射中获取中文文本和样式
    const typeText = QuestionTypeTextMap[question.type] || question.type;
    const difficultyInfo = QuestionDifficultyTextMap[question.difficulty] || { text: question.difficulty, className: '' };

    return (
        <motion.tr
            layout
            variants={rowVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className={isSelected ? styles.selectedRow : ''}
        >
            <td className={styles.checkboxCell}>
                <input
                    type="checkbox"
                    checked={isSelected}
                    onChange={(e) => onSelectRow(question.id, e.target.checked)}
                />
            </td>
            <td className={styles.stemCell}>
                <p title={question.stem}>{question.stem}</p>
            </td>
            <td>
                {/* 3. 使用中文文本 */}
                <span className={`${styles.tag} ${styles.typeTag}`}>{typeText}</span>
            </td>
            <td>
                {/* 4. 使用中文文本和动态 className */}
                <span className={`${styles.tag} ${styles.difficultyTag} ${styles[difficultyInfo.className]}`}>
                    {difficultyInfo.text}
                </span>
            </td>
            <td>{question.creators[0]?.nickname || 'N/A'}</td>
            <td>{new Date(question.createdAt).toLocaleDateString()}</td>
            <td className={styles.actionsCell}>
                <div className={styles.actions}>
                    <Tooltip content="预览题目" position="top">
                        <Link href={`/teacher/courses/${courseId}/questions/${question.id}/preview`} passHref>
                            <button><i className="far fa-eye"></i></button>
                        </Link>
                    </Tooltip>
                    <Tooltip content="编辑题目" position="top">
                        <Link href={`/teacher/courses/${courseId}/questions/${question.id}/edit`} passHref>
                            <button><i className="fas fa-pen"></i></button>
                        </Link>
                    </Tooltip>
                    <Tooltip content="删除题目" position="top">
                        <button onClick={() => onDelete(question.id)} className={styles.delete}><i className="fas fa-trash"></i></button>
                    </Tooltip>
                </div>
            </td>
        </motion.tr>
    );
};

export default TableRow;