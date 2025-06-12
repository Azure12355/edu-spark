"use client";
import React from 'react';
import styles from './ImportOptions.module.css';

const ImportOptions = () => {
    return (
        <div className={styles.optionsContainer}>
            <label className={styles.toggleSwitch}>
                <input type="checkbox" />
                <span className={styles.slider}></span>
            </label>
            <div className={styles.label}>
                文档去重 <i className="far fa-question-circle"></i> <span className={styles.newTag}>新</span>
            </div>
        </div>
    );
};
export default ImportOptions;