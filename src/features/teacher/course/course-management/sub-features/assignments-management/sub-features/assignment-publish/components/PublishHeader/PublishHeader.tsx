// [!file src/features/teacher/course/course-management/sub-features/assignments-management/sub-features/assignment-publish/components/PublishHeader/PublishHeader.tsx]
"use client";

import React from 'react';
import styles from './PublishHeader.module.css';
import Link from 'next/link';
import { useParams } from "next/navigation";

// 定义 Props 类型
interface PublishHeaderProps {
    templateTitle: string;
    onPublish: () => void;
    isPublishing: boolean;
}

const PublishHeader: React.FC<PublishHeaderProps> = ({
                                                         templateTitle,
                                                         onPublish,
                                                         isPublishing,
                                                     }) => {
    const params = useParams();
    const courseId = params.id;

    return (
        <header className={styles.header}>
            <div className={styles.leftSection}>
                <Link href={`/teacher/courses/${courseId}/assignments`} className={styles.backButton} title="返回模板列表">
                    <i className="fas fa-arrow-left"></i>
                </Link>
                <div className={styles.titleContainer}>
                    <h1 className={styles.title}>发布作业</h1>
                    <span className={styles.templateName}>{templateTitle}</span>
                </div>
            </div>
            <div className={styles.rightActions}>
                <Link href={`/teacher/courses/${courseId}/assignments`} className={styles.cancelButton}>
                    取消
                </Link>
                <button
                    onClick={onPublish}
                    disabled={isPublishing}
                    className={styles.publishButton}
                >
                    {isPublishing ? (
                        <><i className="fas fa-spinner fa-spin"></i> 发布中...</>
                    ) : (
                        <><i className="fas fa-paper-plane"></i> 确认发布</>
                    )}
                </button>
            </div>
        </header>
    );
};

export default PublishHeader;