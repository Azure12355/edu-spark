// [!file src/shared/components/ui/MarkdownRenderer/CodeBlock.tsx]
"use client";

import React, { useEffect, useRef } from 'react';
import hljs from 'highlight.js';
import { useToast } from '@/shared/hooks/useToast';
import styles from './CodeBlock.module.css';

// 1. 引入 highlight.js 的主题样式。
//    我选择了一个流行的深色主题 'atom-one-dark'。您可以换成任何您喜欢的主题。
//    所有可用主题都在 'node_modules/highlight.js/styles/' 目录下。
import 'highlight.js/styles/atom-one-dark.css';

interface CodeBlockProps {
    language?: string;
    content: string;
}

const CodeBlock: React.FC<CodeBlockProps> = ({ language, content }) => {
    const codeRef = useRef<HTMLElement>(null);
    const showToast = useToast();

    // 2. 使用 useEffect 在组件挂载或内容更新后，对代码块执行高亮处理。
    useEffect(() => {
        if (codeRef.current) {
            // `highlightElement` 是 highlight.js 推荐的、性能更高的方式。
            hljs.highlightElement(codeRef.current);
        }
    }, [content, language]);

    const handleCopy = () => {
        navigator.clipboard.writeText(content).then(() => {
            showToast({ message: '代码已复制', type: 'success' });
        });
    };

    // 3. 确定 highlight.js 能识别的语言，如果不支持则设为 'plaintext'。
    const validLanguage = language && hljs.getLanguage(language) ? language : 'plaintext';

    return (
        // [!code focus start]
        // --- 核心修复：使用 .codeBlock 作为根容器，其样式将隔离内部的 <pre> 和 <code> ---
        <div className={styles.codeBlock}>
            <div className={styles.codeHeader}>
                <span>{validLanguage}</span>
                <button onClick={handleCopy} className={styles.copyButton}>
                    <i className="far fa-copy"></i> 复制
                </button>
            </div>
            {/* 这里的 <pre> 和 <code> 会继承 .codeBlock 中定义的样式 */}
            <pre className={styles.codeContent}>
                <code ref={codeRef} className={`language-${validLanguage}`}>
                    {content}
                </code>
            </pre>
        </div>
        // [!code focus end]
    );
};

export default CodeBlock;