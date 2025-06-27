// src/lib/data/chunkMockData.ts
import { Chunk } from '@/types/knowledge';
import { mockDocuments } from './knowledgeMockData';

const sampleContents = [
    "在嵌入式Linux开发中，交叉编译工具链的配置是第一步，也是最容易出错的一步。确保GCC、Binutils和Glibc版本兼容至关重要。",
    "U-Boot作为一款开源的Bootloader，不仅支持多种处理器架构，还提供了丰富的命令行工具，用于系统调试和固件烧录。",
    "Linux内核的Kconfig系统允许开发者通过文本菜单高度定制内核功能，有效裁剪内核大小，以适应资源受限的嵌入式设备。",
    "设备树（Device Tree）是一种描述硬件信息的数据结构，它将硬件配置从内核代码中分离出来，使得单一内核镜像可以支持多种不同的硬件平台。",
    "BusyBox被誉为“嵌入式Linux的瑞士军刀”，它将许多常用的Linux命令和工具集成到一个单一的可执行文件中，极大地简化了根文件系统的构建。",
    "构建根文件系统时，需要考虑动态链接库的依赖问题。使用ldd工具可以查看可执行文件所需的共享库，并将其一并复制到目标文件系统中。",
    "JFFS2（Journaling Flash File System 2）是专为NOR Flash设计的日志型文件系统，提供了掉电安全和磨损均衡等关键特性。",
    "平台驱动模型（Platform Device Driver Model）是Linux内核中用于管理无热插拔能力的片上设备（SoC-integrated peripherals）的标准框架。",
];

/**
 * 生成指定数量的模拟切片数据
 * @param count 总数量
 * @returns Chunk[]
 */
export const generateMockChunks = (count: number): Chunk[] => {
    const data: Chunk[] = [];
    const now = new Date();

    for (let i = 0; i < count; i++) {
        const doc = mockDocuments[i % mockDocuments.length];
        const date = new Date(now.getTime() - i * 1000 * 60 * 5); // 每5分钟一条

        const chunk: Chunk = {
            id: `chunk_mock_${1000 + i}`,
            document_id: doc.id,
            source_document_name: doc.name,
            content: sampleContents[i % sampleContents.length] + ` (示例片段 #${i + 1})`,
            char_count: Math.floor(Math.random() * 500) + 100,
            order_in_document: i,
            created_at: date.toISOString(),
        };
        data.push(chunk);
    }
    return data;
};

export const mockChunks = generateMockChunks(100); // 生成100条测试数据