// src/app/teacher/(dashboard)/courses/[id]/questions/page.tsx
"use client";
import React, { useState, useMemo, useEffect } from 'react';
import styles from './questions.module.css';
import SyllabusNavigator from '@/components/teacher/course-management/questions/SyllabusNavigator';
import QuestionBankHeader from '@/components/teacher/course-management/questions/QuestionBankHeader';
import QuestionTableToolbar from '@/components/teacher/course-management/questions/QuestionTableToolbar';
import QuestionTable from '@/components/teacher/course-management/questions/QuestionTable';
import { useQuestionBankStore } from '@/store/questionBankStore';
import { useSyllabusStore } from '@/store/syllabusStore';
import { QuestionType } from '@/lib/data/questionBankData';

export default function QuestionBankPage() {
    const { getQuestionsByPointId } = useQuestionBankStore();
    const { syllabus } = useSyllabusStore();

    // 默认选中第一个知识点
    const defaultPointId = syllabus[0]?.sections[0]?.points[0]?.id || null;
    const [selectedPointId, setSelectedPointId] = useState<string | null>(defaultPointId);
    const [activeFilter, setActiveFilter] = useState<'全部' | QuestionType>('全部');

    const selectedPoint = useMemo(() => {
        if (!selectedPointId) return null;
        for (const chapter of syllabus) {
            for (const section of chapter.sections) {
                const point = section.points.find(p => p.id === selectedPointId);
                if (point) return point;
            }
        }
        return null;
    }, [selectedPointId, syllabus]);

    const displayedQuestions = useMemo(() => {
        if (!selectedPointId) return [];
        const allQuestions = getQuestionsByPointId(selectedPointId);
        if (activeFilter === '全部') {
            return allQuestions;
        }
        return allQuestions.filter(q => q.type === activeFilter);
    }, [selectedPointId, activeFilter, getQuestionsByPointId]);

    // 如果 syllabus 加载后，默认的 pointId 还是 null，则重新设置
    useEffect(() => {
        if (!selectedPointId && syllabus.length > 0) {
            setSelectedPointId(syllabus[0]?.sections[0]?.points[0]?.id);
        }
    }, [syllabus, selectedPointId]);

    return (
        <div className={styles.pageContainer}>
            <div className={styles.leftPanel}>
                <SyllabusNavigator
                    selectedPointId={selectedPointId}
                    onSelectPoint={setSelectedPointId}
                />
            </div>
            <div className={styles.rightPanel}>
                <QuestionBankHeader pointTitle={selectedPoint?.title || '未选择'} />

                {/* --- 核心修改：将 Toolbar 和 Table 包裹在一个新的 div 中 --- */}
                <div className={styles.tableArea}>
                    <QuestionTableToolbar onFilterChange={setActiveFilter} />
                    <QuestionTable questions={displayedQuestions} />
                </div>
                {/* --- 结束修改 --- */}
            </div>
        </div>
    );
}