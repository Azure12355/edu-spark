// src/components/teacher/studio/TrendCard/TrendCard.tsx
"use client";
import React from 'react';
import EChartsReactCore from '@/components/common/ECharts/EChartsReactCore';
import type { EChartsOption, SeriesOption } from 'echarts';
import styles from './TrendCard.module.css';

type ChartType = 'line' | 'bar';
type TrendDirection = 'up' | 'down';

interface TrendCardProps {
    title: string;
    value: string;
    trendValue: string;
    trendDirection: TrendDirection;
    chartType: ChartType;
    chartData: any[];
    chartColor?: string;
    // 新增：接收卡片背景色
    cardBgColor: string;
}

const TrendCard: React.FC<TrendCardProps> = ({
                                                 title,
                                                 value,
                                                 trendValue,
                                                 trendDirection,
                                                 chartType,
                                                 chartData,
                                                 chartColor = '#3b82f6',
                                                 cardBgColor
                                             }) => {

    const baseChartOption: EChartsOption = {
        // 1. 新增 Tooltip 配置
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow',
                shadowStyle: {
                    color: 'rgba(59, 130, 246, 0.05)'
                }
            },
            formatter: '{c}', // 只显示数值
            borderWidth: 0,
            backgroundColor: 'transparent',
            textStyle: {
                color: '#1D2129',
                fontWeight: 'bold'
            }
        },
        grid: { top: 5, right: 0, bottom: 0, left: 0 },
        xAxis: { show: false, type: 'category' },
        yAxis: { show: false, type: 'value', min: 0 }, // Y轴从0开始
    };

    const getSeriesOption = (): SeriesOption => {
        switch (chartType) {
            case 'line':
                return {
                    type: 'line',
                    data: chartData,
                    smooth: 0.6,
                    symbol: 'none',
                    lineStyle: { width: 3, color: chartColor },
                    areaStyle: {
                        color: {
                            type: 'linear', x: 0, y: 0, x2: 0, y2: 1,
                            colorStops: [{ offset: 0, color: chartColor + '33' }, { offset: 1, color: chartColor + '00' }]
                        }
                    }
                };
            case 'bar':
                return {
                    type: 'bar',
                    data: chartData,
                    barWidth: '60%',
                };
            default:
                return {};
        }
    };

    const chartOption: EChartsOption = {
        ...baseChartOption,
        series: [getSeriesOption()],
    };

    return (
        // 2. 将背景色作为 CSS 变量传递
        <div className={styles.card} style={{ '--card-bg-color': cardBgColor } as React.CSSProperties}>
            <div className={styles.contentTop}>
                <h3 className={styles.title}>{title}</h3>
                <div className={styles.valueContainer}>
                    <span className={styles.value}>{value}</span>
                    <div className={`${styles.trend} ${styles[trendDirection]}`}>
                        <span>{trendValue}</span>
                        <i className={`fas fa-arrow-${trendDirection}`}></i>
                    </div>
                </div>
            </div>
            <div className={styles.chartContainer}>
                <EChartsReactCore option={chartOption} />
            </div>
        </div>
    );
};

export default TrendCard;