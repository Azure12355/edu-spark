"use client";
import React, { useState, useRef, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation'; // --- 核心修改 1: 引入 useRouter ---
import styles from './AgentGrid.module.css';
import { agentData } from '@/lib/data/agentData';

const ITEMS_PER_PAGE = 10;

// Agent 卡片组件
const AgentCard = ({ agent, index, onMenuToggle, activeMenuId }: any) => {
    const menuRef = useRef(null);
    const router = useRouter(); // --- 核心修改 2: 实例化 router ---

    // --- 核心修改 3: 创建处理卡片点击和页面跳转的函数 ---
    const handleCardClick = () => {
        // 先关闭可能打开的任何上下文菜单
        onMenuToggle(null);
        // 使用 router.push 进行页面跳转，URL为动态的 /student/agent/[id]
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
            onClick={handleCardClick} // --- 核心修改 4: 将卡片的点击事件绑定到新函数 ---
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
                    {/* 这个按钮的 stopPropagation 确保点击它时不会触发卡片的跳转 */}
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
                    // --- 核心修改 5: 让悬浮按钮也触发跳转，并阻止事件冒泡 ---
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


// PaginationControls 组件保持不变
const PaginationControls = ({ currentPage, totalPages, onPageChange }: any) => {
    const [jumpValue, setJumpValue] = useState(String(currentPage));

    useEffect(() => {
        setJumpValue(String(currentPage));
    }, [currentPage]);

    const handleJump = () => {
        const pageNum = parseInt(jumpValue, 10);
        if (!isNaN(pageNum)) {
            const clampedPage = Math.max(1, Math.min(pageNum, totalPages));
            onPageChange(clampedPage);
        } else {
            setJumpValue(String(currentPage));
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleJump();
        }
    };

    const getPaginationNumbers = () => {
        const pages = [];
        const siblingCount = 1;
        const totalPageNumbers = siblingCount + 5;

        if (totalPages <= totalPageNumbers) {
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
        } else {
            const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
            const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPages);

            const shouldShowLeftDots = leftSiblingIndex > 2;
            const shouldShowRightDots = rightSiblingIndex < totalPages - 1;

            pages.push(1);
            if(shouldShowLeftDots) pages.push('...');

            for (let i = leftSiblingIndex; i <= rightSiblingIndex; i++) {
                if(i !== 1 && i !== totalPages) {
                    pages.push(i);
                }
            }

            if(shouldShowRightDots) pages.push('...');
            pages.push(totalPages);
        }
        // 去重
        return [...new Set(pages)];
    };

    const pages = getPaginationNumbers();

    return (
        <div className={styles.paginationContainer}>
            <button onClick={() => onPageChange(1)} disabled={currentPage === 1} className={styles.paginationButton}>首页</button>
            <button onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1} className={styles.paginationButton}><i className="fas fa-chevron-left"></i></button>
            {pages.map((page, index) => typeof page === 'string' ? (<span key={`dots-${index}`} className={styles.ellipsis}>...</span>) : (<button key={page} onClick={() => onPageChange(page)} className={`${styles.paginationButton} ${currentPage === page ? styles.active : ''}`}>{page}</button>))}
            <button onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages} className={styles.paginationButton}><i className="fas fa-chevron-right"></i></button>
            <button onClick={() => onPageChange(totalPages)} disabled={currentPage === totalPages} className={styles.paginationButton}>末页</button>
            <div className={styles.jumpToPageContainer}>
                <span>共 {totalPages} 页，跳至</span>
                <input
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    value={jumpValue}
                    onChange={(e) => setJumpValue(e.target.value.replace(/\D/g, ''))}
                    onKeyDown={handleKeyDown}
                    onBlur={handleJump}
                    className={styles.jumpInput}
                />
                <span>页</span>
            </div>
        </div>
    );
};

// AgentGrid 主组件保持不变
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
            gridRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

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
            <PaginationControls
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
            />
        </section>
    );
};

export default AgentGrid;