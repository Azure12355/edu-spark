// src/app/api/chat/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { ZhipuAI } from 'zhipuai';
import { Readable } from 'stream';
import { EDU_SPARK_ASSISTANT_PROMPT } from '@/lib/prompts'; // 导入我们新的系统提示词

const API_KEY = process.env.ZHIPUAI_API_KEY;
const MODEL_NAME = "glm-z1-flash"; // 您可以根据需要更改模型

if (!API_KEY) {
  console.error("ZHIPUAI_API_KEY is not set in environment variables.");
}

const client = new ZhipuAI({ apiKey: API_KEY });

export async function POST(request: NextRequest) {
  if (!API_KEY) {
    return NextResponse.json({ error: 'API Key not configured' }, { status: 500 });
  }

  try {
    const body = await request.json();
    const { messages: userMessages } = body;

    if (!userMessages || !Array.isArray(userMessages) || userMessages.length === 0) {
      return NextResponse.json({ error: 'Invalid messages format' }, { status: 400 });
    }

    const formattedUserMessages = userMessages.map(msg => ({
      role: msg.role as "user" | "assistant",
      content: msg.content
    }));

    // --- 核心修改：将系统提示词作为第一条消息插入 ---
    const messagesWithSystemPrompt = [
      {
        role: "system",
        content: EDU_SPARK_ASSISTANT_PROMPT,
      },
      ...formattedUserMessages,
    ];
    // --- 结束修改 ---

    const stream = await client.chat.completions.create({
      model: MODEL_NAME,
      messages: messagesWithSystemPrompt, // 使用包含系统提示词的新消息列表
      stream: true,
    });

    const readableStream = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of stream) {
            const data = `data: ${JSON.stringify(chunk)}\n\n`;
            controller.enqueue(new TextEncoder().encode(data));
          }
        } catch (error) {
          console.error('Error in stream processing:', error);
          const errorData = `data: ${JSON.stringify({ error: "Stream processing error", details: (error as Error).message })}\n\n`;
          controller.enqueue(new TextEncoder().encode(errorData));
        } finally {
          const doneData = `data: [DONE]\n\n`;
          controller.enqueue(new TextEncoder().encode(doneData));
          controller.close();
        }
      }
    });

    return new Response(readableStream, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
      },
    });

  } catch (error: any) {
    console.error('Error creating ZhipuAI stream:', error);
    const errorMessage = error.message || 'Failed to get response from AI model';
    const errorStatus = error.status || 500;
    return NextResponse.json({ error: 'Failed to process chat request', details: errorMessage }, { status: errorStatus });
  }
}