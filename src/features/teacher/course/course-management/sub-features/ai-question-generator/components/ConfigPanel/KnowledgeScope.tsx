// src/components/teacher/course-management/ai-generate/ConfigPanel/KnowledgeScope.tsx
"use client";
import React from 'react';
import styles from './KnowledgeScope.module.css';
import { motion } from 'framer-motion';
// BugFix: 导入 KnowledgePoint 类型
import { KnowledgePoint } from '@/shared/types/knowledge';

interface Props {
    // BugFix: points 类型从 string[] 改为 KnowledgePoint[]
    points: KnowledgePoint[];
    // BugFix: onRemovePoint 参数从 string 改为 pointId: string
    onRemovePoint: (pointId: string) => void;
    onAddManually: () => void;
    onSelectFromLibrary: () => void;
}

const EmptyState = () => (
    <div className={styles.emptyState}>
        <i className={`fas fa-lightbulb ${styles.icon}`}></i>
        <p>尚未选择知识点<br/>请从下方添加</p>
    </div>
);

// BugFix: 更新 props 类型
const KnowledgeTag = ({ point, onRemove }: { point: KnowledgePoint, onRemove: (id: string) => void }) => (
    <motion.div
        className={styles.tag}
        layout
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 20, transition: { duration: 0.2 } }}
    >
        <i className={`fas fa-tag ${styles.icon}`}></i>
        {/* BugFix: 显示 point.title */}
        <span className={styles.text}>{point.title}</span>
        {/* BugFix: 回调时传递 point.id */}
        <button onClick={() => onRemove(point.id)} title={`移除 ${point.title}`} className={styles.deleteButton}>
            <i className="fas fa-times"></i>
        </button>
    </motion.div>
);


const KnowledgeScope: React.FC<Props> = ({ points, onRemovePoint, onAddManually, onSelectFromLibrary }) => (
    <div className={styles.card}>
        <h3 className={styles.cardTitle}><i className="fas fa-book-open"></i> 知识点范围</h3>

        {points.length > 0 ? (
            <div className={styles.listContainer}>
                {/* BugFix: 使用 point.id 作为 key */}
                {points.map(p => <KnowledgeTag key={p.id} point={p} onRemove={onRemovePoint} />)}
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