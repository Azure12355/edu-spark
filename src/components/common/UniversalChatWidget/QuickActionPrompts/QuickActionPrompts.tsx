// src/components/student/component/assistant/QuickActionPrompts.tsx
import React from 'react';
import styles from './QuickActionPrompts.module.css';

const prompts = ["生成一份Java学习大纲", "解释一下什么是递归", "给我出几道高数题"];

interface QuickActionPromptsProps {
    onPromptClick: (prompt: string) => void;
}

const QuickActionPrompts: React.FC<QuickActionPromptsProps> = ({ onPromptClick }) => {
    return (
        <section className={styles.quickActions}>
            {prompts.map(q => (
                <button key={q} onClick={() => onPromptClick(q)} className={styles.quickQuestionBtn}>
                    {q} <i className="fas fa-arrow-right"></i>
                </button>
            ))}
        </section>
    );
};

export default QuickActionPrompts;