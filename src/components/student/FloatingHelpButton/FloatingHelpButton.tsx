"use client";
import React from 'react';
import styles from './FloatingHelpButton.module.css';

const FloatingHelpButton = () => {
    return (
        <button className={styles.helpButton}>
            <i className="fas fa-question"></i>
        </button>
    );
};

export default FloatingHelpButton;