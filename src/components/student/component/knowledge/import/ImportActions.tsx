"use client";
import React from 'react';
import styles from './ImportActions.module.css';

interface ImportActionsProps {
    onImport: () => void;
    onCancel: () => void;
    canImport: boolean;
}

const ImportActions: React.FC<ImportActionsProps> = ({ onImport, onCancel, canImport }) => {
    return (
        <div className={styles.actionsContainer}>
            <button onClick={onCancel} className={`${styles.button} ${styles.cancelButton}`}>取消</button>
            <button onClick={onImport} className={`${styles.button} ${styles.importButton}`} disabled={!canImport}>
                导入
            </button>
        </div>
    );
};
export default ImportActions;