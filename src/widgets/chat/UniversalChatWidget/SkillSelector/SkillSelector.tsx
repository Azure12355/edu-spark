// src/components/common/SkillSelector/SkillSelector.tsx
"use client";

import React from 'react';
import styles from './SkillSelector.module.css';

// 定义单个技能的类型
export interface Skill {
    id: string;
    name: string;
    icon: React.ReactNode; // 使用 ReactNode 以支持更复杂的图标，如渐变色
}

// 定义组件的 Props
interface SkillSelectorProps {
    skills: Skill[];
    selectedSkillId: string | null;
    onSkillSelect: (skillId: string) => void;
}

/**
 * SkillSelector 是一个功能/技能选择器组件。
 * 它以水平列表的形式展示一系列技能，并允许用户单选其中一个。
 */
const SkillSelector: React.FC<SkillSelectorProps> = ({ skills, selectedSkillId, onSkillSelect }) => {

    const handleSelect = (skillId: string) => {
        // 如果再次点击已选中的技能，则取消选择
        if (selectedSkillId === skillId) {
            onSkillSelect('');
        } else {
            onSkillSelect(skillId);
        }
    };

    return (
        <div className={styles.selectorContainer}>
            <div className={styles.scrollableArea}>
                {skills.map(skill => (
                    <button
                        key={skill.id}
                        className={`${styles.skillButton} ${selectedSkillId === skill.id ? styles.active : ''}`}
                        onClick={() => handleSelect(skill.id)}
                    >
                        <span className={styles.iconWrapper}>{skill.icon}</span>
                        <span>{skill.name}</span>
                    </button>
                ))}
            </div>
        </div>
    );
};

export default SkillSelector;