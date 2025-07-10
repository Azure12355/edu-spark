"use client";

import React from 'react';
import { ChevronRight } from 'lucide-react';
import styles from './TemplateGrid.module.css';
import TemplateCard, { Template } from '../TemplateCard/TemplateCard';

interface TemplateGridProps {
    templates: Template[];
}

const TemplateGrid: React.FC<TemplateGridProps> = ({ templates }) => {
    return (
        <div className={styles.templateGrid}>
            {templates.map((template, index) => (
                <TemplateCard key={index} template={template} />
            ))}

            {/* 特殊的 AI 模板卡片堆叠效果 */}
            <div className={`${styles.templateCardWrapper} ${styles.aiTemplateStack}`}>
                <div className={`${styles.stackedCard} ${styles.stack3}`}></div>
                <div className={`${styles.stackedCard} ${styles.stack2}`}></div>
                <div className={`${styles.stackedCard} ${styles.stack1}`}>
                    <span>AI招聘海报</span>
                    <ChevronRight size={18} />
                </div>
            </div>
            <div className={`${styles.templateCardWrapper} ${styles.aiTemplateStack}`}>
                <div className={`${styles.stackedCard} ${styles.stack3} ${styles.greenStack}`}></div>
                <div className={`${styles.stackedCard} ${styles.stack2} ${styles.greenStack}`}></div>
                <div className={`${styles.stackedCard} ${styles.stack1} ${styles.greenStack}`}>
                    <span>AI海报</span>
                    <ChevronRight size={18} />
                </div>
            </div>
        </div>
    );
};

export default TemplateGrid;