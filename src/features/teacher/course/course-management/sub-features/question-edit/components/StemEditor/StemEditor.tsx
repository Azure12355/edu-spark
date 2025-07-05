// [!file src/features/teacher/course/course-management/sub-features/question-edit/components/StemEditor/StemEditor.tsx]
"use client";

import React, { useMemo } from 'react';
import styles from './StemEditor.module.css';

// 1. 封装所有 Bytemd 相关导入
import { Editor } from '@bytemd/react';
import 'bytemd/dist/index.css';
import gfm from '@bytemd/plugin-gfm';
import highlight from '@bytemd/plugin-highlight';
import math from '@bytemd/plugin-math';
import 'katex/dist/katex.css';
import zh_Hans from 'bytemd/locales/zh_Hans.json';

interface StemEditorProps {
    value: string;
    onChange: (newValue: string) => void;
}

const StemEditor: React.FC<StemEditorProps> = ({ value, onChange }) => {
    // 2. 使用 useMemo 缓存插件配置，优化性能
    const plugins = useMemo(() => [
        gfm(),
        highlight(),
        math({ katexOptions: { output: 'html' } })
    ], []);

    return (
        // 3. 使用卡片式布局包裹整个组件
        <div className={styles.card}>
            <h3 className={styles.cardTitle}>
                <i className="fas fa-align-left"></i>
                题干内容
            </h3>
            <div className={styles.editorWrapper} data-color-mode="light">
                <Editor
                    value={value}
                    plugins={plugins}
                    locale={zh_Hans}
                    onChange={onChange}
                    placeholder="在这里输入题目的题干信息，支持 Markdown 格式，例如插入代码块、数学公式等..."
                />
            </div>
        </div>
    );
};

export default StemEditor;