// src/components/teacher/course-management/ai-generate/GeneratedQuestionCard/StemViewer.tsx
"use client";
import React, { useMemo } from 'react';
import { Viewer } from '@bytemd/react';
import gfm from '@bytemd/plugin-gfm';
import styles from './StemViewer.module.css';

interface Props {
    stem: string;
}

// 该组件不处理 answer 和 analysis，无需修改
const StemViewer: React.FC<Props> = ({ stem }) => {
    const plugins = useMemo(() => [gfm()], []);
    return (
        <div className={styles.stemWrapper}>
            <Viewer value={stem} plugins={plugins} />
        </div>
    );
};

export default StemViewer;