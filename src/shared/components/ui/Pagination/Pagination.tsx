"use client";

import React, { useState, useEffect } from 'react';
import styles from './Pagination.module.css';

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number, pageSize?: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
    const [jumpValue, setJumpValue] = useState(String(currentPage));

    useEffect(() => {
        setJumpValue(String(currentPage));
    }, [currentPage]);

    const handleJump = () => {
        const pageNum = parseInt(jumpValue, 10);
        if (!isNaN(pageNum) && pageNum >= 1 && pageNum <= totalPages) {
            onPageChange(pageNum);
        } else {
            setJumpValue(String(currentPage)); // Reset if invalid
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleJump();
        }
    };
    // [!code focus start]
    /**
     * 【核心重构】智能生成页码数组的逻辑
     * @returns 返回一个包含数字和省略号的数组，例如: [1, '...', 4, 5, 6, '...', 10]
     */
    const getPaginationNumbers = () => {
        const SIBLING_COUNT = 1; // 当前页码前后各显示1个页码
        const TOTAL_PAGE_NUMBERS = SIBLING_COUNT * 2 + 5; // (前后sibling) + (当前页) + (第一页) + (最后一页) + (2个省略号)

        // Case 1: 如果总页数小于等于7，则全部显示，不需要省略号
        if (totalPages <= TOTAL_PAGE_NUMBERS) {
            return Array.from({ length: totalPages }, (_, i) => i + 1);
        }

        const leftSiblingIndex = Math.max(currentPage - SIBLING_COUNT, 1);
        const rightSiblingIndex = Math.min(currentPage + SIBLING_COUNT, totalPages);

        const shouldShowLeftDots = leftSiblingIndex > 2;
        const shouldShowRightDots = rightSiblingIndex < totalPages - 2;

        const firstPageIndex = 1;
        const lastPageIndex = totalPages;

        // Case 2: 只显示右侧省略号
        if (!shouldShowLeftDots && shouldShowRightDots) {
            let leftItemCount = 3 + 2 * SIBLING_COUNT;
            let leftRange = Array.from({ length: leftItemCount }, (_, i) => i + 1);
            return [...leftRange, '...', totalPages];
        }

        // Case 3: 只显示左侧省略号
        if (shouldShowLeftDots && !shouldShowRightDots) {
            let rightItemCount = 3 + 2 * SIBLING_COUNT;
            let rightRange = Array.from({ length: rightItemCount }, (_, i) => totalPages - rightItemCount + 1 + i);
            return [firstPageIndex, '...', ...rightRange];
        }

        // Case 4: 两侧都显示省略号
        if (shouldShowLeftDots && shouldShowRightDots) {
            let middleRange = Array.from({ length: rightSiblingIndex - leftSiblingIndex + 1 }, (_, i) => leftSiblingIndex + i);
            return [firstPageIndex, '...', ...middleRange, '...', lastPageIndex];
        }

        return []; // 默认情况，理论上不会触发
    };
    // [!code focus end]

    if (totalPages <= 1) {
        return null;
    }

    const pages = getPaginationNumbers();

    return (
        <div className={styles.paginationContainer}>
            <button
                onClick={() => onPageChange(1)}
                disabled={currentPage === 1}
                className={styles.paginationButton}
            >
                首页
            </button>
            <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className={`${styles.paginationButton} ${styles.arrowButton}`}
            >
                <i className="fas fa-chevron-left"></i>
            </button>

            {pages.map((page, index) =>
                typeof page === 'string' ? (
                    <span key={`dots-${index}`} className={styles.ellipsis}>...</span>
                ) : (
                    <button
                        key={page}
                        onClick={() => onPageChange(page)}
                        className={`${styles.paginationButton} ${currentPage === page ? styles.active : ''}`}
                    >
                        {page}
                    </button>
                )
            )}

            <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`${styles.paginationButton} ${styles.arrowButton}`}
            >
                <i className="fas fa-chevron-right"></i>
            </button>
            <button
                onClick={() => onPageChange(totalPages)}
                disabled={currentPage === totalPages}
                className={styles.paginationButton}
            >
                末页
            </button>

            <div className={styles.jumpToPageContainer}>
                <span>共 {totalPages} 页，跳至</span>
                <input
                    type="text"
                    inputMode="numeric"
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

export default Pagination;