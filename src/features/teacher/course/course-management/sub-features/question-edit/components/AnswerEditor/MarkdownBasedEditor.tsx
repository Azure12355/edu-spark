// [!file src/features/teacher/course/course-management/sub-features/question-edit/components/AnswerEditor/MarkdownBasedEditor.tsx]
import React, { useMemo } from 'react';
import { Editor } from '@bytemd/react';
import gfm from '@bytemd/plugin-gfm';
import styles from './AnswerEditor.module.css';

interface MarkdownBasedEditorProps {
    answer: string;
    onAnswerChange: (newAnswer: string) => void;
}

export const MarkdownBasedEditor: React.FC<MarkdownBasedEditorProps> = ({ answer, onAnswerChange }) => {
    const plugins = useMemo(() => [gfm()], []);

    return (
        <div className={styles.editorWrapper}>
            <Editor
                value={answer}
                plugins={plugins}
                onChange={onAnswerChange}
                placeholder="输入参考答案，支持 Markdown 格式..."
            />
        </div>
    );
};