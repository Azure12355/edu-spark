// src/components/teacher/course-management/point-edit/MetadataModal/MetadataModal.tsx
"use client";
import React, { useState, useEffect } from 'react';
import Modal from '@/shared/components/ui/Modal/Modal';
import styles from './MetadataModal.module.css';
import { PointDetail } from '@/shared/lib/data/pointDetailData';

interface MetadataModalProps {
    isOpen: boolean;
    onClose: () => void;
    point: PointDetail | null;
    onSave: (updatedPoint: Partial<PointDetail>) => void;
}

const MetadataModal: React.FC<MetadataModalProps> = ({ isOpen, onClose, point, onSave }) => {
    // 保持安全的 useState 初始化
    const [title, setTitle] = useState(point?.title || '');
    const [tags, setTags] = useState(point?.tags?.join(', ') || '');
    const [difficulty, setDifficulty] = useState(point?.difficulty || '中等');

    useEffect(() => {
        if (isOpen && point) {
            // 在 useEffect 内部进行更严格的检查
            setTitle(point.title || '');
            // 核心修复：确保 point.tags 是一个数组再调用 .join()
            setTags(Array.isArray(point.tags) ? point.tags.join(', ') : '');
            setDifficulty(point.difficulty || '中等');
        }
    }, [isOpen, point]);

    const handleSave = () => {
        onSave({
            title,
            tags: tags.split(',').map(t => t.trim()).filter(Boolean),
            difficulty,
        });
        onClose();
    };

    if (!point) {
        return null;
    }

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title="编辑知识点信息"
            footer={
                <>
                    <button className={styles.footerButton} onClick={onClose}>取消</button>
                    <button className={`${styles.footerButton} ${styles.saveButton}`} onClick={handleSave}>保存</button>
                </>
            }
        >
            <div className={styles.form}>
                <div className={styles.formGroup}>
                    <label htmlFor="title">知识点标题</label>
                    <input id="title" type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="tags">标签 (用逗号分隔)</label>
                    <input id="tags" type="text" value={tags} onChange={(e) => setTags(e.target.value)} />
                </div>
                <div className={styles.formGroup}>
                    <label>难度</label>
                    <div className={styles.difficultySelector}>
                        {(['简单', '中等', '困难'] as const).map(d => (
                            <button key={d} className={difficulty === d ? styles.active : ''} onClick={() => setDifficulty(d)}>{d}</button>
                        ))}
                    </div>
                </div>
            </div>
        </Modal>
    );
};
export default MetadataModal;