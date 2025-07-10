// [!file src/features/student/home/components/common/ActionCard/ActionCard.tsx]
import React from 'react';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import styles from './ActionCard.module.css';

export interface ActionCardProps {
    href: string;
    icon: string;
    title: string;
    description: string;
    themeColor: string; // e.g., '#4f46e5'
}

const ActionCard: React.FC<ActionCardProps> = ({ href, icon, title, description, themeColor }) => {
    // 将十六进制颜色转换为带透明度的rgba，用于辉光效果
    const hexToRgba = (hex: string, alpha: number) => {
        const r = parseInt(hex.slice(1, 3), 16);
        const g = parseInt(hex.slice(3, 5), 16);
        const b = parseInt(hex.slice(5, 7), 16);
        return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    };

    const style = {
        '--theme-color': themeColor,
        '--theme-color-alpha': hexToRgba(themeColor, 0.15),
    } as React.CSSProperties;

    return (
        <Link href={href} className={styles.cardLink}>
            <div className={styles.cardContainer} style={style}>
                <div className={styles.glowEffect}></div>
                <header className={styles.cardHeader}>
                    <div className={styles.iconWrapper}>
                        <i className={icon}></i>
                    </div>
                </header>
                <div className={styles.cardBody}>
                    <h3 className={styles.title}>{title}</h3>
                    <p className={styles.description}>{description}</p>
                </div>
                <div className={styles.actionHint}>
                    进入 <ChevronRight size={16} />
                </div>
            </div>
        </Link>
    );
};

export default ActionCard;