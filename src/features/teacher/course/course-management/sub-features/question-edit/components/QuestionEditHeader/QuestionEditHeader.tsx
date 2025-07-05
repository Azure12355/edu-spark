// [!file src/features/teacher/course/course-management/sub-features/question-edit/components/QuestionEditHeader/QuestionEditHeader.tsx]
"use client";

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import styles from './QuestionEditHeader.module.css';
import Tooltip from '@/shared/components/ui/Tooltip/Tooltip';

// 1. 更新 Props 接口，增加 isSaving 状态和模式判断
interface QuestionEditHeaderProps {
    mode: 'create' | 'edit';
    isSaving: boolean;
    onSave: () => void;
    // 移除了 title 和 backUrl, 因为可以从 router 获取或动态生成
}

const QuestionEditHeader: React.FC<QuestionEditHeaderProps> = ({ mode, isSaving, onSave }) => {
    const router = useRouter();

    return (
        <header className={styles.header}>
            <div className={styles.leftSection}>
                <Tooltip content="返回上一页" position="right">
                    <button onClick={() => router.back()} className={styles.backButton}>
                        <i className="fas fa-arrow-left"></i>
                    </button>
                </Tooltip>
                <div className={styles.titleContainer}>
                    <h1 className={styles.title}>
                        {mode === 'create' ? '创建新题目' : '编辑题目'}
                    </h1>
                </div>
            </div>
            <div className={styles.rightSection}>
                <Tooltip content="预览题目效果" position="top">
                    <button className={`${styles.actionButton} ${styles.secondaryButton}`} disabled={isSaving}>
                        <i className="far fa-eye"></i>
                        <span>预览</span>
                    </button>
                </Tooltip>

                <Tooltip content={isSaving ? '正在保存...' : '保存所有更改'} position="top">
                    <motion.button
                        onClick={onSave}
                        className={`${styles.actionButton} ${styles.primaryButton}`}
                        disabled={isSaving}
                        whileHover={!isSaving ? { scale: 1.05 } : {}}
                        whileTap={!isSaving ? { scale: 0.95 } : {}}
                    >
                        {isSaving ? (
                            <>
                                <i className="fas fa-spinner fa-spin"></i>
                                <span>保存中...</span>
                            </>
                        ) : (
                            <>
                                <i className="fas fa-check"></i>
                                <span>{mode === 'create' ? '创建并预览' : '保存更改'}</span>
                            </>
                        )}
                    </motion.button>
                </Tooltip>
            </div>
        </header>
    );
};

export default QuestionEditHeader;