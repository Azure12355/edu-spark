// src/app/teacher/(dashboard)/courses/[id]/syllabus/page.tsx
"use client";
import React, { useState, useMemo } from 'react';
import styles from './syllabus.module.css';
import SyllabusHeader from '@/components/teacher/course-management/syllabus/SyllabusHeader/SyllabusHeader';
import SyllabusTree from '@/components/teacher/course-management/syllabus/SyllabusTree/SyllabusTree';
import { syllabusData, SyllabusChapter, SyllabusSection } from '@/lib/data/syllabusData';

export default function SyllabusPage() {
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
        syllabusData.forEach(chapter => {
            ids.push(chapter.id);
            chapter.sections.forEach(section => {
                ids.push(section.id);
            });
        });
        return ids;
    }, []);

    const expandAll = () => setExpandedItems(new Set(allIds));
    const collapseAll = () => setExpandedItems(new Set());

    return (
        <div className={styles.pageContainer}>
            <SyllabusHeader onExpandAll={expandAll} onCollapseAll={collapseAll} />
            <div className={styles.contentArea}>
                <SyllabusTree
                    chapters={syllabusData}
                    expandedItems={expandedItems}
                    toggleItem={toggleItem}
                />
            </div>
        </div>
    );
}