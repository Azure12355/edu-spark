// [!file src/features/teacher/course/course-management/sub-features/assignments-management/sub-features/assignment-edit/components/QuestionLinkManager/AddQuestionModal.tsx]
"use client";

import React, { useState, useEffect, useCallback } from 'react';
import styles from './AddQuestionModal.module.css';
import Modal from '@/shared/components/ui/Modal/Modal';
import { useToast } from '@/shared/hooks/useToast';
import { useDebounce } from '@/shared/hooks/useDebounce';
import Pagination from '@/shared/components/ui/Pagination/Pagination';
import {QuestionTypeEnum, QuestionTypeTextMap} from '@/shared/types/enums/course/QuestionTypeEnum';
import {Page, QuestionVO} from "@/shared/types";
import {QuestionQueryRequestDTO} from "@/shared/types/dto/course/question";
import {listQuestionVOByPage} from "@/shared/services";

interface AddQuestionModalProps {
    isOpen: boolean;
    courseId: number; // 当前课程ID，用于筛选题库
    onClose: () => void;
    onAddQuestion: (question: QuestionVO, score: number) => Promise<boolean>; // 包含 score
    existingQuestionIds: number[]; // 已关联的题目ID列表，用于过滤
}

const AddQuestionModal: React.FC<AddQuestionModalProps> = ({
                                                               isOpen,
                                                               courseId,
                                                               onClose,
                                                               onAddQuestion,
                                                               existingQuestionIds,
                                                           }) => {
    // 1. 状态管理
    const [searchTerm, setSearchTerm] = useState('');
    const [questionTypeFilter, setQuestionTypeFilter] = useState('');
    const [searchResults, setSearchResults] = useState<QuestionVO[]>([]);
    const [isSearching, setIsSearching] = useState(false);
    const [pagination, setPagination] = useState({ current: 1, pageSize: 5, total: 0 });

    // 选中题目及分值
    const [selectedQuestion, setSelectedQuestion] = useState<QuestionVO | null>(null);
    const [scoreInput, setScoreInput] = useState<number>(100);
    const [isAdding, setIsAdding] = useState(false); // 控制添加按钮的加载状态

    const debouncedSearchTerm = useDebounce(searchTerm, 500);
    const showToast = useToast();

    // 2. 搜索逻辑
    const fetchQuestions = useCallback(async () => {
        if (!isOpen) return; // 只有弹窗打开才搜索

        setIsSearching(true);
        try {
            const query: QuestionQueryRequestDTO = {
                current: pagination.current,
                pageSize: pagination.pageSize,
                stemLike: debouncedSearchTerm,
                type: questionTypeFilter,
                courseId: courseId, // 仅搜索当前课程关联的题库（如果后端支持）
            };
            const response: Page<QuestionVO> = await listQuestionVOByPage(query);
            // 过滤掉已关联的题目
            const filteredResults = response.records.filter(q => !existingQuestionIds.includes(Number(q.id)));
            setSearchResults(filteredResults);
            setPagination(prev => ({ ...prev, total: response.total }));
        } catch (error) {
            showToast({ message: '搜索题目失败', type: 'error' });
        } finally {
            setIsSearching(false);
        }
    }, [isOpen, pagination.current, pagination.pageSize, debouncedSearchTerm, questionTypeFilter, courseId, existingQuestionIds, showToast]);

    useEffect(() => {
        if (isOpen) {
            fetchQuestions();
        }
    }, [fetchQuestions, isOpen]);

    // 3. 事件处理
    const handleAddClick = async () => {
        if (!selectedQuestion || isAdding) return;

        setIsAdding(true);
        try {
            const success = await onAddQuestion(selectedQuestion, scoreInput);
            if (success) {
                // 清理选中状态，关闭弹窗
                setSelectedQuestion(null);
                setScoreInput(100);
                setSearchTerm('');
                setQuestionTypeFilter('');
                setPagination(prev => ({ ...prev, current: 1 }));
                onClose();
            }
        } finally {
            setIsAdding(false);
        }
    };

    // 每次打开弹窗时重置状态
    useEffect(() => {
        if (isOpen) {
            setSearchTerm('');
            setQuestionTypeFilter('');
            setSelectedQuestion(null);
            setScoreInput(100);
            setPagination(prev => ({ ...prev, current: 1 }));
        }
    }, [isOpen]);

    // 4. Modal 页脚
    const footer = (
        <>
            <button onClick={onClose} className={`${styles.button} ${styles.cancelButton}`} disabled={isAdding}>
                取消
            </button>
            <button onClick={handleAddClick} className={`${styles.button} ${styles.confirmButton}`} disabled={isAdding || !selectedQuestion}>
                {isAdding ? <><i className="fas fa-spinner fa-spin"></i> 添加中...</> : '确认添加'}
            </button>
        </>
    );

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="从题库选择题目" footer={footer}>
            <div className={styles.searchSection}>
                <div className={styles.searchInputWrapper}>
                    <i className={`fas fa-search ${styles.searchIcon}`}></i>
                    <input
                        type="text"
                        placeholder="搜索题干关键词..."
                        className={styles.searchInput}
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    {isSearching && <i className={`fas fa-spinner fa-spin ${styles.searchSpinner}`}></i>}
                </div>
                <select
                    className={styles.typeSelect}
                    value={questionTypeFilter}
                    onChange={(e) => setQuestionTypeFilter(e.target.value)}
                >
                    <option value="">所有类型</option>
                    {Object.values(QuestionTypeEnum).map(type => (
                        <option key={type} value={type}>{QuestionTypeTextMap[type]}</option>
                    ))}
                </select>
            </div>

            <div className={styles.resultsSection}>
                {isSearching && searchResults.length === 0 ? (
                    <div className={styles.emptyState}>搜索中...</div>
                ) : searchResults.length === 0 ? (
                    <div className={styles.emptyState}>没有找到匹配的题目</div>
                ) : (
                    <ul className={styles.questionList}>
                        {searchResults.map(question => (
                            <li
                                key={question.id}
                                className={`${styles.questionItem} ${selectedQuestion?.id === question.id ? styles.selected : ''}`}
                                onClick={() => setSelectedQuestion(question)}
                            >
                                <span className={styles.questionStem}>{question.stem}</span>
                                <span className={styles.questionTypeTag}>{QuestionTypeTextMap[question.type]}</span>
                                <input
                                    type="number"
                                    value={scoreInput}
                                    onChange={(e) => setScoreInput(parseInt(e.target.value, 10))}
                                    onClick={(e) => e.stopPropagation()} // 阻止点击输入框时选中题目
                                    className={styles.scoreInput}
                                    placeholder="分值"
                                    min="0"
                                    disabled={selectedQuestion?.id !== question.id} // 只有选中项的输入框可编辑
                                />
                                <span className={styles.selectIcon}>
                                    {selectedQuestion?.id === question.id ? <i className="fas fa-check-circle"></i> : <i className="far fa-circle"></i>}
                                </span>
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            <Pagination
                currentPage={pagination.current}
                totalPages={Math.ceil(pagination.total / pagination.pageSize)}
                onPageChange={(page) => setPagination(prev => ({ ...prev, current: page }))}
            />
        </Modal>
    );
};

export default AddQuestionModal;