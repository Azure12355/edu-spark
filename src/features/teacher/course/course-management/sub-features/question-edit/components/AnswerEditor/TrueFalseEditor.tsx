// [!file src/features/teacher/course/course-management/sub-features/question-edit/components/AnswerEditor/TrueFalseEditor.tsx]
import React from 'react';
import styles from './AnswerEditor.module.css';
import {QuestionVO} from "@/shared/types";

interface TrueFalseEditorProps {
    question: QuestionVO;
    onUpdate: (field: keyof QuestionVO, value: any) => void;
}

export const TrueFalseEditor: React.FC<TrueFalseEditorProps> = ({ question, onUpdate }) => {
    return (
        <div className={styles.trueFalseContainer}>
            <label className={`${styles.trueFalseLabel} ${question.answers[0] === 'true' ? styles.active : ''}`}>
                <input
                    type="radio"
                    name="tf-answer"
                    checked={question.answers[0] === 'true'}
                    onChange={() => onUpdate('answers', ['true'])}
                />
                <i className="fas fa-check"></i> 正确
            </label>
            <label className={`${styles.trueFalseLabel} ${question.answers[0] === 'false' ? styles.active : ''}`}>
                <input
                    type="radio"
                    name="tf-answer"
                    checked={question.answers[0] === 'false'}
                    onChange={() => onUpdate('answers', ['false'])}
                />
                <i className="fas fa-times"></i> 错误
            </label>
        </div>
    );
};