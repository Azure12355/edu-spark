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
}

const baseAgents: Omit<Agent, 'id' | 'name' | 'creator' | 'description' | 'version' | 'userCount'>[] = [
    { avatarText: 'Py', avatarGradient: 'linear-gradient(135deg, #43CBFF 0%, #9708CC 100%)', skills: ['代码生成', '算法解析', '项目架构'], model: 'DeepSeek-Coder', palette: 'sky' },
    { avatarText: '政', avatarGradient: 'linear-gradient(135deg, #F5515F 0%, #A1051D 100%)', skills: ['知识点问答', '模拟测验', '时事分析'], model: 'Qwen-72B', palette: 'sunset' },
    { avatarText: 'UI', avatarGradient: 'linear-gradient(135deg, #9C27B0 0%, #E040FB 100%)', skills: ['案例检索', '配色建议', '布局分析'], model: 'GLM-4', palette: 'lilac' },
    { avatarText: 'J', avatarGradient: 'linear-gradient(135deg, #f89820 0%, #fdb927 100%)', skills: ['模拟面试', '八股文问答', '源码解读'], model: 'GLM-4', palette: 'sandstone' },
    { avatarText: 'Σ', avatarGradient: 'linear-gradient(135deg, #0072ff 0%, #00c6ff 100%)', skills: ['公式推导', '步骤详解', '概念辨析'], model: 'Qwen-72B', palette: 'ocean' },
    { avatarText: 'S', avatarGradient: 'linear-gradient(135deg, #603813 0%, #b29f94 100%)', skills: ['背景介绍', '文本分析', '角色扮演'], model: 'DeepSeek-LLM', palette: 'meadow' },
    { avatarText: '救', avatarGradient: 'linear-gradient(135deg, #d32f2f 0%, #ffcdd2 100%)', skills: ['场景模拟', '急救步骤', '知识考核'], model: 'GLM-4', palette: 'ember' },
    { avatarText: '财', avatarGradient: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)', skills: ['财务分析', '投资组合', '风险评估'], model: 'Qwen-72B', palette: 'sandstone' },
    { avatarText: '奏', avatarGradient: 'linear-gradient(135deg, #424242 0%, #9e9e9e 100%)', skills: ['乐理分析', '曲式解读', '版本比较'], model: 'DeepSeek-LLM', palette: 'lilac' },
    { avatarText: '💪', avatarGradient: 'linear-gradient(135deg, #4caf50 0%, #a5d6a7 100%)', skills: ['计划定制', '动作纠错', '营养计算'], model: 'GLM-4', palette: 'meadow' },
    { avatarText: '</>', avatarGradient: 'linear-gradient(135deg, #2196F3 0%, #81D4FA 100%)', skills: ['手写代码', '框架原理', '性能优化'], model: 'DeepSeek-Coder', palette: 'sky' },
    { avatarText: '法', avatarGradient: 'linear-gradient(135deg, #607D8B 0%, #B0BEC5 100%)', skills: ['法规查询', '合同审查', '案例分析'], model: 'Qwen-72B', palette: 'ocean' },
    { avatarText: '行', avatarGradient: 'linear-gradient(135deg, #00BCD4 0%, #80DEEA 100%)', skills: ['行程规划', '景点推荐', '预算控制'], model: 'GLM-4', palette: 'mint' },
    { avatarText: '梦', avatarGradient: 'linear-gradient(135deg, #FFC107 0%, #FFF9C4 100%)', skills: ['故事生成', '角色定制', '互动叙事'], model: 'DeepSeek-LLM', palette: 'sandstone' },
    { avatarText: '🐾', avatarGradient: 'linear-gradient(135deg, #795548 0%, #D7CCC8 100%)', skills: ['健康咨询', '行为分析', '品种知识'], model: 'Qwen-72B', palette: 'meadow' },
    { avatarText: '文', avatarGradient: 'linear-gradient(135deg, #E91E63 0%, #F8BBD0 100%)', skills: ['爆款标题', '种草文案', '活动策划'], model: 'GLM-4', palette: 'ember' },
    { avatarText: '史', avatarGradient: 'linear-gradient(135deg, #9E9E9E 0%, #F5F5F5 100%)', skills: ['事件梳理', '人物评价', '因果分析'], model: 'DeepSeek-LLM', palette: 'lilac' },
    { avatarText: '筑', avatarGradient: 'linear-gradient(135deg, #8d6e63 0%, #efebe9 100%)', skills: ['风格辨析', '结构图解', '代表作赏析'], model: 'Qwen-72B', palette: 'sandstone' },
    { avatarText: 'Phy', avatarGradient: 'linear-gradient(135deg, #3F51B5 0%, #C5CAE9 100%)', skills: ['实验模拟', '数据分析', '原理验证'], model: 'GLM-4', palette: 'ocean' },
    { avatarText: '烹', avatarGradient: 'linear-gradient(135deg, #FF5722 0%, #FFCCBC 100%)', skills: ['菜谱生成', '技巧问答', '热量计算'], model: 'Qwen-72B', palette: 'ember' },
];

const creators = [ "李教授", "王老师", "设计部", "张老师", "陈博士", "Anna", "红十字会", "财智兔", "古典音乐社", "力健", "极客学院", "法正", "行者", "童话镇", "汪喵星球", "文案狗", "史官", "石匠", "实验室", "食神", "弈仙", "星尘", "愈心" ];
const subjects = [ "Python", "考研政治", "UI/UX 设计", "Java", "高等数学", "莎士比亚戏剧", "急救知识", "个人理财", "贝多芬音乐", "健身与营养", "前端开发", "中国法律", "旅行规划", "儿童故事", "宠物健康", "营销文案", "历史事件", "建筑学", "物理实验", "烹饪", "围棋", "天体物理", "心理咨询" ];
const roles = [ "助教", "陪跑", "助手", "宝典", "教练", "鉴赏家", "规划师", "生成器", "顾问", "大师", "向导", "倾听者" ];

const generateAgentData = (count: number): Agent[] => {
    const data: Agent[] = [];
    for (let i = 1; i <= count; i++) {
        const base = baseAgents[i % baseAgents.length];
        const subject = subjects[i % subjects.length];
        const role = roles[i % roles.length];
        const creator = creators[i % creators.length];

        const agent: Agent = {
            id: i,
            name: `${subject} ${role} #${i}`,
            creator: creator,
            description: `这是一个关于${subject}的专业智能体，由${creator}创建。它能够提供${base.skills.join('、')}等多种能力，帮助你高效学习。`,
            version: `v${Math.floor(Math.random() * 3) + 1}.${Math.floor(Math.random() * 10)}`,
            userCount: `${(Math.random() * 15 + 0.1).toFixed(1)}k`,
            ...base,
        };
        data.push(agent);
    }
    return data;
};

export const agentData: Agent[] = generateAgentData(1000);