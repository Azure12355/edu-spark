// src/components/teacher/course-management/ai-generate/ConfigPanel.tsx
"use client";
import React, { useState } from 'react';
import styles from './ConfigPanel.module.css';

const ConfigPanel = () => {
    const [activeTab, setActiveTab] = useState('knowledge');
    const knowledgePoints = ['布尔运算基础', 'Python逻辑非not', 'Python逻辑或or', '数据类型', '变量赋值', '运算符', '条件判断', '循环语句', '函数定义'];

    return (
        <div className={styles.panel}>
            <header className={styles.header}>
                <i className={`fas fa-wand-magic-sparkles ${styles.headerIcon}`}></i>
                <h2 className={styles.headerTitle}>AI 智能出题</h2>
            </header>

            {/* 可滚动的内容区域 */}
            <div className={styles.scrollableBody}>
                <div className={styles.tabs}>
                    <button className={`${styles.tabButton} ${activeTab === 'knowledge' ? styles.active : ''}`} onClick={() => setActiveTab('knowledge')}>知识点出题</button>
                    <button className={`${styles.tabButton} ${activeTab === 'text' ? styles.active : ''}`} onClick={() => setActiveTab('text')}>文本出题</button>
                </div>

                <section className={styles.section}>
                    <h3 className={styles.sectionTitle}><span>*</span>题型：</h3>
                    <div className={styles.checkboxGrid}>
                        <label className={styles.checkboxLabel}><input type="checkbox" defaultChecked/> 单选题</label>
                        <label className={styles.checkboxLabel}><input type="checkbox" /> 多选题</label>
                        <label className={styles.checkboxLabel}><input type="checkbox" /> 判断题</label>
                        <label className={styles.checkboxLabel}><input type="checkbox" /> 简答题</label>
                        <label className={styles.checkboxLabel}><input type="checkbox" /> 编程题</label>
                        <label className={styles.checkboxLabel}><input type="checkbox" /> 填空题</label>
                    </div>
                </section>

                <section className={styles.section}>
                    <h3 className={styles.sectionTitle}><span>*</span>难度：</h3>
                    <div className={styles.radioGrid}>
                        <label className={styles.radioLabel}><input type="radio" name="difficulty" value="简单" defaultChecked/> 简单</label>
                        <label className={styles.radioLabel}><input type="radio" name="difficulty" value="中等"/> 中等</label>
                        <label className={styles.radioLabel}><input type="radio" name="difficulty" value="困难"/> 困难</label>
                    </div>
                </section>

                <section className={styles.section}>
                    <h3 className={styles.sectionTitle}><i className="fas fa-book"></i> 知识点范围</h3>
                    <div className={styles.knowledgeScopeList}>
                        {knowledgePoints.map(p => <div key={p} className={styles.knowledgeTag}><span>{p}</span><button>删除</button></div>)}
                    </div>
                    <div className={styles.knowledgeActions}>
                        <button className="teacher-button-secondary"><i className="fas fa-plus"></i> 手动添加</button>
                        <button className="teacher-button-secondary"><i className="fas fa-database"></i> 从知识点库选择</button>
                    </div>
                </section>

                <section className={styles.section}>
                    <h3 className={styles.sectionTitle}>补充内容 (选填)</h3>
                    <textarea className={styles.supplementaryTextarea} placeholder="输入补充内容，帮助AI更好地理解出题需求"></textarea>
                </section>
            </div>

            {/* 固定的页脚 */}
            <footer className={styles.footer}>
                <button className={styles.generateButton}>
                    <i className="fas fa-spinner fa-spin"></i> 停止出题
                </button>
            </footer>
        </div>
    );
};
export default ConfigPanel;