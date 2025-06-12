"use client";
import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import styles from './knowledgeDetail.module.css';

import { knowledgeData } from '@/lib/data/knowledgeData';
import { documentData } from '@/lib/data/documentData';
import { chunkData as initialChunkData, Chunk } from '@/lib/data/chunkData'; // 引入切片数据和类型

// 引入所有组件
import DocumentHeader from '@/components/student/component/knowledge/detail/DocumentHeader';
import DocumentTabs from '@/components/student/component/knowledge/detail/DocumentTabs';
import DocumentToolbar from '@/components/student/component/knowledge/detail/DocumentToolbar';
import DocumentTable from '@/components/student/component/knowledge/detail/DocumentTable';
import Pagination from '@/components/student/component/knowledge/detail/Pagination';
import ChunkToolbar from '@/components/student/component/knowledge/detail/ChunkToolbar';
import ChunkGrid from '@/components/student/component/knowledge/detail/ChunkGrid';
import AddChunkModal from '@/components/student/component/knowledge/detail/AddChunkModal'; // 引入新弹窗

export default function KnowledgeDetailPage() {
    const params = useParams();
    const router = useRouter();
    const kbId = params.id as string;

    const [activeTab, setActiveTab] = useState('切片详情');
    // 新增状态：控制弹窗可见性
    const [isModalOpen, setIsModalOpen] = useState(false);
    // 新增状态：管理切片列表数据
    const [chunks, setChunks] = useState<Chunk[]>(initialChunkData);


    const kb = knowledgeData.find(k => k.id === kbId);

    if (!kb) {
        if (typeof window !== 'undefined') {
            router.push('/student/knowledge');
        }
        return <div>知识库不存在...</div>;
    }

    // 处理新增切片的逻辑
    const handleAddChunk = (newChunkData: { documentId: string, content: string }) => {
        console.log("新增切片:", newChunkData);
        const newChunk: Chunk = {
            id: `custom-chunk-${Date.now()}`,
            index: chunks.length + 1,
            content: newChunkData.content,
            sourceDocument: documentData.find(d => d.id === newChunkData.documentId)?.name || '未知文档',
            charCount: newChunkData.content.length,
            updatedAt: new Date().toISOString().slice(0, 19).replace('T', ' '),
        };
        // 更新状态，将新切片添加到列表最前面
        setChunks(prevChunks => [newChunk, ...prevChunks]);
    };

    // 根据激活的Tab渲染不同内容
    const renderContent = () => {
        switch(activeTab) {
            case '原始文档':
                return (
                    <div className={styles.contentWrapper}>
                        <DocumentToolbar />
                        <DocumentTable documents={documentData} />
                        <Pagination />
                    </div>
                );
            case '切片详情':
                return (
                    <div className={styles.contentWrapper}>
                        <ChunkToolbar chunkCount={chunks.length} onOpenAddModal={() => setIsModalOpen(true)} />
                        <ChunkGrid chunks={chunks} /> {/* 传递动态数据 */}
                        <Pagination />
                    </div>
                );
            default:
                return (
                    <div className={styles.contentWrapper} style={{padding: '40px', textAlign: 'center'}}>
                        <p>{activeTab} 功能正在开发中...</p>
                    </div>
                );
        }
    }

    return (
        <div className={styles.pageContainer}>
            <DocumentHeader kb={kb} />
            <DocumentTabs activeTab={activeTab} onTabChange={setActiveTab} />
            {renderContent()}

            {/* 集成弹窗组件 */}
            <AddChunkModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onAddChunk={handleAddChunk}
            />
        </div>
    );
}