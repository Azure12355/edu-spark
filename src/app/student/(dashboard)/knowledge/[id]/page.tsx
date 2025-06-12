"use client";
import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import styles from './knowledgeDetail.module.css';

// Data imports
import { knowledgeData } from '@/lib/data/knowledgeData';
import { documentData } from '@/lib/data/documentData';
import { chunkData } from '@/lib/data/chunkData';

// Component imports
import DocumentHeader from '@/components/student/component/knowledge/detail/DocumentHeader';
import DocumentTabs from '@/components/student/component/knowledge/detail/DocumentTabs';
import DocumentToolbar from '@/components/student/component/knowledge/detail/DocumentToolbar';
import DocumentTable from '@/components/student/component/knowledge/detail/DocumentTable';
import Pagination from '@/components/student/component/knowledge/detail/Pagination';
import ChunkToolbar from '@/components/student/component/knowledge/detail/ChunkToolbar';
import ChunkGrid from '@/components/student/component/knowledge/detail/ChunkGrid';
import AddChunkModal from '@/components/student/component/knowledge/detail/AddChunkModal';

// New components for Retrieval View
import RetrievalParameters from '@/components/student/component/knowledge/detail/RetrievalParameters';
import SearchAndResults from '@/components/student/component/knowledge/detail/SearchAndResults';


export default function KnowledgeDetailPage() {
    const params = useParams();
    const router = useRouter();
    const kbId = params.id as string;

    const [activeTab, setActiveTab] = useState('知识检索'); // Default to Retrieval
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [chunks, setChunks] = useState(chunkData);

    const kb = knowledgeData.find(k => k.id === kbId);

    if (!kb) {
        if (typeof window !== 'undefined') {
            router.push('/student/knowledge');
        }
        return <div>知识库不存在...</div>;
    }

    const handleAddChunk = (newChunkData: { documentId: string, content: string }) => {
        // ... (logic from previous step)
    };

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
                        <ChunkGrid chunks={chunks} />
                        <Pagination />
                    </div>
                );
            case '知识检索':
                return (
                    <div className={styles.retrievalView}>
                        <div className={styles.leftPanel}>
                            <RetrievalParameters />
                        </div>
                        <div className={styles.rightPanel}>
                            <SearchAndResults />
                        </div>
                    </div>
                )
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

            <AddChunkModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onAddChunk={handleAddChunk}
            />
        </div>
    );
}