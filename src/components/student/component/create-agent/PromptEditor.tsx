"use client";
import React, { useState } from 'react';
import styles from './PromptEditor.module.css';

const DEFAULT_PROMPT = `你是一名专业的《数据结构与算法》课程助教。
你的任务是基于学生的问题，结合提供的知识库材料，进行清晰、准确、耐心的解答。

# 知识库
请记住以下材料，它们可能对回答问题有帮助。
\${documents}

# 样例
\${samples}`;

const PromptEditor: React.FC = () => {
    const [prompt, setPrompt] = useState(DEFAULT_PROMPT);
    const MAX_CHARS = 129024;

    return (
        <div className={styles.editorContainer}>
            <div className={styles.header}>
                <h4>提示词</h4>
                <div className={styles.actions}>
                    <button><i className="far fa-copy"></i> 模板</button>
                    <button><i className="fas fa-magic"></i> 优化</button>
                </div>
            </div>
            <div className={styles.variableInfo}>
                可引入1项变量 (可通过点击添加): <span className={styles.variableTag}>${'{documents}'}</span>
            </div>
            <div className={styles.textareaWrapper}>
                <textarea
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    maxLength={MAX_CHARS}
                />
                <div className={styles.charCount}>
                    {prompt.length} / {MAX_CHARS}
                </div>
            </div>
        </div>
    );
};

export default PromptEditor;