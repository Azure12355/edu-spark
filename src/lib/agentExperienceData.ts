// src/lib/agentExperienceData.ts

// 定义智能体详细信息的数据结构
export interface AgentInfo {
    id: string; // 智能体的唯一标识，用于路由
    name: string;
    icon: string; // Emoji 或图片 URL
    description: string;
    contributor: string;
    updateTime: string;
    model: string;
    tags: { text: string; type: 'default' | 'success' | 'warning' | 'error' | 'processing' }[];
    welcomeMessage: string;
    promptSuggestions: string[];
  }
  
  // 定义聊天历史记录的数据结构
  export interface ConversationHistory {
    id: string;
    title: string;
    agentId: string; // 关联的智能体ID
  }
  
  // 模拟的智能体数据
  export const agentInfos: AgentInfo[] = [
    {
      id: 'xiaohongshu-writer',
      name: '小红书爆款文案',
      icon: '💄',
      description: '小红书爆款文案策划师，为你量身打造爆款小红书文案。',
      contributor: '字节跳动',
      updateTime: '2024.05.13',
      model: 'Doubao-pro-32k',
      tags: [
        { text: '可复制', type: 'success' },
        { text: '文本大模型', type: 'default' },
        { text: '内容创作', type: 'default' },
        { text: '免费体验', type: 'processing' },
      ],
      welcomeMessage: '我是小红书爆款文案策划，为你打造最强小红书文案。',
      promptSuggestions: [
        '帮我写一个关于20岁女生夏日防晒文案',
        '帮我写一个重庆火锅探店文案',
        '帮我写一个上海citywalk攻略文案',
      ],
    },
    {
      id: 'paper-reading-assistant',
      name: '论文阅读助手',
      icon: '📄',
      description: '专为学者和学生定制的论文阅读AI，以幽默风趣的语言，在中英文海洋中快速穿梭。它能把枯燥的论文和文档抽丝剥茧，提取核心要点，助你轻松跨越论文难关，在代码和天地间自由探索…',
      contributor: '字节跳动',
      updateTime: '2024.12.11',
      model: 'Doubao-pro-32k',
      tags: [
        { text: '可复制', type: 'success' },
        { text: '网页解析', type: 'default' },
        { text: '网页解析', type: 'default' },
        { text: '免费体验', type: 'processing' },
      ],
      welcomeMessage: '哈喽！我是你的专属论文阅读小助手，论文一丢我就懂，不管是文件、链接还是长文本，通通都可以丢给我！我马上就为你提炼关键内容，梳理论文要点～',
      promptSuggestions: [
        '可以帮我解读一下这篇论文吗？',
        '请帮我解读 https://arxiv.org/pdf/2402.15627.pdf 这篇文章'
      ],
    },
    {
      id: 'code-interpreter',
      name: '视频实时理解',
      icon: '💡',
      description: '通过先进的视频理解技术，实时分析和解释视频内容。',
      contributor: 'EduSpark Lab',
      updateTime: '2024.06.01',
      model: 'Qwen-VL-Max',
      tags: [
        { text: '多模态', type: 'warning' },
        { text: '内容理解', type: 'default' },
        { text: '内部测试', type: 'processing' },
      ],
      welcomeMessage: '你好，我是视频理解助手，请上传视频文件或提供视频链接，我来为你解读。',
      promptSuggestions: [
        '分析这个视频的主要内容。',
        '这个教学视频的关键步骤有哪些？',
      ],
    },
  ];
  
  // 模拟的聊天历史数据
  export const conversationHistories: ConversationHistory[] = [
      { id: 'hist-1', title: '初次访问与服务向导', agentId: 'paper-reading-assistant' },
      { id: 'hist-2', title: '简单问候与询问', agentId: 'xiaohongshu-writer' },
      { id: 'hist-3', title: 'DeepSeek-R1智能助手介绍', agentId: 'code-interpreter' },
      { id: 'hist-4', title: '（测试2）黑客预测', agentId: 'paper-reading-assistant' },
      { id: 'hist-5', title: '新话题', agentId: 'xiaohongshu-writer' },
  ];
  
  // 默认选中的智能体ID
  export const DEFAULT_AGENT_ID = 'xiaohongshu-writer';