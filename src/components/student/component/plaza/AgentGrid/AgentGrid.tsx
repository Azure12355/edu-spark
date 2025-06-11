"use client";
import React, { useState, useRef, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './AgentGrid.module.css';
import { agentData } from '@/lib/data/agentData'; // 从lib导入数据

const ITEMS_PER_PAGE = 10;

// Agent 卡片组件 (代码保持不变, 此处为简洁省略, 请保留您上一版完整的AgentCard代码)
const AgentCard = ({ agent, index, onMenuToggle, activeMenuId }: any) => {
    // ... (请保留上一版完整的 AgentCard 组件代码)
    // 为确保完整性, 我在这里重新粘贴一遍
    const menuRef = useRef(null);
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
            onClick={() => onMenuToggle(null)}
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

// 分页控件组件 (核心修改区域)
const PaginationControls = ({ currentPage, totalPages, onPageChange }: any) => {
    // 状态：用于管理输入框中的值（字符串类型，以便用户自由输入）
    const [jumpValue, setJumpValue] = useState(String(currentPage));

    // 副作用：当外部的 currentPage 变化时（例如点击了上一页/下一页），同步更新输入框的值
    useEffect(() => {
        setJumpValue(String(currentPage));
    }, [currentPage]);

    // 处理跳转逻辑
    const handleJump = () => {
        const pageNum = parseInt(jumpValue, 10);
        // 验证输入是否为有效数字
        if (!isNaN(pageNum)) {
            // 将页码限制在 1 和 totalPages 之间
            const clampedPage = Math.max(1, Math.min(pageNum, totalPages));
            onPageChange(clampedPage);
        } else {
            // 如果输入无效，则将输入框的值重置回当前页码
            setJumpValue(String(currentPage));
        }
    };

    // 处理键盘事件，实现回车跳转
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            e.preventDefault(); // 防止表单提交等默认行为
            handleJump();
        }
    };

    // ... (getPaginationNumbers 函数保持不变)
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

            if (shouldShowLeftDots) {
                pages.push(1);
                pages.push('...');
            }

            for (let i = leftSiblingIndex; i <= rightSiblingIndex; i++) {
                pages.push(i);
            }

            if (shouldShowRightDots) {
                pages.push('...');
                pages.push(totalPages);
            }
        }
        return pages;
    };

    const pages = getPaginationNumbers();

    return (
        <div className={styles.paginationContainer}>
            {/* ... (原有按钮保持不变) ... */}
            <button onClick={() => onPageChange(1)} disabled={currentPage === 1} className={styles.paginationButton}>首页</button>
            <button onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1} className={styles.paginationButton}><i className="fas fa-chevron-left"></i></button>
            {pages.map((page, index) => typeof page === 'string' ? (<span key={`dots-${index}`} className={styles.ellipsis}>...</span>) : (<button key={page} onClick={() => onPageChange(page)} className={`${styles.paginationButton} ${currentPage === page ? styles.active : ''}`}>{page}</button>))}
            <button onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages} className={styles.paginationButton}><i className="fas fa-chevron-right"></i></button>
            <button onClick={() => onPageChange(totalPages)} disabled={currentPage === totalPages} className={styles.paginationButton}>末页</button>

            {/* 新增的跳转功能模块 */}
            <div className={styles.jumpToPageContainer}>
                <span>共 {totalPages} 页，跳至</span>
                <input
                    type="text" // 使用 text 类型以便更好的控制
                    inputMode="numeric" // 提示移动端弹出数字键盘
                    pattern="[0-9]*"
                    value={jumpValue}
                    onChange={(e) => setJumpValue(e.target.value.replace(/\D/g, ''))} // 只允许输入数字
                    onKeyDown={handleKeyDown}
                    onBlur={handleJump} // 失去焦点时也尝试跳转
                    className={styles.jumpInput}
                />
                <span>页</span>
            </div>
        </div>
    );
};


// Agent 网格容器组件 (代码保持不变)
const AgentGrid = () => {
    // ... (请保留上一版完整的 AgentGrid 组件代码，无需修改)
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