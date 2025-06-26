// src/components/teacher/course-management/ai-generate/ConfigPanel/KnowledgeScope.tsx
"use client";
import React from 'react';
import styles from './KnowledgeScope.module.css';
import { motion, AnimatePresence } from 'framer-motion';

interface Props {
    points: string[];
    onRemovePoint: (point: string) => void;
    // 核心修改：接收事件处理器
    onAddManually: () => void;
    onSelectFromLibrary: () => void;
}

const KnowledgeScope: React.FC<Props> = ({ points, onRemovePoint, onAddManually, onSelectFromLibrary }) => (
    <div className={styles.card}>
        <h3 className={styles.cardTitle}><i className="fas fa-book"></i> 知识点范围</h3>
        <div className={styles.list}>
            <AnimatePresence>
                {points.map(p => (
                    <motion.div
                        key={p}
                        className={styles.tag}
                        layout
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.2 }}
                    >
                        <span>{p}</span>
                        <button onClick={() => onRemovePoint(p)} title={`移除 ${p}`}><i className="fas fa-times"></i></button>
                    </motion.div>
                ))}
            </AnimatePresence>
        </div>
        <div className={styles.actions}>
            {/* 核心修改：绑定 onClick 事件 */}
            <button onClick={onAddManually} className="teacher-button-secondary"><i className="fas fa-plus"></i> 手动添加</button>
            <button onClick={onSelectFromLibrary} className="teacher-button-secondary"><i className="fas fa-database"></i> 从知识点库选择</button>
        </div>
    </div>
);

export default KnowledgeScope;