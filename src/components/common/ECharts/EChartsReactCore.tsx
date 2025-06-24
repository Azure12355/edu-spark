// src/components/common/ECharts/EChartsReactCore.tsx
"use client";
import React from 'react';
import ReactECharts from 'echarts-for-react';
import type { EChartsOption } from 'echarts';

interface EChartsReactCoreProps {
    option: EChartsOption;
    style?: React.CSSProperties;
    className?: string;
}

const EChartsReactCore: React.FC<EChartsReactCoreProps> = ({ option, style, className }) => {
    return (
        <ReactECharts
            option={option}
            style={{ height: '100%', width: '100%', ...style }}
            className={className}
            notMerge={true}
            lazyUpdate={true}
        />
    );
};

export default EChartsReactCore;