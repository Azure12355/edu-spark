// src/lib/teacher-data.ts

export interface Agent {
    id: string;
    author: string;
    avatarColor: string;
    avatarText: string;
    title: string;
    description: string;
    tags: string[];
    releaseDate: string;
  }
  
  export const agentData: Agent[] = [
    {
      id: '1854...',
      author: '智谱清言',
      avatarColor: '#722ED1',
      avatarText: '客',
      title: '客服小谱',
      description: '我能快速学习平台客服管理知识，知识内容专有专知且支持实时更新，帮助你复制具有自有知识的智能客服。',
      tags: ['商业服务', '工作提效'],
      releaseDate: '2024-11-10',
    },
    {
      id: '1840...',
      author: '智谱清言',
      avatarColor: '#13C2C2',
      avatarText: '诊',
      title: '诊疗陪练',
      description: '诊疗陪练AI通过AI模拟患者，辅助医学专业学生展开会话问诊、提供问诊评分，高效助力临床实践训练，基于Agent的思考链条，最大...',
      tags: ['商业服务', '工作提效'],
      releaseDate: '2024-11-06',
    },
    {
      id: '1f40...',
      author: '智谱清言',
      avatarColor: '#F5222D',
      avatarText: '小',
      title: '小红书营销文案助理',
      description: '一键生成小红书爆款文案，帮你起标题、轻松吸引粉丝，提升品牌影响力。只要一个主题，一篇爆款文案就搞定！',
      tags: ['写作辅助', '商业服务', '工作提效'],
      releaseDate: '2024-11-06',
    },
    {
      id: '1840...',
      author: '智谱清言',
      avatarColor: '#FAAD14',
      avatarText: '景',
      title: '景点百晓生(拍照识图)',
      description: '拍照识别神器，上传任意景点照片，轻松解锁景点介绍，轻松解决未解风光，内外景点风光，实时信息，历史故事，一秒get',
      tags: ['商业服务', '生活助手'],
      releaseDate: '2025-04-01',
    },
    {
      id: '1457...',
      author: '智谱清言',
      avatarColor: '#52C41A',
      avatarText: '市',
      title: '市场报告查询助手',
      description: '市场报告查询助手，通过搜索公开信息，快速生成行业市场报告，涵盖市场规模、产品结构和相关数据，帮助初步掌握行业动态...',
      tags: ['商业服务', '写作辅助', '工作提效'],
      releaseDate: '2024-11-06',
    },
    {
      id: '1f40...',
      author: '智谱清言',
      avatarColor: '#FA8C16',
      avatarText: '作',
      title: '作业助手',
      description: '作业助手，智能识别照片题目，精准提供正确答案，高效辅助学习。用户只需上传题目，即可快速获得正确答案。',
      tags: ['商业服务', '教育辅助'],
      releaseDate: '2025-04-01',
    },
    {
      id: '1833...',
      author: '智谱清言',
      avatarColor: '#1677FF',
      avatarText: '教',
      title: '教师助手',
      description: '可以广泛应用于学科问答、反思回顾、素质拓展等场景，实现24小时智能分身24小时随时随地的陪伴解答。',
      tags: ['教育辅助', '商业服务', '工作提效'],
      releaseDate: '2025-04-01',
    },
    {
      id: '1840...',
      author: '智谱清言',
      avatarColor: '#531DAB',
      avatarText: '翻',
      title: '翻译专家',
      description: '翻译专家Agent精通中英文翻译，涵盖生活、学术、艺术、文学及各类考试场景，能轻松处理各种翻译难题，翻译范畴包括但不...',
      tags: ['教育辅助', '商业服务'],
      releaseDate: '2024-11-06',
    },
      {
      id: '6594...',
      author: '智谱清言',
      avatarColor: '#000000',
      avatarText: 'C',
      title: 'ChatGLM',
      description: 'Hi，我是ChatGLM，超开心遇见你！你最近有什么好玩的事想和我分享吗？🤗',
      tags: [],
      releaseDate: '2024-01-02',
    },
  ];