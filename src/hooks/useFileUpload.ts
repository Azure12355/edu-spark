import { useState, useCallback } from 'react';
import { uploadDocument, getDocumentStatus } from '@/services/knowledgeService';
import { useToast } from './useToast';

// ... (UploadableFile, UploadStatus, POLLING_INTERVAL 定义保持不变) ...
export type UploadStatus = 'waiting' | 'uploading' | 'processing' | 'success' | 'failed';

export interface UploadableFile {
    file: File;
    id: string;
    status: UploadStatus;
    progress: number;
    error?: string;
    documentId?: number;
}
const POLLING_INTERVAL = 2000;

export const useFileUpload = (kbId: string | number) => {
    const [filesToUpload, setFilesToUpload] = useState<UploadableFile[]>([]);
    const [isGlobalUploading, setIsGlobalUploading] = useState(false);
    const showToast = useToast(); // 虽然拦截器会显示错误，但我们保留它用于显示成功/信息类提示

    const updateFileStatus = useCallback((fileId: string, updates: Partial<UploadableFile>) => {
        setFilesToUpload(prev =>
            prev.map(f => (f.id === fileId ? { ...f, ...updates } : f))
        );
    }, []);

    // 轮询逻辑现在也更简洁
    const pollStatus = useCallback(async (fileId: string, documentId: number) => {
        try {
            const statusResult = await getDocumentStatus(documentId);
            if (statusResult.status === 2) { // COMPLETED
                updateFileStatus(fileId, { status: 'success' });
                showToast({ message: `文件 "${filesToUpload.find(f => f.id === fileId)?.file.name}" 处理成功！`, type: 'success' });
                return 'done';
            }
            if (statusResult.status === 9) { // FAILED
                updateFileStatus(fileId, { status: 'failed', error: statusResult.errorMessage });
                // 错误提示已由拦截器处理
                return 'done';
            }
            return 'continue';
        } catch (error) {
            // 错误提示已由拦截器处理
            updateFileStatus(fileId, { status: 'failed', error: '获取状态失败' });
            return 'done';
        }
    }, [showToast, updateFileStatus, filesToUpload]);

    // 上传单个文件的逻辑
    const startUpload = useCallback(async (uploadableFile: UploadableFile) => {
        updateFileStatus(uploadableFile.id, { status: 'uploading', progress: 0 });
        try {
            const { documentId } = await uploadDocument(
                kbId,
                uploadableFile.file,
                (progressEvent) => {
                    const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                    updateFileStatus(uploadableFile.id, { progress: percentCompleted });
                }
            );

            updateFileStatus(uploadableFile.id, { status: 'processing', documentId });

            const intervalId = setInterval(async () => {
                const result = await pollStatus(uploadableFile.id, documentId);
                if (result === 'done') clearInterval(intervalId);
            }, POLLING_INTERVAL);

        } catch (error) {
            // 【核心变化】: 此处的 catch 块现在可以留空！
            // 因为 apiClient 的响应拦截器已经统一处理了错误弹窗。
            // 我们只需要确保更新文件的UI状态即可。
            updateFileStatus(uploadableFile.id, { status: 'failed', error: (error as Error).message });
        }
    }, [kbId, updateFileStatus, pollStatus]);

    // 批量上传的逻辑保持不变
    const handleBatchUpload = useCallback(async () => {
        // ...
        setIsGlobalUploading(true);
        showToast({ message: `开始处理 ${filesToUpload.filter(f => f.status === 'waiting').length} 个文件...`, type: 'info' });
        await Promise.allSettled(filesToUpload.filter(f => f.status === 'waiting').map(file => startUpload(file)));
        setIsGlobalUploading(false);
    }, [filesToUpload, isGlobalUploading, startUpload, showToast]);

    return { filesToUpload, setFilesToUpload, isGlobalUploading, handleBatchUpload };
};