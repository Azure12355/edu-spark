// src/features/teacher/knowledge/knowledge-detail/sub-features/qa/components/MessageList/References/ReferencesContainer.tsx
import React from 'react';
import ReferenceCard, { Reference } from './ReferenceCard'; // 导入子组件和其所需的数据类型
import styles from './ReferencesContainer.module.css';

/**
 * @interface ReferencesContainerProps
 * @description ReferencesContainer 组件的 Props 定义
 */
interface ReferencesContainerProps {
    references: Reference[];
}

/**
 * 引用容器组件
 * @description 负责展示引用来源的标题，并以网格布局渲染一组引用卡片。
 */
const ReferencesContainer: React.FC<ReferencesContainerProps> = ({ references }) => {
    // 如果没有引用数据，则不渲染任何内容
    if (!references || references.length === 0) {
        return null;
    }

    return (
        <div className={styles.referencesContainer}>
            <h5 className={styles.referencesTitle}>
                <i className="fas fa-quote-left"></i>
                引用来源
            </h5>
            <div className={styles.referencesGrid}>
                {references.map(ref => (
                    <ReferenceCard key={ref.id} reference={ref} />
                ))}
            </div>
        </div>
    );
};

export default ReferencesContainer;