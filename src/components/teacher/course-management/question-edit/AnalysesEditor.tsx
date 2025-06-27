// src/components/teacher/course-management/question-edit/AnalysesEditor.tsx
"use client";
import React, { useMemo } from 'react';
import { Editor } from '@bytemd/react';
import gfm from '@bytemd/plugin-gfm';
import highlight from '@bytemd/plugin-highlight';
import styles from './AnalysesEditor.module.css'; // 重命名后的 CSS 文件
import 'bytemd/dist/index.css';

interface Props {
    // 核心修改：接收一个字符串数组
    values: string[];
    onChange: (newValues: string[]) => void;
}

const AnalysesEditor: React.FC<Props> = ({ values, onChange }) => {
    const plugins = useMemo(() => [gfm(), highlight()], []);

    // 核心修改：让编辑器编辑第一条解析，如果不存在则为空字符串
    const handleEditorChange = (newValue: string) => {
        // 更新时，只更新数组的第一个元素
        onChange([newValue]);
    };

    return (
        <div className={styles.card}>
            <h3 className={styles.cardTitle}>题目解析</h3>
            <div className={styles.editorWrapper}>
                <Editor
                    value={values[0] || ''} // 只显示第一条解析
                    plugins={plugins}
                    onChange={handleEditorChange}
                    placeholder="输入题目解析，支持 Markdown 格式。如果有多条，请在此编辑第一条。"
                />
            </div>
        </div>
    );
};

export default AnalysesEditor;