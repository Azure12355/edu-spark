// src/components/common/MessageBubble/MessageContent.tsx
"use client";

import React, { useEffect, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneLight } from 'react-syntax-highlighter/dist/esm/styles/prism';
import mermaid from 'mermaid';
import rehypeRaw from 'rehype-raw';
import rehypeSanitize, { defaultSchema } from 'rehype-sanitize';

import styles from './MessageContent.module.css';

interface MessageContentProps {
    content: string;
    isThinking?: boolean;
    isUser: boolean;
    messageId: string;
    onRefEnter: (index: number) => void;
    onRefLeave: () => void;
    highlightedIndex: number | null; // 接收高亮状态
}

const MessageContent: React.FC<MessageContentProps> = ({ content, isThinking, isUser, messageId, onRefEnter, onRefLeave, highlightedIndex }) => {
    const contentRef = useRef<HTMLDivElement>(null);

    // Mermaid 的 useEffect
    useEffect(() => {
        if (content.includes("```mermaid")) {
            try { mermaid.run({ nodes: document.querySelectorAll('.mermaid') }); }
            catch(e) { console.error("Mermaid render error:", e); }
        }
    }, [content]);

    const contentToRender = isThinking ? content.replace(/<think>[\s\S]*?<\/think>/g, '') : content;

    // 将 <ref> 替换为带有 data-* 属性的 <span>
    const processedContent = contentToRender.replace(/<ref>(\d+)<\/ref>/g, (match, p1) => {
        const refIndex = parseInt(p1, 10);
        return `<span class="reference-sup" data-message-id="${messageId}" data-ref-index="${refIndex}">${refIndex}</span>`;
    });

    const sanitizeSchema = {
        ...defaultSchema,
        tagNames: [...(defaultSchema.tagNames || []), 'span'],
        attributes: {
            ...defaultSchema.attributes,
            span: ['className', 'data-message-id', 'data-ref-index'],
        },
    };

    // 使用 useEffect 来动态绑定事件和更新高亮
    useEffect(() => {
        const supElements = contentRef.current?.querySelectorAll('span.reference-sup');
        const listeners: Array<{el: Element, type: string, listener: EventListenerOrEventListenerObject}> = [];

        if (supElements) {
            supElements.forEach(sup => {
                const refIndex = parseInt(sup.getAttribute('data-ref-index') || '0', 10);
                const msgId = sup.getAttribute('data-message-id');

                // 更新高亮状态
                if (highlightedIndex === refIndex) {
                    sup.classList.add('highlighted');
                } else {
                    sup.classList.remove('highlighted');
                }

                if (refIndex > 0 && msgId) {
                    const handleMouseEnter = () => onRefEnter(refIndex);
                    const handleMouseLeave = () => onRefLeave();
                    const handleClick = (e: Event) => {
                        e.preventDefault();
                        const targetElement = document.getElementById(`ref-${msgId}-${refIndex}`);
                        if (targetElement) {
                            targetElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
                            targetElement.classList.add('flash-highlight');
                            setTimeout(() => targetElement.classList.remove('flash-highlight'), 1000);
                        }
                    };

                    sup.addEventListener('mouseenter', handleMouseEnter);
                    sup.addEventListener('mouseleave', handleMouseLeave);
                    sup.addEventListener('click', handleClick);

                    listeners.push({el: sup, type: 'mouseenter', listener: handleMouseEnter});
                    listeners.push({el: sup, type: 'mouseleave', listener: handleMouseLeave});
                    listeners.push({el: sup, type: 'click', listener: handleClick});
                }
            });
        }

        return () => {
            listeners.forEach(({el, type, listener}) => {
                el.removeEventListener(type, listener);
            });
        }
    }, [processedContent, onRefEnter, onRefLeave, highlightedIndex]); // 依赖 highlightedIndex

    return (
        <div ref={contentRef} className={`markdown-body ${styles.contentWrapper} ${isUser ? 'user-content' : ''}`}>
            {content ? (
                <ReactMarkdown
                    rehypePlugins={[rehypeRaw, [rehypeSanitize, sanitizeSchema], [rehypeKatex, { strict: false }]]}
                    remarkPlugins={[remarkGfm, remarkMath]}
                    components={{
                        code(props) {
                            const {children, className, node, ...rest} = props
                            const match = /language-(\w+)/.exec(className || '')
                            if (match && match[1] === 'mermaid') {
                                return <pre className="mermaid">{String(children)}</pre>;
                            }
                            return match ? (
                                //@ts-ignore
                                <SyntaxHighlighter {...rest} style={oneLight} language={match[1]} PreTag="div">
                                    {String(children).replace(/\n$/, '')}
                                </SyntaxHighlighter>
                            ) : (
                                <code {...rest} className={className}>{children}</code>
                            )
                        }
                    }}
                >
                    {processedContent}
                </ReactMarkdown>
            ) : (
                !isUser && <span className="typing-indicator"></span>
            )}
        </div>
    );
};

export default MessageContent;