"use client";
import React, {useState} from 'react';
import styles from './AgentCategoryFilter.module.css';

// 假设的分类数据
const categoryItems = [
    { icon: '💻', text: '计算机' },
    { icon: '🎨', text: '艺术设计' },
    { icon: '🔬', text: '理工科' },
    { icon: '📚', text: '文史哲' },
    { icon: '📈', text: '经管' },
    { icon: '🗣️', text: '语言' },
    { icon: '💡', text: '生活娱乐' },
    { icon: '✨', text: '综合' },
];

const CategoryItem = ({ icon, text, active, onClick }: {icon: any,text: any,active: any,onClick: any}) => (
    <div className={`${styles.item} ${active ? styles.active : ''}`} onClick={onClick}>
        <div className={styles.icon}>{icon}</div>
        <span>{text}</span>
    </div>
);

const AgentCategoryFilter = () => {
    const [activeCategory, setActiveCategory] = useState('计算机');

    return (
        <div className={styles.quickAccess}>
            <div className={styles.itemsContainer}>
                {categoryItems.map(item => (
                    <CategoryItem
                        key={item.text}
                        icon={item.icon}
                        text={item.text}
                        active={activeCategory === item.text}
                        onClick={() => setActiveCategory(item.text)}
                    />
                ))}
            </div>
            <button className={styles.arrowButton}>
                <i className="fas fa-sliders-h"></i>
            </button>
        </div>
    );
};

export default AgentCategoryFilter;