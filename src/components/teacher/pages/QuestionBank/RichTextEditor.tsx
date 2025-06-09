// src/components/teacher/pages/QuestionBank/RichTextEditor.tsx
"use client";

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { Spin } from 'antd';
import styles from './RichTextEditor.module.css';

// --- 核心修正：使用动态导入并禁用SSR ---
const Editor = dynamic(() => import('@tinymce/tinymce-react').then(mod => mod.Editor), {
    ssr: false,
    loading: () => (
        <div className={styles.editorLoading}>
            <Spin tip="编辑器加载中..." />
        </div>
    )
});

interface RichTextEditorProps {
    value?: string;
    onChange?: (value: string) => void;
    placeholder?: string;
}

const RichTextEditor: React.FC<RichTextEditorProps> = ({ value, onChange, placeholder }) => {
    const [isFocused, setIsFocused] = useState(false);

    return (
        <div className={`${styles.editorWrapper} ${isFocused ? styles.focused : ''}`}>
            <Editor
                apiKey={process.env.NEXT_PUBLIC_TINYMCE_API_KEY}
                value={value}
                onEditorChange={(newValue, editor) => {
                    if (onChange) {
                        onChange(newValue);
                    }
                }}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                init={{
                    height: 250,
                    menubar: true, // 显示文件、编辑、插入等菜单，功能更强大
                    plugins: [
                        'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                        'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                        'insertdatetime', 'media', 'table', 'help', 'wordcount', 'codesample'
                    ],
                    toolbar: 'undo redo | blocks | ' +
                             'bold italic forecolor | alignleft aligncenter ' +
                             'alignright alignjustify | bullist numlist outdent indent | ' +
                             'removeformat | image media link | codesample | fullscreen | help',
                    content_style: 'body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif; font-size:14px }',
                    placeholder: placeholder || "在此输入内容...",
                }}
            />
        </div>
    );
};

export default RichTextEditor;