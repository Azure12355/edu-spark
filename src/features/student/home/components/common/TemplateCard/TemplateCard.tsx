"use client";

import React from 'react';
import Image from 'next/image';
import styles from './TemplateCard.module.css';

export interface Template {
    type: string;
    src: string;
    width: number;
    height: number;
}

interface TemplateCardProps {
    template: Template;
}

const TemplateCard: React.FC<TemplateCardProps> = ({ template }) => {
    return (
        <div className={styles.templateCardWrapper}>
            <Image
                src={template.src}
                alt={template.type}
                width={template.width}
                height={template.height}
                className={styles.templateImage}
            />
            <p className={styles.templateTitle}>{template.type}</p>
        </div>
    );
};

export default TemplateCard;