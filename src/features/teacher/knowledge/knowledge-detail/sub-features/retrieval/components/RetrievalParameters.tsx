// src/features/teacher/knowledge/knowledge-detail/sub-features/retrieval/RetrievalParameters/RetrievalParameters.tsx
"use client";

import React from 'react';
import Tooltip from '@/shared/components/ui/Tooltip/Tooltip';
import styles from '../style/RetrievalParameters.module.css';

// 1. 定义与后端 DTO 及业务逻辑相关的参数类型
export interface RetrievalParams {
    query: string;
    topK: number;
    // 未来可扩展，如重排模型开关等
    // useReranker: boolean;
}

// 2. 定义组件的 Props 接口
interface RetrievalParametersProps {
    params: RetrievalParams;
    onParamsChange: <K extends keyof RetrievalParams>(key: K, value: RetrievalParams[K]) => void;
    onSearch: () => void;
    isLoading: boolean;
}

const MAX_QUERY_CHARS = 1000;

const RetrievalParameters: React.FC<RetrievalParametersProps> = ({
                                                                     params,
                                                                     onParamsChange,
                                                                     onSearch,
                                                                     isLoading
                                                                 }) => {

    const isSearchDisabled = isLoading || !params.query.trim() || params.query.length > MAX_QUERY_CHARS;

    return (
        <div className={styles.panel}>
            {/* 头部信息 */}
            <header className={styles.header}>
                <i className="fas fa-cogs"></i>
                <h3>检索参数配置</h3>
            </header>
            <p className={styles.description}>
                输入您的问题，系统会将其转换为向量，并在知识库中检索最相似的文本切片。
            </p>

            {/* 表单区域 */}
            <div className={styles.form}>
                {/* 查询文本输入框 */}
                <div className={styles.formGroup}>
                    <label htmlFor="retrieval-query" className={styles.label}>
                        <span>查询内容</span>
                        <Tooltip content="系统将对此内容进行向量化以执行相似度搜索">
                            <i className="far fa-question-circle"></i>
                        </Tooltip>
                    </label>
                    <div className={styles.textareaWrapper}>
                        <textarea
                            id="retrieval-query"
                            className={styles.textarea}
                            placeholder="例如：请解释一下什么是“时间复杂度”？"
                            value={params.query}
                            onChange={(e) => onParamsChange('query', e.target.value)}
                            rows={6}
                            disabled={isLoading}
                        />
                        <span className={`${styles.charCount} ${params.query.length > MAX_QUERY_CHARS ? styles.error : ''}`}>
                            {params.query.length}/{MAX_QUERY_CHARS}
                        </span>
                    </div>
                </div>

                {/* 返回数量 Top K 控制 */}
                <div className={styles.formGroup}>
                    <label htmlFor="retrieval-topk" className={styles.label}>
                        <span>返回数量 (Top K)</span>
                        <Tooltip content="设置返回最相似的文本切片数量">
                            <i className="far fa-question-circle"></i>
                        </Tooltip>
                    </label>
                    <div className={styles.controls}>
                        <input
                            id="retrieval-topk"
                            type="range"
                            min="1"
                            max="20"
                            step="1"
                            className={styles.slider}
                            value={params.topK}
                            onChange={(e) => onParamsChange('topK', parseInt(e.target.value, 10))}
                            disabled={isLoading}
                        />
                        <input
                            type="number"
                            min="1"
                            max="20"
                            className={styles.valueInput}
                            value={params.topK}
                            onChange={(e) => onParamsChange('topK', parseInt(e.target.value, 10) || 1)}
                            disabled={isLoading}
                        />
                    </div>
                </div>

                {/* 其他未来可扩展的参数可以放在这里 */}
                {/*
                <div className={styles.formGroup}>
                   ...
                </div>
                */}
            </div>

            {/* 底部操作区 */}
            <footer className={styles.footer}>
                <button
                    className={`${styles.actionButton} ${styles.searchButton}`}
                    onClick={onSearch}
                    disabled={isSearchDisabled}
                >
                    {isLoading ? (
                        <>
                            <i className="fas fa-spinner fa-spin"></i>
                            <span>检索中...</span>
                        </>
                    ) : (
                        <>
                            <i className="fas fa-search"></i>
                            <span>开始检索</span>
                        </>
                    )}
                </button>
            </footer>
        </div>
    );
};

export default RetrievalParameters;