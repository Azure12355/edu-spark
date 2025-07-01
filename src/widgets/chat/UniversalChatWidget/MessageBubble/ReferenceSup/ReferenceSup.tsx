// src/components/common/MessageBubble/ReferenceSup.tsx
"use client";
import React from 'react';
import styles from './ReferenceSup.module.css';

interface ReferenceSupProps {
    children: React.ReactNode;
    messageId: string;
    onRefEnter: (index: number) => void;
    onRefLeave: () => void;
}

const ReferenceSup: React.FC<ReferenceSupProps> = ({ children, messageId, onRefEnter, onRefLeave }) => {
    const refIndex = parseInt(React.Children.toArray(children)[0] as string, 10);

    const handleMouseEnter = () => {
        if (refIndex > 0) onRefEnter(refIndex);
    };

    const handleClick = (e: React.MouseEvent) => {
        e.preventDefault();
        const targetElement = document.getElementById(`ref-${messageId}-${refIndex}`);
        if (targetElement) {
            targetElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
            targetElement.classList.add('flash-highlight');
            setTimeout(() => {
                targetElement.classList.remove('flash-highlight');
            }, 1000);
        }
    };

    return (
        <span
            className={styles.referenceSup}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={onRefLeave}
            onClick={handleClick}
        >
            {children}
        </span>
    );
};

export default ReferenceSup;