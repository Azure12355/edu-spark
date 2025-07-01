// src/components/teacher/course-management/question-edit/KnowledgePointModal.tsx
"use client";
import React, { useState, useEffect } from 'react';
import Modal from '@/shared/components/ui/Modal/Modal';
import { useSyllabusStore } from '@/features/teacher/course/course-management/sub-features/syllabus/store/syllabusStore';
import styles from './KnowledgePointModal.module.css';
import {KnowledgePoint} from "@/shared/lib/data/syllabusData";

interface KnowledgePointModalProps {
    isOpen: boolean;
    onClose: () => void;
    currentPoints: KnowledgePoint[];
    onSave: (newPointIds: string[]) => void;
}

const KnowledgePointModal: React.FC<KnowledgePointModalProps> = ({ isOpen, onClose, currentPoints, onSave }) => {
    const { syllabus } = useSyllabusStore();
    const [selectedIds, setSelectedIds] = useState(new Set(currentPoints.map(p => p.id)));

    useEffect(() => {
        if (isOpen) {
            setSelectedIds(new Set(currentPoints.map(p => p.id)));
        }
    }, [isOpen, currentPoints]);

    const handleToggle = (pointId: string) => {
        setSelectedIds(prev => {
            const newSet = new Set(prev);
            if (newSet.has(pointId)) {
                newSet.delete(pointId);
            } else {
                newSet.add(pointId);
            }
            return newSet;
        });
    };

    const handleSave = () => {
        onSave(Array.from(selectedIds)); // 传递ID数组
        onClose();
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title="关联知识点"
            footer={
                <>
                    <button onClick={onClose} className="teacher-button-secondary">取消</button>
                    <button onClick={handleSave} className="teacher-button-primary">保存</button>
                </>
            }
        >
            <div className={styles.modalBody}>
                <div className={styles.treeView}>
                    {syllabus.map(chapter => (
                        <div key={chapter.id} className={styles.chapterNode}>
                            <h4 className={styles.chapterTitle}>{chapter.title}</h4>
                            <ul className={styles.sectionList}>
                                {chapter.sections.map(section => (
                                    <li key={section.id}>
                                        <h5>{section.title}</h5>
                                        <ul>
                                            {section.points.map(point => (
                                                <li key={point.id} className={styles.pointItem}>
                                                    <label>
                                                        <input
                                                            type="checkbox"
                                                            // --- 核心修改：使用 point.id 判断 ---
                                                            checked={selectedIds.has(point.id)}
                                                            onChange={() => handleToggle(point.id)}
                                                        />
                                                        {point.title}
                                                    </label>
                                                </li>
                                            ))}
                                        </ul>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
        </Modal>
    );
};

export default KnowledgePointModal;