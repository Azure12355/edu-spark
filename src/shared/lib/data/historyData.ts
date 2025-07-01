// src/lib/data/historyData.ts
import { agentData, Agent } from './agentData';

// 定义单条消息的类型
interface Message {
    role: 'user' | 'assistant';
    content: string;
}

// 定义对话历史条目的类型
export interface HistoryEntry {
    id: string;
    agentId: number;
    timestamp: string;
    conversation: Message[]; // 将 lastMessage 改为 conversation 数组
    isPinned?: boolean; // 新增：是否置顶
}

// 辅助函数，用于获取随机的 Agent
const getRandomAgent = (): Agent => {
    return agentData[Math.floor(Math.random() * agentData.length)];
};

// 模拟的对话内容片段，现在更加多样化
const sampleDialogues: Message[][] = [
    [
        { role: 'user', content: '你好，能帮我解释一下什么是“闭包”吗？' },
        { role: 'assistant', content: '当然。在计算机科学中，闭包（Closure）是一个函数以及其捆绑的周边环境状态的引用的组合。' },
        { role: 'user', content: '那它有什么实际应用场景？' },
        { role: 'assistant', content: '非常多！比如在 JavaScript 中，防抖和节流函数、模块化封装私有变量等都利用了闭包的特性。' },
    ],
    [
        { role: 'user', content: '如何用 Python 实现一个快速排序算法？' },
        { role: 'assistant', content: '好的，这是一个经典的快速排序实现，它使用了递归和列表推导式，非常 Pythonic...' },
    ],
    [
        { role: 'user', content: '我正在准备考研政治，毛中特的重点是什么？' },
        { role: 'assistant', content: '毛中特是考研政治的核心，重点主要包括毛泽东思想、中国特色社会主义理论体系，特别是习近平新时代中国特色社会主义思想...' },
    ],
    [
        { role: 'user', content: '我应该如何开始学习理财？' },
        { role: 'assistant', content: '很好的问题！理财入门可以从“记账”开始，了解自己的现金流。然后学习基础的金融概念，如复利、风险和收益。' },
        { role: 'assistant', content: '之后可以考虑从低风险的货币基金或指数基金定投开始实践。' },
    ],
    [
        { role: 'user', content: '请给我一些关于“孤独”的写作灵感。' },
        { role: 'assistant', content: '你可以从不同的角度切入：“都市的喧嚣反衬下的孤独感”、“独处时与自我的深度对话”、“社交网络中的群体性孤独”等等。' }
    ],
];

// 生成模拟历史数据
const generateHistoryData = (count: number): HistoryEntry[] => {
    const history: HistoryEntry[] = [];
    const now = new Date();

    for (let i = 0; i < count; i++) {
        const agent = getRandomAgent();
        const dialogue = sampleDialogues[i % sampleDialogues.length];
        const pastDate = new Date(now.getTime() - i * (Math.random() * 48 * 60 * 60 * 1000) - 3600 * 1000);

        history.push({
            id: `hist-${i + 1}`,
            agentId: agent.id,
            timestamp: pastDate.toISOString(),
            // 随机截取 2 到 4 条对话记录
            conversation: dialogue.slice(0, Math.floor(Math.random() * 2) + 2),
            // 随机将一些卡片设为置顶
            isPinned: Math.random() > 0.85,
        });
    }

    // 将置顶的卡片排在最前面，然后按时间排序
    return history.sort((a, b) => {
        if (a.isPinned && !b.isPinned) return -1;
        if (!a.isPinned && b.isPinned) return 1;
        return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
    });
};

export const historyData: HistoryEntry[] = generateHistoryData(25);