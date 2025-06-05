// src/app/api/chat/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { ZhipuAI } from 'zhipuai';
import { Readable } from 'stream';

const API_KEY = process.env.ZHIPUAI_API_KEY;
const MODEL_NAME = "glm-z1-flash";

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

    const formattedMessages = userMessages.map(msg => ({
        role: msg.role as "user" | "assistant" | "system",
        content: msg.content
    }));

    // --- 启用流式输出 ---
    const stream = await client.chat.completions.create({
      model: MODEL_NAME,
      messages: formattedMessages,
      stream: true, // 关键：启用流式输出
      // System Prompt 建议：可以根据需要在 messages 中添加 system 角色的消息
      // messages: [
      //   { role: "system", content: "Please think deeply before your response." },
      //   ...formattedMessages
      // ],
    });

    // 将 ZhipuAI 的 SSE 流转换为 Next.js Response-compatible ReadableStream
    const readableStream = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of stream) {
            // console.log("Sending chunk:", JSON.stringify(chunk)); // 调试日志
            const data = `data: ${JSON.stringify(chunk)}\n\n`;
            controller.enqueue(new TextEncoder().encode(data));
          }
        } catch (error) {
          console.error('Error in stream processing:', error);
          // @ts-ignore
          const errorData = `data: ${JSON.stringify({ error: "Stream processing error", details: error.message })}\n\n`;
          controller.enqueue(new TextEncoder().encode(errorData));
        } finally {
          const doneData = `data: [DONE]\n\n`; // 发送 DONE 信号
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

  } catch (error) {
    console.error('Error creating ZhipuAI stream:', error);
    // @ts-ignore
    const errorMessage = error.message || 'Failed to get response from AI model';
    // @ts-ignore
    const errorStatus = error.status || 500;
    // 对于非流式错误，仍然返回 JSON
    return NextResponse.json({ error: 'Failed to process chat request', details: errorMessage }, { status: errorStatus });
  }
}