// src/features/teacher/course/course-management/sub-features/ai-question-generator/components/ConfigPanel/KnowledgePointSelectionModal.tsx
"use client";

import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Modal from '@/shared/components/ui/Modal/Modal';
import styles from './KnowledgePointSelectionModal.module.css';
import { KnowledgePoint } from '@/shared/types';
import { useSyllabusForModal } from '../../../hooks/useSyllabusForModal'; // 1. 导入新的 Hook

// 2. 更新 Props 接口，不再需要传入 syllabusData
interface KnowledgePointModalProps {
    isOpen: boolean;
    onClose: () => void;
    currentPoints: KnowledgePoint[];
    onSave: (newPoints: KnowledgePoint[]) => void;
}

// 3. 将 UI 状态组件化，使主组件更清晰
const SkeletonLoader = () => (
    <div className={styles.emptyState}>... 加载中 ...</div> // 简化版，可替换为更复杂的骨架屏
);
const ErrorDisplay = ({ error, onRetry }: { error: string; onRetry: () => void; }) => (
    <div className={styles.emptyState}>
        <p>{error}</p>
        <button onClick={onRetry}>重试</button>
    </div>
);
const EmptyState = ({ message }: { message: string }) => (
    <div className={styles.emptyState}><p>{message}</p></div>
);

const KnowledgePointSelectionModal: React.FC<KnowledgePointModalProps> = ({ isOpen, onClose, currentPoints, onSave }) => {
    // 4. 调用 Hook 获取大纲数据和状态
    const { syllabus, isLoading, error, refetch } = useSyllabusForModal();

    // 5. 管理本地 UI 状态
    const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set());
    const [searchTerm, setSearchTerm] = useState('');
    const [expandedChapters, setExpandedChapters] = useState<Set<number>>(new Set());

    useEffect(() => {
        if (isOpen) {
            setSelectedIds(new Set(currentPoints.map(p => p.id)));
        }
    }, [isOpen, currentPoints]);

    useEffect(() => {
        if (syllabus) {
            setExpandedChapters(new Set(syllabus.chapters.map(c => c.id)));
        }
    }, [syllabus]);

    const filteredSyllabus = useMemo(() => {
        if (!syllabus) return [];
        if (!searchTerm.trim()) return syllabus.chapters;
        const lowercasedTerm = searchTerm.toLowerCase();
        return syllabus.chapters.map(chapter => ({
            ...chapter,
            sections: chapter.sections.map(section => ({
                ...section,
                points: section.points.filter(point => point.title.toLowerCase().includes(lowercasedTerm))
            })).filter(section => section.points.length > 0)
        })).filter(chapter => chapter.sections.length > 0);
    }, [syllabus, searchTerm]);

    const allVisiblePointIds = useMemo(() => filteredSyllabus.flatMap(c => c.sections.flatMap(s => s.points.map(p => p.id))), [filteredSyllabus]);
    const isAllVisibleSelected = useMemo(() => allVisiblePointIds.length > 0 && allVisiblePointIds.every(id => selectedIds.has(id)), [allVisiblePointIds, selectedIds]);

    const handleTogglePoint = (pointId: number) => {
        setSelectedIds(prev => {
            const newSet = new Set(prev);
            newSet.has(pointId) ? newSet.delete(pointId) : newSet.add(pointId);
            return newSet;
        });
    };

    const handleSelectAllVisible = () => {
        const currentSelected = new Set(selectedIds);
        if (isAllVisibleSelected) {
            allVisiblePointIds.forEach(id => currentSelected.delete(id));
        } else {
            allVisiblePointIds.forEach(id => currentSelected.add(id));
        }
        setSelectedIds(currentSelected);
    };

    const handleSave = () => {
        if (!syllabus) return;
        const allPointsMap = new Map<number, KnowledgePoint>();
        syllabus.chapters.forEach(chapter =>
            chapter.sections.forEach(section =>
                section.points.forEach(point =>
                    allPointsMap.set(point.id, point)
                )
            )
        );
        const selectedPointObjects = Array.from(selectedIds)
            .map(id => allPointsMap.get(id))
            .filter((p): p is KnowledgePoint => p !== undefined);
        onSave(selectedPointObjects);
        onClose();
    };

    const toggleChapter = (chapterId: number) => {
        setExpandedChapters(prev => {
            const newSet = new Set(prev);
            newSet.has(chapterId) ? newSet.delete(chapterId) : newSet.add(chapterId);
            return newSet;
        });
    };

    const renderContent = () => {
        if (isLoading) return <SkeletonLoader />;
        if (error) return <ErrorDisplay error={error} onRetry={refetch} />;
        if (!filteredSyllabus || filteredSyllabus.length === 0) {
            return <EmptyState message={searchTerm ? "没有找到匹配的知识点。" : "该课程暂无知识点。"} />;
        }

        return filteredSyllabus.map(chapter => (
            <div key={chapter.id} className={styles.chapterNode}>
                <div className={styles.chapterTitle} onClick={() => toggleChapter(chapter.id)}>
                    <i className={`fas fa-chevron-right ${styles.chevron} ${expandedChapters.has(chapter.id) ? styles.expanded : ''}`}></i>
                    {chapter.title}
                </div>
                <AnimatePresence>
                    {expandedChapters.has(chapter.id) && (
                        <motion.ul className={styles.sectionList} initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }}>
                            {chapter.sections.map(section => (
                                <li key={section.id}>
                                    <h5 className={styles.sectionTitle}>{section.title}</h5>
                                    <ul className={styles.pointList}>
                                        {section.points.map(point => (
                                            <li key={point.id} className={styles.pointItem}>
                                                <label>
                                                    <input type="checkbox" checked={selectedIds.has(point.id)} onChange={() => handleTogglePoint(point.id)} />
                                                    {point.title}
                                                </label>
                                            </li>
                                        ))}
                                    </ul>
                                </li>
                            ))}
                        </motion.ul>
                    )}
                </AnimatePresence>
            </div>
        ));
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title="从知识点库选择"
            footer={
                <div className={styles.modalFooter}>
                    <span>已选择 {selectedIds.size} 个知识点</span>
                    <div>
                        <button onClick={onClose} className="teacher-button-secondary">取消</button>
                        <button onClick={handleSave} className="teacher-button-primary">确认关联</button>
                    </div>
                </div>
            }
        >
            <div className={styles.modalBody}>
                <div className={styles.toolbar}>
                    <div className={styles.searchBar}>
                        <i className="fas fa-search"></i>
                        <input type="text" placeholder="搜索知识点..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
                    </div>
                    <button onClick={handleSelectAllVisible} className={styles.selectAllButton}>
                        {isAllVisibleSelected ? '全部取消' : '全选当前'}
                    </button>
                </div>
                <div className={styles.treeView}>
                    {renderContent()}
                </div>
            </div>
        </Modal>
    );
};

export default KnowledgePointSelectionModal;