// src/components/teacher/course-management/syllabus/EditableChapterNode/EditableChapterNode.tsx
"use client";
import React from 'react';
import { Reorder } from 'framer-motion';
import styles from './EditableChapterNode.module.css';
import { SyllabusChapter } from '@/shared/lib/data/syllabusData';
import EditableInput from '../common/EditableInput/EditableInput';
import EditableSectionNode from '../EditableSectionNode/EditableSectionNode';

interface EditableChapterNodeProps {
    chapter: SyllabusChapter;
    onUpdate: (field: keyof SyllabusChapter, value: any) => void;
    onDelete: () => void;
    onAddSection: () => void;
    onAddPoint: (sectionIndex: number) => void;
}

const EditableChapterNode: React.FC<EditableChapterNodeProps> = ({ chapter, onUpdate, onDelete, onAddSection, onAddPoint }) => {
    return (
        <div className={styles.chapterContainer}>
            <div className={styles.chapterHeader}>
                <i className={`fas fa-grip-vertical ${styles.dragHandle}`}></i>
                <EditableInput
                    value={chapter.title}
                    onSave={(v) => onUpdate('title', v)}
                    className={styles.chapterTitle}
                />
                <div className={styles.itemActions}>
                    <button onClick={onAddSection} title="添加小节"><i className="fas fa-plus-circle"></i></button>
                    <button onClick={onDelete} className={styles.deleteButton} title="删除章节"><i className="fas fa-trash-alt"></i></button>
                </div>
            </div>

            <Reorder.Group
                axis="y"
                values={chapter.sections}
                onReorder={(newSections) => onUpdate('sections', newSections)}
                className={styles.sectionList}
            >
                {chapter.sections.map((section, secIndex) => (
                    <Reorder.Item key={section.id} value={section}>
                        <EditableSectionNode
                            section={section}
                            onUpdate={(field, value) => onUpdate(`sections.${secIndex}.${field}` as any, value)}
                            onDelete={() => onUpdate('sections', chapter.sections.filter(s => s.id !== section.id))}
                            onAddPoint={() => onAddPoint(secIndex)}
                        />
                    </Reorder.Item>
                ))}
            </Reorder.Group>
        </div>
    );
};

export default EditableChapterNode;