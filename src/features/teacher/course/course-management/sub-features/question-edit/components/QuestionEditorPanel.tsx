// src/components/teacher/course-management/question-edit/QuestionEditorPanel.tsx
"use client";
import React from 'react';
import { Question } from '@/shared/types/question';
import styles from './QuestionEditorPanel.module.css';
import StemEditor from './StemEditor';
import AnswerEditor from './AnswerEditor';
import AnalysesEditor from './AnalysesEditor'; // 核心修改：使用重命名后的组件

interface Props {
    question: Question;
    onUpdate: (field: keyof Question, value: any) => void;
}

const QuestionEditorPanel: React.FC<Props> = ({ question, onUpdate }) => {
    return (
        <main className={styles.panel}>
            <StemEditor value={question.stem} onChange={v => onUpdate('stem', v)} />
            <AnswerEditor question={question} onUpdate={onUpdate} />
            {/* 核心修改：传入 `analyses` 数组并更新它 */}
            <AnalysesEditor values={question.analyses} onChange={v => onUpdate('analyses', v)} />
        </main>
    );
};

export default QuestionEditorPanel;