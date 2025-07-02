// src/features/teacher/knowledge/knowledge-detail/sub-features/document-management/components/StatusDisplay/StatusDisplay.tsx
"use client";

import React, { useMemo } from 'react';
import Tooltip from '@/shared/components/ui/Tooltip/Tooltip';
import styles from '../../style/StatusDisplay.module.css';

interface StatusDisplayProps {
    status: number;
    errorMessage?: string;
}

const StatusDisplay: React.FC<StatusDisplayProps> = React.memo(({ status, errorMessage }) => {
    const statusInfo = useMemo(() => {
        switch (status) {
            case 0:
                return { text: '待处理', icon: 'fas fa-clock', className: styles.statusWaiting };
            case 1:
                return { text: '处理中', icon: 'fas fa-sync-alt fa-spin', className: styles.statusProcessing };
            case 2:
                return { text: '完毕', icon: 'fas fa-check-circle', className: styles.statusCompleted };
            case 9:
            default:
                return { text: '失败', icon: 'fas fa-exclamation-circle', className: styles.statusError };
        }
    }, [status]);

    const content = (
        <span className={`${styles.statusTag} ${statusInfo.className}`}>
            <i className={statusInfo.icon}></i> {statusInfo.text}
        </span>
    );

    if (status === 9 && errorMessage) {
        return <Tooltip content={errorMessage}>{content}</Tooltip>;
    }

    return content;
});

StatusDisplay.displayName = 'StatusDisplay';

export default StatusDisplay;