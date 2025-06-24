// src/components/common/Pagination/Pagination.tsx
"use client";

import React, { useState, useEffect } from 'react';
import styles from './Pagination.module.css';

// 为组件定义清晰的 Props 接口
interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

/**
 * 一个通用的、可复用的分页组件。
 * 支持页码显示、前后翻页、首页/末页跳转，以及快速跳转到指定页面。
 */
const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
    const [jumpValue, setJumpValue] = useState(String(currentPage));

    useEffect(() => {
        setJumpValue(String(currentPage));
    }, [currentPage]);

    const handleJump = () => {
        const pageNum = parseInt(jumpValue, 10);
        if (!isNaN(pageNum) && pageNum > 0 && pageNum <= totalPages) {
            onPageChange(pageNum);
        } else {
            // 如果输入无效，则重置为当前页码
            setJumpValue(String(currentPage));
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleJump();
        }
    };

    // 动态生成页码的逻辑
    const getPaginationNumbers = () => {
        const pages = [];
        const siblingCount = 1; // 当前页码左右各显示1个页码
        const totalPageNumbers = siblingCount * 2 + 5; // (siblings * 2) + first + last + current + 2*ellipsis

        if (totalPages <= totalPageNumbers) {
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
        } else {
            const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
            const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPages);

            const shouldShowLeftDots = leftSiblingIndex > 2;
            const shouldShowRightDots = rightSiblingIndex < totalPages - 2;

            const firstPageIndex = 1;
            const lastPageIndex = totalPages;

            if (shouldShowLeftDots && !shouldShowRightDots) {
                const rightItemCount = 3 + 2 * siblingCount;
                const rightRange = Array.from({ length: rightItemCount }, (_, i) => totalPages - rightItemCount + 1 + i);
                pages.push(firstPageIndex, '...');
                pages.push(...rightRange);
            } else if (!shouldShowLeftDots && shouldShowRightDots) {
                const leftItemCount = 3 + 2 * siblingCount;
                const leftRange = Array.from({ length: leftItemCount }, (_, i) => i + 1);
                pages.push(...leftRange, '...', lastPageIndex);
            } else if (shouldShowLeftDots && shouldShowRightDots) {
                pages.push(firstPageIndex, '...');
                for (let i = leftSiblingIndex; i <= rightSiblingIndex; i++) {
                    pages.push(i);
                }
                pages.push('...', lastPageIndex);
            }
        }
        return [...new Set(pages)];
    };

    if (totalPages <= 1) {
        return null; // 如果只有一页或没有，不显示分页
    }

    const pages = getPaginationNumbers();

    return (
        <div className={styles.paginationContainer}>
            <button onClick={() => onPageChange(1)} disabled={currentPage === 1} className={styles.paginationButton}>首页</button>
            <button onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1} className={styles.paginationButton}>
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

            <button onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages} className={styles.paginationButton}>
                <i className="fas fa-chevron-right"></i>
            </button>
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

export default Pagination;