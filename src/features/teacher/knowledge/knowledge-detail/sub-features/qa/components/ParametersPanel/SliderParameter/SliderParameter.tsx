// [!file src/features/teacher/knowledge/knowledge-detail/sub-features/qa/components/ParametersPanel/SliderParameter/SliderParameter.tsx]
"use client";

import React, { useState, useEffect } from 'react';
import Tooltip from '@/shared/components/ui/Tooltip/Tooltip';
import styles from './SliderParameter.module.css';

interface SliderParameterProps {
    label: string;
    tooltip: string;
    value: number;
    min: number;
    max: number;
    step: number;
    onChange: (value: number) => void;
}

const SliderParameter: React.FC<SliderParameterProps> = ({
                                                             label,
                                                             tooltip,
                                                             value: externalValue,
                                                             min,
                                                             max,
                                                             step,
                                                             onChange
                                                         }) => {
    const [localValue, setLocalValue] = useState(externalValue);

    useEffect(() => {
        setLocalValue(externalValue);
    }, [externalValue]);

    // [!code focus start]
    // --- 核心修复：分离事件处理 ---

    // 1. 滑块拖动中：只更新本地状态，让UI流畅
    const handleSliderInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLocalValue(Number(e.target.value));
    };

    // 2. 滑块拖动结束（鼠标释放）：将最终值报告给父组件
    const handleSliderChangeCommitted = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange(Number(e.target.value));
    };

    // 3. 数字输入框变化：立即更新本地状态
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLocalValue(Number(e.target.value));
    };

    // 4. 数字输入框失去焦点或按回车：将最终值报告给父组件
    const handleInputBlur = () => {
        const clampedValue = Math.max(min, Math.min(max, Number(localValue) || 0));
        setLocalValue(clampedValue); // 确保值在范围内
        onChange(clampedValue);
    };

    const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleInputBlur();
            e.currentTarget.blur(); // 让输入框失去焦点
        }
    };
    // --- 核心修复结束 ---
    // [!code focus end]

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
                    value={localValue}
                    // [!code focus start]
                    onInput={handleSliderInput}           // 5. 使用 onInput 实时更新UI
                    onChange={handleSliderChangeCommitted} // 6. 使用 onChange (等价于onMouseUp) 提交最终值
                    // [!code focus end]
                    className={styles.slider}
                />
                <input
                    type="number"
                    min={min}
                    max={max}
                    step={step}
                    value={localValue}
                    // [!code focus start]
                    onChange={handleInputChange}         // 7. 输入框实时更新本地值
                    onBlur={handleInputBlur}             // 8. 失去焦点时提交
                    onKeyDown={handleInputKeyDown}       // 9. 按回车时提交
                    // [!code focus end]
                    className={styles.paramValueInput}
                />
            </div>
        </div>
    );
};

export default SliderParameter;