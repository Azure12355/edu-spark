"use client";
import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useFileUpload, UploadableFile } from '@/hooks/useFileUpload'; // 引入新的Hook

// 组件导入保持不变

import styles from './import.module.css';
import ImportHeader from '@/components/teacher/knowledge/detail/tabs/documents/import/DocumentImport/ImportHeader/ImportHeader';
import ImportSourceTabs from '@/components/teacher/knowledge/detail/tabs/documents/import/DocumentImport/ImportSourceTabs/ImportSourceTabs';
import FileUploadArea
    from "@/components/teacher/knowledge/detail/tabs/documents/import/DocumentImport/FileUploadArea/FileUploadArea";
import ImportOptions
    from "@/components/teacher/knowledge/detail/tabs/documents/import/DocumentImport/ImportOptions/ImportOptions";
import ImportActions
    from "@/components/teacher/knowledge/detail/tabs/documents/import/DocumentImport/ImportActions/ImportActions";
import FileList from "@/components/teacher/knowledge/detail/tabs/documents/import/DocumentImport/FileList/FileList";

export default function ImportDocumentPage() {
    const router = useRouter();
    const params = useParams();
    const kbId = params.id as string;

    const [activeTab, setActiveTab] = useState('local');

    // 【核心重构】: 使用自定义 Hook 管理所有文件上传逻辑
    const {
        filesToUpload,
        setFilesToUpload,
        isGlobalUploading,
        handleBatchUpload,
    } = useFileUpload(kbId);

    const handleFilesAdded = (newFiles: FileList) => {
        const newUploadableFiles: UploadableFile[] = Array.from(newFiles).map(file => ({
            file,
            id: `${file.name}-${file.lastModified}`,
            status: 'waiting',
            progress: 0,
        }));

        setFilesToUpload(prev => {
            const existingIds = new Set(prev.map(f => f.id));
            const uniqueNewFiles = newUploadableFiles.filter(f => !existingIds.has(f.id));
            return [...prev, ...uniqueNewFiles];
        });
    };

    const handleFileDelete = (fileId: string) => {
        setFilesToUpload(prev => prev.filter(f => f.id !== fileId));
    };

    // 导入成功后，2秒后跳转回详情页
    const handleImportSuccess = () => {
        setTimeout(() => {
            router.push(`/teacher/knowledge/${kbId}`);
        }, 2000);
    };

    // 将 handleBatchUpload 和 handleImportSuccess 结合
    const handleStartImport = async () => {
        await handleBatchUpload();
        // 可以在这里添加一个判断，如果所有文件都成功了再跳转
        handleImportSuccess();
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
                            onImport={handleStartImport} // 使用新的处理函数
                            onCancel={() => router.back()}
                            isUploading={isGlobalUploading}
                            canImport={filesToUpload.some(f => f.status === 'waiting')}
                        />
                    </>
                )}

                {activeTab !== 'local' && (
                    <div style={{ padding: '40px', textAlign: 'center', color: '#6c757d' }}>
                        <p>{`“${activeTab}”导入功能正在开发中...`}</p>
                    </div>
                )}
            </div>
        </div>
    );
}