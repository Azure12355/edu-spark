// src/components/common/MessageBubble/MessageReferences.tsx
"use client";
import React from 'react';
import styles from './MessageReferences.module.css';

export interface ReferenceItem {
    type: 'file' | 'web';
    title: string;
    link?: string;
}

interface MessageReferencesProps {
    references?: ReferenceItem[];
    highlightedIndex: number | null;
    onRefEnter: (index: number) => void;
    onRefLeave: () => void;
}

const MessageReferences: React.FC<MessageReferencesProps> = ({ references, highlightedIndex, onRefEnter, onRefLeave }) => {
    if (!references || references.length === 0) {
        return null;
    }

    const getIconClass = (type: 'file' | 'web') => {
        return type === 'file' ? 'fas fa-file-alt' : 'fas fa-globe';
    };

    return (
        <div className={styles.references}>
            <h4 className={styles.refHeader}>
                <i className="fas fa-link" /> 参考来源 ({references.length})
            </h4>
            <div className={styles.refList}>
                {references.map((ref, index) => (
                    <a
                        key={index}
                        id={`ref-messageId-${index + 1}`} // ID不再需要messageId，因为滚动是在MessageContent中处理的
                        href={ref.link || '#'}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`${styles.refItem} ${highlightedIndex === index + 1 ? styles.highlighted : ''}`}
                        onMouseEnter={() => onRefEnter(index + 1)}
                        onMouseLeave={onRefLeave}
                    >
                        <sup className={styles.refIndex}>{index + 1}</sup>
                        <i className={`${getIconClass(ref.type)} ${styles.refIcon}`} />
                        <span className={styles.refTitle}>{ref.title}</span>
                        {ref.type === 'web' && <i className={`fas fa-external-link-alt ${styles.externalLinkIcon}`} />}
                    </a>
                ))}
            </div>
        </div>
    );
};

export default MessageReferences;