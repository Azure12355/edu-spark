// src/components/teacher/course-management/question-edit/StemEditor.tsx
"use client";
import React, { useMemo } from 'react';
import { Editor } from '@bytemd/react';
import gfm from '@bytemd/plugin-gfm';
import highlight from '@bytemd/plugin-highlight';
import styles from './StemEditor.module.css';
import 'bytemd/dist/index.css';

interface Props {
    value: string;
    onChange: (newValue: string) => void;
}

const StemEditor: React.FC<Props> = ({ value, onChange }) => {
    const plugins = useMemo(() => [gfm(), highlight()], []);

    return (
        <div className={styles.card}>
            <h3 className={styles.cardTitle}>题干内容</h3>
            <div className={styles.editorWrapper}>
                <Editor value={value} plugins={plugins} onChange={onChange} />
            </div>
        </div>
    );
};

export default StemEditor;