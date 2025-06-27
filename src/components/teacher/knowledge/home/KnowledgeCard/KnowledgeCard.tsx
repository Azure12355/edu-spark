"use client";
import React, { useState, useRef } from 'react';
import Link from 'next/link';
import { motion, useMotionValue, useTransform, useMotionTemplate } from 'framer-motion';
import { KnowledgeBase, KnowledgeStatus } from '@/types/knowledge';
import { useKnowledgeStore } from '@/store/knowledgeStore';
import ConfirmationModal from '@/components/common/ConfirmationModal/ConfirmationModal';
import { useToast } from '@/hooks/useToast';
import styles from './KnowledgeCard.module.css';

// 1. 状态映射保持不变
const statusMap: { [key in KnowledgeStatus]: { text: string, icon: string, color: string } } = {
    READY: { text: '就绪', icon: 'fas fa-check-circle', color: 'rgb(34 197 94)' }, // Green-500
    BUILDING: { text: '构建中', icon: 'fas fa-sync-alt', color: 'rgb(59 130 246)' }, // Blue-500
    ERROR: { text: '失败', icon: 'fas fa-exclamation-circle', color: 'rgb(239 68 68)' }, // Red-500
    DISABLED: { text: '未启用', icon: 'fas fa-minus-circle', color: 'rgb(107 114 128)' }, // Gray-500
};

const ProgressRing: React.FC<{ status: KnowledgeStatus, color: string }> = ({ status, color }) => {
    // ... (ProgressRing 组件逻辑不变) ...
    const progress = status === 'READY' ? 100 : (status === 'BUILDING' ? 50 : 0);
    const radius = 24;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (progress / 100) * circumference;

    return (
        <svg className={styles.progressRing} width="52" height="52" viewBox="0 0 52 52">
            <circle className={styles.ringBackground} cx="26" cy="26" r={radius} />
            <motion.circle
                className={styles.ringProgress}
                cx="26" cy="26" r={radius}
                stroke={color}
                strokeDasharray={circumference}
                initial={{ strokeDashoffset: circumference }}
                animate={{ strokeDashoffset: offset }}
                transition={{ duration: 1.5, ease: "circOut" }}
            />
        </svg>
    );
};

const KnowledgeCard: React.FC<{ kb: KnowledgeBase }> = ({ kb }) => {
    const deleteKnowledgeBase = useKnowledgeStore(state => state.deleteKnowledgeBase);
    const showToast = useToast();
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    const statusInfo = statusMap[kb.status];

    // 2. 新增：为3D视差效果设置 motion values
    const cardRef = useRef<HTMLDivElement>(null);
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const handleMouseMove = ({ clientX, clientY, currentTarget }: React.MouseEvent<HTMLDivElement>) => {
        const { left, top, width, height } = currentTarget.getBoundingClientRect();
        const x = (clientX - left - width / 2) / 25; // 减小旋转幅度
        const y = (clientY - top - height / 2) / 25;
        mouseX.set(y * -1); // 反转Y轴使效果更自然
        mouseY.set(x);
    };

    const handleMouseLeave = () => {
        mouseX.set(0);
        mouseY.set(0);
    };

    const rotateX = useTransform(mouseX, [-10, 10], [-8, 8]); // 旋转角度
    const rotateY = useTransform(mouseY, [-10, 10], [-8, 8]);

    // 3. 新增：动态辉光效果
    const lightX = useMotionValue(0);
    const lightY = useMotionValue(0);

    const handleLightMove = (e: React.MouseEvent<HTMLDivElement>) => {
        lightX.set(e.nativeEvent.offsetX);
        lightY.set(e.nativeEvent.offsetY);
    };

    const lightGradient = useMotionTemplate`
        radial-gradient(circle 200px at ${lightX}px ${lightY}px, rgba(255, 255, 255, 0.15), transparent)
    `;

    const handleDeleteConfirm = () => {
        deleteKnowledgeBase(kb.id);
        showToast({ message: `知识库 "${kb.name}" 已删除`, type: 'info' });
    };

    return (
        <>
            <motion.div
                ref={cardRef}
                className={styles.card}
                style={{ rotateX, rotateY, '--status-color': statusInfo.color } as any}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                whileHover={{ scale: 1.02 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                layout
            >
                {/* 4. 添加辉光和纹理背景层 */}
                <motion.div className={styles.cardGlow} style={{ backgroundImage: lightGradient }} onMouseMove={handleLightMove} />
                <div className={styles.cardNoise} />

                <div className={styles.cardContent}>
                    <div className={styles.cardHeader}>
                        <div className={styles.headerLeft}>
                            <div className={styles.iconContainer}>
                                <ProgressRing status={kb.status} color={statusInfo.color} />
                                <i className={`${statusInfo.icon} ${kb.status === 'BUILDING' ? styles.spinning : ''} ${styles.centerIcon}`} style={{ color: statusInfo.color }}></i>
                            </div>
                            <h3 className={styles.name} title={kb.name}>{kb.name}</h3>
                        </div>
                        <div className={styles.cardActions}>
                            <Link href={`/teacher/knowledge/${kb.id}/`} passHref>
                                <button className={styles.actionButton} title="管理"><i className="fas fa-arrow-right"></i></button>
                            </Link>
                            <button className={`${styles.actionButton} ${styles.deleteButton}`} title="删除" onClick={() => setIsDeleteModalOpen(true)}>
                                <i className="fas fa-trash-alt"></i>
                            </button>
                        </div>
                    </div>

                    <p className={styles.description} title={kb.description}>
                        {kb.description || '暂无描述信息...'}
                    </p>

                    <div className={styles.statsGrid}>
                        <div className={styles.statItem}><i className="fas fa-file-alt"></i><span>{kb.stats.doc_count}</span> 文档</div>
                        <div className={styles.statItem}><i className="fas fa-cubes"></i><span>{kb.stats.slice_count.toLocaleString()}</span> 切片</div>
                        <div className={styles.statItem}><i className="fas fa-database"></i><span>{(kb.stats.all_file_size / (1024 * 1024)).toFixed(1)}</span> MB</div>
                        <div className={styles.statItem}><i className="fas fa-heart"></i><span>{kb.fork_count}</span> 收藏</div>
                    </div>
                </div>
            </motion.div>

            <ConfirmationModal
                isOpen={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                onConfirm={handleDeleteConfirm}
                title="确认删除知识库"
                message={<>您确定要删除知识库 <strong>{kb.name}</strong> 吗？<br />此操作将永久删除其所有关联文档，且无法撤销。</>}
                confirmText="确认删除"
                type="danger"
            />
        </>
    );
};

export default KnowledgeCard;