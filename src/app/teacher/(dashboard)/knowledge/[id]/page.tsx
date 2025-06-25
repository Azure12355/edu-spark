"use client";
import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import styles from './knowledgeDetail.module.css';

// Data imports
import { knowledgeData, KnowledgeBase } from '@/lib/data/knowledgeData';
import { documentData } from '@/lib/data/documentData';
import { chunkData as initialChunkData, Chunk } from '@/lib/data/chunkData';

// Layout and Component imports
import KnowledgeDetailLayout from '@/components/teacher/knowledge/detail/layout/KnowledgeDetailLayout';
import Pagination from '@/components/teacher/knowledge/common/Pagination';
import AddChunkModal from '@/components/teacher/knowledge/detail/ChunkTab/AddChunkModal/AddChunkModal';

// View-specific component imports for each tab
import DocumentToolbar from '@/components/teacher/knowledge/detail/DocumentTab/DocumentToolbar/DocumentToolbar';
import DocumentTable from '@/components/teacher/knowledge/detail/DocumentTab/DocumentTable/DocumentTable';
import ChunkToolbar from '@/components/teacher/knowledge/detail/ChunkTab/ChunkToolbar/ChunkToolbar';
import ChunkGrid from '@/components/teacher/knowledge/detail/ChunkTab/ChunkGrid/ChunkGrid';
import RetrievalParameters from '@/components/teacher/knowledge/detail/RetrievalTab/RetrievalParameters/RetrievalParameters';
import SearchAndResults from '@/components/teacher/knowledge/detail/RetrievalTab/SearchAndResults/SearchAndResults';
import QAParameters from '@/components/teacher/knowledge/detail/QAChatTab/QAParameters/QAParameters';
import QAChatView from '@/components/teacher/knowledge/detail/QAChatTab/QAChatView/QAChatView';
import KnowledgeBaseInfo from '@/components/teacher/knowledge/detail/BasicInfoTab/KnowledgeBaseInfo';


export default function KnowledgeDetailPage() {
    const params = useParams();
    const router = useRouter();
    const kbId = params.id as string;

    const [activeTab, setActiveTab] = useState('知识问答'); // 默认激活 "知识问答" Tab
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [chunks, setChunks] = useState<Chunk[]>(initialChunkData);

    const kb = knowledgeData.find(k => k.id === kbId);

    // 如果找不到知识库，则安全地重定向或显示错误信息
    if (!kb) {
        // 在客户端组件中，确保 window 对象存在再执行路由跳转
        if (typeof window !== 'undefined') {
            router.push('/student/knowledge');
        }
        // 在服务器端或跳转前，可以显示一个加载/错误状态
        return <div>加载中或知识库不存在...</div>;
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

    // 根据激活的Tab渲染不同的核心内容视图
    const renderContent = () => {
        switch(activeTab) {
            case '基本信息':
                return <KnowledgeBaseInfo kb={kb} />;
            case '原始文档':
                return (
                    <div className={styles.singleColumnView}>
                        <DocumentToolbar />
                        <div className={styles.tableContainer}>
                            <DocumentTable documents={documentData} />
                        </div>
                        <Pagination />
                    </div>
                );
            case '切片详情':
                return (
                    <div className={styles.singleColumnView}>
                        <ChunkToolbar chunkCount={chunks.length} onOpenAddModal={() => setIsModalOpen(true)} />
                        <div className={styles.tableContainer}>
                            <ChunkGrid chunks={chunks} />
                        </div>
                        <Pagination />
                    </div>
                );
            case '知识检索':
                return (
                    <div className={styles.viewContainer}>
                        <div className={styles.leftPanel}>
                            <RetrievalParameters />
                        </div>
                        <div className={styles.rightPanel}>
                            <SearchAndResults />
                        </div>
                    </div>
                );
            case '知识问答':
                return (
                    <div className={styles.viewContainer}>
                        <div className={styles.leftPanel}>
                            <QAParameters />
                        </div>
                        <div className={styles.rightPanel}>
                            <QAChatView />
                        </div>
                    </div>
                );
            default:
                return (
                    <div style={{padding: '40px', textAlign: 'center', color: '#6c757d'}}>
                        <p>{activeTab} 功能正在开发中...</p>
                    </div>
                );
        }
    }

    return (
        <>
            {/* 使用主布局组件包裹所有内容 */}
            <KnowledgeDetailLayout
                kb={kb}
                activeTab={activeTab}
                onTabChange={setActiveTab}
            >
                {/* 渲染当前激活Tab对应的内容 */}
                {renderContent()}
            </KnowledgeDetailLayout>

            {/* "新增切片"弹窗，独立于主布局之外，通过状态控制 */}
            <AddChunkModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onAddChunk={handleAddChunk}
            />
        </>
    );
}