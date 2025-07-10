// [!file src/features/student/assignment/player/AssignmentPlayerPage.tsx]
"use client";

import React, { useEffect } from 'react'; // [code focus ++]
import { useRouter } from 'next/navigation'; // [code focus ++]
import styles from './AssignmentPlayerPage.module.css';
import { useAssignmentPlayer } from './hooks/useAssignmentPlayer';
import { useAssignmentPlayerStore } from './store/assignmentPlayerStore';
import PlayerHeader from './components/PlayerHeader/PlayerHeader';
import QuestionViewer from './components/QuestionViewer/QuestionViewer';
import AnswerSheet from './components/AnswerSheet/AnswerSheet';
import ControlPanel from './components/ControlPanel/ControlPanel';

const AssignmentPlayerPage = () => {
    // [code focus start ++]
    const router = useRouter();
    const { activity, currentQuestion, isLoading } = useAssignmentPlayer();
    const { userAnswers, updateUserAnswer, submissionStatus } = useAssignmentPlayerStore();
    // [code focus end ++]

    // [code focus start ++]
    // 监听交卷状态，完成后跳转
    useEffect(() => {
        if (submissionStatus === 'submitted') {
            router.push(`/student/assignment/report/${activity?.id}`);
        }
    }, [submissionStatus, activity, router]);
    // [code focus end ++]


    if (isLoading || !activity || !currentQuestion) {
        return <div className={styles.loadingState}>正在加载试卷...</div>;
    }

    // [code focus start ++]
    // 正在提交时显示遮罩
    if (submissionStatus === 'submitting') {
        return <div className={styles.loadingState}>正在智能评分，请稍候...</div>;
    }
    // [code focus end ++]

    return (
        <div className={styles.playerLayout}>
            <div className={styles.mainContent}>
                <PlayerHeader />
                <QuestionViewer
                    question={currentQuestion}
                    userAnswer={userAnswers[currentQuestion.id as number]}
                    onAnswerChange={(answer) => updateUserAnswer(currentQuestion.id as number, answer)}
                />
                <ControlPanel />
            </div>
            <aside className={styles.aside}>
                <AnswerSheet />
            </aside>
        </div>
    );
};

export default AssignmentPlayerPage;