"use client";

import React from 'react';
import styles from './CreativeGrid.module.css';
import CreativeCard, { CreativeCardData } from '../CreativeCard/CreativeCard';

interface CreativeGridProps {
    cards: CreativeCardData[];
}

const CreativeGrid: React.FC<CreativeGridProps> = ({ cards }) => {
    return (
        <div className={styles.creativeGrid}>
            {cards.map(card => (
                <CreativeCard key={card.id} card={card} />
            ))}
        </div>
    );
};

export default CreativeGrid;