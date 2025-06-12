"use client";
import React, { useState } from 'react';
import styles from './RetrievalParameters.module.css';

const RetrievalParameters = () => {
    const [isParamsOpen, setIsParamsOpen] = useState(true);
    const [isMoreParamsOpen, setIsMoreParamsOpen] = useState(true);

    return (
        <div className={styles.panel}>
            <div className={styles.header}>
                <i className="fas fa-search"></i>
                <h3>知识检索</h3>
            </div>
            <p className={styles.description}>适合仅用知识库进行相似检索的场景，每次检索为独立检索，无多轮信息参考</p>

            <div className={styles.parameterCard}>
                <div className={styles.cardHeader} onClick={() => setIsParamsOpen(!isParamsOpen)}>
                    <div className={styles.cardTitle}>
                        <span className={styles.bar}></span>
                        检索参数
                    </div>
                    <i className={`fas fa-chevron-down ${styles.cardToggleIcon} ${!isParamsOpen ? styles.collapsed : ''}`}></i>
                </div>
                {isParamsOpen && (
                    <div className={styles.cardBody}>
                        <div className={styles.paramItem}>
                            <div className={styles.paramLabel}>
                                <span className={styles.paramName}>返回文本片数量 <i className="far fa-question-circle"></i></span>
                            </div>
                            <div className={styles.paramControls}>
                                <input type="range" min="1" max="20" defaultValue="10" className={styles.slider} />
                                <input type="number" defaultValue="10" className={styles.paramValueInput} />
                            </div>
                        </div>
                        <div className={styles.paramItem}>
                            <div className={styles.paramLabel}>
                                <span className={styles.paramName}>重排模型 <i className="far fa-question-circle"></i></span>
                                <label className={styles.toggleSwitch}>
                                    <input type="checkbox" />
                                    <span className={styles.toggleSlider}></span>
                                </label>
                            </div>
                        </div>
                        <div className={styles.cardHeader} style={{ marginTop: '12px' }} onClick={() => setIsMoreParamsOpen(!isMoreParamsOpen)}>
                            <div className={styles.cardTitle}>更多参数</div>
                            <i className={`fas fa-chevron-up ${styles.cardToggleIcon} ${!isMoreParamsOpen ? styles.collapsed : ''}`}></i>
                        </div>
                        {isMoreParamsOpen && (
                            <div className={styles.paramItem}>
                                <div className={styles.paramLabel}>
                                    <span className={styles.paramName}>Dense Weight <i className="far fa-question-circle"></i></span>
                                </div>
                                <div className={styles.paramControls}>
                                    <input type="range" min="0" max="1" step="0.01" defaultValue="0.5" className={styles.slider} />
                                    <input type="number" defaultValue="0.50" className={styles.paramValueInput} />
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>
            <div className={styles.bottomActions}>
                <button className={styles.createServiceBtn}><i className="fas fa-code"></i> 创建服务调用 <span className={styles.newTag}>New</span></button>
                <button className={styles.apiBtn}>API 调用</button>
            </div>
        </div>
    );
};
export default RetrievalParameters;