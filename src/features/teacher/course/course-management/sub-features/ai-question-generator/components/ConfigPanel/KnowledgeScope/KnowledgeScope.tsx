// src/features/teacher/course/course-management/sub-features/ai-question-generator/components/ConfigPanel/KnowledgeScope.tsx
"use client";
import React from 'react';
import styles from './KnowledgeScope.module.css';
import {motion} from 'framer-motion';
import {KnowledgePoint} from '@/shared/types';

interface KnowledgeScopeProps {
    points: KnowledgePoint[];
    onRemovePoint: (pointId: string | number) => void;
    onAddManually: () => void;
    onSelectFromLibrary: () => void;
}

const EmptyState = () => (
    <div className={styles.emptyState}><i className={`fas fa-lightbulb ${styles.icon}`}></i><p>尚未选择知识点<br/>请从下方添加
    </p></div>);

const KnowledgeTag: React.FC<{ point: KnowledgePoint, onRemove: (id: string | number) => void }> = ({
                                                                                                        point,
                                                                                                        onRemove
                                                                                                    }) => (
    <motion.div className={styles.tag} layout initial={{opacity: 0, x: -20}} animate={{opacity: 1, x: 0}}
                exit={{opacity: 0, x: 20, transition: {duration: 0.2}}}>
        <i className={`fas fa-tag ${styles.icon}`}></i>
        <span className={styles.text} title={point.title}>{point.title}</span>
        <button onClick={() => onRemove(point.id)} title={`移除 ${point.title}`} className={styles.deleteButton}><i
            className="fas fa-times"></i></button>
    </motion.div>
);

const KnowledgeScope: React.FC<KnowledgeScopeProps> = ({points, onRemovePoint, onAddManually, onSelectFromLibrary}) => (
    <div className={styles.card}>
        <h3 className={styles.cardTitle}><i className="fas fa-book-open"></i> 知识点范围 <span>*</span></h3>
        {points.length > 0 ? (
            <div className={styles.listContainer}>{points.map(p => <KnowledgeTag key={p.id} point={p}
                                                                                 onRemove={onRemovePoint}/>)}</div>
        ) : (<EmptyState/>)}
        <div className={styles.actions}>
            <button onClick={onSelectFromLibrary} className={styles.actionButton}><i
                className={`fas fa-swatchbook ${styles.icon}`}></i><span className={styles.text}>从库中选择</span><span
                className={styles.desc}>浏览课程大纲</span></button>
        </div>
    </div>
);

export default KnowledgeScope;