// [!file src/features/teacher/knowledge/knowledge-detail/sub-features/qa/service/qaService.ts]
import apiClient from '@/shared/api/apiClient';
import type { AdvancedQARequest, QACompleteResponse, StreamProcessor } from '../types';
import { ApiError } from '@/shared/lib/errors/apiError';

const REQUEST_TIMEOUT = 10000;

export const streamAnswer = (request: AdvancedQARequest, processor: StreamProcessor): (() => void) => {
    const controller = new AbortController();
    const signal = controller.signal;

    const timeoutId = setTimeout(() => {
        controller.abort();
        processor.onError(new Error('请求超时，请检查网络或稍后重试。'));
    }, REQUEST_TIMEOUT);

    const processStream = async () => {
        try {
            const response = await fetch(`${apiClient.defaults.baseURL}/qa/answer/advanced`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(request),
                signal,
                credentials: 'include',
            });

            clearTimeout(timeoutId);

            if (!response.body) {
                throw new Error('服务器未返回有效响应体');
            }

            // [!code focus start]
            // --- 核心修复：真正的流式预判 ---
            const reader = response.body.getReader();
            const decoder = new TextDecoder('utf-8');
            let buffer = '';

            // 1. 只读取第一块数据进行预判
            const { done, value } = await reader.read();

            if (done) {
                // 如果第一块就是空的，说明响应结束了，可能是个空响应
                processor.onEnd();
                return;
            }

            // 2. 将第一块数据存入缓冲区
            buffer += decoder.decode(value, { stream: true });

            // 3. 尝试将第一块数据作为完整的JSON错误来解析
            try {
                // 移除可能的SSE前缀，以防万一
                const cleanJsonAttempt = buffer.replace(/^data: /m, '').trim();
                if (cleanJsonAttempt.startsWith('{') && cleanJsonAttempt.endsWith('}')) {
                    const potentialError = JSON.parse(cleanJsonAttempt);
                    if (potentialError && typeof potentialError.code !== 'undefined' && potentialError.code !== 0) {
                        // 确认是业务错误，立即抛出，中断流程
                        throw new ApiError(potentialError.message || '服务器返回了一个未知业务错误', potentialError.code);
                    }
                }
            } catch (e) {
                // 如果e是ApiError，说明我们成功捕获了业务错误，直接抛出
                if (e instanceof ApiError) {
                    throw e;
                }
                // 如果是SyntaxError，说明第一块数据不是一个完整的JSON，这是正常的流式响应，我们忽略这个错误。
                if (!(e instanceof SyntaxError)) {
                    throw e; // 其他类型的解析错误需要被抛出
                }
            }
            // --- 核心修复结束 ---
            // [!code focus end]

            // 如果第一块数据不是错误，那么我们继续处理SSE流
            // 注意：我们已经把第一块数据存入了buffer，所以循环可以直接开始处理buffer
            while (true) {
                let eolIndex;
                while ((eolIndex = buffer.indexOf('\n\n')) >= 0) {
                    const messageBlock = buffer.slice(0, eolIndex).trim();
                    buffer = buffer.slice(eolIndex + 2);
                    if (messageBlock.startsWith('event:done')) {
                        const dataLine = messageBlock.split('\n').find(line => line.startsWith('data:'));
                        if (dataLine) {
                            const jsonData = dataLine.substring(5).trim();
                            const completeData: QACompleteResponse = JSON.parse(jsonData);
                            processor.onComplete(completeData);
                        }
                    } else if (messageBlock.startsWith('data:')) {
                        const content = messageBlock.split('\n').filter(line => line.startsWith('data:')).map(line => line.substring(5).trim()).join('\n');
                        if (content) processor.onData(content);
                    }
                }

                // 循环的结尾去读取下一块数据
                if (signal.aborted) break;
                const { done, value } = await reader.read();
                if (done) break;
                buffer += decoder.decode(value, { stream: true });
            }

        } catch (error) {
            clearTimeout(timeoutId);
            if ((error as Error).name !== 'AbortError') {
                console.error('QA stream processing error:', error);
                processor.onError(error as Error);
            } else {
                console.log('Stream aborted by user or timeout.');
            }
        } finally {
            clearTimeout(timeoutId);
            processor.onEnd();
        }
    };

    processStream();
    return () => controller.abort();
};