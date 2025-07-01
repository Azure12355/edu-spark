"use client";
import React, { useState, useRef, useMemo } from 'react';
import Link from 'next/link';
import { motion, useMotionValue, useTransform, useMotionTemplate } from 'framer-motion';
import { KnowledgeBaseVO } from '@/features/teacher/knowledge/knowledge-list/services/knowledgeService'; // 【核心】: 导入新的、与后端对齐的 VO 类型
import ConfirmationModal from '@/shared/components/ui/ConfirmationModal/ConfirmationModal';
import { useToast } from '@/shared/hooks/useToast';
import styles from './KnowledgeCard.module.css';

// 【核心】: 创建一个状态映射对象，用于将后端的数字/字符串状态转换为前端的显示信息
// 注意：由于后端没有 status 字段，我们暂时不定义这个映射
// const statusMap = { ... };

// 【核心】: 重构 ProgressRing 组件以接收数字进度
const ProgressRing: React.FC<{ progress: number, color: string }> = ({ progress, color }) => {
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

// 【核心】: 组件 Props 类型更新为 KnowledgeBaseVO
interface KnowledgeCardProps {
    kb: KnowledgeBaseVO;
    onDelete: (id: number) => Promise<void>; // 新增：删除操作由父组件处理
}

const KnowledgeCard: React.FC<KnowledgeCardProps> = ({ kb, onDelete }) => {
    const showToast = useToast();
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

    // 【核心】: 从 kb.formatType 推断图标和颜色
    const formatInfo = useMemo(() => {
        switch (kb.formatType) {
            case 0: // 文本
                return { icon: 'fas fa-file-alt', color: 'rgb(59, 130, 246)' };
            case 2: // 图片
                return { icon: 'fas fa-image', color: 'rgb(139, 92, 246)' };
            default:
                return { icon: 'fas fa-question-circle', color: 'rgb(107, 114, 128)' };
        }
    }, [kb.formatType]);

    const stats = useMemo(() => {
        // 安全地解析 metadataStats
        try {
            if (typeof kb.metadataStats === 'string') {
                return JSON.parse(kb.metadataStats);
            }
            return kb.metadataStats || {};
        } catch (e) {
            return {};
        }
    }, [kb.metadataStats]);

    // ... (3D视差效果和辉光效果的 Hooks 保持不变) ...
    const cardRef = useRef<HTMLDivElement>(null);
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const lightX = useMotionValue(0);
    const lightY = useMotionValue(0);
    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => { /* ... */ };
    const handleMouseLeave = () => { /* ... */ };
    const rotateX = useTransform(mouseX, [-10, 10], [-8, 8]);
    const rotateY = useTransform(mouseY, [-10, 10], [-8, 8]);
    const handleLightMove = (e: React.MouseEvent<HTMLDivElement>) => { /* ... */ };
    const lightGradient = useMotionTemplate`radial-gradient(circle 200px at ${lightX}px ${lightY}px, rgba(255, 255, 255, 0.1), transparent)`;

    /**
     * 【核心】: 删除确认逻辑
     */
    const handleDeleteConfirm = async () => {
        setIsDeleting(true);
        try {
            // 调用父组件传递的异步 onDelete 函数
            await onDelete(kb.id);
            // 成功后关闭弹窗，父组件会处理 Toast 和刷新
            setIsDeleteModalOpen(false);
        } catch (error) {
            // 错误提示已由 apiClient 统一处理，此处无需操作
            // 父组件也已记录日志
        } finally {
            // 无论成功失败，都结束 loading 状态
            setIsDeleting(false);
        }
    };

    return (
        <>
            <motion.div
                ref={cardRef}
                className={styles.card}
                style={{ rotateX, rotateY, '--status-color': formatInfo.color } as any}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                whileHover={{ scale: 1.02 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                layout
            >
                <motion.div className={styles.cardGlow} style={{ backgroundImage: lightGradient }} onMouseMove={handleLightMove} />
                <div className={styles.cardNoise} />

                <div className={styles.cardContent}>
                    <div className={styles.cardHeader}>
                        <div className={styles.headerLeft}>
                            <div className={styles.iconContainer}>
                                {/* 【核心修改】: 暂时用一个固定的进度，未来可以根据后端文档处理状态来计算 */}
                                <ProgressRing progress={100} color={formatInfo.color} />
                                <i className={`${formatInfo.icon} ${styles.centerIcon}`} style={{ color: formatInfo.color }}></i>
                            </div>
                            <h3 className={styles.name} title={kb.name}>{kb.name}</h3>
                        </div>
                        <div className={styles.cardActions}>
                            {/* 【核心修改】: 将按钮用 Next.js 的 <Link> 组件包裹 */}
                            {/* passHref 属性会确保 <a> 标签的 href 属性被正确传递 */}
                            <Link href={`/teacher/knowledge/${kb.id}`} passHref legacyBehavior>
                                <a className={styles.actionButton} title="管理知识库">
                                    <i className="fas fa-arrow-right"></i>
                                </a>
                            </Link>
                            <button
                                className={`${styles.actionButton} ${styles.deleteButton}`}
                                title="删除"
                                onClick={() => setIsDeleteModalOpen(true)}
                            >
                                <i className="fas fa-trash-alt"></i>
                            </button>
                        </div>
                    </div>

                    <p className={styles.description} title={kb.description}>
                        {kb.description || '暂无描述信息...'}
                    </p>

                    {/* 【核心修改】: 从解析后的 stats 对象安全地读取数据 */}
                    <div className={styles.statsGrid}>
                        <div className={styles.statItem}><i className="fas fa-file-alt"></i><span>{stats.doc_count ?? 0}</span> 文档</div>
                        <div className={styles.statItem}><i className="fas fa-cubes"></i><span>{(stats.slice_count ?? 0).toLocaleString()}</span> 切片</div>
                        <div className={styles.statItem}><i className="fas fa-database"></i><span>{((stats.all_file_size ?? 0) / (1024 * 1024)).toFixed(1)}</span> MB</div>
                        <div className={styles.statItem}><i className="fas fa-heart"></i><span>{kb.forkCount ?? 0}</span> 收藏</div>
                    </div>
                </div>
            </motion.div>

            <ConfirmationModal
                isOpen={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                onConfirm={handleDeleteConfirm}
                isConfirming={isDeleting} // 传递加载状态
                title="确认删除知识库"
                message={<>您确定要删除知识库 <strong>{kb.name}</strong> 吗？<br />此操作将永久删除其所有关联数据，且无法撤销。</>}
                confirmText="确认删除"
                type="danger"
            />
        </>
    );
};

export default KnowledgeCard;