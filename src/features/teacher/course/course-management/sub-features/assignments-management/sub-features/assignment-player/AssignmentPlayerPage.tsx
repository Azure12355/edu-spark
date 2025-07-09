// [!file src/features/teacher/course/course-management/sub-features/assignments-management/sub-features/assignment-player/AssignmentPlayerPage.tsx]
"use client";

import React from 'react';
import styles from './AssignmentPlayer.module.css';
import { useAssignmentPlayer } from './hooks/useAssignmentPlayer';

// 导入真实的UI组件
import PlayerHeader from './components/PlayerHeader/PlayerHeader';
import QuestionViewer from './components/QuestionViewer/QuestionViewer';
import AnswerSheet from './components/AnswerSheet/AnswerSheet';
import ControlPanel from './components/ControlPanel/ControlPanel';

/**
 * 在线作业/考试播放器页面的主组件。
 * 负责调用 useAssignmentPlayer Hook，并管理页面整体布局和状态渲染。
 */
export default function AssignmentPlayerPage() {
    // 1. 调用核心 Hook 获取所有状态和操作函数
    const {
        assignment,
        questions,
        currentQuestion,
        currentQuestionIndex,
        totalQuestions,
        isLoading,
        isSubmitting,
        error,
        answers,
        goToQuestion,
        nextQuestion,
        prevQuestion,
        handleAnswerChange,
        handleSubmit,
    } = useAssignmentPlayer();

    // 2. 渲染主内容区域的逻辑
    const renderContent = () => {
        if (isLoading) {
            // 如果正在加载，显示完整的骨架屏
            return <PageSkeleton />;
        }

        if (error) {
            return (
                <div className={styles.feedbackContainer}>
                    <i className="fas fa-exclamation-circle"></i>
                    <p>加载作业失败: {error}</p>
                </div>
            );
        }

        if (!assignment) {
            return (
                <div className={styles.feedbackContainer}>
                    <i className="fas fa-question-circle"></i>
                    <p>无法找到该作业信息。</p>
                </div>
            );
        }

        // 正常渲染答题界面
        return (
            <>
                <PlayerHeader assignment={assignment} />
                <div className={styles.mainLayout}>
                    <QuestionViewer
                        questionLink={currentQuestion}
                        questionIndex={currentQuestionIndex}
                        totalQuestions={totalQuestions}
                        studentAnswer={answers[currentQuestion?.question.id]}
                        onAnswerChange={handleAnswerChange}
                    />
                    <AnswerSheet
                        questions={questions}
                        answers={answers}
                        currentQuestionIndex={currentQuestionIndex}
                        onQuestionSelect={goToQuestion}
                    />
                </div>
                <ControlPanel
                    onPrev={prevQuestion}
                    onNext={nextQuestion}
                    onSubmit={handleSubmit}
                    isSubmitting={isSubmitting}
                    isFirstQuestion={currentQuestionIndex === 0}
                    isLastQuestion={currentQuestionIndex === totalQuestions - 1}
                />
            </>
        );
    };

    return (
        <div className={styles.pageContainer}>
            {renderContent()}
        </div>
    );
}

// 完整的页面骨架屏组件
const PageSkeleton = () => (
    <>
        <header className={`${styles.header} ${styles.skeleton}`}>
            <div className={styles.line_skeleton} style={{ width: '40%', height: '28px' }}></div>
            <div className={styles.line_skeleton} style={{ width: '20%', height: '24px' }}></div>
        </header>
        <div className={styles.mainLayout}>
            <div className={`${styles.questionViewer} ${styles.skeleton}`}>
                <div className={styles.line_skeleton} style={{ width: '80%', height: '24px', marginBottom: '24px' }}></div>
                <div className={styles.line_skeleton} style={{ width: '90%' }}></div>
                <div className={styles.line_skeleton} style={{ width: '95%' }}></div>
                <div className={styles.line_skeleton} style={{ width: '85%', marginBottom: '32px' }}></div>
                <div className={styles.line_skeleton} style={{ width: '70%', height: '40px', borderRadius: '8px' }}></div>
                <div className={styles.line_skeleton} style={{ width: '70%', height: '40px', borderRadius: '8px' }}></div>
            </div>
            <div className={`${styles.answerSheet} ${styles.skeleton}`}>
                <div className={styles.line_skeleton} style={{ width: '50%', height: '20px', marginBottom: '20px' }}></div>
                <div className={styles.answer_grid_skeleton}>
                    {Array.from({ length: 20 }).map((_, index) => (
                        <div key={index} className={styles.answer_item_skeleton}></div>
                    ))}
                </div>
            </div>
        </div>
        <footer className={`${styles.controlPanel} ${styles.skeleton}`}>
            <div className={styles.button_skeleton} style={{ width: '100px' }}></div>
            <div style={{ flexGrow: 1 }}></div>
            <div className={styles.button_skeleton} style={{ width: '100px' }}></div>
            <div className={styles.button_skeleton} style={{ width: '120px' }}></div>
        </footer>
    </>
);