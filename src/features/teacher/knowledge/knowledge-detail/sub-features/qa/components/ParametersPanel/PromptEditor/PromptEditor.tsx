"use client";

import React from 'react';
import Tooltip from '@/shared/components/ui/Tooltip/Tooltip';
import styles from './PromptEditor.module.css';

interface PromptEditorProps {
    value: string;
    onChange: (value: string) => void;
}

const PromptEditor: React.FC<PromptEditorProps> = ({ value, onChange }) => {
    return (
        <div className={styles.paramItem}>
            <div className={styles.promptHeader}>
                <label className={styles.paramLabel}>系统提示词 (Prompt)</label>
                <Tooltip content="查看和修改指导AI如何回答问题的系统指令。">
                    <a href="#" className={styles.promptTemplateLink}>
                        <i className="fas fa-lightbulb"></i> Prompt 最佳实践
                    </a>
                </Tooltip>
            </div>
            <textarea
                className={styles.promptEditor}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                rows={10}
            />
        </div>
    );
};

export default PromptEditor;