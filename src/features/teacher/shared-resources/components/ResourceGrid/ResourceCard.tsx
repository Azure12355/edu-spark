// [!file src/features/teacher/shared-resources/components/ResourceGrid/ResourceCard.tsx]
"use client";

import React from 'react';
import styles from './ResourceCard.module.css';
import { UnifiedResource } from '../../hooks/useSharedResources';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Tooltip from '@/shared/components/ui/Tooltip/Tooltip'; // 复用Tooltip

interface ResourceCardProps {
    resource: UnifiedResource & { colorTheme?: string };
}

const ResourceCard: React.FC<ResourceCardProps> = ({ resource }) => {
    const resourceLink = resource.type === 'courses'
        ? `/teacher/courses/${resource.id}/introduction`
        : `/teacher/knowledge/${resource.id}`;

    // 使用 colorTheme，如果不存在则提供一个与 HeroHeader 风格匹配的默认淡雅色
    const themeColor = resource.colorTheme || '#a7c5eb'; // 一个柔和的淡蓝色

    // 卡片入场动画
    const cardVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { type: 'spring', damping: 15, stiffness: 100 } }
    };

    return (
        <motion.div variants={cardVariants}>
            <Link href={resourceLink} className={styles.cardLink}>
                <div className={styles.cardContainer} style={{ '--theme-color-main': themeColor } as React.CSSProperties}>
                    {/* 抽象的、流动的背景辉光 */}
                    <div className={styles.glowEffect}></div>

                    {/* 顶部区域 */}
                    <div className={styles.cardHeader}>
                        <div className={styles.iconWrapper}>
                            <i className={resource.type === 'courses' ? 'fas fa-book-open' : 'fas fa-brain'}></i>
                        </div>
                        <div className={styles.tags}>
                            {resource.tags.map((tag, index) => (
                                <span key={index} className={styles.tag}>{tag}</span>
                            ))}
                        </div>
                    </div>

                    {/* 卡片主体：标题和描述 */}
                    <div className={styles.cardBody}>
                        <h3 className={styles.title}>{resource.title}</h3>
                        <p className={styles.description}>{resource.description}</p>
                    </div>

                    {/* 卡片底部 */}
                    <div className={styles.cardFooter}>
                        <div className={styles.creatorInfo}>
                            <Image
                                src={resource.creator.avatarUrl || '/default-avatar.jpg'}
                                alt={resource.creator.nickname}
                                width={28} height={28}
                                className={styles.creatorAvatar}
                            />
                            <span className={styles.creatorName}>{resource.creator.nickname}</span>
                        </div>
                        <div className={styles.actionHint}>
                            <span>查看详情</span>
                            <i className="fas fa-arrow-right"></i>
                        </div>
                    </div>
                </div>
            </Link>
        </motion.div>
    );
};

export default ResourceCard;