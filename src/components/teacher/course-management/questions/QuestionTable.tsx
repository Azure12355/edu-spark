// src/components/teacher/course-management/questions/QuestionTable.tsx
"use client";
import React from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import styles from './QuestionTable.module.css';
import { motion, AnimatePresence } from 'framer-motion';
import {Question} from "@/types/question";

interface QuestionTableProps {
    questions: Question[];
}

const QuestionTable: React.FC<QuestionTableProps> = ({ questions }) => {
    const params = useParams();
    const courseId = params.id;

    return (
        <div className={styles.tableContainer}>
            <div className={styles.tableWrapper}>
                <table className={styles.table}>
                    <thead>
                    <tr>
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
                        {questions.map(q => (
                            <motion.tr
                                key={q.id}
                                layout
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.2 }}
                            >
                                <td className={styles.stemCell}><p title={q.stem}>{q.stem}</p></td>
                                <td><span className={styles.typeTag}>{q.type}</span></td>
                                <td><span className={`${styles.difficultyTag} ${styles[q.difficulty]}`}>{q.difficulty}</span></td>
                                {/* 核心修改：处理 creators 数组和 createdAt 时间戳 */}
                                <td>{q.creators.join(', ')}</td>
                                <td>{new Date(q.createdAt).toLocaleDateString()}</td>
                                <td className={styles.actionsCell}>
                                    <div className={styles.actions}>
                                        <Link href={`/teacher/courses/${courseId}/questions/${q.id}/preview`} passHref>
                                            <button title="预览"><i className="far fa-eye"></i></button>
                                        </Link>
                                        <Link href={`/teacher/courses/${courseId}/questions/${q.id}/edit`} passHref>
                                            <button title="编辑"><i className="fas fa-pen"></i></button>
                                        </Link>
                                        <button title="删除" className={styles.delete}><i className="fas fa-trash"></i></button>
                                    </div>
                                </td>
                            </motion.tr>
                        ))}
                    </AnimatePresence>
                    </tbody>
                </table>
            </div>
            {questions.length === 0 && (
                <div className={styles.noResults}>
                    <p>当前知识点下暂无题目，快去添加吧！</p>
                </div>
            )}
        </div>
    );
};

export default QuestionTable;