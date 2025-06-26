// src/components/teacher/course-management/ai-generate/ConfigPanel/KnowledgeScope.tsx
"use client";
import React from 'react';
import styles from './KnowledgeScope.module.css';
import { motion, AnimatePresence } from 'framer-motion';

interface Props {
    points: string[];
    onRemovePoint: (point: string) => void;
    onAddManually: () => void;
    onSelectFromLibrary: () => void;
}

// 独立的空状态组件
const EmptyState = () => (
    <div className={styles.emptyState}>
        <i className={`fas fa-lightbulb ${styles.icon}`}></i>
        <p>尚未选择知识点<br/>请从下方添加</p>
    </div>
);

// 独立的知识点标签组件
const KnowledgeTag = ({ point, onRemove }: { point: string, onRemove: (p: string) => void }) => (
    <motion.div
        className={styles.tag}
        layout
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 20, transition: { duration: 0.2 } }}
    >
        <i className={`fas fa-tag ${styles.icon}`}></i>
        <span className={styles.text}>{point}</span>
        <button onClick={() => onRemove(point)} title={`移除 ${point}`} className={styles.deleteButton}>
            <i className="fas fa-times"></i>
        </button>
    </motion.div>
);


const KnowledgeScope: React.FC<Props> = ({ points, onRemovePoint, onAddManually, onSelectFromLibrary }) => (
    <div className={styles.card}>
        <h3 className={styles.cardTitle}><i className="fas fa-book-open"></i> 知识点范围</h3>

        {points.length > 0 ? (
            <div className={styles.listContainer}>

                    {points.map(p => <KnowledgeTag key={p} point={p} onRemove={onRemovePoint} />)}

            </div>
        ) : (
            <EmptyState />
        )}

        <div className={styles.actions}>
            <button onClick={onAddManually} className={styles.actionButton}>
                <i className={`fas fa-i-cursor ${styles.icon}`}></i>
                <span className={styles.text}>手动添加</span>
                <span className={styles.desc}>输入新知识点</span>
            </button>
            <button onClick={onSelectFromLibrary} className={styles.actionButton}>
                <i className={`fas fa-swatchbook ${styles.icon}`}></i>
                <span className={styles.text}>从库中选择</span>
                <span className={styles.desc}>浏览课程大纲</span>
            </button>
        </div>
    </div>
);

export default KnowledgeScope;