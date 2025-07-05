"use client";

import React from 'react';
import { Reorder } from 'framer-motion';
import styles from './EditableChapterNode.module.css';
// 1. 导入新的领域类型
import { ChapterVO, SectionVO, KnowledgePoint } from '../../types';
import EditableInput from '../common/EditableInput/EditableInput';
import EditableSectionNode from '../EditableSectionNode/EditableSectionNode';
import Tooltip from '@/shared/components/ui/Tooltip/Tooltip';

// 2. 更新 Props 接口，使其更具体、更清晰
interface EditableChapterNodeProps {
    chapter: ChapterVO;
    onUpdate: (field: keyof ChapterVO, value: any) => void;
    onDelete: () => void;
    onAddSection: () => void;

    // 用于处理子组件（小节、知识点）事件的回调
    onSectionUpdate: (sectionIndex: number, field: keyof SectionVO, value: any) => void;
    onSectionDelete: (sectionIndex: number) => void;
    onAddPoint: (sectionIndex: number) => void;
    onPointUpdate: (sectionIndex: number, pointIndex: number, field: keyof KnowledgePoint, value: any) => void;
    onPointDelete: (sectionIndex: number, pointIndex: number) => void;
}

const EditableChapterNode: React.FC<EditableChapterNodeProps> = ({
                                                                     chapter,
                                                                     onUpdate,
                                                                     onDelete,
                                                                     onAddSection,
                                                                     onSectionUpdate,
                                                                     onSectionDelete,
                                                                     onAddPoint,
                                                                     onPointUpdate,
                                                                     onPointDelete,
                                                                 }) => {
    return (
        <div className={styles.chapterContainer}>
            <header className={styles.chapterHeader}>
                <div className={styles.dragHandle} title="拖拽排序章节">
                    <i className="fas fa-grip-vertical"></i>
                </div>
                <div className={styles.titleWrapper}>
                    <EditableInput
                        value={chapter.title}
                        onSave={(newTitle) => onUpdate('title', newTitle)}
                        className={styles.chapterTitleInput}
                        placeholder="输入章节标题"
                    />
                    <EditableInput
                        value={chapter.description}
                        onSave={(newDesc) => onUpdate('description', newDesc)}
                        className={styles.chapterDescriptionInput}
                        placeholder="输入章节描述..."
                    />
                </div>
                <div className={styles.itemActions}>
                    <Tooltip content="添加小节" position="top">
                        <button onClick={onAddSection}>
                            <i className="fas fa-plus-circle"></i>
                        </button>
                    </Tooltip>
                    <Tooltip content="删除此章节" position="top">
                        <button onClick={onDelete} className={styles.deleteButton}>
                            <i className="fas fa-trash-alt"></i>
                        </button>
                    </Tooltip>
                </div>
            </header>

            {/* 3. 小节列表的拖拽排序 */}
            <div className={styles.sectionListWrapper}>
                <Reorder.Group
                    axis="y"
                    values={chapter.sections}
                    onReorder={(newSections) => onUpdate('sections', newSections)}
                    className={styles.sectionList}
                >
                    {chapter.sections.map((section, secIndex) => (
                        <Reorder.Item
                            key={section.id}
                            value={section}
                            className={styles.reorderItem}
                        >
                            <EditableSectionNode
                                section={section}
                                onUpdate={(field, value) => onSectionUpdate(secIndex, field, value)}
                                onDelete={() => onSectionDelete(secIndex)}
                                onAddPoint={() => onAddPoint(secIndex)}
                                onPointUpdate={(ptIndex, field, value) => onPointUpdate(secIndex, ptIndex, field, value)}
                                onPointDelete={(ptIndex) => onPointDelete(secIndex, ptIndex)}
                            />
                        </Reorder.Item>
                    ))}
                </Reorder.Group>
            </div>
        </div>
    );
};

export default EditableChapterNode;