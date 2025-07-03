// [!file src/features/teacher/knowledge/knowledge-detail/sub-features/qa/service/qaService.ts]
import apiClient from '@/shared/api/apiClient';
import type { AdvancedQARequest, QACompleteResponse, StreamProcessor } from '../types';

/**
 * 调用后端高级知识问答接口，并以流式方式处理响应。
 *
 * @param {AdvancedQARequest} request - 包含所有高级参数的问答请求。
 * @param {StreamProcessor} processor - 包含处理流数据的回调函数的对象。
 * @returns {() => void} - 返回一个用于中止请求的函数。
 */
export const streamAnswer = (request: AdvancedQARequest, processor: StreamProcessor): (() => void) => {
    const controller = new AbortController();

    const processStream = async () => {
        try {
            const response = await fetch(`${apiClient.defaults.baseURL}/qa/answer/advanced`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(request),
                signal: controller.signal,
                credentials: 'include',
            });

            if (!response.ok || !response.body) {
                let errorBody = '服务器响应异常';
                try {
                    const errorJson = await response.json();
                    errorBody = errorJson.message || JSON.stringify(errorJson);
                } catch (e) {
                    errorBody = response.statusText;
                }
                throw new Error(`API 请求失败，状态码 ${response.status}: ${errorBody}`);
            }

            const reader = response.body.getReader();
            const decoder = new TextDecoder('utf-8');
            let buffer = '';

            while (true) {
                const { done, value } = await reader.read();
                if (done) {
                    break;
                }

                buffer += decoder.decode(value, { stream: true });

                // [!code focus start]
                // --- 核心修复：更健壮的SSE消息解析循环 ---
                let eolIndex;
                while ((eolIndex = buffer.indexOf('\n\n')) >= 0) {
                    const messageBlock = buffer.slice(0, eolIndex);
                    buffer = buffer.slice(eolIndex + 2); // 移除已处理的消息块

                    if (messageBlock.startsWith('event:done')) {
                        const dataLine = messageBlock.split('\n').find(line => line.startsWith('data:'));
                        if (dataLine) {
                            const jsonData = dataLine.substring(5).trim();
                            try {
                                const completeData: QACompleteResponse = JSON.parse(jsonData);
                                processor.onComplete(completeData);
                            } catch (e) {
                                console.error("解析 'done' 事件数据失败:", e, "原始数据:", jsonData);
                            }
                        }
                    } else if (messageBlock.startsWith('data:')) {
                        // 提取所有 data: 行并拼接
                        const content = messageBlock
                            .split('\n')
                            .filter(line => line.startsWith('data:'))
                            .map(line => line.substring(5).trim())
                            .join('\n');

                        // 后端返回的是纯文本，所以直接使用
                        if (content) {
                            processor.onData(content);
                        }
                    }
                }
                // --- 核心修复结束 ---
                // [!code focus end]
            }
        } catch (error) {
            if ((error as Error).name !== 'AbortError') {
                console.error('QA stream processing error:', error);
                processor.onError(error as Error);
            }
        } finally {
            processor.onEnd();
        }
    };

    processStream();
    return () => controller.abort();
};