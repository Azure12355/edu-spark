// src/components/common/ECharts/EChartsReactCore.tsx
"use client";
import React from 'react';
import ReactECharts from 'echarts-for-react';
import type { EChartsOption } from 'echarts';

interface EChartsReactCoreProps {
    option: EChartsOption;
    style?: React.CSSProperties;
    className?: string;
    // 1. 在 Props 接口中添加 onEvents 属性，类型是一个记录事件名和回调函数的对象
    onEvents?: Record<string, Function>;
}

// 2. 在组件的参数中解构出 onEvents
const EChartsReactCore: React.FC<EChartsReactCoreProps> = ({ option, style, className, onEvents }) => {
    return (
        <ReactECharts
            option={option}
            style={{ height: '100%', width: '100%', ...style }}
            className={className}
            notMerge={true}
            lazyUpdate={true}
            // 3. 将接收到的 onEvents prop 传递给底层的 <ReactECharts> 组件
            onEvents={onEvents}
        />
    );
};

export default EChartsReactCore;