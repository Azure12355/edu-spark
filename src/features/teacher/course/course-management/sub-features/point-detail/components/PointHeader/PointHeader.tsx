// [!file src/features/teacher/course/course-management/sub-features/point-detail/components/PointHeader/PointHeader.tsx]
"use client";

import React from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import styles from './PointHeader.module.css';
import Tooltip from '@/shared/components/ui/Tooltip/Tooltip';
import {KnowledgePointDetailVO} from "@/shared/types";

// 1. 将骨架屏抽离为独立的、清晰的子组件
const HeaderSkeleton: React.FC = () => (
    <div className={`${styles.headerCard} ${styles.skeleton}`}>
        <div className={styles.mainInfo}>
            <div className={`${styles.skeletonLine} ${styles.skeletonTitle}`}></div>
            <div className={`${styles.skeletonLine} ${styles.skeletonTags}`}></div>
        </div>
        <div className={styles.actions}>
            <div className={`${styles.skeletonLine} ${styles.skeletonButton}`}></div>
            <div className={`${styles.skeletonLine} ${styles.skeletonButton}`}></div>
        </div>
    </div>
);

// 2. 更新 Props 接口，明确 point 可以为 null
interface PointHeaderProps {
    point: KnowledgePointDetailVO | null;
    isLoading: boolean;
}

const PointHeader: React.FC<PointHeaderProps> = ({ point, isLoading }) => {
    const params = useParams();
    const courseId = params.id as string;
    const pointId = params.pointId as string;

    // 3. 在组件渲染的早期阶段处理加载状态
    if (isLoading) {
        return <HeaderSkeleton />;
    }

    // 如果加载完成但仍然没有数据，可以显示一个空状态或错误提示
    if (!point) {
        return (
            <div className={styles.headerCard}>
                <div className={styles.mainInfo}>
                    <h1 className={styles.title}>知识点未找到</h1>
                </div>
            </div>
        );
    }


    // 4. 定义动画变体，增强视觉效果
    const headerVariants = {
        hidden: { opacity: 0, y: -20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
    };

    const tagVariants = {
        hidden: { opacity: 0, scale: 0.8 },
        visible: { opacity: 1, scale: 1, transition: { type: 'spring', stiffness: 300, damping: 20 } }
    };

    return (
        <motion.header
            className={styles.headerCard}
            variants={headerVariants}
            initial="hidden"
            animate="visible"
        >
            <div className={styles.mainInfo}>
                <h1 className={styles.title}>{point.title}</h1>
                <motion.div
                    className={styles.meta}
                    initial="hidden"
                    animate="visible"
                    transition={{ staggerChildren: 0.1 }}
                >
                    <motion.span variants={tagVariants} className={`${styles.tag} ${styles.type}`}>{point.type}</motion.span>
                    {point.difficulty &&
                        <motion.span variants={tagVariants} className={`${styles.tag} ${styles.difficulty}`}>{point.difficulty}</motion.span>
                    }
                    {point.metadata?.tags && Array.isArray(point.metadata.tags) && point.metadata.tags.map((tag: string) =>
                        <motion.span key={tag} variants={tagVariants} className={`${styles.tag} ${styles.genericTag}`}>{tag}</motion.span>
                    )}
                </motion.div>
            </div>
            <div className={styles.actions}>
                <Tooltip content="标记为待复习" position="top">
                    <button className={styles.actionButton}>
                        <i className="far fa-bookmark"></i>
                        <span>标记</span>
                    </button>
                </Tooltip>
                <Tooltip content="分享知识点" position="top">
                    <button className={styles.actionButton}>
                        <i className="fas fa-share-alt"></i>
                        <span>分享</span>
                    </button>
                </Tooltip>

                <div className={styles.stats}>
                    <span><i className="far fa-eye"></i> {point.metadata?.viewCount || 0}</span>
                </div>

                <Link href={`/teacher/courses/${courseId}/syllabus/${pointId}/edit`} passHref>
                    <button className={`${styles.actionButton} ${styles.editButton}`}>
                        <i className="fas fa-pen"></i>
                        <span>编辑内容</span>
                    </button>
                </Link>
            </div>
        </motion.header>
    );
};

export default PointHeader;