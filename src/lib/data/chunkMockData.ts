// src/lib/data/chunkMockData.ts
import { Chunk } from '@/types/knowledge';
import { mockDocuments } from './knowledgeMockData'; // 1. 导入已生成的文档数据

const sampleContentSnippets = [
    "交叉编译工具链的配置是第一步...",
    "U-Boot提供了丰富的命令行工具...",
    "Kconfig系统允许开发者高度定制内核...",
    "设备树将硬件配置从内核代码中分离...",
    "BusyBox被誉为“嵌入式Linux的瑞士军刀”...",
    "JFFS2是专为NOR Flash设计的日志型文件系统...",
];

/**
 * 为所有文档生成关联的切片数据
 * @returns Chunk[]
 */
export const generateAllMockChunks = (): Chunk[] => {
    const allChunks: Chunk[] = [];
    const allDocs = Object.values(mockDocuments).flat(); // 获取所有文档的扁平化列表

    for (const doc of allDocs) {
        // 只为处理完成的文档生成切片
        if (doc.status !== 'COMPLETED') continue;

        for (let i = 0; i < doc.slice_count; i++) {
            const date = new Date(new Date(doc.created_at).getTime() + i * 1000 * 60); // 模拟切片生成时间
            const chunk: Chunk = {
                id: `chunk_${doc.id}_${i}`,
                document_id: doc.id, // 2. 明确绑定到文档的本地ID
                source_document_name: doc.name, // 3. 冗余存储文档名，方便展示
                content: `[来自: ${doc.name}] ${sampleContentSnippets[i % sampleContentSnippets.length]} (片段 ${i + 1})`, // 内容与文档关联
                char_count: Math.floor(Math.random() * 400) + 100,
                order_in_document: i + 1,
                created_at: date.toISOString(),
            };
            allChunks.push(chunk);
        }
    }
    return allChunks;
};

export const mockChunks = generateAllMockChunks();