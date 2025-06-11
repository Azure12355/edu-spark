"use client";
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './AgentGrid.module.css';

// 再次扩充数据，增加 'palette' 和 'skills' 字段
const agentData = [
    { id: 1, name: 'Python 高级编程助教', creator: '李教授', avatarText: 'Py', avatarGradient: 'linear-gradient(135deg, #43CBFF 0%, #9708CC 100%)', description: '深入解析Python高级特性，提供代码优化建议和实战项目指导。', skills: ['代码生成', '算法解析', '项目架构'], model: 'DeepSeek-Coder', version: 'v1.2', userCount: '1.2k', palette: 'sky' },
    { id: 2, name: '考研政治全程陪跑', creator: '王老师', avatarText: '政', avatarGradient: 'linear-gradient(135deg, #F5515F 0%, #A1051D 100%)', description: '覆盖所有考点，提供每日一练、错题精讲和冲刺押题。', skills: ['知识点问答', '模拟测验', '时事分析'], model: 'Qwen-72B', version: 'v2.0', userCount: '8.9k', palette: 'sunset' },
    { id: 3, name: 'UI/UX 设计灵感助手', creator: '设计部', avatarText: 'UI', avatarGradient: 'linear-gradient(135deg, #9C27B0 0%, #E040FB 100%)', description: '提供海量设计案例分析，激发你的创作灵感，解答设计规范问题。', skills: ['案例检索', '配色建议', '布局分析'], model: 'GLM-4', version: 'v1.5', userCount: '5.6k', palette: 'lilac' },
    { id: 4, name: 'Java 面试通关宝典', creator: '张老师', avatarText: 'J', avatarGradient: 'linear-gradient(135deg, #f89820 0%, #fdb927 100%)', description: '模拟真实面试场景，覆盖JVM、并发、框架等核心知识点。', skills: ['模拟面试', '八股文问答', '源码解读'], model: 'GLM-4', version: 'v3.1', userCount: '10k+', palette: 'sandstone' },
    { id: 5, name: '高等数学解题助手', creator: '陈博士', avatarText: 'Σ', avatarGradient: 'linear-gradient(135deg, #0072ff 0%, #00c6ff 100%)', description: '无论是微积分还是线性代数，提供详细的解题步骤和思路分析。', skills: ['公式推导', '步骤详解', '概念辨析'], model: 'Qwen-72B', version: 'v1.8', userCount: '2.1k', palette: 'ocean' },
    { id: 6, name: '莎士比亚戏剧赏析', creator: 'Anna', avatarText: 'S', avatarGradient: 'linear-gradient(135deg, #603813 0%, #b29f94 100%)', description: '带你走进莎翁的戏剧世界，深入解读经典台词与时代背景。', skills: ['背景介绍', '文本分析', '角色扮演'], model: 'DeepSeek-LLM', version: 'v1.0', userCount: '780', palette: 'meadow' },
];

const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
        opacity: 1, y: 0,
        transition: { delay: i * 0.05, duration: 0.5, ease: "easeOut" },
    }),
};

// Agent 卡片组件
const AgentCard = ({ agent, index, onMenuToggle, activeMenuId }: { agent: any, index: any, onMenuToggle: any, activeMenuId: any }) => {
    const menuRef = useRef(null);

    return (
        <motion.div
            className={`${styles.card} ${styles[agent.palette]}`}
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            whileHover="hover"
            custom={index}
            onClick={() => onMenuToggle(null)} // 点击卡片主体关闭所有菜单
        >
            <div className={styles.cardHeader}>
                <div className={styles.avatar} style={{ background: agent.avatarGradient }}>
                    {agent.avatarText}
                </div>
                <div className={styles.headerText}>
                    <h4 className={styles.agentName}>{agent.name}</h4>
                    <p className={styles.agentCreator}>by {agent.creator}</p>
                </div>
                <div className={styles.contextMenuWrapper} ref={menuRef}>
                    <button className={styles.menuButton} onClick={(e) => { e.stopPropagation(); onMenuToggle(agent.id); }}>
                        <i className="fas fa-ellipsis-v"></i>
                    </button>
                    <AnimatePresence>
                        {activeMenuId === agent.id && (
                            <motion.div
                                className={styles.contextMenu}
                                initial={{ opacity: 0, scale: 0.9, y: -10 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.2 }}
                                onClick={(e) => e.stopPropagation()}
                            >
                                <a href="#"><i className="far fa-eye"></i> 查看详情</a>
                                <a href="#"><i className="far fa-bookmark"></i> 添加收藏</a>
                                <a href="#"><i className="fas fa-share-alt"></i> 分享 Agent</a>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>

            <div className={styles.cardBody}>
                <p className={styles.agentDescription}>{agent.description}</p>
                <div className={styles.capabilities}>
                    {agent.skills.map((skill: any) => <span key={skill} className={styles.themedTag}>{skill}</span>)}
                </div>
            </div>

            <div className={styles.cardFooter}>
                <div className={styles.modelInfo}>
                    <i className="fas fa-microchip"></i>
                    <span>{agent.model}</span>
                    <span className={styles.agentVersion}>{agent.version}</span>
                </div>
                <div className={styles.userCount}>
                    <i className="fas fa-users"></i>
                    <span>{agent.userCount}</span>
                </div>
            </div>

            <motion.div
                className={styles.hoverOverlay}
                variants={{ hidden: { opacity: 0 }, hover: { opacity: 1 } }}
                transition={{ duration: 0.4 }}
            >
                <motion.button
                    className={styles.chatButton}
                    variants={{ hidden: { opacity: 0, y: 20 }, hover: { opacity: 1, y: 0 } }}
                    transition={{ duration: 0.3, delay: 0.1, ease: 'easeOut' }}
                >
                    进入对话
                </motion.button>
            </motion.div>
        </motion.div>
    );
};

// Agent 网格容器组件
const AgentGrid = () => {
    const [activeMenuId, setActiveMenuId] = useState<number | null>(null);
    const gridRef = useRef<HTMLDivElement>(null);

    const handleMenuToggle = (id: number | null) => {
        setActiveMenuId(prevId => (prevId === id ? null : id));
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (gridRef.current && !gridRef.current.contains(event.target as Node)) {
                setActiveMenuId(null);
            }
        };
        document.addEventListener('click', handleClickOutside, true);
        return () => document.removeEventListener('click', handleClickOutside, true);
    }, []);

    return (
        <section>
            <h3 className="student-section-title">精选 Agents</h3>
            <div className={styles.grid} ref={gridRef}>
                {agentData.map((agent, index) => (
                    <AgentCard
                        key={agent.id}
                        agent={agent}
                        index={index}
                        onMenuToggle={handleMenuToggle}
                        activeMenuId={activeMenuId}
                    />
                ))}
            </div>
        </section>
    );
};

export default AgentGrid;