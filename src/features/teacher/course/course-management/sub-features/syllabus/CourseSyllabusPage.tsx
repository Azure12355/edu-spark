// src/app/teacher/(dashboard)/courses/[id]/syllabus/KnowledgeDetailPage.tsx
"use client";
import React, { useState, useMemo } from 'react';
import styles from './CourseSyllabus.module.css';
import SyllabusHeader from '@/features/teacher/course/course-management/sub-features/syllabus/components/SyllabusHeader/SyllabusHeader';
import SyllabusTree from '@/features/teacher/course/course-management/sub-features/syllabus/components/SyllabusTree/SyllabusTree';
import {useSyllabusStore} from "@/features/teacher/course/course-management/sub-features/syllabus/store/syllabusStore";

export default function CourseSyllabusPage() {

    const { syllabus } = useSyllabusStore();

    const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set(['ch-1', 'sec-1-1']));

    const toggleItem = (id: string) => {
        setExpandedItems(prev => {
            const newSet = new Set(prev);
            if (newSet.has(id)) {
                newSet.delete(id);
            } else {
                newSet.add(id);
            }
            return newSet;
        });
    };

    const allIds = useMemo(() => {
        const ids: string[] = [];
        syllabus.forEach(chapter => {
            ids.push(chapter.id);
            chapter.sections.forEach(section => {
                ids.push(section.id);
            });
        });
        return ids;
    }, [syllabus]);

    const expandAll = () => setExpandedItems(new Set(allIds));
    const collapseAll = () => setExpandedItems(new Set());

    return (
        <div className={styles.pageContainer}>
            <SyllabusHeader onExpandAll={expandAll} onCollapseAll={collapseAll} />
            <div className={styles.contentArea}>
                <SyllabusTree
                    chapters={syllabus}
                    expandedItems={expandedItems}
                    toggleItem={toggleItem}
                />
            </div>
        </div>
    );
}