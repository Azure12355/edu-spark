// [!file src/features/teacher/course/course-management/sub-features/question-edit/components/QuestionEditorPanel/QuestionEditorPanel.tsx]
"use client";

import React from 'react';
import {motion } from 'framer-motion';
import styles from './QuestionEditorPanel.module.css';
import StemEditor from "@/features/teacher/course/course-management/sub-features/question-edit/components/StemEditor/StemEditor";
import AnswerEditor
    from "@/features/teacher/course/course-management/sub-features/question-edit/components/AnswerEditor/AnswerEditor";
import AnalysesEditor
    from "@/features/teacher/course/course-management/sub-features/question-edit/components/AnalysesEditor/AnalysesEditor";
import {QuestionVO} from "@/shared/types";

// 1. 导入类型和所有子组件

interface QuestionEditorPanelProps {
    question: QuestionVO;
    onUpdate: (field: keyof QuestionVO, value: any) => void;
}

// 2. 定义动画变体，用于交错加载
const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1, // 子元素将以0.1秒的间隔依次入场
        },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 200, damping: 25 } },
};


const QuestionEditorPanel: React.FC<QuestionEditorPanelProps> = ({ question, onUpdate }) => {
    return (
        <motion.main
            className={styles.panel}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            {/* 3. 使用 motion.div 包裹每个子组件，并应用动画变体 */}
            <motion.div variants={itemVariants}>
                <StemEditor
                    value={question.stem}
                    onChange={v => onUpdate('stem', v)}
                />
            </motion.div>

            <motion.div variants={itemVariants}>
                <AnswerEditor
                    question={question}
                    onUpdate={onUpdate}
                />
            </motion.div>

            <motion.div variants={itemVariants}>
                <AnalysesEditor
                    values={question.analyses}
                    onChange={v => onUpdate('analyses', v)}
                />
            </motion.div>
        </motion.main>
    );
};

export default QuestionEditorPanel;