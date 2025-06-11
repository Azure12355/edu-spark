// src/app/student/page.tsx
import React from 'react';
// 导入重命名后的组件
import AgentSearchBanner from '@/components/student/component/AgentSearchBanner/AgentSearchBanner';
import AgentCategoryFilter from '@/components/student/component/AgentCategoryFilter/AgentCategoryFilter';
import MyRecentAgents from '@/components/student/component/MyRecentAgents/MyRecentAgents';
import AgentGrid from '@/components/student/component/AgentGrid/AgentGrid';
import styles from './student.module.css'; // 引入一个简单的模块CSS来创建布局

export default function StudentPage() {
    return (
        // 使用一个包裹 div 来管理整体布局
        <div className={styles.studentPageContainer}>
            <AgentSearchBanner />
            <div className={styles.mainContentGrid}>
                {/* 主内容区，Agent瀑布流 */}
                <div className={styles.agentDisplayArea}>
                    <AgentCategoryFilter />
                    <AgentGrid />
                </div>
                {/* 右侧边栏区域，显示最近使用的Agent等信息 */}
                <aside className={styles.rightSidebarArea}>
                    <MyRecentAgents />
                    {/* 这里未来可以添加更多右侧栏模块，如“热门创作者”等 */}
                </aside>
            </div>
        </div>
    );
}