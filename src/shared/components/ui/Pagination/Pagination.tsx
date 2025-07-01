"use client";

import React, { useState, useEffect } from 'react';
import styles from './Pagination.module.css';

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
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

    // 智能生成页码数组的逻辑
    const getPaginationNumbers = () => {
        if (totalPages <= 7) { // 如果总页数不多，全部显示
            return Array.from({ length: totalPages }, (_, i) => i + 1);
        }

        const pages = [];
        const siblingCount = 1;
        const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
        const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPages);

        const shouldShowLeftDots = leftSiblingIndex > 2;
        const shouldShowRightDots = rightSiblingIndex < totalPages - 1;

        pages.push(1); // 首页

        if (shouldShowLeftDots) {
            pages.push('...');
        }

        for (let i = leftSiblingIndex; i <= rightSiblingIndex; i++) {
            if (i > 1 && i < totalPages) {
                pages.push(i);
            }
        }

        if (shouldShowRightDots) {
            pages.push('...');
        }

        pages.push(totalPages); // 末页

        return [...new Set(pages)]; // 去重，防止边界情况
    };

    if (totalPages <= 1) {
        return null;
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