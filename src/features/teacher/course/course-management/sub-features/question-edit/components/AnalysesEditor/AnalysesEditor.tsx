// [!file src/features/teacher/course/course-management/sub-features/question-edit/components/AnalysesEditor/AnalysesEditor.tsx]
"use client";

import React, { useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Editor } from '@bytemd/react';
import gfm from '@bytemd/plugin-gfm';
import highlight from '@bytemd/plugin-highlight';
import styles from './AnalysesEditor.module.css';
import 'bytemd/dist/index.css';
import Tooltip from "@/shared/components/ui/Tooltip/Tooltip";

interface AnalysesEditorProps {
    values: string[];
    onChange: (newValues: string[]) => void;
}

const AnalysesEditor: React.FC<AnalysesEditorProps> = ({ values, onChange }) => {
    const plugins = useMemo(() => [gfm(), highlight()], []);

    // 更新指定索引的解析内容
    const handleEditorChange = (index: number, newValue: string) => {
        const newAnalyses = [...values];
        newAnalyses[index] = newValue;
        onChange(newAnalyses);
    };

    // 添加一条新的空解析
    const handleAddAnalysis = () => {
        onChange([...values, '']);
    };

    // 删除指定索引的解析
    const handleRemoveAnalysis = (index: number) => {
        onChange(values.filter((_, i) => i !== index));
    };

    // 动画变体
    const itemVariants = {
        hidden: { opacity: 0, y: -20, scale: 0.98 },
        visible: { opacity: 1, y: 0, scale: 1 },
        exit: { opacity: 0, x: -50, transition: { duration: 0.2 } },
    };

    return (
        <div className={styles.card}>
            <div className={styles.header}>
                <h3 className={styles.cardTitle}>题目解析</h3>
                <Tooltip content="添加一条新解析" position="top">
                    <button onClick={handleAddAnalysis} className={styles.addButton}>
                        <i className="fas fa-plus"></i> 添加解析
                    </button>
                </Tooltip>
            </div>

            <div className={styles.analysesContainer}>
                <AnimatePresence>
                    {values.map((analysis, index) => (
                        <motion.div
                            key={index} // 在动态列表中，使用 index 作为 key 是可接受的，因为我们没有稳定的ID
                            className={styles.analysisItem}
                            variants={itemVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            layout
                        >
                            <div className={styles.itemHeader}>
                                <span>解析 {index + 1}</span>
                                <Tooltip content="删除此条解析" position="top">
                                    <button
                                        onClick={() => handleRemoveAnalysis(index)}
                                        className={styles.deleteButton}
                                        disabled={values.length <= 1} // 至少保留一条解析
                                    >
                                        <i className="fas fa-trash-alt"></i>
                                    </button>
                                </Tooltip>
                            </div>
                            <div className={styles.editorWrapper}>
                                <Editor
                                    value={analysis}
                                    plugins={plugins}
                                    onChange={(v) => handleEditorChange(index, v)}
                                    placeholder={`输入解析 ${index + 1} 的内容...`}
                                />
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default AnalysesEditor;