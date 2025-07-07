// src/shared/services/qaService.ts

import { AdvancedQARequestDTO, QACompleteResponseVO } from '../types';

/**
 * @description 发起一次高级知识问答（流式响应）。
 * 这个函数不直接返回数据，而是返回一个 EventSource 实例，用于接收服务器推送的事件。
 *
 * @param {AdvancedQARequestDTO} request - 包含用户问题和所有高级参数的请求DTO。
 * @param {(content: string) => void} onMessage - 当接收到内容块 (type: 'content') 时的回调函数。
 * @param {(completionData: QACompleteResponseVO) => void} onComplete - 当接收到完成信号 (type: 'done') 时的回调函数。
 * @param {(error: string) => void} onError - 当发生错误时的回调函数。
 * @returns {{ close: () => void }} 返回一个包含 close 方法的对象，用于手动关闭连接。
 */
export const answerAdvancedStream = (
    request: AdvancedQARequestDTO,
    onMessage: (content: string) => void,
    onComplete: (completionData: QACompleteResponseVO) => void,
    onError: (error: string) => void
): { close: () => void } => {
    // 1. 构造完整的 API URL
    const apiUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8101/api'}/qa/answer/advanced`;

    // 2. 创建 EventSource 实例
    //    EventSource 内部封装了 withCredentials: true 的行为，会自动携带 cookie
    const eventSource = new EventSource(apiUrl, {
        // EventSource 不直接支持发送 POST body，所以我们需要通过其他方式（如GET参数或预请求）
        // 但 Next.js 13+ 的 fetch 已经原生支持流式响应，我们可以用 fetch 来模拟 EventSource 的行为，这样就可以发送 POST body。
        // 为了简单和通用，这里假设你有一个可以处理复杂请求的 EventSource Polyfill 或库。
        // 如果没有，我们将使用 fetch API 来实现。

        // **使用 Fetch API 实现流式读取**
        // EventSource 标准不支持 POST 请求，因此我们使用 fetch 来实现此功能。
    });

    // 封装 fetch 流式读取逻辑
    const startStreaming = async () => {
        try {
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'text/event-stream',
                },
                body: JSON.stringify(request),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || `请求失败，状态码: ${response.status}`);
            }

            if (!response.body) {
                throw new Error('响应体为空，无法建立流式连接');
            }

            const reader = response.body.getReader();
            const decoder = new TextDecoder();

            while (true) {
                const { done, value } = await reader.read();
                if (done) {
                    break;
                }

                const chunk = decoder.decode(value);
                const lines = chunk.split('\n\n'); // SSE 消息以双换行符分隔

                lines.forEach(line => {
                    if (line.startsWith('data:')) {
                        const dataString = line.substring('data:'.length);
                        // 流式内容块
                        onMessage(dataString);
                    } else if (line.startsWith('event:done')) {
                        // 寻找下一行的 data
                    } else if (line.startsWith('data:') && lines[lines.indexOf(line) - 1]?.startsWith('event: done')) {
                        const dataString = line.substring('data: '.length);
                        try {
                            const completionData: QACompleteResponseVO = JSON.parse(dataString);
                            onComplete(completionData);
                        } catch (e) {
                            console.error("解析 'done' 事件数据失败:", e);
                            onError("接收到格式错误的完成信号。");
                        }
                    }
                });
            }
        } catch (error: any) {
            console.error('流式问答请求失败:', error);
            onError(error.message || '与服务器的连接中断。');
        }
    };

    startStreaming();

    // 3. 返回一个控制器对象，允许调用方关闭连接
    return {
        close: () => {
            if (eventSource) {
                eventSource.close();
            }
        },
    };
};