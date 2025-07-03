"use client";

import React from 'react';
import styles from '../../styles/ModelSelector.module.css';

// In a real app, this would be imported from a shared location.
interface AvailableModel {
    id: string;
    name: string;
}

interface ModelSelectorProps {
    selectedModel: AvailableModel;
    onSwapModel: () => void; // Placeholder for future functionality
}

const ModelSelector: React.FC<ModelSelectorProps> = ({ selectedModel, onSwapModel }) => {
    return (
        <div className={styles.paramItem}>
            <span className={styles.paramLabel}>选择模型</span>
            <div className={styles.modelSelector}>
                <span className={styles.modelInfo}>
                    <i className="fas fa-microchip"></i>
                    {selectedModel.name}
                </span>
                <button className={styles.modelSwapBtn} onClick={onSwapModel} title="切换模型（开发中）">
                    <i className="fas fa-exchange-alt"></i>
                </button>
            </div>
        </div>
    );
};

export default ModelSelector;