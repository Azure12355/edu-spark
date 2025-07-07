// [!file src/features/teacher/course/course-management/sub-features/question-edit/components/KnowledgePointModal/KnowledgePointModal.tsx]
"use client";

import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Modal from '@/shared/components/ui/Modal/Modal';
import styles from './KnowledgePointModal.module.css';
import {
    useSyllabusForModal
} from "@/features/teacher/course/course-management/sub-features/question-edit/hooks/useSyllabusForModal";
import {SyllabusVO} from "@/shared/types";

// 1. 导入新的 Hook 和类型

interface KnowledgePointModalProps {
    isOpen: boolean;
    onClose: () => void;
    // currentPoints 期望的类型是 { id: number } 数组
    currentPoints: { id: number }[];
    // 【核心修复】onSave 回调的类型改为接收 number[]
    onSave: (newPointIds: number[]) => void;
    syllabusData: SyllabusVO | null; // 假设大纲数据也传入
}

// 2. 将 UI 状态组件化，使主组件更清晰
const SkeletonLoader = () => (
    <div className={styles.skeletonContainer}>
        {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className={styles.skeletonChapter}>
                <div className={styles.skeletonLine} style={{ width: '60%', height: '20px' }} />
                <div className={styles.skeletonLine} style={{ width: '90%' }} />
                <div className={styles.skeletonLine} style={{ width: '80%' }} />
            </div>
        ))}
    </div>
);

const ErrorDisplay = ({ error, onRetry }: { error: string; onRetry: () => void; }) => (
    <div className={styles.stateMessage}>
        <i className={`fas fa-exclamation-triangle ${styles.errorIcon}`}></i>
        <p>{error}</p>
        <button onClick={onRetry} className={styles.retryButton}>点击重试</button>
    </div>
);

const EmptyState = ({ message }: { message: string }) => (
    <div className={styles.stateMessage}>
        <i className={`fas fa-search ${styles.emptyIcon}`}></i>
        <p>{message}</p>
    </div>
);


const KnowledgePointModal: React.FC<KnowledgePointModalProps> = ({ isOpen, onClose, currentPoints, onSave }) => {
    // 3. 调用 Hook 获取大纲数据和状态
    const { syllabus, isLoading, error, refetch } = useSyllabusForModal();

    // 4. 管理本地 UI 状态
    const [selectedIds, setSelectedIds] = useState(new Set<number>());
    const [searchTerm, setSearchTerm] = useState('');
    const [expandedChapters, setExpandedChapters] = useState<Set<number>>(new Set());

    // 5. 同步外部传入的选中状态
    useEffect(() => {
        if (isOpen) {
            setSelectedIds(new Set(currentPoints.map(p => p.id)));
        }
    }, [isOpen, currentPoints]);

    // 6. 自动展开所有章节
    useEffect(() => {
        if (syllabus) {
            setExpandedChapters(new Set(syllabus.chapters.map(c => c.id)));
        }
    }, [syllabus]);

    // 7. 使用 useMemo 优化搜索过滤逻辑
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

    // 8. 定义所有交互回调函数
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
        onSave(Array.from(selectedIds)); // 直接返回 ID 数组
        onClose();
    };

    const toggleChapter = (chapterId: number) => {
        setExpandedChapters(prev => {
            const newSet = new Set(prev);
            newSet.has(chapterId) ? newSet.delete(chapterId) : newSet.add(chapterId);
            return newSet;
        });
    };

    // 9. 渲染 UI
    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title="关联知识点"
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
                    {isLoading ? <SkeletonLoader /> :
                        error ? <ErrorDisplay error={error} onRetry={refetch} /> :
                            filteredSyllabus.length > 0 ? filteredSyllabus.map(chapter => (
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
                            )) : (
                                <EmptyState message="没有找到匹配的知识点。" />
                            )}
                </div>
            </div>
        </Modal>
    );
};

export default KnowledgePointModal;