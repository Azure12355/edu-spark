"use client";
import React from 'react';
import styles from './BasicInfoView.module.css';
import InfoCard, { InfoItem } from './InfoCard';
import { KnowledgeBase } from '@/lib/data/knowledgeData';

interface BasicInfoViewProps {
    kb: KnowledgeBase;
}

const BasicInfoView: React.FC<BasicInfoViewProps> = ({ kb }) => {
    return (
        <div className={styles.viewContainer}>
            <div className={styles.descriptionCard}>
                <InfoCard icon="fa-info-circle" title="知识库描述">
                    <p className={styles.description}>
                        {kb.name}知识库，用于存放{kb.name}的课程资料、讲义、习题和相关论文，旨在为学生提供一个全面、准确的学习与问答环境。
                    </p>
                </InfoCard>
            </div>

            <div className={styles.statsCard}>
                <InfoCard icon="fa-id-card" title="基本属性" grid>
                    <InfoItem label="知识库 ID" value={kb.id} />
                    <InfoItem label="知识库类型" value={kb.type} />
                    <InfoItem label="创建人" value={kb.creator} />
                    <InfoItem label="创建时间" value={kb.createdAt} />
                </InfoCard>
            </div>

            <div className={styles.configCard}>
                <InfoCard icon="fa-chart-pie" title="数据统计" grid>
                    <InfoItem label="文档总数" value={`${kb.fileCount} 个`} />
                    <InfoItem label="总切片数" value={`${kb.chunkCount.toLocaleString()} 个`} />
                    <InfoItem label="数据类型" value="非结构化" />
                    <InfoItem label="平均字符数" value={`${Math.round(kb.chunkCount > 0 ? (kb.chunkCount*256)/kb.fileCount : 0)}`} />
                </InfoCard>
            </div>
        </div>
    );
};

export default BasicInfoView;