"use client";
import React, { useState, ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './ConfigSection.module.css';

interface ConfigSectionProps {
    icon: string;
    title: string;
    children: ReactNode;
    defaultOpen?: boolean;
}

const ConfigSection: React.FC<ConfigSectionProps> = ({ icon, title, children, defaultOpen = true }) => {
    const [isOpen, setIsOpen] = useState(defaultOpen);

    return (
        <div className={styles.sectionContainer}>
            <div className={styles.sectionHeader} onClick={() => setIsOpen(!isOpen)}>
                <i className={`fas fa-chevron-right ${styles.chevron} ${isOpen ? styles.open : ''}`}></i>
                <div className={styles.titleWrapper}>
                    <i className={`${icon} ${styles.titleIcon}`}></i>
                    <h3 className={styles.title}>{title}</h3>
                </div>
            </div>
            <AnimatePresence initial={false}>
                {isOpen && (
                    <motion.div
                        className={styles.content}
                        initial="collapsed"
                        animate="open"
                        exit="collapsed"
                        variants={{
                            open: { opacity: 1, height: 'auto', marginTop: '16px' },
                            collapsed: { opacity: 0, height: 0, marginTop: 0 }
                        }}
                        transition={{ duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] }}
                    >
                        {children}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default ConfigSection;