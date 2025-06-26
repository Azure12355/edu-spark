// src/components/teacher/course-management/question-edit/QuestionConfigPanel.tsx
import React from 'react';
import { Question, QuestionDifficulty, QuestionType } from '@/lib/data/questionBankData';
import styles from './QuestionConfigPanel.module.css';

const questionTypes: QuestionType[] = ['单选题', '多选题', '判断题', '填空题', '简答题', '编程题'];
const difficulties: QuestionDifficulty[] = ['简单', '中等', '困难'];

interface Props {
    question: Question;
    onUpdate: (field: keyof Question, value: any) => void;
    onEditPoints: () => void;
}

const QuestionConfigPanel: React.FC<Props> = ({ question, onUpdate, onEditPoints }) => {
    return (
        <aside className={styles.panel}>
            <div className={styles.card}>
                <h3 className={styles.cardTitle}>题目配置</h3>
                <div className={styles.configGroup}>
                    <label className={styles.label}>题目类型</label>
                    <div className={styles.segmentedControl}>
                        {questionTypes.map(type => (
                            <button key={type} onClick={() => onUpdate('type', type)} className={question.type === type ? styles.active : ''}>{type}</button>
                        ))}
                    </div>
                </div>
                <div className={styles.configGroup} style={{marginTop: '16px'}}>
                    <label className={styles.label}>难度</label>
                    <div className={styles.segmentedControl}>
                        {difficulties.map(d => (
                            <button key={d} onClick={() => onUpdate('difficulty', d)} className={question.difficulty === d ? styles.active : ''}>{d}</button>
                        ))}
                    </div>
                </div>
            </div>
            <div className={styles.card}>
                <h3 className={styles.cardTitle}>知识点关联</h3>
                <div className={styles.pointList}>
                    {question.pointIds.map(id => (
                        <span key={id} className={styles.pointTag}>{id}</span>
                    ))}
                </div>
                <button onClick={onEditPoints} className={`teacher-button-secondary ${styles.editPointsButton}`}>编辑关联</button>
            </div>
        </aside>
    );
};
export default QuestionConfigPanel;