// src/components/teacher/pages/QuestionBank/ExamManagementWrapper.tsx
"use client";
import React, { useState } from 'react';
import { App } from 'antd';
import { ExamListPanel } from './ExamListPanel';
import { ExamSettingsPanel } from './ExamSettingsPanel';
import { ExamList, mockExamLists } from '@/lib/exam-list-data';

const ExamManagementWrapper: React.FC = () => {
    const [view, setView] = useState<'list' | 'settings'>('list');
    const [currentExam, setCurrentExam] = useState<ExamList | null>(null);
    const [allExamLists, setAllExamLists] = useState<ExamList[]>(mockExamLists);

    const handleEdit = (examList: ExamList | null) => {
        setCurrentExam(examList);
        setView('settings');
    };

    const handleBack = () => {
        setView('list');
        setCurrentExam(null);
    };

    const handleSave = (savedExam: ExamList) => {
        setAllExamLists(prevLists => {
            const exists = prevLists.some(list => list.id === savedExam.id);
            if (exists) {
                return prevLists.map(list => list.id === savedExam.id ? savedExam : list);
            }
            return [...prevLists, savedExam];
        });
    };

    return (
        <App>
           {view === 'list' && <ExamListPanel onEdit={handleEdit} />}
           {view === 'settings' && <ExamSettingsPanel initialData={currentExam} onSave={handleSave} onBack={handleBack} />}
        </App>
    );
};

export default ExamManagementWrapper;