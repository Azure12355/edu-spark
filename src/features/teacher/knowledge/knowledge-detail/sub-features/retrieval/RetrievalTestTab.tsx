//[! code start]
// src/features/teacher/knowledge/knowledge-detail/sub-features/retrieval/RetrievalTestTab.tsx
"use client";

import React from 'react';
import RetrievalParameters, { RetrievalParams } from './components/RetrievalParameters';
import SearchAndResults from './components/SearchAndResults';
import styles from './style/RetrievalTestTab.module.css';
import { useRetrieval } from './hooks/useRetrieval';

interface RetrievalTestTabProps {
    kbId: number | string;
}

const RetrievalTestTab: React.FC<RetrievalTestTabProps> = ({ kbId }) => {
    const {
        params,
        results,
        isLoading,
        isInitialState,
        totalHits,
        responseTime,
        actions,
    } = useRetrieval({ kbId });

    return (
        <div className={styles.tabContainer}>
            <aside className={styles.leftPanel}>
                <RetrievalParameters
                    params={params}
                    onParamsChange={actions.handleParamsChange}
                    onSearch={actions.handleSearch}
                    isLoading={isLoading}
                />
            </aside>

            <main className={styles.rightPanel}>
                <SearchAndResults
                    query={params.query}
                    results={results}
                    totalHits={totalHits}
                    responseTime={responseTime}
                    isLoading={isLoading}
                    isInitialState={isInitialState}
                    onQueryChange={(q) => actions.handleParamsChange('query', q)}
                    onSearch={actions.handleSearch}
                    onClear={actions.handleClearQuery}
                    onPreview={actions.handlePreview} // 将 handlePreview 传递下去
                />
            </main>
        </div>
    );
};

export default RetrievalTestTab;
//[! code end]