// src/components/teacher/studio/AnalyticsCard/AnalyticsCard.tsx
"use client";
import React from 'react';
import EChartsReactCore from '@/shared/components/ui/ECharts/EChartsReactCore';
import type { EChartsOption, SeriesOption } from 'echarts';
import styles from './AnalyticsCard.module.css';

type ChartType = 'line' | 'bar' | 'pie';
type TrendDirection = 'up' | 'down';

interface AnalyticsCardProps {
    title: string;
    value: string;
    trendLabel: string;
    trendValue: string;
    trendDirection: TrendDirection;
    chartType: ChartType;
    chartData: number[];
    cardBgColor: string;
    chartColor: string | string[];
}

const AnalyticsCard: React.FC<AnalyticsCardProps> = ({
                                                         title,
                                                         value,
                                                         trendLabel,
                                                         trendValue,
                                                         trendDirection,
                                                         chartType,
                                                         chartData,
                                                         cardBgColor,
                                                         chartColor,
                                                     }) => {

    const baseChartOption: EChartsOption = {
        grid: { top: 0, right: 0, bottom: 0, left: 0 },
        xAxis: { show: false, type: 'category' },
        yAxis: { show: false, type: 'value' },
    };

    const getSeriesOption = (): SeriesOption => {
        switch (chartType) {
            case 'line':
                return {
                    type: 'line',
                    data: chartData,
                    smooth: true,
                    symbol: 'none',
                    lineStyle: { width: 3, color: chartColor as string },
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
                    itemStyle: { color: chartColor as string, borderRadius: [2, 2, 0, 0] },
                };
            case 'pie':
                return {
                    type: 'pie',
                    radius: ['70%', '100%'],
                    avoidLabelOverlap: false,
                    label: { show: false },
                    labelLine: { show: false },
                    data: chartData.map((val, index) => ({ value: val, name: `cat${index}` })),
                    color: chartColor as string[],
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
        <div className={styles.card} style={{'--card-bg-color': cardBgColor} as React.CSSProperties}>
            <div className={styles.content}>
                <h3 className={styles.title}>{title}</h3>
                <div className={styles.data}>
                    <div className={styles.value}>{value}</div>
                    <div className={styles.trend}>
                        <span className={styles.trendLabel}>{trendLabel}</span>
                        <div className={`${styles.trendValue} ${styles[trendDirection]}`}>
                            <span>{trendValue}</span>
                            <i className={`fas fa-arrow-${trendDirection}`}></i>
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.chartContainer}>
                <EChartsReactCore option={chartOption} />
            </div>
        </div>
    );
};

export default AnalyticsCard;