"use client";
import React from 'react';
import styles from './ImportActions.module.css';

interface ImportActionsProps {
    onImport: () => void;
    onCancel: () => void;
    canImport: boolean;
    isUploading: boolean; // 新增 prop
}

const ImportActions: React.FC<ImportActionsProps> = ({ onImport, onCancel, canImport, isUploading }) => {
    return (
        <div className={styles.actionsContainer}>
            <button onClick={onCancel} className={`${styles.button} ${styles.cancelButton}`} disabled={isUploading}>
                取消
            </button>
            <button
                onClick={onImport}
                className={`${styles.button} ${styles.importButton}`}
                disabled={!canImport || isUploading}
            >
                {isUploading ? (
                    <>
                        <i className="fas fa-spinner fa-spin"></i> 正在导入...
                    </>
                ) : (
                    '开始导入'
                )}
            </button>
        </div>
    );
};
export default ImportActions;