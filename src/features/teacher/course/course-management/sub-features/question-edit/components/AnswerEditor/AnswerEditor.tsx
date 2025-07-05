// [!file src/features/teacher/course/course-management/sub-features/question-edit/components/AnswerEditor/AnswerEditor.tsx]
"use client";

import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { EditableQuestion, QuestionTypeEnum } from '../../types';
import styles from './AnswerEditor.module.css';

// 导入所有子组件
import { OptionsBasedEditor } from './OptionsBasedEditor';
import { TrueFalseEditor } from './TrueFalseEditor';
import { MarkdownBasedEditor } from './MarkdownBasedEditor';

interface AnswerEditorProps {
    question: EditableQuestion;
    onUpdate: (field: keyof EditableQuestion, value: any) => void;
}

const AnswerEditor: React.FC<AnswerEditorProps> = ({ question, onUpdate }) => {

    const renderAnswerUI = () => {
        switch (question.type) {
            case QuestionTypeEnum.SINGLE_CHOICE:
            case QuestionTypeEnum.MULTIPLE_CHOICE:
                return <OptionsBasedEditor question={question} onUpdate={onUpdate} />;

            case QuestionTypeEnum.TRUE_FALSE:
                return <TrueFalseEditor question={question} onUpdate={onUpdate} />;

            case QuestionTypeEnum.SHORT_ANSWER:
            case QuestionTypeEnum.FILL_IN_THE_BLANK:
            case QuestionTypeEnum.PROGRAMMING:
                return (
                    <MarkdownBasedEditor
                        answer={question.answers[0] || ''}
                        onAnswerChange={(newAnswer) => onUpdate('answers', [newAnswer])}
                    />
                );

            default:
                return <p>暂不支持的题目类型，请在配置中切换。</p>;
        }
    };

    const editorVariants = {
        initial: { opacity: 0, y: 10 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -10 },
    };

    return (
        <div className={styles.card}>
            <h3 className={styles.cardTitle}>选项与答案设置</h3>
            <AnimatePresence mode="wait">
                <motion.div
                    key={question.type} // 当题型变化时，触发动画
                    variants={editorVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    transition={{ duration: 0.3 }}
                >
                    {renderAnswerUI()}
                </motion.div>
            </AnimatePresence>
        </div>
    );
};

export default AnswerEditor;