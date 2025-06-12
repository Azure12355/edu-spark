"use client";
import React, { useState } from 'react';
import styles from './QAParameters.module.css';
import { KNOWLEDGE_QA_PROMPT_TEMPLATE } from '@/lib/prompts';

const ParameterCard: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => {
    const [isOpen, setIsOpen] = useState(true);
    return (
        <div className={styles.parameterCard}>
            <div className={styles.cardHeader} onClick={() => setIsOpen(!isOpen)}>
                <div className={styles.cardTitle}>
                    <span className={styles.bar}></span>{title}
                </div>
                <i className={`fas fa-chevron-down ${styles.cardToggleIcon} ${!isOpen ? styles.collapsed : ''}`}></i>
            </div>
            {isOpen && <div className={styles.cardBody}>{children}</div>}
        </div>
    );
};

const QAParameters = () => {
    return (
        <div className={styles.panel}>
            <div className={styles.header}>
                <i className="fas fa-question-circle"></i>
                <h3>知识问答</h3>
            </div>
            <p className={styles.description}>适合用知识库进行大模型多轮问答的场景，基于历史对话信息和参考知识，进行专业回答</p>

            <ParameterCard title="检索参数">
                <div className={styles.paramItem}>
                    <span className={styles.paramLabel}>返回文本片数量 <i className="far fa-question-circle"></i></span>
                    <div className={styles.paramControls}>
                        <input type="range" min="1" max="20" defaultValue="10" className={styles.slider} />
                        <input type="number" defaultValue="10" className={styles.paramValueInput} />
                    </div>
                </div>
                <div className={styles.paramItem}>
                    <span className={styles.paramLabel}>问题改写 <span className={styles.paramName}><span className={styles.newTag}>新</span></span></span>
                    <label className={styles.toggleSwitch}><input type="checkbox" /><span className={styles.toggleSlider}></span></label>
                </div>
                <div className={styles.paramItem}>
                    <span className={styles.paramLabel}>重排模型 <i className="far fa-question-circle"></i></span>
                    <label className={styles.toggleSwitch}><input type="checkbox" /><span className={styles.toggleSlider}></span></label>
                </div>
                <div className={styles.paramItem}>
                    <span className={styles.paramLabel}>文档聚合排序 <span className={styles.paramName}><i className="far fa-question-circle"></i><span className={styles.newTag}>新</span></span></span>
                    <label className={styles.toggleSwitch}><input type="checkbox" defaultChecked /><span className={styles.toggleSlider}></span></label>
                </div>
            </ParameterCard>

            <ParameterCard title="模型回答参数">
                <div className={styles.paramItem}>
                    <span className={styles.paramLabel}>选择模型</span>
                    <div className={styles.modelSelector}>
                        <span className={styles.modelInfo}><i className="fas fa-microchip"></i> Doubao-1.5-thinking-pro</span>
                        <button className={styles.modelSwapBtn}><i className="fas fa-exchange-alt"></i></button>
                    </div>
                </div>
                <div className={styles.paramItem}>
                    <span className={styles.paramLabel}>拼接邻近文本片数量 <i className="far fa-question-circle"></i></span>
                    <div className={styles.paramControls}>
                        <input type="range" min="0" max="5" defaultValue="0" className={styles.slider} />
                        <input type="number" defaultValue="0" className={styles.paramValueInput} />
                    </div>
                </div>
                <div className={styles.paramItem}>
                    <div className={styles.promptHeader}>
                        <label className={styles.paramLabel}><span style={{color: '#ef4444'}}>*</span> 编写Prompt</label>
                        <a href="#" className={styles.promptTemplateLink}><i className="fas fa-lightbulb"></i> Prompt模板</a>
                    </div>
                    <pre className={styles.promptEditor}>{KNOWLEDGE_QA_PROMPT_TEMPLATE}</pre>
                </div>
            </ParameterCard>

            <div className={styles.bottomActions}>
                <button className={styles.createServiceBtn}><i className="fas fa-code"></i> 创建服务调用</button>
                <button className={styles.apiBtn}>API 调用</button>
            </div>
        </div>
    );
};
export default QAParameters;