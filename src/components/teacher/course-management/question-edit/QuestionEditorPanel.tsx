// src/components/teacher/course-management/question-edit/QuestionEditorPanel.tsx
"use client";
import React from 'react';
import { Question } from '@/lib/data/questionBankData';
import styles from './QuestionEditorPanel.module.css';
import StemEditor from './StemEditor';
import AnswerEditor from './AnswerEditor';
import AnalysisEditor from './AnalysisEditor';

interface Props {
    question: Question;
    onUpdate: (field: keyof Question, value: any) => void;
}

const QuestionEditorPanel: React.FC<Props> = ({ question, onUpdate }) => {
    return (
        <main className={styles.panel}>
            <StemEditor value={question.stem} onChange={v => onUpdate('stem', v)} />
            <AnswerEditor question={question} onUpdate={onUpdate} />
            <AnalysisEditor value={question.analysis} onChange={v => onUpdate('analysis', v)} />
        </main>
    );
};

export default QuestionEditorPanel;