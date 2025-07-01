"use client";
import React from 'react';
import styles from './KnowledgePagination.module.css';

const KnowledgePagination = () => {
    return (
        <div className={styles.pagination}>
            <span className={styles.total}>共 6 条</span>
            <button className={styles.pageButton}>{'<'}</button>
            <button className={`${styles.pageButton} ${styles.active}`}>1</button>
            <button className={styles.pageButton}>{'>'}</button>
            <select className={styles.perPageSelect}>
                <option>20 条/页</option>
                <option>50 条/页</option>
            </select>
            <input type="text" value="前往 1 页" className={styles.pageInput} readOnly />
        </div>
    );
};
export default KnowledgePagination;