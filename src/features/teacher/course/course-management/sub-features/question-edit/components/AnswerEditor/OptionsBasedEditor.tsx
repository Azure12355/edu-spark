// [!file src/features/teacher/course/course-management/sub-features/question-edit/components/AnswerEditor/OptionsBasedEditor.tsx]
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './AnswerEditor.module.css';
import { EditableQuestion } from '../../types';
import Tooltip from "@/shared/components/ui/Tooltip/Tooltip";

interface OptionsBasedEditorProps {
    question: EditableQuestion;
    onUpdate: (field: keyof EditableQuestion, value: any) => void;
}

const itemVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, x: -30, transition: { duration: 0.2 } },
};

export const OptionsBasedEditor: React.FC<OptionsBasedEditorProps> = ({ question, onUpdate }) => {
    const isSingleChoice = question.type === 'SINGLE_CHOICE';
    const currentAnswers = new Set(question.answers);

    const handleOptionTextChange = (index: number, newText: string) => {
        const oldText = question.options[index];
        const newOptions = [...question.options];
        newOptions[index] = newText;
        onUpdate('options', newOptions);

        if (currentAnswers.has(oldText)) {
            const newAnswers = question.answers.map(ans => ans === oldText ? newText : ans);
            onUpdate('answers', newAnswers);
        }
    };

    const handleAnswerSelect = (optionText: string) => {
        if (isSingleChoice) {
            onUpdate('answers', [optionText]);
        } else {
            const newAnswers = new Set(currentAnswers);
            if (newAnswers.has(optionText)) {
                newAnswers.delete(optionText);
            } else {
                newAnswers.add(optionText);
            }
            onUpdate('answers', Array.from(newAnswers));
        }
    };

    const handleAddOption = () => {
        onUpdate('options', [...question.options, `新选项 ${question.options.length + 1}`]);
    };

    const handleRemoveOption = (indexToRemove: number) => {
        const optionToRemove = question.options[indexToRemove];
        onUpdate('options', question.options.filter((_, i) => i !== indexToRemove));
        onUpdate('answers', question.answers.filter(ans => ans !== optionToRemove));
    };

    return (
        <div className={styles.optionsContainer}>
            <AnimatePresence>
                {question.options.map((opt, index) => (
                    <motion.div key={index} className={styles.optionRow} variants={itemVariants} layout>
                        <Tooltip content={isSingleChoice ? '设为正确答案' : '切换正确答案'} position="top">
                            <input
                                type={isSingleChoice ? 'radio' : 'checkbox'}
                                name="choice-answer"
                                checked={currentAnswers.has(opt)}
                                onChange={() => handleAnswerSelect(opt)}
                                className={isSingleChoice ? styles.optionRadio : styles.optionCheckbox}
                            />
                        </Tooltip>
                        <textarea
                            value={opt}
                            onChange={(e) => handleOptionTextChange(index, e.target.value)}
                            className={styles.optionTextarea}
                            placeholder={`选项 ${String.fromCharCode(65 + index)} 内容`}
                            rows={1}
                        />
                        <Tooltip content="删除此选项" position="top">
                            <button
                                onClick={() => handleRemoveOption(index)}
                                className={styles.deleteOptionBtn}
                                disabled={question.options.length <= 2}
                            >
                                <i className="fas fa-times-circle"></i>
                            </button>
                        </Tooltip>
                    </motion.div>
                ))}
            </AnimatePresence>
            <button onClick={handleAddOption} className={styles.addOptionBtn}>
                <i className="fas fa-plus-circle"></i> 添加选项
            </button>
        </div>
    );
};