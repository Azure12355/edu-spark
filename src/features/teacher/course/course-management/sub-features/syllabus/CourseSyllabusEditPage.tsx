// src/app/teacher/(dashboard)/courses/[id]/syllabus/edit/KnowledgeDetailPage.tsx
"use client";
import React, { useState, useEffect } from 'react';
import { Reorder } from 'framer-motion';
import Link from 'next/link';
import { useRouter, useParams } from 'next/navigation';
import { SyllabusChapter } from '@/shared/lib/data/syllabusData';
import styles from './CourseSyllabusEdit.module.css';
import { useToast } from '@/shared/hooks/useToast';
import { useSyllabusStore } from '@/features/teacher/course/course-management/sub-features/syllabus/store/syllabusStore';

// 1. 导入所有新创建的组件
import EditableChapterNode from '@/features/teacher/course/course-management/sub-features/syllabus/components/EditableChapterNode/EditableChapterNode';

export default function CourseSyllabusEditPage() {
    const params = useParams();
    const router = useRouter();
    const courseId = params.id;
    const showToast = useToast();

    const { syllabus: globalSyllabus, setSyllabus: setGlobalSyllabus } = useSyllabusStore();
    const [localSyllabus, setLocalSyllabus] = useState<SyllabusChapter[]>([]);

    useEffect(() => {
        setLocalSyllabus(JSON.parse(JSON.stringify(globalSyllabus)));
    }, [globalSyllabus]);

    // --- 核心逻辑区 ---
    const updateLocalSyllabus = (updater: (draft: SyllabusChapter[]) => void) => {
        setLocalSyllabus(current => {
            const draft = JSON.parse(JSON.stringify(current));
            updater(draft);
            return draft;
        });
    };

    // 简化版的深层路径更新函数
    const handleUpdate = (path: (number|string)[], value: any) => {
        updateLocalSyllabus(draft => {
            let current: any = draft;
            // @ts-ignore
            const pathSegments = path.flatMap((p: any) => typeof p === 'string' ? p.split('.') : [p]);
            for (let i = 0; i < pathSegments.length - 1; i++) {
                current = current[pathSegments[i]];
            }
            current[pathSegments[pathSegments.length - 1]] = value;
        });
    };

    const handleAdd = (path: number[], type: 'chapter' | 'section' | 'point') => {
        const newItemId = `${type}-${Date.now()}`;
        updateLocalSyllabus(draft => {
            if (type === 'chapter') {
                draft.push({ id: newItemId, title: '新章节', description: '请填写描述', icon: 'fas fa-book', sections: [] });
            } else if (type === 'section') {
                draft[path[0]].sections.push({ id: newItemId, title: '新小节', points: [] });
            } else if (type === 'point') {
                draft[path[0]].sections[path[1]].points.push({ id: newItemId, title: '新知识点', type: '重点' });
            }
        });
        showToast({ message: "添加成功", type: 'info' });
    };

    const handleSaveSyllabus = () => {
        setGlobalSyllabus(localSyllabus);
        showToast({ message: "大纲已成功保存！", type: 'success' });
        router.push(`/teacher/courses/${courseId}/syllabus`);
    };

    if (!localSyllabus.length && globalSyllabus.length > 0) {
        return <div>正在加载大纲数据...</div>;
    }

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
                    <Link href={`/teacher/courses/${courseId}/syllabus`} className={`${styles.actionButton} ${styles.cancelButton}`}>取消</Link>
                    <button onClick={handleSaveSyllabus} className={`${styles.actionButton} ${styles.saveButton}`}>保存并返回</button>
                </div>
            </header>

            <div className={styles.editArea}>
                <p className={styles.editTip}>
                    <i className="fas fa-info-circle"></i>
                    双击文本可直接编辑，拖动<i className="fas fa-grip-vertical"></i>图标可调整顺序。
                </p>

                <Reorder.Group axis="y" values={localSyllabus} onReorder={setLocalSyllabus} className={styles.reorderGroup}>
                    {localSyllabus.map((chapter, chapIndex) => (
                        <Reorder.Item key={chapter.id} value={chapter}>
                            <EditableChapterNode
                                chapter={chapter}
                                onUpdate={(field, value) => handleUpdate([chapIndex, field], value)}
                                onDelete={() => setLocalSyllabus(localSyllabus.filter(c => c.id !== chapter.id))}
                                onAddSection={() => handleAdd([chapIndex], 'section')}
                                onAddPoint={(secIndex) => handleAdd([chapIndex, secIndex], 'point')}
                            />
                        </Reorder.Item>
                    ))}
                </Reorder.Group>

                <button className={styles.addChapterButton} onClick={() => handleAdd([], 'chapter')}>
                    <i className="fas fa-plus"></i> 添加新章节
                </button>
            </div>
        </div>
    );
}