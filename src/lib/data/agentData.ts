// src/lib/data/agentData.ts

export interface Agent {
    id: number;
    name: string;
    creator: string;
    avatarText: string;
    avatarGradient: string;
    description: string;
    skills: string[];
    model: string;
    version: string;
    userCount: string;
    palette: 'sky' | 'sunset' | 'meadow' | 'lilac' | 'ocean' | 'sandstone' | 'mint' | 'ember';
    hotness: number; // 新增：热度值
}

const baseAgents: Omit<Agent, 'id' | 'name' | 'creator' | 'description' | 'version' | 'userCount' | 'hotness'>[] = [
    { avatarText: 'Py', avatarGradient: 'linear-gradient(135deg, #43CBFF 0%, #9708CC 100%)', skills: ['代码生成', '算法解析', '项目架构'], model: 'DeepSeek-Coder', palette: 'sky' },
    { avatarText: '政', avatarGradient: 'linear-gradient(135deg, #F5515F 0%, #A1051D 100%)', skills: ['知识点问答', '模拟测验', '时事分析'], model: 'Qwen-72B', palette: 'sunset' },
    { avatarText: 'UI', avatarGradient: 'linear-gradient(135deg, #9C27B0 0%, #E040FB 100%)', skills: ['案例检索', '配色建议', '布局分析'], model: 'GLM-4', palette: 'lilac' },
    { avatarText: 'J', avatarGradient: 'linear-gradient(135deg, #f89820 0%, #fdb927 100%)', skills: ['模拟面试', '八股文问答', '源码解读'], model: 'GLM-4', palette: 'sandstone' },
    { avatarText: 'Σ', avatarGradient: 'linear-gradient(135deg, #0072ff 0%, #00c6ff 100%)', skills: ['公式推导', '步骤详解', '概念辨析'], model: 'Qwen-72B', palette: 'ocean' },
    { avatarText: 'S', avatarGradient: 'linear-gradient(135deg, #603813 0%, #b29f94 100%)', skills: ['背景介绍', '文本分析', '角色扮演'], model: 'DeepSeek-LLM', palette: 'meadow' },
    // ... 您可以根据需要保留或增加更多基础 Agent ...
];

const creators = [ "李教授", "王老师", "设计部", "张老师", "陈博士", "Anna", "红十字会", "财智兔", "古典音乐社", "力健", "极客学院", "法正", "行者", "童话镇", "汪喵星球", "文案狗", "史官", "石匠", "实验室", "食神" ];
const subjects = [ "Python", "考研政治", "UI/UX 设计", "Java", "高等数学", "莎士比亚戏剧", "急救知识", "个人理财", "贝多芬音乐", "健身与营养", "前端开发", "中国法律", "旅行规划", "儿童故事", "宠物健康", "营销文案", "历史事件", "建筑学", "物理实验", "烹饪" ];
const roles = [ "助教", "陪跑", "助手", "宝典", "教练", "鉴赏家", "规划师", "生成器", "顾问", "大师", "向导", "倾听者" ];

const generateAgentData = (count: number): Agent[] => {
    const data: Agent[] = [];
    for (let i = 1; i <= count; i++) {
        const base = baseAgents[i % baseAgents.length];
        const subject = subjects[i % subjects.length];
        const role = roles[i % roles.length];
        const creator = creators[i % creators.length];

        const majorVersion = (i % 3) + 1;
        const minorVersion = i % 10;
        const userCountThousands = ((i * 1.3) % 15 + 0.5).toFixed(1);

        // 新增：生成一个可预测的热度值，让ID小的Agent热度更高，方便排序查看效果
        const hotness = 10000 - i * 10 + Math.floor((i % 7) * 100);

        const agent: Agent = {
            id: i,
            name: `${subject} ${role} #${i}`,
            creator: creator,
            description: `这是一个关于${subject}的专业智能体，由${creator}创建。它能够提供${base.skills.join('、')}等多种能力，帮助你高效学习。`,
            version: `v${majorVersion}.${minorVersion}`,
            userCount: `${userCountThousands}k`,
            hotness: hotness, // 赋值
            ...base,
        };
        data.push(agent);
    }
    return data;
};

export const agentData: Agent[] = generateAgentData(100); // 生成100条数据用于测试