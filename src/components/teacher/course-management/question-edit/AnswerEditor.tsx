// src/components/teacher/course-management/question-edit/AnswerEditor.tsx
"use client";
import React, { useMemo, useEffect } from 'react';
import { Question } from '@/types/question'; // 导入新类型
import { QuestionType } from '@/constants/enums'; // 导入新枚举
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

    useEffect(() => {
        // 当题型变化时，重置答案为符合新格式的默认值
        switch (question.type) {
            case QuestionType.SINGLE_CHOICE:
                // 单选题答案数组只有一个元素
                onUpdate('answers', [question.options?.[0] || '']);
                break;
            case QuestionType.MULTIPLE_CHOICE:
                // 多选题答案数组可以为空
                onUpdate('answers', []);
                break;
            case QuestionType.TRUE_FALSE:
                // 判断题答案默认为 'true'
                onUpdate('answers', ['true']);
                break;
            case QuestionType.FILL_IN_THE_BLANK:
            case QuestionType.SHORT_ANSWER:
            case QuestionType.PROGRAMMING:
                // 其他题型答案数组默认为一个空字符串
                onUpdate('answers', ['']);
                break;
            default:
                break;
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [question.type]);

    const handleOptionChange = (index: number, value: string) => {
        const oldOptionValue = (question.options || [])[index];
        const newOptions = [...(question.options || [])];
        newOptions[index] = value;
        onUpdate('options', newOptions);

        if (question.answers.includes(oldOptionValue)) {
            const newAnswers = question.answers.map(ans => ans === oldOptionValue ? value : ans);
            onUpdate('answers', newAnswers);
        }
    };

    const handleAddOption = () => {
        const newOptions = [...(question.options || []), `新选项 ${(question.options?.length || 0) + 1}`];
        onUpdate('options', newOptions);
    };

    const handleRemoveOption = (index: number) => {
        const optionToRemove = (question.options || [])[index];
        onUpdate('options', (question.options || []).filter((_, i) => i !== index));
        onUpdate('answers', question.answers.filter(ans => ans !== optionToRemove));
    };

    const handleAnswerChange = (value: string[]) => {
        onUpdate('answers', value);
    };

    const renderAnswerUI = () => {
        switch (question.type) {
            case QuestionType.SINGLE_CHOICE:
                return (
                    <div className={styles.optionsContainer}>
                        {question.options?.map((opt, index) => (
                            <div key={index} className={styles.optionRow}>
                                <input type="radio" className={styles.optionRadio} name="single-choice-answer" checked={question.answers[0] === opt} onChange={() => handleAnswerChange([opt])} />
                                <textarea value={opt} onChange={e => handleOptionChange(index, e.target.value)} className={styles.optionTextarea} rows={1} />
                                <button onClick={() => handleRemoveOption(index)} className={styles.deleteOptionBtn}><i className="fas fa-trash"></i></button>
                            </div>
                        ))}
                        <button onClick={handleAddOption} className={styles.addOptionBtn}><i className="fas fa-plus"></i> 添加选项</button>
                    </div>
                );

            case QuestionType.MULTIPLE_CHOICE: {
                const currentAnswers = new Set(question.answers);
                return (
                    <div className={styles.optionsContainer}>
                        {question.options?.map((opt, index) => (
                            <div key={index} className={styles.optionRow}>
                                <input type="checkbox" className={styles.optionCheckbox} checked={currentAnswers.has(opt)} onChange={() => {
                                    const newAnswers = new Set(currentAnswers);
                                    if(newAnswers.has(opt)) newAnswers.delete(opt);
                                    else newAnswers.add(opt);
                                    handleAnswerChange(Array.from(newAnswers));
                                }} />
                                <textarea value={opt} onChange={e => handleOptionChange(index, e.target.value)} className={styles.optionTextarea} rows={1} />
                                <button onClick={() => handleRemoveOption(index)} className={styles.deleteOptionBtn}><i className="fas fa-trash"></i></button>
                            </div>
                        ))}
                        <button onClick={handleAddOption} className={styles.addOptionBtn}><i className="fas fa-plus"></i> 添加选项</button>
                    </div>
                );
            }

            case QuestionType.TRUE_FALSE:
                return (
                    <div className={styles.trueFalseContainer}>
                        <label className={styles.trueFalseLabel}><input type="radio" name="tf-answer" checked={question.answers[0] === 'true'} onChange={() => handleAnswerChange(['true'])} /> 正确</label>
                        <label className={styles.trueFalseLabel}><input type="radio" name="tf-answer" checked={question.answers[0] === 'false'} onChange={() => handleAnswerChange(['false'])} /> 错误</label>
                    </div>
                );

            case QuestionType.SHORT_ANSWER:
            case QuestionType.FILL_IN_THE_BLANK:
            case QuestionType.PROGRAMMING:
                return (
                    <div className={styles.editorWrapper}>
                        <Editor value={question.answers[0] || ''} plugins={bytemdPlugins} onChange={(v) => handleAnswerChange([v])} placeholder="输入参考答案，支持 Markdown 格式..."/>
                    </div>
                );

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