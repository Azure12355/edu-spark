// [!file src/features/teacher/course/course-management/sub-features/assignments-management/sub-features/assignment-player/components/ControlPanel/ControlPanel.tsx]
"use client";

import React from 'react';
import styles from './ControlPanel.module.css';
import Tooltip from '@/shared/components/ui/Tooltip/Tooltip';

// 定义 Props 类型
interface ControlPanelProps {
    onPrev: () => void;
    onNext: () => void;
    onSubmit: () => void;
    isSubmitting: boolean;
    isFirstQuestion: boolean;
    isLastQuestion: boolean;
}

const ControlPanel: React.FC<ControlPanelProps> = ({
                                                       onPrev,
                                                       onNext,
                                                       onSubmit,
                                                       isSubmitting,
                                                       isFirstQuestion,
                                                       isLastQuestion,
                                                   }) => {
    return (
        <footer className={styles.panelContainer}>
            <div className={styles.leftActions}>
                {/*
                未来可以添加“标记本题”等功能按钮
                <button className={styles.secondaryButton}>
                    <i className="far fa-flag"></i> 标记本题
                </button>
                */}
            </div>

            <div className={styles.mainActions}>
                <button
                    onClick={onPrev}
                    disabled={isFirstQuestion || isSubmitting}
                    className={styles.navButton}
                >
                    <i className="fas fa-chevron-left"></i>
                    <span>上一题</span>
                </button>
                <button
                    onClick={onNext}
                    disabled={isLastQuestion || isSubmitting}
                    className={styles.navButton}
                >
                    <span>下一题</span>
                    <i className="fas fa-chevron-right"></i>
                </button>
            </div>

            <div className={styles.rightActions}>
                <Tooltip content="提交后将无法修改，请仔细检查" position="top">
                    <button
                        onClick={onSubmit}
                        disabled={isSubmitting}
                        className={styles.submitButton}
                    >
                        {isSubmitting ? (
                            <><i className="fas fa-spinner fa-spin"></i> 正在提交...</>
                        ) : (
                            <><i className="fas fa-check-circle"></i> 交卷</>
                        )}
                    </button>
                </Tooltip>
            </div>
        </footer>
    );
};

export default ControlPanel;