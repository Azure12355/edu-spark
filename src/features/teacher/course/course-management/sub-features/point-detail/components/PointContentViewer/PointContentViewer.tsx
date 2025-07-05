// [!file src/features/teacher/course/course-management/sub-features/point-detail/components/PointContentViewer/PointContentViewer.tsx]
"use client";

import React, { useMemo } from 'react';

// 1. 导入 Bytemd 的核心 Viewer 组件和相关样式
import { Viewer } from '@bytemd/react';
import 'bytemd/dist/index.css'; // Bytemd 核心样式

// 2. 导入所需插件及其样式和语言包
import gfm from '@bytemd/plugin-gfm';
import gfmLocale from '@bytemd/plugin-gfm/locales/zh_Hans.json';
import highlight from '@bytemd/plugin-highlight'; // 语法高亮
import 'highlight.js/styles/atom-one-dark.css'; // 选择一个代码高亮主题
import math from '@bytemd/plugin-math'; // 数学公式
import mathLocale from '@bytemd/plugin-math/locales/zh_Hans.json';
import 'katex/dist/katex.css'; // KaTeX (数学公式) 样式
import mermaid from '@bytemd/plugin-mermaid'; // Mermaid 图表
import mermaidLocale from '@bytemd/plugin-mermaid/locales/zh_Hans.json';

// 3. 导入我们自定义的 CSS Module
import styles from './PointContentViewer.module.css';

interface PointContentViewerProps {
    markdownContent: string;
}

const PointContentViewer: React.FC<PointContentViewerProps> = ({ markdownContent }) => {

    // 4. 使用 useMemo 缓存插件列表，防止每次渲染都重新创建
    const bytemdPlugins = useMemo(() => [
        gfm({ locale: gfmLocale }), // 支持 GFM (表格、删除线等)
        highlight(),                 // 代码块语法高亮
        math({                       // 支持 LaTeX 数学公式
            locale: mathLocale,
            katexOptions: { output: 'html' }, // 使用 KaTeX 渲染
        }),
        mermaid({                    // 支持 Mermaid 图表
            locale: mermaidLocale,
        }),
    ], []);

    return (
        // 5. 使用 data-color-mode="light" 确保 Bytemd 渲染为亮色主题
        //    同时，外层包裹一个 div 以应用我们自定义的样式
        <div className={styles.viewerContainer} data-color-mode="light">
            <Viewer
                value={markdownContent}
                plugins={bytemdPlugins}
            />
        </div>
    );
};

export default PointContentViewer;