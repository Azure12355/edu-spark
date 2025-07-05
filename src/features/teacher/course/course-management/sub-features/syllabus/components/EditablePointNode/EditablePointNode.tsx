"use client";

import React from 'react';
import styles from './EditablePointNode.module.css';
// [!code focus start]
// 1. 导入我们新的领域类型
import { KnowledgePoint } from '../../types';
// [!code focus end]
import EditableInput from '../common/EditableInput/EditableInput';
import Tooltip from '@/shared/components/ui/Tooltip/Tooltip';

// 定义组件的 Props 接口
interface EditablePointNodeProps {
    point: KnowledgePoint;
    onUpdate: (field: keyof KnowledgePoint, value: any) => void;
    onDelete: () => void;
}

// 2. 将类型选择器抽离为独立的子组件，代码更清晰
const PointTypeSelector: React.FC<{
    currentType: KnowledgePoint['type'];
    onSelect: (newType: KnowledgePoint['type']) => void;
}> = ({ currentType, onSelect }) => {
    const types: KnowledgePoint['type'][] = ['核心', '重点', '选学'];
    const typeStyleMap: Record<KnowledgePoint['type'], string> = {
        '核心': styles.typeCore,
        '重点': styles.typeImportant,
        '选学': styles.typeOptional
    };

    return (
        <div className={styles.typeSelector}>
            {types.map(type => (
                <Tooltip key={type} content={`设为"${type}"`} position="top">
                    <button
                        className={`${styles.typeTag} ${typeStyleMap[type]} ${currentType === type ? styles.activeType : ''}`}
                        onClick={() => onSelect(type)}
                    >
                        {type}
                    </button>
                </Tooltip>
            ))}
        </div>
    );
};


const EditablePointNode: React.FC<EditablePointNodeProps> = ({ point, onUpdate, onDelete }) => {
    return (
        <div className={styles.pointItem}>
            {/* 拖拽手柄 */}
            <div className={styles.dragHandle} title="拖拽排序">
                <i className="fas fa-grip-vertical"></i>
            </div>

            {/* 类型选择器 */}
            <PointTypeSelector
                currentType={point.type}
                onSelect={(newType) => onUpdate('type', newType)}
            />

            {/* 可编辑的标题输入框 */}
            <div className={styles.titleWrapper}>
                <EditableInput
                    value={point.title}
                    onSave={(newTitle) => onUpdate('title', newTitle)}
                    className={styles.pointTitleInput}
                    placeholder="输入知识点标题"
                />
            </div>

            {/* 操作按钮组 */}
            <div className={styles.itemActions}>
                <Tooltip content="删除此知识点" position="top">
                    <button onClick={onDelete} className={styles.deleteButton}>
                        <i className="fas fa-trash-alt"></i>
                    </button>
                </Tooltip>
            </div>
        </div>
    );
};

export default EditablePointNode;