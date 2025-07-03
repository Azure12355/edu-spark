// [!file src/features/teacher/knowledge/knowledge-detail/sub-features/qa/components/Chat/MessageList/References/ReferenceCard.tsx]
"use client";

// [!code focus start]
import React, { useState, useMemo } from 'react'; // 1. 导入 useState 和 useMemo
import ChunkPreviewModal from '@/features/teacher/knowledge/knowledge-detail/sub-features/chunk-management/components/ChunkPreviewModal'; // 2. 导入可复用的弹窗组件
import { ChunkVO } from '@/features/teacher/knowledge/knowledge-detail/sub-features/chunk-management/service/chunkService'; // 3. 导入弹窗所需的类型
// [!code focus end]
import styles from './ReferenceCard.module.css';

export interface Reference {
    id: number | string;
    docName: string;
    score: number;
    content: string;
}

interface ReferenceCardProps {
    reference: Reference;
}

const ReferenceCard: React.FC<ReferenceCardProps> = ({ reference }) => {
    // [!code focus start]
    // 4. 添加管理弹窗开关的状态
    const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false);

    // 5. 使用 useMemo 进行数据转换，将 Reference 类型适配为 ChunkVO 类型
    //    仅当 reference prop 变化时才重新计算，提升性能。
    const chunkForPreview: ChunkVO = useMemo(() => ({
        id: Number(reference.id),
        content: reference.content,
        documentName: reference.docName,
        // 以下是 ChunkVO 必需但 Reference 中没有的字段，用默认值填充
        charCount: reference.content.length,
        documentId: 0, // 预览时不需要，用0填充
        knowledgeBaseId: 0, // 预览时不需要，用0填充
        documentType: 'txt', // 假设为文本文档
        documentCosUrl: '', // 预览时不需要
        createdAt: new Date().toISOString(), // 用当前时间填充
        metadata: {},
    }), [reference]);

    // [!code focus end]

    return (
        // [!code focus start]
        // 6. 将整个卡片变成一个可点击的按钮，并添加 Fragment <> 来包裹卡片和弹窗
        <>
            <button
                className={styles.referenceCard}
                title={`点击预览引用来源：${reference.docName}`}
                onClick={() => setIsPreviewModalOpen(true)} // 7. 点击时打开弹窗
            >
                <div className={styles.refHeader}>
                    <i className="fas fa-file-alt"></i>
                    <span className={styles.refDocName} title={reference.docName}>
                        {reference.docName}
                    </span>
                    <span className={styles.refScore}>
                        {(reference.score * 100).toFixed(1)}%
                    </span>
                </div>
                <p className={styles.refContent}>{reference.content}</p>
            </button>

            {/* 8. 在此处渲染弹窗组件 */}
            <ChunkPreviewModal
                isOpen={isPreviewModalOpen}
                onClose={() => setIsPreviewModalOpen(false)}
                chunk={chunkForPreview} // 传递转换后的数据
            />
        </>
        // [!code focus end]
    );
};

export default ReferenceCard;