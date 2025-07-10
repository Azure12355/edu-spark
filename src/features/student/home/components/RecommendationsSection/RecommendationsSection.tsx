"use client";

import React from 'react';
import Image from 'next/image';
import styles from './RecommendationsSection.module.css';
import SectionHeader from '../common/SectionHeader/SectionHeader';

// 定义推荐卡片的数据结构
export interface RecommendationItem {
    src: string;
}

interface RecommendationsSectionProps {
    title: string;
    items: RecommendationItem[];
    showMoreLink?: boolean;
}

const RecommendationsSection: React.FC<RecommendationsSectionProps> = ({ title, items, showMoreLink }) => {
    return (
        <section className={styles.recommendationsSection}>
            <SectionHeader title={title} showMoreLink={showMoreLink} />
            <div className={styles.recommendationsGrid}>
                {items.map((rec, index) => (
                    <div key={index} className={styles.recommendationCard}>
                        {/* 使用 next/image 的 fill 模式来填充容器 */}
                        <Image src={rec.src} alt={`${title} ${index + 1}`} layout="fill" objectFit="cover" />
                    </div>
                ))}
            </div>
        </section>
    );
};

export default RecommendationsSection;