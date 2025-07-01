import { KnowledgeBaseVO } from '@/features/teacher/knowledge/knowledge-list/services/knowledgeService';
import { DocumentVO } from '@/features/teacher/knowledge/knowledge-detail/services/documentService';
import { mockUser } from './myAgentsData'; // 假设我们有一个模拟用户

export const mockKnowledgeBases: KnowledgeBaseVO[] = [
    {
        id: 1,
        cozeDatasetId: "coze_ds_75001",
        name: "考研政治核心知识点",
        description: "涵盖马原、毛中特、史纲、思修与法基的核心考点、重要会议和关键人物。",
        formatType: 0, // 文本类型
        visibility: "PUBLIC",
        forkCount: 128,
        metadataStats: { doc_count: 15, slice_count: 2345, all_file_size: 15728640 },
        owner: mockUser,
        createdAt: "2024-05-20T10:00:00Z",
        updatedAt: "2024-05-27T14:30:00Z",
    },
    {
        id: 5,
        cozeDatasetId: "coze_ds_75002",
        name: "数据结构与算法题库",
        description: "包含链表、树、图、排序等经典算法的解析和题目，适合期末复习与面试准备。",
        formatType: 0, // 文本类型
        visibility: "PRIVATE",
        forkCount: 3,
        metadataStats: { doc_count: 5, slice_count: 890, all_file_size: 8388608 },
        owner: mockUser,
        createdAt: "2024-04-10T09:00:00Z",
        updatedAt: "2024-05-25T11:20:00Z",
    },
    // ... 可以添加更多符合 KnowledgeBaseVO 结构的模拟数据
];

export const mockDocuments: Record<string, DocumentVO[]> = {
    '1': [ // 对应 kbId 为 1 的知识库
        {
            id: 101,
            knowledgeBaseId: 1,
            name: "马原第一章-世界物质性.pdf",
            type: "application/pdf",
            size: 2097152, // 2MB
            status: 2, // 完毕
            sliceCount: 350,
            cosUrl: "https://example.com/doc1.pdf",
            createdAt: "2024-05-21T10:00:00Z",
        },
        {
            id: 102,
            knowledgeBaseId: 1,
            name: "近代史纲重要会议汇总.docx",
            type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
            size: 524288, // 0.5MB
            status: 1, // 处理中
            sliceCount: 0,
            cosUrl: "https://example.com/doc2.docx",
            createdAt: "2024-05-22T11:30:00Z",
        },
        {
            id: 103,
            knowledgeBaseId: 1,
            name: "思修法律基础-宪法篇.txt",
            type: "text/plain",
            size: 10240, // 10KB
            status: 9, // 失败
            sliceCount: 0,
            errorMessage: "文件内容格式无法解析，包含不支持的字符。",
            cosUrl: "https://example.com/doc3.txt",
            createdAt: "2024-05-23T15:00:00Z",
        }
    ],
    '2': [ // 对应 kbId 为 2 的知识库
        {
            id: 201,
            knowledgeBaseId: 2,
            name: "二叉树遍历技巧.md",
            type: "text/markdown",
            size: 25600, // 25KB
            status: 2, // 完毕
            sliceCount: 88,
            cosUrl: "https://example.com/doc4.md",
            createdAt: "2024-04-11T14:00:00Z",
        }
    ]
};