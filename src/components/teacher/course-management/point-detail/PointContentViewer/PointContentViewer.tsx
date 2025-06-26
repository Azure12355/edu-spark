// src/components/teacher/course-management/point-detail/PointContentViewer/PointContentViewer.tsx
"use client";
import React, { useMemo } from 'react';
import { Viewer } from '@bytemd/react';
import styles from './PointContentViewer.module.css';

// ... (所有 bytemd 插件的 import 保持不变) ...
import gfm from '@bytemd/plugin-gfm';
import highlight from '@bytemd/plugin-highlight';
import math from '@bytemd/plugin-math';
import mermaid from '@bytemd/plugin-mermaid';
import 'highlight.js/styles/brown-paper.min.css'

interface PointContentViewerProps {
    markdownContent: string;
}

const PointContentViewer: React.FC<PointContentViewerProps> = ({ markdownContent }) => {

    const plugins = useMemo(() => [
        gfm(),
        highlight(),
        math(),
        mermaid(),
    ], []);

    // 1. 移除所有和 ID 注入相关的逻辑
    // const addIdsToHeadings = ...
    // const contentWithIds = ...

    return (
        <div className={styles.viewerContainer}>
            <Viewer
                // 2. 直接渲染原始的 markdown 内容
                value={markdownContent}
                plugins={plugins}
            />
        </div>
    );
};

export default PointContentViewer;