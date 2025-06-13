// src/lib/data/agentDetailData.ts

export interface AgentDetail {
    theme: {
        color: string; // 主题色, e.g., '#3B82F6'
        icon: string;  // 一个大的代表性 Font Awesome 图标, e.g., 'fas fa-sitemap'
    };
    keyFeatures: {
        title: string;
        isNew?: boolean;
        // 新增一个可选的 icon 字段
        icon?: string;
    }[];
    id: string;
    name: string;
    category: string;
    creator: string;
    isOwnedByCurrentUser: boolean; // 关键字段，用于判断是否显示编辑/删除按钮
    tags: string[];
    previewImage: string;
    description: string;
    coreCapabilities: {
        title: string;
        description: string;
        usageCount: string; // e.g., "1.2k+"
        icon: string;
        tag?: '核心' | '推荐';
        color: string;
    }[];
    introduction: string; // Markdown 格式
    usageScenarios: string; // Markdown 格式
    techSpec: string; // Markdown 格式
    targetAudience: string; // Markdown 格式

}

export const agentDetailData: AgentDetail = {
    id: 'agent-cs101',
    name: '数据结构与算法助教',
    category: '课程辅导',
    creator: '王老师',
    isOwnedByCurrentUser: true, // 假设当前用户是创建者
    tags: ['计算机科学', '算法', 'Java', 'Python'],
    previewImage: '/images',
    description: '一款专注于数据结构与算法学习的AI助教，旨在帮助学生攻克难点，掌握编程核心思想。',

    theme: {
        color: '#3B82F6', // 蓝色
        icon: 'fas fa-sitemap',
    },
    keyFeatures: [
        { title: '精准知识库问答', isNew: true, icon: 'fas fa-check-circle' },
        { title: '个性化习题生成', icon: 'fas fa-check-circle' },
        { title: '代码示例与优化建议', icon: 'fas fa-check-circle' },
        { title: '复杂算法可视化解释', isNew: true, icon: 'fas fa-check-circle' },
    ],
    coreCapabilities: [
        {
            title: '代码纠错',
            icon: 'fas fa-bug',
            tag: '核心',
            color: '#3B82F6',
            description: '快速定位代码中的语法和逻辑错误。',
            usageCount: '2.5k+'
        },
        {
            title: '算法可视化',
            icon: 'fas fa-project-diagram',
            tag: '推荐',
            color: '#8B5CF6',
            description: '将抽象的算法步骤转化为动态图形。',
            usageCount: '1.8k+'
        },
        {
            title: '复杂度分析',
            icon: 'fas fa-tachometer-alt',
            color: '#10B981',
            description: '自动分析代码的时间和空间复杂度。',
            usageCount: '980+'
        },
        {
            title: '模拟面试',
            icon: 'fas fa-user-tie',
            color: '#F59E0B',
            description: '模拟真实面试场景，进行算法问答。',
            usageCount: '750+'
        },
    ],
    introduction: `
**数据结构与算法助教** 是由资深教师 **王老师** 结合多年教学经验，并基于 **EduSpark** 平台构建的专业AI学习伙伴。它深度整合了《算法导论》、《剑指Offer》等经典教材和面试题库，形成了一个庞大而精确的知识网络。

我们的目标是：
- **让抽象概念具体化**：通过可视化和生动的例子，帮你理解复杂算法的每一步。
- **让被动学习主动化**：根据你的学习进度和薄弱环节，智能生成练习题，并提供即时反馈。
- **让知识应用实战化**：提供真实的企业级代码示例，并给出优化建议，无缝衔接课堂与业界。
    `,
    usageScenarios: `
- **日常学习**：当遇到不懂的算法概念时，可以直接提问，获得比搜索引擎更精确、更有条理的回答。
- **作业与编程**：在写代码时卡壳？粘贴你的代码，AI助教可以帮你找出潜在的 bug 或提供优化思路。
- **考前复习**：让助教为你生成一套针对特定章节（如“动态规划”、“图论”）的模拟试卷。
- **面试准备**：进行模拟面试，覆盖高频算法题，并获得解题思路和代码实现的指导。
    `,
    techSpec: `
- **核心模型**：EduSpark-Code-Pro (基于 DeepSeek-Coder 微调)
- **知识库**：包含超过 10,000 个已验证的算法知识点和代码片段。
- **向量数据库**：PGvector
- **平均响应时间**：< 2秒
    `,
    targetAudience: `
- **在校大学生**：正在学习《数据结构》、《算法分析》等计算机核心课程的学生。
- **求职者**：准备IT行业技术面试，需要大量刷题和巩固算法知识的应届生或社会人士。
- **编程爱好者**：希望系统性地提升自己算法内功，写出更高效、更优雅代码的开发者。
- **转行人士**：从其他领域转向计算机科学，需要快速构建坚实基础的学习者。
    `,
};