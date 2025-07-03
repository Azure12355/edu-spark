//[! code start]
// src/features/teacher/knowledge/knowledge-detail/sub-features/retrieval/SearchAndResults/SearchAndResults.tsx
"use client";

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SearchResultItem from './SearchResultItem';
import styles from '../style/SearchAndResults.module.css';
import { ChunkVO } from '@/features/teacher/knowledge/knowledge-detail/sub-features/chunk-management/service/chunkService';

export type SearchResult = ChunkVO & {
    distance?: number;
};

/**
 * @interface SearchAndResultsProps
 * @description 定义 SearchAndResults 组件的 Props，完全由外部逻辑驱动。
 */
export interface SearchAndResultsProps {
    query: string;
    results: SearchResult[];
    totalHits: number;
    responseTime: number;
    isLoading: boolean;
    isInitialState: boolean;
    onQueryChange: (query: string) => void;
    onSearch: () => void;
    onClear: () => void;
    onPreview: (result: SearchResult) => void; // 新增 onPreview prop
}

// ... 内部状态显示子组件 (InitialState, LoadingState, EmptyState) 保持不变 ...

const InitialState = () => (
    <div className={styles.stateContainer}>
        <i className={`fas fa-search ${styles.initialStateIcon}`}></i>
        <h3 className={styles.stateTitle}>开始一次知识检索</h3>
        <p className={styles.stateMessage}>在上方输入您的问题，系统将在知识库中查找最相关的文本切片。</p>
    </div>
);

const LoadingState = () => (
    <div className={styles.stateContainer}>
        <div className={styles.loadingSpinner}></div>
        <h3 className={styles.stateTitle}>正在检索中...</h3>
        <p className={styles.stateMessage}>请稍候，我们正在为您匹配最相关的知识内容。</p>
    </div>
);

const EmptyState = () => (
    <div className={styles.stateContainer}>
        <i className={`fas fa-box-open ${styles.emptyStateIcon}`}></i>
        <h3 className={styles.stateTitle}>未找到相关内容</h3>
        <p className={styles.stateMessage}>请尝试更换关键词，或检查知识库中是否包含相关文档。</p>
    </div>
);


/**
 * 搜索与结果展示组件 (重构后)
 * @description 一个纯粹的展示组件，负责渲染搜索栏和结果区域。
 */
const SearchAndResults: React.FC<SearchAndResultsProps> = ({
                                                               query,
                                                               results,
                                                               totalHits,
                                                               responseTime,
                                                               isLoading,
                                                               isInitialState,
                                                               onQueryChange,
                                                               onSearch,
                                                               onClear,
                                                               onPreview // 解构新增的 prop
                                                           }) => {

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            onSearch();
        }
    };

    /**
     * 动态渲染主内容区域
     */
    const renderContent = () => {
        if (isInitialState) {
            return <InitialState />;
        }
        if (isLoading) {
            return <LoadingState />;
        }
        if (results.length === 0) {
            return <EmptyState />;
        }
        return (
            <>
                <div className={styles.resultsHeader}>
                    <h4>检索结果</h4>
                    <div className={styles.resultsMeta}>
                        <span>总耗时 <strong className={styles.time}>{(responseTime / 1000).toFixed(3)}s</strong></span>
                        <span>共匹配到 <strong>{totalHits}</strong> 条结果</span>
                    </div>
                </div>
                <div className={styles.resultsList}>
                    {results.map((result) => (
                        <SearchResultItem
                            key={result.id}
                            result={result}
                            onPreview={onPreview} // 将 onPreview 回调传递给子组件
                        />
                    ))}
                </div>
            </>
        );
    };

    return (
        <div className={styles.container}>
            <div className={styles.searchSection}>
                <div className={styles.searchBarContainer}>
                    <div className={styles.searchInputWrapper}>
                        <i className={`fas fa-search ${styles.searchIcon}`}></i>
                        <input
                            type="text"
                            placeholder="输入问题或关键词进行检索..."
                            className={styles.searchInput}
                            value={query}
                            onChange={(e) => onQueryChange(e.target.value)}
                            onKeyDown={handleKeyDown}
                            disabled={isLoading}
                        />
                        {query && !isLoading && (
                            <button onClick={onClear} className={styles.clearButton} title="清空">
                                <i className="fas fa-times-circle"></i>
                            </button>
                        )}
                    </div>
                    <button
                        onClick={onSearch}
                        className={styles.searchButton}
                        disabled={isLoading || !query.trim()}
                    >
                        {isLoading ? '检索中...' : '检索'}
                    </button>
                </div>
            </div>

            <div className={styles.resultsContainer}>
                <AnimatePresence mode="wait">
                    <motion.div
                        key={isInitialState ? 'initial' : isLoading ? 'loading' : results.length > 0 ? 'data' : 'empty'}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                    >
                        {renderContent()}
                    </motion.div>
                </AnimatePresence>
            </div>

            <p className={styles.footerInfo}>
                高性能检索服务由 <a href="#">VikingDB 向量库 <i className="fas fa-external-link-alt"></i></a> 提供
            </p>
        </div>
    );
};

export default SearchAndResults;
//[! code end]