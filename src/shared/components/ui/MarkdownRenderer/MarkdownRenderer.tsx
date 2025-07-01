// src/components/common/MarkdownRenderer/MarkdownRenderer.tsx
"use client";

import React, { useMemo } from 'react';
import katex from 'katex';
import 'katex/dist/katex.min.css';
import styles from './MarkdownRenderer.module.css';
import { useToast } from '@/shared/hooks/useToast';

// 1. 类型定义和辅助组件 (从 MessageContent 迁移过来)
type BlockType =
    | 'paragraph' | 'code' | 'latex'
    | 'heading1' | 'heading2' | 'heading3' | 'heading4' | 'heading5' | 'heading6'
    | 'unorderedList' | 'orderedList' | 'blockquote' | 'table' | 'hr';

interface ContentBlock {
    type: BlockType;
    content: string;
    language?: string;
}

const CodeBlock = ({ language, content }: { language?: string, content: string }) => {
    const showToast = useToast();
    const handleCopy = () => {
        navigator.clipboard.writeText(content).then(() => {
            showToast({ message: '代码已复制', type: 'success' });
        });
    };
    return (
        <div className={styles.codeBlock}>
            <div className={styles.codeHeader}>
                <span>{language || 'code'}</span>
                <button onClick={handleCopy} className={styles.copyButton}>
                    <i className="far fa-copy"></i> 复制
                </button>
            </div>
            <pre className={styles.codeContent}><code>{content}</code></pre>
        </div>
    );
};

const KatexRenderer = ({ content, isBlock }: { content: string, isBlock: boolean }) => {
    try {
        const html = katex.renderToString(content, { throwOnError: false, displayMode: isBlock });
        return <span className={isBlock ? styles.latexBlock : styles.latexInline} dangerouslySetInnerHTML={{ __html: html }} />;
    } catch (e) {
        return <code>{content}</code>;
    }
};

const renderInlineContent = (line: string) => {
    const regex = /(\*\*.*?\*\*|\*.*?\*|`.*?`|\[.*?\]\(.*?\))/g;
    const parts = line.split(regex);
    return parts.map((part, index) => {
        if (part.startsWith('**') && part.endsWith('**')) return <b key={index} className={styles.bold}>{part.slice(2, -2)}</b>;
        if (part.startsWith('*') && part.endsWith('*')) return <i key={index} className={styles.italic}>{part.slice(1, -1)}</i>;
        if (part.startsWith('`') && part.endsWith('`')) return <code key={index} className={styles.inlineCode}>{part.slice(1, -1)}</code>;
        if (part.startsWith('[') && part.includes('](') && part.endsWith(')')) {
            const match = /\[(.*?)\]\((.*?)\)/.exec(part);
            if (match) return <a key={index} href={match[2]} target="_blank" rel="noopener noreferrer" className={styles.link}>{match[1]}</a>;
        }
        return part;
    });
};

const TableRenderer = ({ content }: { content: string }) => {
    const rows = content.split('\n');
    const headerRow = rows[0];
    const bodyRows = rows.slice(2);
    const headers = headerRow.split('|').map(h => h.trim()).slice(1, -1);
    return (
        <div className={styles.tableWrapper}>
            <table className={styles.table}>
                <thead><tr>{headers.map((header, index) => <th key={index}>{header}</th>)}</tr></thead>
                <tbody>{bodyRows.map((row, rowIndex) => (<tr key={rowIndex}>{row.split('|').map(cell => cell.trim()).slice(1, -1).map((cell, cellIndex) => (<td key={cellIndex}>{renderInlineContent(cell)}</td>))}</tr>))}</tbody>
            </table>
        </div>
    );
};


