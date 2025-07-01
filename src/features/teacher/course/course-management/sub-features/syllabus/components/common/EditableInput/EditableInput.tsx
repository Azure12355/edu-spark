// src/components/teacher/course-management/syllabus/common/EditableInput/EditableInput.tsx
"use client";
import React, { useState } from 'react';
import styles from './EditableInput.module.css';

interface EditableInputProps {
    value: string;
    onSave: (newValue: string) => void;
    className?: string;
    placeholder?: string;
}

const EditableInput: React.FC<EditableInputProps> = ({ value, onSave, className, placeholder }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [text, setText] = useState(value);

    const handleSave = () => {
        if (text.trim() === '') {
            setText(value); // 如果为空，则恢复原值
        } else {
            onSave(text);
        }
        setIsEditing(false);
    };

    if (isEditing) {
        return (
            <input
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                onBlur={handleSave}
                onKeyDown={(e) => { if (e.key === 'Enter') handleSave(); }}
                className={`${styles.inputField} ${className || ''}`}
                placeholder={placeholder}
                autoFocus
            />
        );
    }

    return (
        <span onDoubleClick={() => setIsEditing(true)} className={`${styles.displaySpan} ${className || ''}`}>
      {value}
    </span>
    );
};

export default EditableInput;