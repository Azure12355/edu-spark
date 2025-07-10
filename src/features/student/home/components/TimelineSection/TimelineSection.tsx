// src/features/student/home/components/TimelineSection/TimelineSection.tsx
"use client";

import React from 'react';
import styles from './TimelineSection.module.css';
import SectionHeader from '../common/SectionHeader/SectionHeader';
import TimelineCard, { TimelineCardData } from '../common/TimelineCard/TimelineCard';

interface TimelineSectionProps {
    title: string;
    items: TimelineCardData[];
    showMoreLink?: boolean;
}

const TimelineSection: React.FC<TimelineSectionProps> = ({ title, items, showMoreLink = false }) => {
    return (
        <section className={styles.timelineSectionContainer}>
            <SectionHeader title={title} showMoreLink={showMoreLink} />
            <div className={styles.timelineGrid}>
                {items.map(card => (
                    <TimelineCard key={card.id} card={card} />
                ))}
            </div>
        </section>
    );
};

export default TimelineSection;