// 2. 核心解析器函数 (从 MessageContent 迁移过来)
// 为了让您能直接复制，这里补充 parseMarkdown 的完整逻辑
function parseMarkdown(text: string): ContentBlock[] {
    const blocks: ContentBlock[] = [];
    const lines = text.split('\n');
    let i = 0;

    while (i < lines.length) {
        const line = lines[i];

        if (line.startsWith('```')) {
            const language = line.slice(3).trim();
            let codeContent = '';
            i++;
            while (i < lines.length && !lines[i].startsWith('```')) {
                codeContent += (codeContent ? '\n' : '') + lines[i];
                i++;
            }
            blocks.push({ type: 'code', content: codeContent, language });
            i++;
            continue;
        }

        if (line.startsWith('$$')) {
            blocks.push({ type: 'latex', content: line.slice(2, -2).trim() });
            i++;
            continue;
        }

        if (line.startsWith('#')) {
            const level = line.match(/^#+/)?.[0].length;
            if (level && level >= 1 && level <= 6) {
                blocks.push({ type: `heading${level}` as BlockType, content: line.slice(level).trim() });
                i++;
                continue;
            }
        }

        if (line.match(/^(\*\*\*|---|___)\s*$/)) {
            blocks.push({ type: 'hr', content: '' });
            i++;
            continue;
        }

        if (line.startsWith('> ')) {
            let blockquoteContent = line.slice(2);
            i++;
            while (i < lines.length && lines[i].startsWith('> ')) {
                blockquoteContent += '\n' + lines[i].slice(2);
                i++;
            }
            blocks.push({ type: 'blockquote', content: blockquoteContent });
            continue;
        }

        if (line.includes('|') && i + 1 < lines.length && lines[i+1].includes('|') && lines[i+1].match(/^[| -:]{3,}$/)) {
            let tableContent = line;
            i++;
            while (i < lines.length && lines[i].includes('|')) {
                tableContent += '\n' + lines[i];
                i++;
            }
            blocks.push({ type: 'table', content: tableContent });
            continue;
        }

        const listMatch = line.match(/^(\s*)(\*|-|\d+\.) /);
        if (listMatch) {
            const listType = listMatch[2].match(/\d/) ? 'orderedList' : 'unorderedList';
            let listContent = line;
            i++;
            while (i < lines.length && (lines[i].trim() === '' || lines[i].match(/^(\s*)(\*|-|\d+\.) /))) {
                listContent += '\n' + lines[i];
                i++;
            }
            blocks.push({ type: listType, content: listContent });
            continue;
        }

        if (line.trim() !== '') {
            blocks.push({ type: 'paragraph', content: line });
        }
        i++;
    }

    return blocks;
}

// --- 3. 新的通用 MarkdownRenderer 组件 ---
interface MarkdownRendererProps {
    content: string;
    className?: string; // 允许外部传入 class
}

const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content, className }) => {

    const blocks = useMemo(() => parseMarkdown(content), [content]);

    if (blocks.length === 0) {
        return null;
    }

    return (
        <div className={`${styles.rendererWrapper} ${className || ''}`}>
            {blocks.map((block, index) => {
                switch (block.type) {
                    case 'code': return <CodeBlock key={index} language={block.language} content={block.content} />;
                    case 'latex': return <KatexRenderer key={index} content={block.content} isBlock={true} />;
                    case 'heading1': return <h1 key={index} className={styles.heading1}>{renderInlineContent(block.content)}</h1>;
                    case 'heading2': return <h2 key={index} className={styles.heading2}>{renderInlineContent(block.content)}</h2>;
                    case 'heading3': return <h3 key={index} className={styles.heading3}>{renderInlineContent(block.content)}</h3>;
                    case 'heading4': return <h4 key={index} className={styles.heading4}>{renderInlineContent(block.content)}</h4>;
                    case 'heading5': return <h5 key={index} className={styles.heading5}>{renderInlineContent(block.content)}</h5>;
                    case 'heading6': return <h6 key={index} className={styles.heading6}>{renderInlineContent(block.content)}</h6>;
                    case 'hr': return <hr key={index} className={styles.hr} />;
                    case 'table': return <TableRenderer key={index} content={block.content} />;
                    case 'unorderedList': return <ul key={index} className={styles.unorderedList}>{block.content.split('\n').map((li, i) => <li key={i} className={styles.listItem}>{renderInlineContent(li.replace(/^(\*|-) /, ''))}</li>)}</ul>;
                    case 'orderedList': return <ol key={index} className={styles.orderedList}>{block.content.split('\n').map((li, i) => <li key={i} className={styles.listItem}>{renderInlineContent(li.replace(/^\d+\. /, ''))}</li>)}</ol>;
                    case 'blockquote': return <blockquote key={index} className={styles.blockquote}>{block.content.split('\n').map((p, i) => <p key={i}>{renderInlineContent(p)}</p>)}</blockquote>;
                    case 'paragraph': default:
                        return block.content === '' ? null : <div key={index} className={styles.paragraph}>{renderInlineContent(block.content)}</div>;
                }
            })}
        </div>
    );
};

export default MarkdownRenderer;

