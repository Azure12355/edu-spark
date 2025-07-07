"use client";
import React from 'react';
import styles from './StemViewer.module.css';
import MarkdownRenderer from '@/shared/components/ui/MarkdownRenderer/MarkdownRenderer';

export default ({ stem }: { stem: string }) => (
    <div className={styles.stemWrapper}><MarkdownRenderer content={stem} /></div>
);