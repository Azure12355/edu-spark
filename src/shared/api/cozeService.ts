/**
 * @file src/services/cozeService.ts
 * @description 封装了所有与 Coze 平台交互的客户端服务函数。
 */

import { CozeWorkflowInputParameters, GeneratedQuestionsResponse } from '@/shared/types/coze';

const API_ENDPOINT = '/api/generate-questions';

/**
 * 调用后端代理API来执行AI出题工作流。
 * @param params - 符合 Coze 工作流 `parameters` 结构的输入参数。
 * @returns - 返回一个 Promise，成功时解析为包含生成题目的对象。
 * @throws - 如果网络请求失败或API返回错误，则抛出一个错误。
 */
export const runQuestionGenerationWorkflow = async (
    params: CozeWorkflowInputParameters
): Promise<GeneratedQuestionsResponse> => {
    const response = await fetch(API_ENDPOINT, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(params),
    });

    // 解析响应体
    const responseBody = await response.json();

    if (!response.ok) {
        // 如果响应状态码不是 2xx, 优先使用后端返回的 message 字段
        throw new Error(responseBody.message || `请求失败，状态码: ${response.status}`);
    }

    return responseBody as GeneratedQuestionsResponse;
};