"use client";

import React, { useState, useEffect, useMemo } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useKnowledgeStore } from '@/store/knowledgeStore';
import { useChunkStore } from '@/store/chunkStore';
import { Document, KnowledgeBase, Chunk } from '@/types/knowledge';

import KnowledgeDetailLayout from '@/components/teacher/knowledge/detail/layout/KnowledgeDetailLayout';
import Pagination from '@/components/common/Pagination/Pagination';
import AddChunkModal from '@/components/teacher/knowledge/detail/ChunkTab/AddChunkModal/AddChunkModal';

import KnowledgeBaseInfo from '@/components/teacher/knowledge/detail/BasicInfoTab/KnowledgeBaseInfo';
import DocumentTable from '@/components/teacher/knowledge/detail/DocumentTab/DocumentTable/DocumentTable';
import DocumentToolbar from '@/components/teacher/knowledge/detail/DocumentTab/DocumentToolbar/DocumentToolbar';
import ChunkGrid from '@/components/teacher/knowledge/detail/ChunkTab/ChunkGrid/ChunkGrid';
import ChunkToolbar from '@/components/teacher/knowledge/detail/ChunkTab/ChunkToolbar/ChunkToolbar';
import QAChatView from '@/components/teacher/knowledge/detail/QAChatTab/QAChatView/QAChatView';
import QAParameters from '@/components/teacher/knowledge/detail/QAChatTab/QAParameters/QAParameters';
import RetrievalParameters from '@/components/teacher/knowledge/detail/RetrievalTab/RetrievalParameters/RetrievalParameters';
import SearchAndResults from '@/components/teacher/knowledge/detail/RetrievalTab/SearchAndResults/SearchAndResults';

import styles from './knowledgeDetail.module.css';
import { useToast } from '@/hooks/useToast';

const LoadingOrErrorState: React.FC<{ message: string }> = ({ message }) => (
    <div className={styles.centeredState}><div className={styles.spinner}></div><p>{message}</p></div>
);

export default function KnowledgeDetailPage() {
    const params = useParams();
    const router = useRouter();
    const kbId = params.id as string;

    const { getKnowledgeBaseById, getDocumentsByKbId } = useKnowledgeStore();
    const {
        chunks, addChunk, sourceFilter, searchTerm,
        currentPage, setCurrentPage, itemsPerPage
    } = useChunkStore();

    const [kb, setKb] = useState<KnowledgeBase | null>(null);
    const [documents, setDocuments] = useState<Document[]>([]);
    const [activeTab, setActiveTab] = useState('切片详情');
    const [isLoading, setIsLoading] = useState(true);
    const [isChunkModalOpen, setIsChunkModalOpen] = useState(false);
    const showToast = useToast();

    useEffect(() => {
        const knowledgeBase = getKnowledgeBaseById(kbId);
        if (knowledgeBase) {
            setKb(knowledgeBase);
            const associatedDocs = getDocumentsByKbId(kbId);
            setDocuments(associatedDocs);
            setIsLoading(false);
        } else {
            const timer = setTimeout(() => router.push('/teacher/knowledge'), 2000);
            return () => clearTimeout(timer);
        }
    }, [kbId, getKnowledgeBaseById, getDocumentsByKbId, router]);

    const handleAddChunk = (newChunkData: { documentId: string, content: string }) => {
        const sourceDoc = documents.find(d => d.id === newChunkData.documentId);
        if (!sourceDoc) return;

        addChunk({
            document_id: newChunkData.documentId,
            content: newChunkData.content,
            source_document_name: sourceDoc.name,
            char_count: newChunkData.content.length,
            order_in_document: (chunks.filter(c => c.document_id === newChunkData.documentId).length || 0) + 1,
            created_at: new Date().toISOString(),
        });
        showToast({ message: "新切片已添加", type: 'success' });
    };

    // 核心：分页逻辑
    const filteredChunks = useMemo(() => {
        let processedData = [...chunks];
        if (sourceFilter !== 'ALL') {
            const selectedDoc = documents.find(d => d.id === sourceFilter);
            processedData = selectedDoc ? processedData.filter(c => c.source_document_name === selectedDoc.name) : [];
        }
        if (searchTerm.trim()) {
            const lowercasedTerm = searchTerm.toLowerCase();
            processedData = processedData.filter(c => c.content.toLowerCase().includes(lowercasedTerm));
        }
        return processedData;
    }, [chunks, sourceFilter, searchTerm, documents]);

    const totalPages = Math.ceil(filteredChunks.length / itemsPerPage);
    const currentChunks = useMemo(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        return filteredChunks.slice(startIndex, startIndex + itemsPerPage);
    }, [currentPage, itemsPerPage, filteredChunks]);

    const renderTabContent = () => {
        if (!kb) return null;
        switch(activeTab) {
            case '切片详情':
                return (
                    <div className={styles.singleColumnView}>
                        <ChunkToolbar
                            chunkCount={filteredChunks.length}
                            onOpenAddModal={() => setIsChunkModalOpen(true)}
                        />
                        <div className={styles.tableContainer}>
                            <ChunkGrid chunks={currentChunks} />
                        </div>
                        <Pagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            onPageChange={setCurrentPage}
                        />
                    </div>
                );
            // ... 其他 case 保持不变
            case '基本信息': return <KnowledgeBaseInfo kb={kb} />;
            case '原始文档': return (
                <div className={styles.singleColumnView}>
                    <DocumentToolbar kbId={kb.id} />
                    <div className={styles.tableContainer}><DocumentTable documents={documents} kbId={kb.id} /></div>
                    <Pagination currentPage={1} totalPages={1} onPageChange={() => {}} />
                </div>
            );
            case '知识检索': return (
                <div className={styles.viewContainer}>
                    <div className={styles.leftPanel}><RetrievalParameters /></div>
                    <div className={styles.rightPanel}><SearchAndResults /></div>
                </div>
            );
            case '知识问答': return (
                <div className={styles.viewContainer}>
                    <div className={styles.leftPanel}><QAParameters /></div>
                    <div className={styles.rightPanel}><QAChatView /></div>
                </div>
            );
            default: return <div className={styles.centeredState}><p>{activeTab} 功能正在开发中...</p></div>;
        }
    }

    if (isLoading) return <LoadingOrErrorState message="正在加载知识库数据..." />;
    if (!kb) return <LoadingOrErrorState message="知识库不存在，即将返回列表页..." />;

    return (
        <>
            <KnowledgeDetailLayout kb={kb} activeTab={activeTab} onTabChange={setActiveTab}>
                {renderTabContent()}
            </KnowledgeDetailLayout>
            <AddChunkModal isOpen={isChunkModalOpen} onClose={() => setIsChunkModalOpen(false)} onAddChunk={handleAddChunk}/>
        </>
    );
}