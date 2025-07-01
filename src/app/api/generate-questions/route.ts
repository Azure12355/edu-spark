// src/app/api/generate-questions/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { CozeAPI, APIError } from '@coze/api';
import type { CozeWorkflowInputParameters, CozeRawWorkflowResponse } from '@/shared/types/coze';

const COZE_API_KEY = process.env.COZE_API_KEY;
const WORKFLOW_ID = '7520409387987943424';
const COZE_API_URL = 'https://api.coze.cn';

/**
 * 后端 API 路由，作为调用 Coze 工作流的代理。
 * 使用非流式（静态）方式获取结果。
 * @param request - 前端发来的 NextRequest 对象。
 * @returns - 返回一个 NextResponse 对象，包含生成的题目或错误信息。
 */
export async function POST(request: NextRequest) {
    if (!COZE_API_KEY) {
        console.error('Coze API key is not configured.');
        return NextResponse.json({ message: '服务器配置错误，请联系管理员。' }, { status: 500 });
    }

    try {
        const parameters: CozeWorkflowInputParameters = await request.json();

        const apiClient = new CozeAPI({
            token: COZE_API_KEY,
            baseURL: COZE_API_URL,
        });

        // 使用非流式调用的 `create` 方法
        //@ts-ignore
        const response: CozeRawWorkflowResponse = await apiClient.workflows.runs.create({
            workflow_id: WORKFLOW_ID,
            //@ts-ignore
            parameters: parameters,
        });

        // 检查 Coze API 的响应码
        if (response.code !== 0) {
            throw new Error(`Coze API Error: ${response.msg} (code: ${response.code})`);
        }

        // 关键步骤：解析 data 字段中的 JSON 字符串
        const parsedData = JSON.parse(response.data);

        // 检查内部数据结构的 code
        if (parsedData.code !== '200') {
            throw new Error(`Coze Workflow Error: ${parsedData.msg}`);
        }

        // 成功，返回解析后的内部数据
        return NextResponse.json(parsedData, { status: 200 });

    } catch (error: any) {
        console.error('Error in /api/generate-questions:', error);

        let errorMessage = '处理请求时发生未知错误。';
        if (error instanceof APIError) {
            errorMessage = `调用AI服务失败: ${error.message}`;
        } else if (error instanceof Error) {
            errorMessage = error.message;
        }

        return NextResponse.json({ message: errorMessage }, { status: 500 });
    }
}