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
            let buffer = ''; // Buffer to handle incomplete SSE messages

            while (true) {
                const { done, value } = await reader.read();
                if (done) {
                    if (buffer.length > 0) console.warn("Stream ended with incomplete data in buffer:", buffer);
                    break;
                }

                // Append new data to buffer
                buffer += decoder.decode(value, { stream: true });

                // Process all complete messages in the buffer
                let eolIndex;
                while ((eolIndex = buffer.indexOf('\n\n')) >= 0) {
                    const message = buffer.slice(0, eolIndex);
                    buffer = buffer.slice(eolIndex + 2); // Move buffer past the message delimiter

                    if (message.startsWith('event:done')) {
                        const dataLine = message.split('\n')[1];
                        if (dataLine?.startsWith('data:')) {
                            const jsonData = dataLine.substring(5);
                            try {
                                const completeData: QACompleteResponse = JSON.parse(jsonData);
                                processor.onComplete(completeData);
                            } catch (e) {
                                console.error("Failed to parse 'done' event data:", e);
                            }
                        }
                    } else if (message.startsWith('data:')) {
                        const data = message.substring(5);
                        console.log('%c[qaService] Received data chunk:', 'color: #10B981; font-weight: bold;', data);
                        processor.onData(data);
                    }
                }
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