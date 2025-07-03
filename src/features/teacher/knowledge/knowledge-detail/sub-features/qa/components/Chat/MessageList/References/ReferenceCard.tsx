// src/features/teacher/knowledge/knowledge-detail/sub-features/qa/components/MessageList/References/ReferenceCard.tsx
import React from 'react';
import styles from './ReferenceCard.module.css';

/**
 * @interface Reference
 * @description 定义单条引用来源的数据结构
 */
export interface Reference {
    id: number | string;
    docName: string;
    score: number;
    content: string;
}

/**
 * @interface ReferenceCardProps
 * @description ReferenceCard 组件的 Props 定义
 */
interface ReferenceCardProps {
    reference: Reference;
}

/**
 * 引用来源卡片组件
 * @description 负责展示单条引用来源的详细信息，包括文档名、相关度分数和内容摘要。
 */
const ReferenceCard: React.FC<ReferenceCardProps> = ({ reference }) => {
    return (
        <div className={styles.referenceCard} title={`点击查看详情：${reference.docName}`}>
            <div className={styles.refHeader}>
                <i className="fas fa-file-alt"></i>
                <span className={styles.refDocName} title={reference.docName}>
                    {reference.docName}
                </span>
                <span className={styles.refScore}>
                    {(reference.score * 100).toFixed(1)}%
                </span>
            </div>
            <p className={styles.refContent}>{reference.content}</p>
        </div>
    );
};

export default ReferenceCard;