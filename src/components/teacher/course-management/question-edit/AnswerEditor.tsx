// src/components/teacher/course-management/question-edit/AnswerEditor.tsx
"use client";
import React, { useMemo, useEffect } from 'react';
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

    // --- 核心修复：使用 useEffect 监听题型变化，并重置答案格式 ---
    useEffect(() => {
        switch (question.type) {
            case '单选题':
                // 如果答案是数组或布尔值，则重置
                if (Array.isArray(question.answer) || typeof question.answer === 'boolean') {
                    onUpdate('answer', question.options?.[0] || ''); // 默认选中第一个或为空
                }
                break;
            case '多选题':
                // 如果答案不是数组，则重置为空数组
                if (!Array.isArray(question.answer)) {
                    onUpdate('answer', []);
                }
                break;
            case '判断题':
                // 如果答案不是布尔值，则重置为 true
                if (typeof question.answer !== 'boolean') {
                    onUpdate('answer', true);
                }
                break;
            case '简答题':
            case '填空题':
            case '编程题':
                // 如果答案不是字符串，则重置为空字符串
                if (typeof question.answer !== 'string') {
                    onUpdate('answer', '');
                }
                break;
            default:
                break;
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [question.type]); // 仅在 question.type 变化时触发


    // --- Event Handlers (保持不变) ---
    const handleOptionChange = (index: number, value: string) => {
        const oldOptionValue = (question.options || [])[index];
        const newOptions = [...(question.options || [])];
        newOptions[index] = value;
        onUpdate('options', newOptions);

        // 如果被修改的选项是答案，同步更新答案
        if (question.type === '单选题' && question.answer === oldOptionValue) {
            onUpdate('answer', value);
        }
        if (question.type === '多选题' && Array.isArray(question.answer) && question.answer.includes(oldOptionValue)) {
            const newAnswer = question.answer.map(ans => ans === oldOptionValue ? value : ans);
            onUpdate('answer', newAnswer);
        }
    };

    const handleAddOption = () => {
        const newOptions = [...(question.options || []), `新选项 ${(question.options?.length || 0) + 1}`];
        onUpdate('options', newOptions);
    };

    const handleRemoveOption = (index: number) => {
        const optionToRemove = (question.options || [])[index];
        const newOptions = (question.options || []).filter((_, i) => i !== index);
        onUpdate('options', newOptions);

        // 如果被删除的选项是答案，同步更新答案
        if (question.type === '单选题' && question.answer === optionToRemove) {
            onUpdate('answer', ''); // 清空答案或设为默认
        }
        if (question.type === '多选题' && Array.isArray(question.answer) && question.answer.includes(optionToRemove)) {
            const newAnswer = question.answer.filter(ans => ans !== optionToRemove);
            onUpdate('answer', newAnswer);
        }
    };

    const handleAnswerChange = (value: any) => {
        onUpdate('answer', value);
    };


    // --- UI Renderer Switcher (保持不变) ---
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
                            // 关键修复：确保传递给 Editor 的是字符串
                            value={String(question.answer || '')}
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