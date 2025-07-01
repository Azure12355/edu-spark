"use client";
import React from 'react';
import { motion } from 'framer-motion';
import styles from './ContentSection.module.css';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface ContentSectionProps {
    title: string;
    markdownContent: string;
}

const ContentSection: React.FC<ContentSectionProps> = ({ title, markdownContent }) => {
    return (
        <motion.section
            className={styles.section}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5 }}
        >
            <h2 className={styles.title}>{title}</h2>
            <div className={`${styles.content} markdown-body`}>
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {markdownContent}
                </ReactMarkdown>
            </div>
        </motion.section>
    );
};
export default ContentSection;