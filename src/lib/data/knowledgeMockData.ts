// src/lib/data/knowledgeMockData.ts

import { KnowledgeBase, Document, KnowledgeStatus, KnowledgeFormatType } from '@/types/knowledge';

// --- 1. 素材库 (保持不变) ---
const kbNames = [
    "嵌入式Linux开发教程", "考研政治核心考点", "UI/UX 设计灵感库", "课程论文参考文献",
    "Web安全攻防实战", "机器学习白皮书", "前端工程化体系", "Go语言并发编程",
    "产品经理的自我修养", "西方艺术史概论", "量子物理入门", "市场营销案例分析"
];

const kbDescriptions = [
    "涵盖了从底层到应用层的完整知识体系。", "专为2025年考生准备的核心考点与真题解析。",
    "收集全球顶尖App的交互与视觉设计案例。", "课程研究所需的核心期刊与会议论文集合。",
    "从SQL注入到XSS，系统性讲解Web安全。", "深入探讨机器学习模型的原理与实践。",
    "包含Webpack, Vite, CI/CD等现代前端技术。", "深度解析Goroutine和Channel的底层机制。",
    "一份全面的产品经理成长指南和工具箱。", "从古希腊到当代艺术的视觉之旅。",
    "用通俗易懂的语言解释复杂的量子世界。", "精选最新的成功与失败市场营销案例。"
];

const owners = [
    { id: 'user_teacher_01', name: '王老师' },
    { id: 'user_teacher_02', name: '李教授' },
    { id: 'user_teacher_03', name: '艺术系' },
    { id: 'user_teacher_04', name: '教研组' },
];

const statuses: KnowledgeStatus[] = ['READY', 'BUILDING', 'ERROR', 'DISABLED', 'READY', 'READY'];
const formatTypes: KnowledgeFormatType[] = [0, 0, 2, 0];
const visibilities: KnowledgeBase['visibility'][] = ['PUBLIC', 'PRIVATE', 'PRIVATE'];

// --- 2. 优化后的确定性数据生成函数 ---

/**
 * 生成指定数量的、可预测的模拟知识库数据。
 * @param count 要生成的知识库数量
 * @returns KnowledgeBase[] 知识库对象数组
 */
const generateMockKnowledgeBases = (count: number): KnowledgeBase[] => {
    const data: KnowledgeBase[] = [];
    const now = new Date('2024-07-22T10:00:00Z').getTime(); // 使用一个固定的基准时间

    for (let i = 0; i < count; i++) {
        const owner = owners[i % owners.length];
        const status = statuses[i % statuses.length];
        const visibility = visibilities[i % visibilities.length];
        const isForked = visibility === 'PRIVATE' && (i % 4 === 0); // 让fork可预测

        // 使用固定的偏移量来生成时间，不再随机
        const updatedDate = new Date(now - i * (24 * 60 * 60 * 1000));
        const createdDate = new Date(updatedDate.getTime() - (i * 3 + 1) * (24 * 60 * 60 * 1000));

        const kb: KnowledgeBase = {
            id: `kb_local_${1000 + i}`,
            coze_dataset_id: `755123456789000${1000 + i}`,
            owner_id: owner.id,
            name: `${kbNames[i % kbNames.length]} #${i + 1}`,
            description: kbDescriptions[i % kbDescriptions.length],
            format_type: formatTypes[i % formatTypes.length],
            visibility: visibility,
            fork_from_kb_id: isForked ? `kb_local_${Math.floor(i / 2)}` : undefined, // 可预测的 fork
            fork_count: visibility === 'PUBLIC' ? (i * 37 + 5) % 500 : 0, // 可预测的 fork 数量
            icon_url: 'https://lf-coze-web-cdn.coze.cn/obj/coze-web/image/icon_knowledge_url.svg',
            status: status,
            stats: {
                // --- 核心修复：使用可预测的公式代替 Math.random() ---
                doc_count: (i * 3 + 1) % 100,
                slice_count: (i * 123 + 45) % 10000,
                hit_count: (i * 234 + 56) % 20000,
                all_file_size: ((i * 567 + 89) % 500) * 1024 * 1024,
                bot_used_count: (i % 10),
            },
            created_at: createdDate.toISOString(),
            updated_at: updatedDate.toISOString(),
        };
        data.push(kb);
    }
    return data;
};

// --- 3. 导出生成的数据 (保持不变) ---
export const mockKnowledgeBases: KnowledgeBase[] = generateMockKnowledgeBases(30);

export const mockDocuments: Document[] = [
    {
        id: 'doc_local_01',
        coze_document_id: '7385083080979001234',
        knowledge_base_id: mockKnowledgeBases[0].id,
        name: '01_Bootloader与U-Boot.pdf',
        type: 'pdf',
        size: 5242880,
        source_type: 0,
        status: 'COMPLETED',
        slice_count: 256,
        char_count: 350000,
        created_at: '2024-07-20T10:00:00Z',
        updated_at: '2024-07-20T10:05:00Z',
    },
    // ... 其他 mockDocuments 数据保持不变
    {
        id: 'doc_local_02',
        coze_document_id: '7385083080979005678',
        knowledge_base_id: mockKnowledgeBases[0].id,
        name: '02_Linux内核裁剪与编译.docx',
        type: 'docx',
        size: 2097152,
        source_type: 0,
        status: 'PROCESSING',
        slice_count: 100,
        char_count: 150000,
        created_at: '2024-07-21T11:00:00Z',
        updated_at: '2024-07-21T11:02:00Z',
    },
    {
        id: 'doc_local_03',
        coze_document_id: '7385083080979009999',
        knowledge_base_id: mockKnowledgeBases[0].id,
        name: 'qemu-vexpress-a9官方文档.url',
        type: 'url',
        size: 0,
        source_type: 1,
        status: 'FAILED',
        slice_count: 0,
        char_count: 0,
        error_message: '网页无法访问或超时 (Timeout)。',
        created_at: '2024-07-21T12:00:00Z',
        updated_at: '2024-07-21T12:01:00Z',
    },
];

