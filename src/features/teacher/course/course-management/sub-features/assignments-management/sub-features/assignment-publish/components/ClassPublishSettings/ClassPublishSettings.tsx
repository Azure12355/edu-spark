// [!file src/features/teacher/course/course-management/sub-features/assignments-management/sub-features/assignment-publish/components/ClassPublishSettings/ClassPublishSettings.tsx]
"use client";

import React, { useState } from 'react';
import styles from './ClassPublishSettings.module.css';
import { ClassPublishConfig } from '../../hooks/useAssignmentPublish';
import ClassRow from './ClassRow';

interface ClassPublishSettingsProps {
    configs: ClassPublishConfig[];
    onConfigChange: (classId: number, newConfig: Partial<ClassPublishConfig>) => void;
    onApplyToAll: (config: Partial<Omit<ClassPublishConfig, 'classId' | 'className'>>) => void;
}

const ClassPublishSettings: React.FC<ClassPublishSettingsProps> = ({
                                                                       configs,
                                                                       onConfigChange,
                                                                       onApplyToAll,
                                                                   }) => {
    const [globalDueAt, setGlobalDueAt] = useState('');

    const handleApplyDueAtToAll = () => {
        if (globalDueAt) {
            onApplyToAll({ dueAt: new Date(globalDueAt).toISOString() });
        }
    };

    return (
        <section className={styles.settingsContainer}>
            <div className={styles.header}>
                <h2 className={styles.sectionTitle}>发布到班级</h2>
                <div className={styles.batchActions}>
                    <label htmlFor="globalDueAt">统一设置截止时间:</label>
                    <input
                        id="globalDueAt"
                        type="datetime-local"
                        value={globalDueAt}
                        onChange={(e) => setGlobalDueAt(e.target.value)}
                        className={styles.globalDateInput}
                    />
                    <button onClick={handleApplyDueAtToAll} className={styles.applyButton}>应用</button>
                </div>
            </div>

            <div className={styles.listContainer}>
                {/* 表头 */}
                <div className={styles.listHeader}>
                    <div style={{width: '40px'}}></div> {/* Checkbox */}
                    <div style={{flex: 2}}>班级</div>
                    <div style={{flex: 1.5}}>开始时间</div>
                    <div style={{flex: 1.5}}>截止时间</div>
                    <div style={{width: '60px'}}>设置</div>
                </div>
                {/* 班级列表 */}
                <div className={styles.listBody}>
                    {configs.map(config => (
                        <ClassRow
                            key={config.classId}
                            config={config}
                            onConfigChange={onConfigChange}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ClassPublishSettings;