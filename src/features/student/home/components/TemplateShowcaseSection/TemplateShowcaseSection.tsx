"use client";

import React from 'react';
import styles from './TemplateShowcaseSection.module.css';
import CategoryTabs from './CategoryTabs/CategoryTabs';
import TemplateGrid from '../common/TemplateGrid/TemplateGrid';
import { Template } from '../common/TemplateCard/TemplateCard';

// 模拟数据
const templateCategories = ["海报", "小红书", "PPT办公", "公众号", "电商", "教育培训", "社交生活", "个性定制", "印刷物料"];
const templates: Template[] = [
    { type: '手机海报', src: '/smart-image/a6711722880053a16514787efe64761e.png', width: 220, height: 391 },
    { type: '全屏海报', src: '/smart-image/20b08053a47900b171701e69cefe1d23.png', width: 220, height: 391 },
    { type: '长图海报', src: '/smart-image/0a11c8a141870196ce21852c03d36005.png', width: 220, height: 391 },
    { type: '横版海报', src: '/smart-image/2f53d4c67926712361ac4e8243c3f915.png', width: 330, height: 220 },
    { type: '方形海报', src: '/smart-image/9c898c6b738367873b26c043e06de963.png', width: 220, height: 220 },
    { type: '每日一签', src: '/smart-image/c85a6a3b0922e379901b57e795a2cc.png', width: 220, height: 391 },
];

const TemplateShowcaseSection = () => {
    return (
        <section className={styles.templateShowcaseSection}>
            <CategoryTabs categories={templateCategories} />
            <TemplateGrid templates={templates} />
        </section>
    );
};

export default TemplateShowcaseSection;