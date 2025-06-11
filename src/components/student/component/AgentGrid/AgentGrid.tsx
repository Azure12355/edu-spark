"use client";
import React from 'react';
import Image from 'next/image';
import styles from './AgentGrid.module.css';

// 模拟的Agent数据
const agentData = [
    { id: 1, name: 'Python 高级编程助教', creator: '李教授', description: '深入解析Python高级特性，提供代码优化建议和实战项目指导。', avatar: '/images/Chat/robot.png', tags: ['编程', 'Python', '热门'], userCount: '1.2k' },
    { id: 2, name: '考研政治全程陪跑', creator: '王老师', description: '覆盖所有考点，提供每日一练、错题精讲和冲刺押题。', avatar: 'https://via.placeholder.com/40?text=政', tags: ['考研', '文科'], userCount: '8.9k' },
    { id: 3, name: 'UI/UX 设计灵感助手', creator: '设计部', description: '提供海量设计案例分析，激发你的创作灵感，解答设计规范问题。', avatar: 'https://via.placeholder.com/40?text=UI', tags: ['设计', '艺术', '灵感'], userCount: '5.6k' },
    { id: 4, name: 'Java 面试通关宝典', creator: '张老师', description: '模拟真实面试场景，覆盖JVM、并发、框架等核心知识点。', avatar: 'https://via.placeholder.com/40?text=J', tags: ['编程', 'Java', '面试', '热门'], userCount: '10k+' },
    { id: 5, name: '高等数学解题助手', creator: '陈博士', description: '无论是微积分还是线性代数，提供详细的解题步骤和思路分析。', avatar: 'https://via.placeholder.com/40?text=Σ', tags: ['理工科', '数学'], userCount: '2.1k' },
    { id: 6, name: '莎士比亚戏剧赏析', creator: 'Anna', description: '带你走进莎翁的戏剧世界，深入解读经典台词与时代背景。', avatar: 'https://via.placeholder.com/40?text=S', tags: ['文学', '英文'], userCount: '780' },
    { id: 7, name: '金融市场分析师', creator: '华尔街之狼', description: '分析宏观经济数据，解读财报，提供量化交易策略思路。', avatar: 'https://via.placeholder.com/40?text=金', tags: ['经管', '金融'], userCount: '3.3k' },
    { id: 8, name: 'AI 绘画 Prompt 生成器', creator: '艺术家', description: '将你的想法转化为精准、富有创意的Midjourney/SD提示词。', avatar: 'https://via.placeholder.com/40?text=AI', tags: ['艺术', 'AIGC', '热门'], userCount: '15k+' },
];

const AgentCard = ({ agent }: any) => (
    <div className={styles.card}>
        <div className={styles.cardHeader}>
            <Image src={agent.avatar} alt={agent.name} width={40} height={40} className={styles.avatar} />
            <div className={styles.headerText}>
                <h4 className={styles.agentName}>{agent.name}</h4>
                <p className={styles.agentCreator}>by {agent.creator}</p>
            </div>
        </div>
        <p className={styles.agentDescription}>{agent.description}</p>
        <div className={styles.cardFooter}>
            <div className={styles.tags}>
                {agent.tags.map((tag: any) => (
                    <span key={tag} className={`${styles.tag} ${tag === '热门' ? styles.hot : ''}`}>{tag}</span>
                ))}
            </div>
            <div className={styles.userCount}>
                <i className="fas fa-users"></i>
                <span>{agent.userCount}</span>
            </div>
        </div>
    </div>
);

const AgentGrid = () => {
    return (
        <section>
            <h3 className="student-section-title">精选 Agents</h3>
            <div className={styles.grid}>
                {agentData.map(agent => (
                    <AgentCard key={agent.id} agent={agent} />
                ))}
            </div>
        </section>
    );
};

export default AgentGrid;