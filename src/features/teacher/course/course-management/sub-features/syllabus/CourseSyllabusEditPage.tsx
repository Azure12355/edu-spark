"use client";

import React from 'react';
import Link from 'next/link';
import { useRouter, useParams } from 'next/navigation';
import { Reorder } from 'framer-motion';
import styles from './CourseSyllabusEdit.module.css';

// 1. 导入新的 Hook 和组件
import { useSyllabusEdit } from './hooks/useSyllabusEdit';
import EditableChapterNode from './components/EditableChapterNode/EditableChapterNode';

// 页面加载和保存状态的组件
const LoadingState = () => <div className={styles.stateOverlay}><span>正在加载大纲...</span></div>;
const SavingState = () => <div className={styles.stateOverlay}><span><i className="fas fa-spinner fa-spin"></i> 正在保存...</span></div>;


export default function CourseSyllabusEditPage() {
    const params = useParams();
    const courseId = params.id as string;

    // 2. 调用 Hook，获取所有状态和逻辑处理函数
    const {
        localSyllabus,
        isLoading,
        isSaving,
        handleSyllabusReorder,
        handleNodeUpdate,
        handleNodeAdd,
        handleNodeDelete,
        handleSave,
    } = useSyllabusEdit();

    if (isLoading) {
        return <LoadingState />;
    }

    return (
        <div className={styles.pageContainer}>
            {isSaving && <SavingState />}
            <header className={styles.pageHeader}>
                <div className={styles.headerLeft}>
                    <Link href={`/teacher/courses/${courseId}/syllabus`} className={styles.backButton}>
                        <i className="fas fa-arrow-left"></i>
                    </Link>
                    <h1>编辑课程大纲</h1>
                </div>
                <div className={styles.headerActions}>
                    <Link href={`/teacher/courses/${courseId}/syllabus`} className={`${styles.actionButton} ${styles.cancelButton}`}>取消</Link>
                    <button onClick={handleSave} className={`${styles.actionButton} ${styles.saveButton}`} disabled={isSaving}>
                        {isSaving ? '保存中...' : '保存并返回'}
                    </button>
                </div>
            </header>

            <div className={styles.editArea}>
                <p className={styles.editTip}>
                    <i className="fas fa-info-circle"></i>
                    双击文本可直接编辑，拖动<i className="fas fa-grip-vertical"></i>图标可调整顺序。
                </p>

                {/* 3. 使用 Reorder.Group 包裹章节列表 */}
                <Reorder.Group axis="y" values={localSyllabus} onReorder={handleSyllabusReorder} className={styles.reorderGroup}>
                    {localSyllabus.map((chapter, chapIndex) => (
                        <Reorder.Item key={chapter.id} value={chapter} className={styles.reorderItem}>
                            <EditableChapterNode
                                chapter={chapter}
                                // 4. 将 Hook 提供的处理函数传递给子组件
                                onUpdate={(field, value) => handleNodeUpdate([chapIndex, field], value)}
                                onDelete={() => handleNodeDelete('chapter', [chapIndex])}
                                onAddSection={() => handleNodeAdd('section', [chapIndex])}

                                onSectionUpdate={(secIndex, field, value) => handleNodeUpdate([chapIndex, 'sections', secIndex, field], value)}
                                onSectionDelete={(secIndex) => handleNodeDelete('section', [chapIndex, secIndex])}

                                onAddPoint={(secIndex) => handleNodeAdd('point', [chapIndex, secIndex])}
                                onPointUpdate={(secIndex, ptIndex, field, value) => handleNodeUpdate([chapIndex, 'sections', secIndex, 'points', ptIndex, field], value)}
                                onPointDelete={(secIndex, ptIndex) => handleNodeDelete('point', [chapIndex, secIndex, ptIndex])}
                            />
                        </Reorder.Item>
                    ))}
                </Reorder.Group>

                <button className={styles.addChapterButton} onClick={() => handleNodeAdd('chapter')}>
                    <i className="fas fa-plus"></i> 添加新章节
                </button>
            </div>
        </div>
    );
}