// src/components/teacher/course-management/ai-generate/ConfigPanel/KnowledgePointSelectionModal.tsx
"use client";
import React, { useState, useEffect, useMemo } from 'react';
import Modal from '@/components/common/Modal/Modal';
import { useSyllabusStore } from '@/store/syllabusStore';
import styles from './KnowledgePointSelectionModal.module.css';
// BugFix: 导入 KnowledgePoint 类型
import { KnowledgePoint } from '@/types/knowledge';

interface Props {
    isOpen: boolean;
    onClose: () => void;
    // BugFix: 接收 KnowledgePoint 对象数组
    currentPoints: KnowledgePoint[];
    // BugFix: 保存时返回 KnowledgePoint 对象数组
    onSave: (newPoints: KnowledgePoint[]) => void;
}

const KnowledgePointSelectionModal: React.FC<Props> = ({ isOpen, onClose, currentPoints, onSave }) => {
    const { syllabus } = useSyllabusStore();
    // BugFix: 内部状态改为存储 ID 集合，更高效
    const [selectedIds, setSelectedIds] = useState(new Set(currentPoints.map(p => p.id)));
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        if (isOpen) {
            // 当模态框打开时，用传入的 props 同步 ID 集合
            setSelectedIds(new Set(currentPoints.map(p => p.id)));
        }
    }, [isOpen, currentPoints]);

    const handleTogglePoint = (pointId: string) => {
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
        // BugFix: 从 syllabus 数据中根据 ID 查找完整的 KnowledgePoint 对象
        const allPointsMap = new Map<string, KnowledgePoint>();
        syllabus.forEach(chapter =>
            chapter.sections.forEach(section =>
                section.points.forEach(point =>
                    allPointsMap.set(point.id, point as KnowledgePoint)
                )
            )
        );

        const selectedPointObjects = Array.from(selectedIds)
            .map(id => allPointsMap.get(id))
            .filter((p): p is KnowledgePoint => p !== undefined); // 过滤掉可能未找到的项

        onSave(selectedPointObjects);
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
                    <button onClick={handleSave} className="teacher-button-primary">确认添加 ({selectedIds.size})</button>
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
                                                            // BugFix: 使用 point.id 进行判断和切换
                                                            checked={selectedIds.has(point.id)}
                                                            onChange={() => handleTogglePoint(point.id)}
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