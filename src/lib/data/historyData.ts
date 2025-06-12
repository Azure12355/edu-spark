import { agentData, Agent } from './agentData';

export interface HistoryEntry {
    id: string;
    agentId: number;
    timestamp: string;
    lastMessage: {
        user: string;
        assistant: string;
    };
}

// 辅助函数，用于获取随机的 Agent
const getRandomAgent = (): Agent => {
    return agentData[Math.floor(Math.random() * agentData.length)];
};

// 模拟的对话内容
const sampleDialogues = [
    { user: '你好，请帮我解释一下什么是“闭包”？', assistant: '当然。在计算机科学中，闭包（Closure）是一个函数以及其捆绑的周边环境状态（即词法环境）的引用的组合。换句话说，闭包让你可以在一个内层函数中访问到其外层函数的作用域。' },
    { user: '如何用 Python 实现一个快速排序算法？', assistant: '好的，这是一个经典的快速排序实现，它使用了递归和列表推导式，非常Pythonic...' },
    { user: '我正在准备考研政治，毛中特的重点是什么？', assistant: '毛中特是考研政治的核心部分，重点主要包括毛泽东思想的主要内容、中国特色社会主义理论体系，特别是习近平新时代中国特色社会主义思想...' },
    { user: '帮我设计一个logo，主题是“科技”和“教育”。', assistant: '当然可以。我们可以考虑一个由“书本”和“电路板”元素结合的图形。书本代表教育，电路板的线条可以抽象地融入书中，形成一种知识流动的科技感...' },
    { user: '推荐几部莎士比亚的经典悲剧。', assistant: '莎士比亚的四大悲剧是必读的经典，它们分别是《哈姆雷特》、《奥赛罗》、《李尔王》和《麦克白》。每一部都深刻地探讨了人性、命运和权力等主题。' }
];

// 生成模拟历史数据
const generateHistoryData = (count: number): HistoryEntry[] => {
    const history: HistoryEntry[] = [];
    const now = new Date();

    for (let i = 0; i < count; i++) {
        const agent = getRandomAgent();
        const dialogue = sampleDialogues[i % sampleDialogues.length];
        const pastDate = new Date(now.getTime() - i * (Math.random() * 24 * 60 * 60 * 1000) - 3600 * 1000); // 随机过去的时间

        history.push({
            id: `hist-${i + 1}`,
            agentId: agent.id,
            timestamp: pastDate.toISOString(),
            lastMessage: {
                user: dialogue.user.substring(0, Math.floor(Math.random() * 20) + 40) + '...',
                assistant: dialogue.assistant.substring(0, Math.floor(Math.random() * 80) + 100) + '...'
            },
        });
    }

    return history.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
};

export const historyData: HistoryEntry[] = generateHistoryData(25); // 生成25条历史记录