// src/lib/agentExperienceData.ts

// 智能体详细信息的数据结构 (保持不变)
export interface AgentInfo {
  id: string; 
  name: string;
  icon: string;
  description: string;
  contributor: string;
  updateTime: string;
  model: string;
  tags: { text: string; type: 'default' | 'success' | 'warning' | 'error' | 'processing' }[];
  welcomeMessage: string;
  promptSuggestions: string[];
}

// 聊天历史记录的数据结构 (保持不变)
export interface ConversationHistory {
  id: string;
  title: string;
  agentId: string;
}

// 单条消息的数据结构 (新增)
export interface Message {
    id: string;
    role: 'user' | 'assistant';
    content: string;
    thinkingText?: string | null;
    isThinking?: boolean;
    isComplete?: boolean;
}

// 模拟的智能体数据 (保持不变)
export const agentInfos: AgentInfo[] = [
  {
    id: 'xiaohongshu-writer',
    name: '小红书爆款文案',
    icon: '💄',
    description: '小红书爆款文案策划师，为你量身打造爆款小红书文案。',
    contributor: '字节跳动',
    updateTime: '2024.05.13',
    model: 'Doubao-pro-32k',
    tags: [ { text: '可复制', type: 'success' }, { text: '文本大模型', type: 'default' }, { text: '内容创作', type: 'default' }, { text: '免费体验', type: 'processing' } ],
    welcomeMessage: '我是小红书爆款文案策划，为你打造最强小红书文案。',
    promptSuggestions: [ '帮我写一个关于20岁女生夏日防晒文案', '帮我写一个重庆火锅探店文案', '帮我写一个上海citywalk攻略文案' ],
  },
  {
    id: 'paper-reading-assistant',
    name: '论文阅读助手',
    icon: '📄',
    description: '专为学者和学生定制的论文阅读AI，以幽默风趣的语言，在中英文海洋中快速穿梭...',
    contributor: '字节跳动',
    updateTime: '2024.12.11',
    model: 'Doubao-pro-32k',
    tags: [ { text: '可复制', type: 'success' }, { text: '网页解析', type: 'default' }, { text: '免费体验', type: 'processing' } ],
    welcomeMessage: '哈喽！我是你的专属论文阅读小助手，论文一丢我就懂...',
    promptSuggestions: [ '可以帮我解读一下这篇论文吗？', '请帮我解读 https://arxiv.org/pdf/2402.15627.pdf' ],
  },
  {
    id: 'code-interpreter',
    name: '视频实时理解',
    icon: '💡',
    description: '通过先进的视频理解技术，实时分析和解释视频内容。',
    contributor: 'EduSpark Lab',
    updateTime: '2024.06.01',
    model: 'Qwen-VL-Max',
    tags: [ { text: '多模态', type: 'warning' }, { text: '内容理解', type: 'default' }, { text: '内部测试', type: 'processing' } ],
    welcomeMessage: '你好，我是视频理解助手，请上传视频文件或提供视频链接，我来为你解读。',
    promptSuggestions: [ '分析这个视频的主要内容。', '这个教学视频的关键步骤有哪些？' ],
  },
];

// 模拟的聊天历史元数据 (保持不变)
export const conversationHistories: ConversationHistory[] = [
    { id: 'hist-1', title: '初次访问与服务向导', agentId: 'paper-reading-assistant' },
    { id: 'hist-2', title: '简单问候与询问', agentId: 'xiaohongshu-writer' },
    { id: 'hist-3', title: 'DeepSeek-R1智能助手介绍', agentId: 'code-interpreter' },
    { id: 'hist-4', title: '（测试2）黑客预测', agentId: 'paper-reading-assistant' },
    { id: 'hist-5', title: '新话题', agentId: 'xiaohongshu-writer' },
];

// 模拟的每个对话的具体消息记录 (新增)
export const mockConversations: Record<string, Message[]> = {
    'hist-1': [
        { id: 'msg-1-1', role: 'user', content: '你好，你能做什么？', isComplete: true },
        { id: 'msg-1-2', role: 'assistant', content: '当然！我可以帮你阅读和理解各种学术论文。无论是PDF文件还是网页链接，发给我，我都能帮你提炼核心观点和主要内容。', isComplete: true },
    ],
    'hist-2': [
        { id: 'msg-2-1', role: 'user', content: '你好', isComplete: true },
        { id: 'msg-2-2', role: 'assistant', content: '<think>好的，用户发来的是“你好”，我需要回应。首先，用户之前提到自己是小红书爆款文案策划，所以我的回应应该专业且符合他们的需求...</think>你好呀~我是你的小红书爆款文案助手✨！\n\n需要我帮你：\n1️⃣ 拆解爆款笔记的爆款公式 (痛点+情绪+干货)\n2️⃣ 搭建产品种草的3秒钩子+场景化痛点\n3️⃣ 设计互动话术提升笔记收藏率 (🔥收藏率提升30%秘籍)\n4️⃣ 制作适合不同品类的标题模板 (美妆/家居/穿搭/美食)\n\n举个栗子🌰：「刚发现！原来每天多花3分钟涂防晒，能白2个色号！！（附对比图）」、「租房党必看！9.9元搞定全屋收纳，懒人整理法亲测有效📦」', thinkingText: "用户的意图是打招呼，我需要根据我的“小红书文案”人设，给出一个友好且能展示我能力的回复，并提供一些具体的、可操作的选项来引导用户。", isComplete: true },
    ],
    // 其他历史对话可以留空，表示是新创建的
};


// 默认选中的智能体ID (保持不变)
export const DEFAULT_AGENT_ID = 'xiaohongshu-writer';