/**
 * @file src/features/teacher/knowledge/knowledge-detail/sub-features/qa/service/qaService.ts
 * @description 封装调用后端知识问答（QA）API的服务函数。
 */

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
    // 使用 AbortController 来实现请求中止功能
    const controller = new AbortController();

    const processStream = async () => {
        try {
            const response = await fetch(`${apiClient.defaults.baseURL}/qa/answer/advanced`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    // 如果需要认证，可以在这里添加 token
                    // 'Authorization': `Bearer ${your_token}`,
                },
                body: JSON.stringify(request),
                signal: controller.signal, // 将 AbortSignal 关联到请求
                credentials: 'include',
            });

            if (!response.ok || !response.body) {
                // 如果后端返回错误（如4xx, 5xx），尝试解析错误信息
                let errorBody = '未知服务器错误';
                try {
                    const errorJson = await response.json();
                    errorBody = errorJson.message || JSON.stringify(errorJson);
                } catch (e) {
                    // 如果响应体不是JSON，使用状态文本
                    errorBody = response.statusText;
                }
                throw new Error(`API request failed with status ${response.status}: ${errorBody}`);
            }

            const reader = response.body.getReader();
            const decoder = new TextDecoder('utf-8');

            while (true) {
                const { done, value } = await reader.read();
                if (done) break;

                const chunk = decoder.decode(value);
                const lines = chunk.split('\n\n'); // SSE 消息以双换行符分隔

                for (const line of lines) {
                    if (line.startsWith('event: done')) {
                        // 处理结束事件
                        const dataLine = line.split('\n')[1];
                        if (dataLine && dataLine.startsWith('data: ')) {
                            const jsonData = dataLine.substring(6);
                            const completeData: QACompleteResponse = JSON.parse(jsonData);
                            processor.onComplete(completeData);
                        }
                        break; // 结束事件后不再处理
                    } else if (line.startsWith('data: ')) {
                        // 处理内容数据块
                        const data = line.substring(6);
                        processor.onData(data);
                    }
                }
            }
        } catch (error) {
            if ((error as Error).name === 'AbortError') {
                console.log('QA stream request aborted by user.');
            } else {
                console.error('QA stream processing error:', error);
                processor.onError(error as Error);
            }
        } finally {
            processor.onEnd(); // 无论成功、失败还是中止，都调用 onEnd
        }
    };

    processStream();

    // 返回一个中止函数，供外部调用
    return () => controller.abort();
};