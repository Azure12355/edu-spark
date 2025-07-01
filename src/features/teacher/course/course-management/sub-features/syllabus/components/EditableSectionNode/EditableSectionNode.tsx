// src/components/teacher/course-management/syllabus/EditableSectionNode/EditableSectionNode.tsx
"use client";
import React from 'react';
import { Reorder } from 'framer-motion';
import styles from './EditableSectionNode.module.css';
import { SyllabusSection } from '@/shared/lib/data/syllabusData';
import EditableInput from '../common/EditableInput/EditableInput';
import EditablePointNode from '../EditablePointNode/EditablePointNode';

interface EditableSectionNodeProps {
    section: SyllabusSection;
    onUpdate: (field: keyof SyllabusSection, value: any) => void;
    onDelete: () => void;
    onAddPoint: () => void;
}

const EditableSectionNode: React.FC<EditableSectionNodeProps> = ({ section, onUpdate, onDelete, onAddPoint }) => {
    return (
        <div className={styles.sectionContainer}>
            <div className={styles.sectionHeader}>
                <i className={`fas fa-grip-vertical ${styles.dragHandle}`}></i>
                <EditableInput
                    value={section.title}
                    onSave={(v) => onUpdate('title', v)}
                />
                <div className={styles.itemActions}>
                    <button onClick={onAddPoint} title="添加知识点"><i className="fas fa-plus-circle"></i></button>
                    <button onClick={onDelete} className={styles.deleteButton} title="删除小节"><i className="fas fa-trash-alt"></i></button>
                </div>
            </div>

            <Reorder.Group
                axis="y"
                values={section.points}
                onReorder={(newPoints) => onUpdate('points', newPoints)}
                className={styles.pointList}
            >
                {section.points.map((point, ptIndex) => (
                    <Reorder.Item key={point.id} value={point}>
                        <EditablePointNode
                            point={point}
                            onUpdate={(field, value) => onUpdate(`points.${ptIndex}.${field}` as any, value)}
                            onDelete={() => onUpdate('points', section.points.filter(p => p.id !== point.id))}
                        />
                    </Reorder.Item>
                ))}
            </Reorder.Group>
        </div>
    );
};

export default EditableSectionNode;