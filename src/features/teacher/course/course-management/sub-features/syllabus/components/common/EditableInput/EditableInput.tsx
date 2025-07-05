"use client";

import React, { useState, useRef, useEffect } from 'react';
import styles from './EditableInput.module.css';

// 1. 扩展 Props 接口
interface EditableInputProps {
    value: string;
    onSave: (newValue: string) => void;
    className?: string;
    placeholder?: string;
    mode?: 'input' | 'textarea'; // 新增：支持 textarea 模式
    // [!code focus start]
    // 允许传入所有原生 input 和 textarea 的属性
    inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
    textareaProps?: React.TextareaHTMLAttributes<HTMLTextAreaElement>;
    // [!code focus end]
}

const EditableInput: React.FC<EditableInputProps> = ({
                                                         value,
                                                         onSave,
                                                         className,
                                                         placeholder = '点击编辑...',
                                                         mode = 'input',
                                                         inputProps,
                                                         textareaProps,
                                                     }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [text, setText] = useState(value);
    const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);

    // 当外部传入的 value 变化时，同步内部 text 状态
    useEffect(() => {
        setText(value);
    }, [value]);

    // 2. 将编辑逻辑抽离成可复用的函数
    const switchToEditMode = () => {
        setIsEditing(true);
        // 使用 setTimeout 确保在 DOM 更新后执行 focus
        setTimeout(() => {
            inputRef.current?.focus();
            inputRef.current?.select(); // 全选文本，方便修改
        }, 0);
    };

    const handleSave = () => {
        // 如果文本未改变或为空，则不触发 onSave，直接恢复原值
        if (text.trim() === value.trim() || text.trim() === '') {
            setText(value);
        } else {
            onSave(text.trim());
        }
        setIsEditing(false);
    };

    // 3. 优化键盘事件处理
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        if (e.key === 'Enter') {
            // 对于单行 input，Enter 直接保存
            // 对于多行 textarea，Shift+Enter 才保存，单独 Enter 是换行
            if (mode === 'input' || (mode === 'textarea' && e.shiftKey)) {
                e.preventDefault(); // 阻止默认换行行为
                handleSave();
            }
        } else if (e.key === 'Escape') {
            // 按下 Escape 键取消编辑，恢复原值
            setText(value);
            setIsEditing(false);
        }
    };

    // 4. 根据 isEditing 状态渲染不同的内容
    if (isEditing) {
        return mode === 'input' ? (
            <input
                ref={inputRef as React.Ref<HTMLInputElement>}
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                onBlur={handleSave}
                onKeyDown={handleKeyDown}
                className={`${styles.inputField} ${className || ''}`}
                placeholder={placeholder}
                {...inputProps}
            />
        ) : (
            <textarea
                ref={inputRef as React.Ref<HTMLTextAreaElement>}
                value={text}
                onChange={(e) => setText(e.target.value)}
                onBlur={handleSave}
                onKeyDown={handleKeyDown}
                className={`${styles.textareaField} ${className || ''}`}
                placeholder={placeholder}
                rows={textareaProps?.rows || 2} // 默认2行
                {...textareaProps}
            />
        );
    }

    return (
        <div
            onDoubleClick={switchToEditMode}
            className={`${styles.displaySpan} ${className || ''}`}
            title="双击进行编辑"
        >
            {/* 5. 如果值为空，则显示占位符，交互更友好 */}
            {value.trim() || <span className={styles.placeholder}>{placeholder}</span>}
        </div>
    );
};

export default EditableInput;