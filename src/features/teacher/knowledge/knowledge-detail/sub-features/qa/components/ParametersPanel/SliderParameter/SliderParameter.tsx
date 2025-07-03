"use client";

import React from 'react';
import Tooltip from '@/shared/components/ui/Tooltip/Tooltip';
import styles from './SliderParameter.module.css';

/**
 * @interface SliderParameterProps
 * @description 定义了滑块参数组件所需的 props。
 */
interface SliderParameterProps {
    label: string;
    tooltip: string;
    value: number;
    min: number;
    max: number;
    step: number;
    onChange: (value: number) => void;
}

/**
 * @description 一个可复用的、包含滑块和数字输入的参数控制组件。
 */
const SliderParameter: React.FC<SliderParameterProps> = ({
                                                             label,
                                                             tooltip,
                                                             value,
                                                             min,
                                                             max,
                                                             step,
                                                             onChange
                                                         }) => {
    // 确保传递给 input[type=number] 的值是一个有效的数字字符串
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const numValue = e.target.value === '' ? min : Number(e.target.value);
        if (!isNaN(numValue)) {
            onChange(numValue);
        }
    };

    return (
        <div className={styles.paramItem}>
            <div className={styles.paramLabel}>
                <span>{label}</span>
                <Tooltip content={tooltip}><i className="far fa-question-circle"></i></Tooltip>
            </div>
            <div className={styles.paramControls}>
                <input
                    type="range"
                    min={min}
                    max={max}
                    step={step}
                    value={value}
                    onChange={(e) => onChange(Number(e.target.value))}
                    className={styles.slider}
                />
                <input
                    type="number"
                    min={min}
                    max={max}
                    step={step}
                    value={value}
                    onChange={handleInputChange}
                    className={styles.paramValueInput}
                />
            </div>
        </div>
    );
};

export default SliderParameter;