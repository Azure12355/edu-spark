"use client";
import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useKnowledgeStore } from '@/store/knowledgeStore';
import { useToast } from '@/hooks/useToast';
import { Document, DocumentSourceType, DocumentStatus } from '@/types/knowledge';

// --- 组件导入 ---
import ImportHeader from '@/components/teacher/knowledge/detail/DocumentTab/DocumentImport/ImportHeader/ImportHeader';
import ImportSourceTabs from '@/components/teacher/knowledge/detail/DocumentTab/DocumentImport/ImportSourceTabs/ImportSourceTabs';
import FileUploadArea from '@/components/teacher/knowledge/detail/DocumentTab/DocumentImport/FileUploadArea/FileUploadArea';
import FileList from '@/components/teacher/knowledge/detail/DocumentTab/DocumentImport/FileList/FileList';
import ImportOptions from '@/components/teacher/knowledge/detail/DocumentTab/DocumentImport/ImportOptions/ImportOptions';
import ImportActions from '@/components/teacher/knowledge/detail/DocumentTab/DocumentImport/ImportActions/ImportActions';

// --- 样式导入 ---
import styles from './import.module.css';

// 1. 定义本地文件状态的类型 (保持不变)
type UploadStatus = 'waiting' | 'uploading' | 'success' | 'failed';
interface UploadableFile {
    file: File;
    id: string;
    status: UploadStatus;
    progress: number;
    error?: string;
}

// 2. 模拟上传服务 (核心修改)
const simulateUpload = (file: File, onProgress: (progress: number) => void): Promise<Document> => {
    return new Promise((resolve, reject) => {
        let progress = 0;
        const interval = setInterval(() => {
            progress += Math.random() * 25;
            if (progress >= 100) {
                clearInterval(interval);
                onProgress(100);

                if (Math.random() > 0.2) {
                    const now = new Date();
                    const timestamp = now.getTime();
                    const randomSuffix = Math.random().toString(36).substring(2, 7);

                    resolve({
                        // --- 核心修复：生成更唯一的ID ---
                        id: `doc_local_${timestamp}_${randomSuffix}`,
                        coze_document_id: `coze_doc_${timestamp}_${randomSuffix}`,
                        knowledge_base_id: '',
                        name: file.name,
                        type: file.name.split('.').pop() as any || 'txt',
                        size: file.size,
                        source_type: 0,
                        status: 'COMPLETED',
                        slice_count: Math.floor(Math.random() * 200) + 1,
                        char_count: Math.floor(file.size / 2.5),
                        created_at: now.toISOString(),
                        updated_at: now.toISOString(),
                    });
                } else {
                    reject(new Error('模拟上传失败：网络超时'));
                }
            } else {
                onProgress(Math.round(progress));
            }
        }, 300);
    });
};


export default function ImportDocumentPage() {
    const router = useRouter();
    const params = useParams();
    const kbId = params.id as string;

    // 3. 状态管理 (保持不变)
    const [activeTab, setActiveTab] = useState('local');
    const [filesToUpload, setFilesToUpload] = useState<UploadableFile[]>([]);
    const [isUploading, setIsUploading] = useState(false);

    // 4. 从 Store 和 Hooks 获取 Actions (保持不变)
    const addDocumentsToStore = useKnowledgeStore(state => state.addDocuments);
    const showToast = useToast();

    const handleFilesAdded = (newFiles: FileList) => {
        const newUploadableFiles: UploadableFile[] = Array.from(newFiles).map(file => ({
            file,
            // 使用文件名+最后修改时间作为列表的key，这通常是唯一的
            id: `${file.name}-${file.lastModified}`,
            status: 'waiting',
            progress: 0,
        }));
        // 防止重复添加相同的文件
        setFilesToUpload(prev => {
            const existingIds = new Set(prev.map(f => f.id));
            const uniqueNewFiles = newUploadableFiles.filter(f => !existingIds.has(f.id));
            return [...prev, ...uniqueNewFiles];
        });
    };

    const handleFileDelete = (fileId: string) => {
        setFilesToUpload(prev => prev.filter(f => f.id !== fileId));
    };

    // 5. 核心：处理导入逻辑 (保持不变)
    const handleImport = async () => {
        if (filesToUpload.length === 0 || isUploading) return;

        setIsUploading(true);

        const uploadPromises = filesToUpload
            .filter(f => f.status === 'waiting')
            .map(uploadableFile => {
                setFilesToUpload(prev => prev.map(f =>
                    f.id === uploadableFile.id ? { ...f, status: 'uploading' as UploadStatus, progress: 0 } : f
                ));

                return simulateUpload(uploadableFile.file, (progress) => {
                    setFilesToUpload(prev => prev.map(f =>
                        f.id === uploadableFile.id ? { ...f, progress } : f
                    ));
                })
                    .then(doc => {
                        setFilesToUpload(prev => prev.map(f =>
                            f.id === uploadableFile.id ? { ...f, status: 'success' as UploadStatus, progress: 100 } : f
                        ));
                        return doc;
                    })
                    .catch(error => {
                        setFilesToUpload(prev => prev.map(f =>
                            f.id === uploadableFile.id ? { ...f, status: 'failed' as UploadStatus, error: error.message } : f
                        ));
                        return null;
                    });
            });

        const results = await Promise.all(uploadPromises);
        const successfulDocs = results.filter((doc): doc is Document => doc !== null);

        if (successfulDocs.length > 0) {
            addDocumentsToStore(kbId, successfulDocs);
            showToast({ message: `成功导入 ${successfulDocs.length} 个文档！`, type: 'success' });
        }

        const failedCount = results.length - successfulDocs.length;
        if(failedCount > 0) {
            showToast({ message: `${failedCount} 个文档导入失败。`, type: 'error' });
        }

        setIsUploading(false);

        setTimeout(() => {
            router.push(`/teacher/knowledge/${kbId}`);
        }, 2000);
    };

    return (
        <div className={styles.pageContainer}>
            <ImportHeader />
            <div className={styles.content}>
                <ImportSourceTabs activeTab={activeTab} onTabChange={setActiveTab} />

                {activeTab === 'local' && (
                    <>
                        <FileUploadArea onFilesAdded={handleFilesAdded} />
                        <FileList files={filesToUpload} onDelete={handleFileDelete} />
                        <ImportOptions />
                        <ImportActions
                            onImport={handleImport}
                            onCancel={() => router.back()}
                            isUploading={isUploading}
                            canImport={filesToUpload.some(f => f.status === 'waiting')}
                        />
                    </>
                )}

                {activeTab !== 'local' && (
                    <div style={{padding: '40px', textAlign: 'center', color: '#6c757d'}}>
                        <p>{`“${activeTab}”导入功能正在开发中...`}</p>
                    </div>
                )}
            </div>
        </div>
    );
}