// [!file src/features/teacher/course/course-management/sub-features/point-edit/components/PointEditHeader/PointEditHeader.tsx]
"use client";

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import styles from './PointEditHeader.module.css';
import Tooltip from '@/shared/components/ui/Tooltip/Tooltip';

// 1. 更新 Props 接口，增加 isSaving 状态
interface PointEditHeaderProps {
    title: string;
    backUrl: string;
    isSaving: boolean;
    onSave: () => void;
    onMetadataClick: () => void;
}

const PointEditHeader: React.FC<PointEditHeaderProps> = ({ title, backUrl, isSaving, onSave, onMetadataClick }) => {
    return (
        <header className={styles.header}>
            <div className={styles.left}>
                <Tooltip content="返回详情页" position="right">
                    <Link href={backUrl} className={styles.backButton}>
                        <i className="fas fa-arrow-left"></i>
                    </Link>
                </Tooltip>
                <div className={styles.titleContainer}>
                    <h1 className={styles.title} title={title}>{title}</h1>
                    <span className={styles.statusTag}>
                        <i className="fas fa-pen"></i> 编辑中
                    </span>
                </div>
            </div>
            <div className={styles.right}>
                <Tooltip content="编辑标题、难度、标签等信息" position="top">
                    <button
                        onClick={onMetadataClick}
                        className={`${styles.actionButton} ${styles.metaButton}`}
                        disabled={isSaving}
                    >
                        <i className="fas fa-cog"></i>
                        <span>元信息</span>
                    </button>
                </Tooltip>

                <Tooltip content="保存所有更改" position="top">
                    <motion.button
                        onClick={onSave}
                        className={`${styles.actionButton} ${styles.saveButton}`}
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
                                <span>保存并发布</span>
                            </>
                        )}
                    </motion.button>
                </Tooltip>
            </div>
        </header>
    );
};

export default PointEditHeader;