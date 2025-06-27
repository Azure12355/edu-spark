// src/components/teacher/course-management/questions/QuestionTable.tsx
"use client";
import React from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import styles from './QuestionTable.module.css';
import { motion, AnimatePresence } from 'framer-motion';
import { Question } from "@/types/question";

interface QuestionTableProps {
    questions: Question[];
}

const QuestionTable: React.FC<QuestionTableProps> = ({ questions }) => {
    const params = useParams();
    const courseId = params.id;

    // Define animation variants for the rows
    const rowVariants = {
        initial: { opacity: 0, y: -10 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, x: -50 },
    };

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
                    {/* BugFix: Move AnimatePresence and motion component outside of the direct children of table */}
                    <motion.tbody>
                        <AnimatePresence>
                            {questions.map(q => (
                                <motion.tr
                                    key={q.id}
                                    layout
                                    variants={rowVariants}
                                    initial="initial"
                                    animate="animate"
                                    exit="exit"
                                    transition={{ duration: 0.3, ease: "easeInOut" }}
                                >
                                    <td className={styles.stemCell}><p title={q.stem}>{q.stem}</p></td>
                                    <td><span className={styles.typeTag}>{q.type}</span></td>
                                    <td><span className={`${styles.difficultyTag} ${styles[q.difficulty]}`}>{q.difficulty}</span></td>
                                    <td>{q.creators?.join(', ') || 'N/A'}</td>
                                    <td>{q.createdAt ? new Date(q.createdAt).toLocaleDateString() : 'N/A'}</td>
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
                    </motion.tbody>
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