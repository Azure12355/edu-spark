// [!file src/features/teacher/course/course-management/sub-features/point-edit/components/PointContentEditor/PointContentEditor.tsx]
"use client";

import React, { useMemo } from 'react';
import styles from './PointContentEditor.module.css';

// 1. 导入 Bytemd 核心和 React 组件
import { Editor } from '@bytemd/react';
import 'bytemd/dist/index.css'; // Bytemd 核心样式
import zh_Hans from 'bytemd/locales/zh_Hans.json'; // 编辑器主界面中文语言包

// 2. 导入 Bytemd 插件及其样式
import gfm from '@bytemd/plugin-gfm';
import gfmLocale from '@bytemd/plugin-gfm/locales/zh_Hans.json';
import highlight from '@bytemd/plugin-highlight';
import 'highlight.js/styles/atom-one-dark.css'; // 代码高亮主题
import math from '@bytemd/plugin-math';
import mathLocale from '@bytemd/plugin-math/locales/zh_Hans.json';
import 'katex/dist/katex.css'; // 数学公式样式
import mermaid from '@bytemd/plugin-mermaid';
import mermaidLocale from '@bytemd/plugin-mermaid/locales/zh_Hans.json';

// 3. 导入共享的 Toast Hook
import { useToast } from '@/shared/hooks/useToast';

interface PointContentEditorProps {
    content: string;
    onContentChange: (newContent: string) => void;
}

const PointContentEditor: React.FC<PointContentEditorProps> = ({ content, onContentChange }) => {
    const showToast = useToast();

    // 4. 使用 useMemo 缓存插件列表，优化性能
    const bytemdPlugins = useMemo(() => [
        gfm({ locale: gfmLocale }),
        highlight(),
        math({ locale: mathLocale, katexOptions: { output: 'html' } }),
        mermaid({ locale: mermaidLocale }),
    ], []);

    // 5. 模拟图片上传逻辑
    const handleUploadImages = async (files: File[]) => {
        // 在真实应用中，这里会调用后端 API 上传文件
        showToast({ message: `正在上传 ${files.length} 张图片...`, type: 'info' });
        await new Promise(resolve => setTimeout(resolve, 1500)); // 模拟网络延迟

        // 返回符合 Bytemd 格式的图片对象数组
        const uploadedImages = files.map(file => ({
            title: file.name,
            url: `https://via.placeholder.com/600x400.png?text=${encodeURIComponent(file.name)}`, // 使用占位图服务
            alt: file.name,
        }));

        showToast({ message: `图片上传成功！`, type: 'success' });
        return uploadedImages;
    };

    return (
        <div className={styles.editorCard} data-color-mode="light">
            <h3 className={styles.editorTitle}>知识点正文 (Markdown)</h3>
            <div className={styles.editorWrapper}>
                <Editor
                    value={content}
                    plugins={bytemdPlugins}
                    locale={zh_Hans}
                    onChange={onContentChange}
                    uploadImages={handleUploadImages}
                    placeholder="在这里输入知识点的详细内容，支持 Markdown 格式..."
                />
            </div>
        </div>
    );
};

export default PointContentEditor;