// [!file src/features/teacher/course/course-management/sub-features/assignments-management/components/AssignmentTemplateList/AssignmentTemplateList.tsx]
"use client";

import React from 'react';
import styles from './AssignmentTemplateList.module.css';
import { AssignmentVO } from '@/shared/types';
import TemplateCard from './TemplateCard';

interface AssignmentTemplateListProps {
    templates: AssignmentVO[];
    isLoading: boolean;
    onEditTemplate: (templateId: number) => void;
    onDeleteTemplate: (templateId: number) => void;
    onViewDetails: (templateId: number) => void;
    onPublishTemplate: (template: AssignmentVO) => void;
}

const AssignmentTemplateList: React.FC<AssignmentTemplateListProps> = ({
                                                                           templates,
                                                                           isLoading,
                                                                           onEditTemplate,
                                                                           onDeleteTemplate,
                                                                           onViewDetails,
                                                                           onPublishTemplate,
                                                                       }) => {
    return (
        <div className={styles.listContainer}>
            <div className={styles.templateGrid}>
                {templates.map(template => (
                    <TemplateCard
                        key={template.id}
                        template={template}
                        onEdit={onEditTemplate}
                        onDelete={onDeleteTemplate}
                        onView={onViewDetails}
                        onPublish={onPublishTemplate}
                    />
                ))}
            </div>

            {/* 加载遮罩层，用于翻页等局部加载场景 */}
            {isLoading && templates.length > 0 && (
                <div className={styles.loadingOverlay}>
                    <i className="fas fa-spinner fa-spin"></i>
                </div>
            )}
        </div>
    );
};

export default AssignmentTemplateList;