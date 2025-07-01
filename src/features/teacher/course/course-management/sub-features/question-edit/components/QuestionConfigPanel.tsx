// src/components/teacher/course-management/question-edit/QuestionConfigPanel.tsx
import React from 'react';
import { Question } from '@/shared/types/question'; // 导入新类型
import { QuestionType, QuestionDifficulty } from '@/shared/constants/enums'; // 导入新枚举
import styles from './QuestionConfigPanel.module.css';

// 使用枚举值生成配置数组
const questionTypes: QuestionType[] = Object.values(QuestionType);
const difficulties: QuestionDifficulty[] = Object.values(QuestionDifficulty);

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
                    {question.points.map(point => (
                        <span key={point.id} className={styles.pointTag}>{point.title}</span>
                    ))}
                </div>
                <button onClick={onEditPoints} className={`teacher-button-secondary ${styles.editPointsButton}`}>编辑关联</button>
            </div>
        </aside>
    );
};
export default QuestionConfigPanel;