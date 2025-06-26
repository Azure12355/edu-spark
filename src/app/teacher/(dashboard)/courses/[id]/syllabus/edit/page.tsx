// src/app/teacher/(dashboard)/courses/[id]/syllabus/edit/page.tsx
"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { syllabusData as initialSyllabusData, KnowledgePoint, SyllabusSection, SyllabusChapter } from '@/lib/data/syllabusData';
import styles from './edit.module.css';

// 可编辑输入框组件
const EditableInput: React.FC<{ value: string; onSave: (newValue: string) => void; }> = ({ value, onSave }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [text, setText] = useState(value);

    const handleSave = () => {
        onSave(text);
        setIsEditing(false);
    };

    if (isEditing) {
        return (
            <input
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                onBlur={handleSave}
                onKeyDown={(e) => e.key === 'Enter' && handleSave()}
                className={styles.editableInput}
                autoFocus
            />
        );
    }
    return <span onDoubleClick={() => setIsEditing(true)}>{value}</span>;
};


export default function SyllabusEditPage() {
    const params = useParams();
    const courseId = params.id;
    const [syllabus, setSyllabus] = useState(initialSyllabusData);
    const [draggedItem, setDraggedItem] = useState<any>(null);

    // --- 编辑逻辑 (此处为示例，真实应用中应调用API) ---
    const handleUpdate = (path: (string|number)[], newValue: any) => {
        // 这是一个简化的更新逻辑，真实应用中会更复杂
        console.log(`Updating path ${path.join('.')} with value:`, newValue);
        // 实际应使用 immer 或类似库来安全地更新嵌套状态
    };

    const handleDelete = (path: (string|number)[]) => {
        if (window.confirm("确定要删除吗？")) {
            console.log(`Deleting path ${path.join('.')}`);
        }
    };

    const handleAdd = (path: (string|number)[], type: 'chapter' | 'section' | 'point') => {
        console.log(`Adding new ${type} at path ${path.join('.')}`);
    };


    return (
        <div className={styles.pageContainer}>
            <header className={styles.pageHeader}>
                <div className={styles.headerLeft}>
                    <Link href={`/teacher/courses/${courseId}/syllabus`} className={styles.backButton}>
                        <i className="fas fa-arrow-left"></i>
                    </Link>
                    <h1>编辑课程大纲</h1>
                </div>
                <div className={styles.headerActions}>
                    <button className={`${styles.actionButton} ${styles.cancelButton}`}>取消</button>
                    <button className={`${styles.actionButton} ${styles.saveButton}`}>保存大纲</button>
                </div>
            </header>

            <div className={styles.editArea}>
                <p className={styles.editTip}>
                    <i className="fas fa-info-circle"></i>
                    双击文本可直接编辑，拖动<i className="fas fa-grip-vertical"></i>图标可调整顺序。
                </p>

                {syllabus.map((chapter, chapIndex) => (
                    <div key={chapter.id} className={styles.chapterContainer}>
                        <div className={styles.chapterHeader}>
                            <i className={`fas fa-grip-vertical ${styles.dragHandle}`}></i>
                            <EditableInput value={chapter.title} onSave={(v) => handleUpdate([chapIndex, 'title'], v)} />
                            <div className={styles.itemActions}>
                                <button onClick={() => handleAdd([chapIndex], 'section')}><i className="fas fa-plus-circle"></i> 添加小节</button>
                                <button onClick={() => handleDelete([chapIndex])} className={styles.deleteButton}><i className="fas fa-trash-alt"></i></button>
                            </div>
                        </div>

                        {chapter.sections.map((section, secIndex) => (
                            <div key={section.id} className={styles.sectionContainer}>
                                <div className={styles.sectionHeader}>
                                    <i className={`fas fa-grip-vertical ${styles.dragHandle}`}></i>
                                    <EditableInput value={section.title} onSave={(v) => handleUpdate([chapIndex, 'sections', secIndex, 'title'], v)} />
                                    <div className={styles.itemActions}>
                                        <button onClick={() => handleAdd([chapIndex, 'sections', secIndex], 'point')}><i className="fas fa-plus-circle"></i> 添加知识点</button>
                                        <button onClick={() => handleDelete([chapIndex, 'sections', secIndex])} className={styles.deleteButton}><i className="fas fa-trash-alt"></i></button>
                                    </div>
                                </div>

                                <div className={styles.pointList}>
                                    {section.points.map((point, ptIndex) => (
                                        <div key={point.id} className={styles.pointItem}>
                                            <i className={`fas fa-grip-vertical ${styles.dragHandle}`}></i>
                                            <EditableInput value={point.title} onSave={(v) => handleUpdate([chapIndex, 'sections', secIndex, 'points', ptIndex, 'title'], v)} />
                                            <div className={styles.itemActions}>
                                                <button onClick={() => handleDelete([chapIndex, 'sections', secIndex, 'points', ptIndex])} className={styles.deleteButton}><i className="fas fa-trash-alt"></i></button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                ))}
                <button className={styles.addChapterButton} onClick={() => handleAdd([], 'chapter')}>
                    <i className="fas fa-plus"></i> 添加新章节
                </button>
            </div>
        </div>
    );
}