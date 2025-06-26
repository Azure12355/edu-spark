// src/components/teacher/course-management/ai-generate/ConfigPanel/KnowledgePointSelectionModal.tsx
"use client";
import React, { useState, useEffect, useMemo } from 'react';
import Modal from '@/components/common/Modal/Modal';
import { useSyllabusStore } from '@/store/syllabusStore';
import styles from './KnowledgePointSelectionModal.module.css';

interface Props {
    isOpen: boolean;
    onClose: () => void;
    currentPoints: string[];
    onSave: (newPoints: string[]) => void;
}

const KnowledgePointSelectionModal: React.FC<Props> = ({ isOpen, onClose, currentPoints, onSave }) => {
    const { syllabus } = useSyllabusStore();
    const [selectedPoints, setSelectedPoints] = useState(new Set(currentPoints));
    const [searchTerm, setSearchTerm] = useState('');

    // 当模态框打开时，同步外部已选中的知识点
    useEffect(() => {
        if (isOpen) {
            setSelectedPoints(new Set(currentPoints));
        }
    }, [isOpen, currentPoints]);

    const handleTogglePoint = (pointTitle: string) => {
        setSelectedPoints(prev => {
            const newSet = new Set(prev);
            if (newSet.has(pointTitle)) {
                newSet.delete(pointTitle);
            } else {
                newSet.add(pointTitle);
            }
            return newSet;
        });
    };

    const handleSave = () => {
        onSave(Array.from(selectedPoints));
        onClose();
    };

    const filteredSyllabus = useMemo(() => {
        if (!searchTerm) return syllabus;
        const lowercasedTerm = searchTerm.toLowerCase();

        return syllabus.map(chapter => ({
            ...chapter,
            sections: chapter.sections.map(section => ({
                ...section,
                points: section.points.filter(point => point.title.toLowerCase().includes(lowercasedTerm))
            })).filter(section => section.points.length > 0)
        })).filter(chapter => chapter.sections.length > 0);

    }, [syllabus, searchTerm]);

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title="从知识点库选择"
            footer={
                <>
                    <button onClick={onClose} className="teacher-button-secondary">取消</button>
                    <button onClick={handleSave} className="teacher-button-primary">确认添加 ({selectedPoints.size})</button>
                </>
            }
        >
            <div className={styles.modalBody}>
                <div className={styles.searchBar}>
                    <i className="fas fa-search"></i>
                    <input type="text" placeholder="搜索知识点..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
                </div>
                <div className={styles.treeView}>
                    {filteredSyllabus.map(chapter => (
                        <div key={chapter.id} className={styles.chapterNode}>
                            <h4 className={styles.chapterTitle}>{chapter.title}</h4>
                            <ul className={styles.sectionList}>
                                {chapter.sections.map(section => (
                                    <li key={section.id}>
                                        <h5 className={styles.sectionTitle}>{section.title}</h5>
                                        <ul className={styles.pointList}>
                                            {section.points.map(point => (
                                                <li key={point.id} className={styles.pointItem}>
                                                    <label>
                                                        <input
                                                            type="checkbox"
                                                            checked={selectedPoints.has(point.title)}
                                                            onChange={() => handleTogglePoint(point.title)}
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

export default KnowledgePointSelectionModal;