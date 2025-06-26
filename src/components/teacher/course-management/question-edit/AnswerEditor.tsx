// src/components/teacher/course-management/question-edit/AnswerEditor.tsx
"use client";
import React, { useMemo } from 'react';
import { Question } from '@/lib/data/questionBankData';
import styles from './AnswerEditor.module.css';
import { Editor } from '@bytemd/react';
import gfm from '@bytemd/plugin-gfm';
import highlight from '@bytemd/plugin-highlight';
import 'bytemd/dist/index.css';

interface Props {
    question: Question;
    onUpdate: (field: keyof Question, value: any) => void;
}

const AnswerEditor: React.FC<Props> = ({ question, onUpdate }) => {
    const bytemdPlugins = useMemo(() => [gfm(), highlight()], []);

    // --- Event Handlers ---
    const handleOptionChange = (index: number, value: string) => {
        const newOptions = [...(question.options || [])];
        newOptions[index] = value;
        onUpdate('options', newOptions);
    };

    const handleAddOption = () => {
        const newOptions = [...(question.options || []), `新选项 ${(question.options?.length || 0) + 1}`];
        onUpdate('options', newOptions);
    };

    const handleRemoveOption = (index: number) => {
        const newOptions = (question.options || []).filter((_, i) => i !== index);
        onUpdate('options', newOptions);
    };

    const handleAnswerChange = (value: any) => {
        onUpdate('answer', value);
    };

    // --- UI Renderer Switcher ---
    const renderAnswerUI = () => {
        switch (question.type) {
            case '单选题': {
                return (
                    <div className={styles.optionsContainer}>
                        {question.options?.map((opt, index) => (
                            <div key={index} className={styles.optionRow}>
                                <input
                                    type="radio"
                                    className={styles.optionRadio}
                                    name="single-choice-answer"
                                    checked={question.answer === opt}
                                    onChange={() => handleAnswerChange(opt)}
                                />
                                <textarea
                                    value={opt}
                                    onChange={e => handleOptionChange(index, e.target.value)}
                                    className={styles.optionTextarea}
                                    rows={1}
                                    placeholder={`输入选项 ${index + 1} 内容，支持 Markdown`}
                                />
                                <button onClick={() => handleRemoveOption(index)} className={styles.deleteOptionBtn} title="删除此选项"><i className="fas fa-trash"></i></button>
                            </div>
                        ))}
                        <button onClick={handleAddOption} className={styles.addOptionBtn}>
                            <i className="fas fa-plus"></i> 添加选项
                        </button>
                    </div>
                );
            }
            case '多选题': {
                const currentAnswers = Array.isArray(question.answer) ? new Set(question.answer) : new Set<string>();
                return (
                    <div className={styles.optionsContainer}>
                        {question.options?.map((opt, index) => (
                            <div key={index} className={styles.optionRow}>
                                <input
                                    type="checkbox"
                                    className={styles.optionCheckbox}
                                    checked={currentAnswers.has(opt)}
                                    onChange={() => {
                                        const newAnswers = new Set(currentAnswers);
                                        if(newAnswers.has(opt)) newAnswers.delete(opt);
                                        else newAnswers.add(opt);
                                        handleAnswerChange(Array.from(newAnswers));
                                    }}
                                />
                                <textarea
                                    value={opt}
                                    onChange={e => handleOptionChange(index, e.target.value)}
                                    className={styles.optionTextarea}
                                    rows={1}
                                    placeholder={`输入选项 ${index + 1} 内容，支持 Markdown`}
                                />
                                <button onClick={() => handleRemoveOption(index)} className={styles.deleteOptionBtn} title="删除此选项"><i className="fas fa-trash"></i></button>
                            </div>
                        ))}
                        <button onClick={handleAddOption} className={styles.addOptionBtn}>
                            <i className="fas fa-plus"></i> 添加选项
                        </button>
                    </div>
                );
            }
            case '判断题': {
                return (
                    <div className={styles.trueFalseContainer}>
                        <label className={styles.trueFalseLabel}>
                            <input type="radio" name="tf-answer" checked={question.answer === true} onChange={() => handleAnswerChange(true)} /> 正确
                        </label>
                        <label className={styles.trueFalseLabel}>
                            <input type="radio" name="tf-answer" checked={question.answer === false} onChange={() => handleAnswerChange(false)} /> 错误
                        </label>
                    </div>
                );
            }
            case '简答题':
            case '填空题':
            case '编程题': {
                return (
                    <div className={styles.editorWrapper}>
                        <Editor
                            value={question.answer as string}
                            plugins={bytemdPlugins}
                            onChange={(v) => handleAnswerChange(v)}
                            placeholder="输入参考答案，支持 Markdown 格式..."
                        />
                    </div>
                );
            }
            default:
                return <p>暂不支持的题目类型</p>;
        }
    }

    return (
        <div className={styles.card}>
            <h3 className={styles.cardTitle}>正确答案设置</h3>
            {renderAnswerUI()}
        </div>
    );
};

export default AnswerEditor;