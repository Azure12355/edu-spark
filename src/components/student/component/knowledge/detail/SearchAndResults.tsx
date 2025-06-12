"use client";
import React from 'react';
import styles from './SearchAndResults.module.css';
import { searchResultData } from '@/lib/data/searchResultData';
import SearchResultItem from './SearchResultItem';

const SearchAndResults = () => {
    return (
        <div className={styles.container}>
            {/* --- 核心修改：将搜索和历史链接包裹在 searchSection 中 --- */}
            <div className={styles.searchSection}>
                <div className={styles.searchBarWrapper}>
                    <i className={`fas fa-search ${styles.searchIcon}`}></i>
                    <input type="text" placeholder="python" className={styles.searchBar} />
                    <span className={styles.charCount}>6/8000</span>
                </div>
                <div className={styles.historyLink}><i className="fas fa-history"></i> 检索历史</div>
            </div>
            {/* --- 结束修改 --- */}

            <div className={styles.resultsContainer}>
                <div className={styles.resultsHeader}>
                    <h4>检索结果</h4>
                    <div className={styles.resultsMeta}>
                        <span>总耗时 <strong className={styles.time}>0.314s</strong></span>
                        <span>共使用 <strong>17</strong> tokens <i className="far fa-question-circle"></i></span>
                        <span>Request ID</span>
                    </div>
                </div>
                <div className={styles.resultsList}>
                    {searchResultData.map(result => (
                        <SearchResultItem key={result.id} result={result} />
                    ))}
                </div>
            </div>

            <p className={styles.footerInfo}>
                高性能检索服务由 <a href="#">VikingDB 向量库 <i className="fas fa-external-link-alt"></i></a> 提供
            </p>
        </div>
    );
};
export default SearchAndResults;