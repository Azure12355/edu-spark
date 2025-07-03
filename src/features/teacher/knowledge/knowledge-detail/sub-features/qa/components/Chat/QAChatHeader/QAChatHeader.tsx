// src/features/teacher/knowledge/knowledge-detail/sub-features/qa/components/QAChatHeader.tsx
import React from 'react';
import styles from './QAChatHeader.module.css';

interface QAChatHeaderProps {
    onClear: () => void;
}

/**
 * 知识问答聊天视图的头部组件
 * @description 显示标题和操作按钮（如清空对话）。
 */
const QAChatHeader: React.FC<QAChatHeaderProps> = ({ onClear }) => {
    return (
        <header className={styles.chatHeader}>
            <div className={styles.headerInfo}>
                <i className="fas fa-question-circle"></i>
                <h3>知识库问答测试</h3>
            </div>
            <div className={styles.headerActions}>
                <button className={styles.actionButton} onClick={onClear} title="清空对话记录">
                    <i className="fas fa-trash-alt"></i>
                    <span>清空</span>
                </button>
            </div>
        </header>
    );
};

export default QAChatHeader;