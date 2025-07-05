// [!file src/features/teacher/course/course-management/sub-features/question-edit/components/QuestionConfigPanel/QuestionConfigPanel.tsx]
"use client";

import React from 'react';
import { motion } from 'framer-motion';
import styles from './QuestionConfigPanel.module.css';
import Tooltip from "@/shared/components/ui/Tooltip/Tooltip";
import {QuestionDifficultyEnum, QuestionTypeEnum} from "@/features/teacher/course/course-management/sub-features/question-bank/types";
import {EditableQuestion} from "@/features/teacher/course/course-management/sub-features/question-edit/types";

// 1. 定义 Props 接口
interface QuestionConfigPanelProps {
    question: EditableQuestion;
    // onUpdate 回调现在更具体
    onUpdate: <K extends keyof EditableQuestion>(field: K, value: EditableQuestion[K]) => void;
    onEditPoints: () => void; // 打开知识点选择模态框的回调
}

// 2. 抽离出可复用的配置组子组件
const ConfigGroup: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
    <div className={styles.configGroup}>
        <h4 className={styles.label}>{title}</h4>
        {children}
    </div>
);

// 3. 定义常量，避免在组件内部重复创建数组
const QUESTION_TYPES = Object.values(QuestionTypeEnum);
const DIFFICULTIES = Object.values(QuestionDifficultyEnum);


const QuestionConfigPanel: React.FC<QuestionConfigPanelProps> = ({ question, onUpdate, onEditPoints }) => {
    return (
        <aside className={styles.panel}>
            <div className={styles.card}>
                <h3 className={styles.cardTitle}>题目配置</h3>

                <ConfigGroup title="题目类型">
                    <div className={styles.segmentedControl}>
                        {QUESTION_TYPES.map(type => (
                            <button
                                key={type}
                                onClick={() => onUpdate('type', type)}
                                className={question.type === type ? styles.active : ''}
                            >
                                {type}
                            </button>
                        ))}
                    </div>
                </ConfigGroup>

                <ConfigGroup title="题目难度">
                    <div className={styles.segmentedControl}>
                        {DIFFICULTIES.map(d => (
                            <button
                                key={d}
                                onClick={() => onUpdate('difficulty', d)}
                                className={question.difficulty === d ? styles.active : ''}
                            >
                                {d}
                            </button>
                        ))}
                    </div>
                </ConfigGroup>
            </div>

            <div className={styles.card}>
                <h3 className={styles.cardTitle}>知识点关联</h3>
                <div className={styles.pointList}>
                    {question.knowledgePoints.length > 0 ? (
                        question.knowledgePoints.map(point => (
                            <motion.span
                                key={point.knowledgePointId}
                                className={styles.pointTag}
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                layout
                            >
                                {point.knowledgePointTitle}
                            </motion.span>
                        ))
                    ) : (
                        <p className={styles.noPointsText}>暂未关联知识点</p>
                    )}
                </div>
                <button onClick={onEditPoints} className={styles.editPointsButton}>
                    <i className="fas fa-edit"></i> 编辑关联知识点
                </button>
            </div>
        </aside>
    );
};
export default QuestionConfigPanel;