"use client";

import React from 'react';
import { Reorder } from 'framer-motion';
import styles from './EditableSectionNode.module.css';
// [!code focus start]
// 1. 导入新的领域类型
import { SectionVO, KnowledgePoint } from '../../types';
// [!code focus end]
import EditableInput from '../common/EditableInput/EditableInput';
import EditablePointNode from '../EditablePointNode/EditablePointNode';
import Tooltip from '@/shared/components/ui/Tooltip/Tooltip';

// 2. 更新 Props 接口
interface EditableSectionNodeProps {
    section: SectionVO;
    onUpdate: (field: keyof SectionVO, value: any) => void;
    onDelete: () => void;
    onAddPoint: () => void;
    // 新增用于更新知识点的回调
    onPointUpdate: (pointIndex: number, field: keyof KnowledgePoint, value: any) => void;
    onPointDelete: (pointIndex: number) => void;
}

const EditableSectionNode: React.FC<EditableSectionNodeProps> = ({
                                                                     section,
                                                                     onUpdate,
                                                                     onDelete,
                                                                     onAddPoint,
                                                                     onPointUpdate,
                                                                     onPointDelete,
                                                                 }) => {
    return (
        <div className={styles.sectionContainer}>
            <header className={styles.sectionHeader}>
                <div className={styles.dragHandle} title="拖拽排序">
                    <i className="fas fa-grip-vertical"></i>
                </div>
                <EditableInput
                    value={section.title}
                    onSave={(newTitle) => onUpdate('title', newTitle)}
                    className={styles.sectionTitleInput}
                    placeholder="输入小节标题"
                />
                <div className={styles.itemActions}>
                    <Tooltip content="添加知识点" position="top">
                        <button onClick={onAddPoint}>
                            <i className="fas fa-plus-circle"></i>
                        </button>
                    </Tooltip>
                    <Tooltip content="删除此小节" position="top">
                        <button onClick={onDelete} className={styles.deleteButton}>
                            <i className="fas fa-trash-alt"></i>
                        </button>
                    </Tooltip>
                </div>
            </header>

            {/* 3. 为知识点列表添加拖拽排序功能 */}
            <div className={styles.pointListWrapper}>
                <Reorder.Group
                    axis="y"
                    values={section.points}
                    onReorder={(newPoints) => onUpdate('points', newPoints)}
                    className={styles.pointList}
                >
                    {section.points.map((point, ptIndex) => (
                        <Reorder.Item
                            key={point.id}
                            value={point}
                            className={styles.reorderItem}
                        >
                            <EditablePointNode
                                point={point}
                                onUpdate={(field, value) => onPointUpdate(ptIndex, field, value)}
                                onDelete={() => onPointDelete(ptIndex)}
                            />
                        </Reorder.Item>
                    ))}
                </Reorder.Group>
            </div>
        </div>
    );
};

export default EditableSectionNode;