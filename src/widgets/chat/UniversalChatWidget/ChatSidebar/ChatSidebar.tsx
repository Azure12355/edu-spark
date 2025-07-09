// [!file src/widgets/chat/UniversalChatWidget/ChatSidebar/ChatSidebar.tsx]
import React from 'react';
import Image from 'next/image';
import styles from './ChatSidebar.module.css';
import { CourseVO, SyllabusVO } from '@/shared/types';
import { SelectedNode } from '@/features/teacher/assistant/ai-assistant/hooks/useTeacherAssistant';
/* [code focus start ++] */
// 1. 导入新创建的 SyllabusSelector 组件
import SyllabusSelector from './components/SyllabusSelector/SyllabusSelector';
/* [code focus end ++] */

// 2. 扩展 Props 接口，使其能够接收所有需要的数据和状态
interface ChatSidebarProps {
    currentCourse: CourseVO | null;
    onCourseSelectClick: () => void;
    onNewChatClick: () => void;
    syllabus: SyllabusVO | null;
    selectedNode: SelectedNode | null;
    onNodeSelect: (node: SelectedNode) => void;
    isLoading: boolean;
}

const ChatSidebar: React.FC<ChatSidebarProps> = ({
                                                     currentCourse,
                                                     onCourseSelectClick,
                                                     onNewChatClick,
                                                     syllabus,
                                                     selectedNode,
                                                     onNodeSelect,
                                                     isLoading
                                                 }) => {

    const CourseDisplay = () => {
        if (!currentCourse) {
            return (
                <div className={`${styles.courseSelector} ${styles.noCourse}`}>
                    <span>暂无可用课程</span>
                </div>
            );
        }
        return (
            <div className={styles.courseSelector} onClick={onCourseSelectClick}>
                {/* [!code focus start] */}
                <div className={styles.courseIcon} style={{ backgroundColor: currentCourse.colorTheme || '#4f46e5' }}>
                    <i className={'fas fa-book-reader'}></i>
                </div>
                <div className={styles.courseInfo}>
                    <span className={styles.courseName}>{currentCourse.name}</span>
                    <span className={styles.courseTerm}>{currentCourse.term}</span>
                </div>
                {/* [!code focus end] */}
                <i className={`fas fa-exchange-alt ${styles.switchIcon}`}></i>
            </div>
        );
    };

    const LoadingSkeleton = () => (
        <>
            <div className={`${styles.courseSelector} ${styles.loading}`}>
                <div className={styles.skeletonAvatar}></div>
                <div style={{ flex: 1 }}>
                    <div className={styles.skeletonLine} style={{ width: '70%' }}></div>
                    <div className={styles.skeletonLine} style={{ width: '50%' }}></div>
                </div>
            </div>
            <div className={styles.divider}></div>
            <SyllabusSelector isLoading={true} course={null} syllabus={null} selectedNode={null} onNodeSelect={() => {}} />
        </>
    );

    return (
        <div className={styles.sidebar}>
            <div className={styles.sidebarHeader}>
                <div className={styles.logo}>
                    <Image src="/robot.gif" alt="EduSpark Logo" width={36} height={36} style={{ borderRadius: 6 }} />
                    <span className={styles.logoText}>AI 助教</span>
                </div>
                <button className={styles.newChatButton} onClick={onNewChatClick} title="新对话">
                    <i className="fas fa-plus"></i>
                </button>
            </div>

            <div className={styles.contextSelectors}>
                <h3 className={styles.sectionTitle}>
                    <i className="fas fa-graduation-cap"></i>
                    <span>课程与知识点上下文</span>
                </h3>

                {/* 3. 使用 isLoading 状态进行条件渲染 */}
                {isLoading ? (
                    <LoadingSkeleton />
                ) : (
                    <>
                        <CourseDisplay />
                        <div className={styles.divider}></div>
                        {/* 4. 集成 SyllabusSelector 组件 */}
                        <SyllabusSelector
                            course={currentCourse}
                            syllabus={syllabus}
                            selectedNode={selectedNode}
                            onNodeSelect={onNodeSelect}
                            isLoading={isLoading}
                        />
                    </>
                )}
            </div>

            <div className={styles.sidebarFooter}>
                <a href="/profile/settings" className={styles.footerLink}>
                    <i className="fas fa-user-circle"></i>
                    <span>我的账号</span>
                </a>
            </div>
        </div>
    );
};

export default ChatSidebar;