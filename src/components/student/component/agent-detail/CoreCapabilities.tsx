"use client";
import React from 'react';
import { motion } from 'framer-motion';
import styles from './CoreCapabilities.module.css';
import { AgentDetail } from '@/lib/data/agentDetailData';

interface CoreCapabilitiesProps {
    capabilities: AgentDetail['coreCapabilities'];
}

const CoreCapabilities: React.FC<CoreCapabilitiesProps> = ({ capabilities }) => {
    return (
        <motion.div
            className={styles.container}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ staggerChildren: 0.1 }}
        >
            {capabilities.map((cap, index) => (
                <motion.div
                    key={index}
                    className={styles.card}
                    style={{ '--glow-color': cap.color } as React.CSSProperties}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                    {cap.tag && <span className={`${styles.tag} ${styles[cap.tag]}`}>{cap.tag}</span>}
                    <div className={styles.icon}><i className={cap.icon}></i></div>
                    <h3 className={styles.title}>{cap.title}</h3>
                </motion.div>
            ))}
        </motion.div>
    );
};

export default CoreCapabilities;