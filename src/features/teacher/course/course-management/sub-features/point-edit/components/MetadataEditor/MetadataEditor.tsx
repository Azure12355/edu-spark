// [!file src/features/teacher/course/course-management/sub-features/point-edit/components/MetadataEditor/MetadataEditor.tsx]
"use client";

import React from 'react';
import styles from './MetadataEditor.module.css';
import { LocalEditablePoint } from '../../types';

interface MetadataEditorProps {
    type: LocalEditablePoint['type'];
    difficulty: LocalEditablePoint['difficulty'];
    tags: LocalEditablePoint['tags'];
    onFieldChange: (field: keyof LocalEditablePoint, value: any) => void;
}

const MetadataEditor: React.FC<MetadataEditorProps> = ({ type, difficulty, tags, onFieldChange }) => {

    const handleTagChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newTags = e.target.value.split(',').map(t => t.trim());
        onFieldChange('tags', newTags);
    };

    return (
        <div className={styles.metadataCard}>
            <div className={styles.row}>
                <div className={styles.configGroup}>
                    <label className={styles.label}>类型</label>
                    <div className={styles.segmentedControl}>
                        {(['核心', '重点', '选学'] as const).map(t => (
                            <button key={t} onClick={() => onFieldChange('type', t)} className={type === t ? styles.active : ''}>{t}</button>
                        ))}
                    </div>
                </div>
                <div className={styles.configGroup}>
                    <label className={styles.label}>难度</label>
                    <div className={styles.segmentedControl}>
                        {(['简单', '中等', '困难'] as const).map(d => (
                            <button key={d} onClick={() => onFieldChange('difficulty', d)} className={difficulty === d ? styles.active : ''}>{d}</button>
                        ))}
                    </div>
                </div>
            </div>
            <div className={styles.configGroup}>
                <label htmlFor="tags-input" className={styles.label}>标签</label>
                <div className={styles.tagInputWrapper}>
                    <i className="fas fa-tags"></i>
                    <input
                        id="tags-input"
                        type="text"
                        value={tags.join(', ')}
                        onChange={handleTagChange}
                        placeholder="添加标签，用逗号分隔"
                    />
                </div>
            </div>
        </div>
    );
};

export default MetadataEditor;