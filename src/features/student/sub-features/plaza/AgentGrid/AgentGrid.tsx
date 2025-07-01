// src/components/student/component/plaza/AgentGrid/AgentGrid.tsx
"use client";

import React, { useState, useRef, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import styles from './AgentGrid.module.css';
import { agentData } from '@/shared/lib/data/agentData';
// 1. 导入新的 KnowledgePagination 组件
import Pagination from '@/shared/components/ui/Pagination/Pagination';

const ITEMS_PER_PAGE = 10;

// 2. AgentCard 组件保持不变，这里不再重复
const AgentCard = ({ agent, index, onMenuToggle, activeMenuId }: any) => {
    const menuRef = useRef(null);
    const router = useRouter();

    const handleCardClick = () => {
        onMenuToggle(null);
        router.push(`/student/agent/${agent.id}`);
    };

    return (
        <motion.div
            className={`${styles.card} ${styles[agent.palette]}`}
            variants={{
                hidden: { opacity: 0, y: 20 },
                visible: (i: number) => ({
                    opacity: 1, y: 0,
                    transition: { delay: i * 0.05, duration: 0.5, ease: "easeOut" },
                }),
            }}
            initial="hidden"
            animate="visible"
            whileHover="hover"
            custom={index}
            onClick={handleCardClick}
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
                    onClick={(e) => {
                        e.stopPropagation();
                        handleCardClick();
                    }}
                >
                    立即体验
                </motion.button>
            </motion.div>
        </motion.div>
    );
};

// 3. 移除内联的 PaginationControls 组件定义

// AgentGrid 主组件
const AgentGrid = () => {
    const [activeMenuId, setActiveMenuId] = useState<number | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const gridRef = useRef<HTMLDivElement>(null);

    const totalPages = Math.ceil(agentData.length / ITEMS_PER_PAGE);

    const currentAgents = useMemo(() => {
        const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
        const endIndex = startIndex + ITEMS_PER_PAGE;
        return agentData.slice(startIndex, endIndex);
    }, [currentPage]);

    const handlePageChange = (page: number) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
            // 切换页面后，平滑滚动到网格顶部
            gridRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    const handleMenuToggle = (id: number | null) => {
        setActiveMenuId(prevId => (prevId === id ? null : id));
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            // This is for closing the context menu when clicking outside
            if (gridRef.current && !gridRef.current.contains(event.target as Node)) {
                setActiveMenuId(null);
            }
        };
        document.addEventListener('click', handleClickOutside, true);
        return () => document.removeEventListener('click', handleClickOutside, true);
    }, []);

    return (
        <section ref={gridRef}>
            <h3 className="student-section-title">精选 Agents</h3>
            <div className={styles.grid}>
                {currentAgents.map((agent, index) => (
                    <AgentCard
                        key={agent.id}
                        agent={agent}
                        index={index}
                        onMenuToggle={handleMenuToggle}
                        activeMenuId={activeMenuId}
                    />
                ))}
            </div>
            {/* 4. 使用抽离出的通用 KnowledgePagination 组件 */}
            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
            />
        </section>
    );
};

export default AgentGrid;