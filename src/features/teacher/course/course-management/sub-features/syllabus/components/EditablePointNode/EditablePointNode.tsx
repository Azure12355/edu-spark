// src/components/teacher/course-management/syllabus/EditablePointNode/EditablePointNode.tsx
"use client";
import React from 'react';
import styles from './EditablePointNode.module.css';
import { KnowledgePoint, KnowledgePointType } from '@/shared/lib/data/syllabusData';
import EditableInput from '../common/EditableInput/EditableInput';

interface EditablePointNodeProps {
    point: KnowledgePoint;
    onUpdate: (field: keyof KnowledgePoint, value: any) => void;
    onDelete: () => void;
}

const PointTypeSelector: React.FC<{ currentType: KnowledgePointType; onSelect: (newType: KnowledgePointType) => void; }> = ({ currentType, onSelect }) => {
    const types: KnowledgePointType[] = ['核心', '重点', '选学'];
    const typeStyleMap: Record<KnowledgePointType, string> = { '核心': styles.typeCore, '重点': styles.typeImportant, '选学': styles.typeOptional };
    return (
        <div className={styles.typeSelector}>
            {types.map(type => (
                <button
                    key={type}
                    className={`${styles.typeTag} ${typeStyleMap[type]} ${currentType === type ? styles.activeType : ''}`}
                    onClick={() => onSelect(type)}
                >
                    {type}
                </button>
            ))}
        </div>
    );
};

const EditablePointNode: React.FC<EditablePointNodeProps> = ({ point, onUpdate, onDelete }) => {
    return (
        <div className={styles.pointItem}>
            <i className={`fas fa-grip-vertical ${styles.dragHandle}`}></i>
            <PointTypeSelector
                currentType={point.type}
                onSelect={(newType) => onUpdate('type', newType)}
            />
            <EditableInput
                value={point.title}
                onSave={(v) => onUpdate('title', v)}
                className={styles.pointTitleInput}
            />
            <div className={styles.itemActions}>
                <button onClick={onDelete} className={styles.deleteButton} title="删除知识点">
                    <i className="fas fa-trash-alt"></i>
                </button>
            </div>
        </div>
    );
};

export default EditablePointNode;