// [!file src/features/teacher/knowledge/knowledge-detail/sub-features/qa/components/ParametersPanel/PromptEditor/PromptEditor.tsx]
"use client";

// [!code focus start]
import React, { useState, useEffect } from 'react'; // 1. 导入 useState 和 useEffect
// [!code focus end]
import Tooltip from '@/shared/components/ui/Tooltip/Tooltip';
import styles from './PromptEditor.module.css';

interface PromptEditorProps {
    value: string; // 作为外部的权威值
    onChange: (value: string) => void;
}

const PromptEditor: React.FC<PromptEditorProps> = ({ value: externalValue, onChange }) => {
    // [!code focus start]
    // 2. 创建本地 state
    const [localValue, setLocalValue] = useState(externalValue);

    // 3. 同步外部 prop 变化
    useEffect(() => {
        setLocalValue(externalValue);
    }, [externalValue]);
    // [!code focus end]

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        // [!code focus start]
        setLocalValue(e.target.value); // 4. 立即更新本地 state
        onChange(e.target.value);      // 5. 通知上层
        // [!code focus end]
    };

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
                // [!code focus start]
                value={localValue} // 6. 绑定到本地 state
                onChange={handleChange}
                // [!code focus end]
                rows={10}
            />
        </div>
    );
};

export default PromptEditor;