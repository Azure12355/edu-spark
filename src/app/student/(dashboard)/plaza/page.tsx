// src/app/student/page.tsx
import React from 'react';
// 导入重命名后的组件
import AgentSearchBanner from '@/components/student/component/plaza/AgentSearchBanner/AgentSearchBanner';
import AgentCategoryFilter from '@/components/student/component/plaza/AgentCategoryFilter/AgentCategoryFilter';
import MyRecentAgents from '@/components/student/component/plaza/MyRecentAgents/MyRecentAgents';
import AgentGrid from '@/components/student/component/plaza/AgentGrid/AgentGrid';

// 导入新创建的组件
import PopularCreators from '@/components/student/component/plaza/PopularCreators/PopularCreators';
import HotAgents from '@/components/student/component/plaza/HotAgents/HotAgents';
import Announcements from '@/components/student/component/plaza/Announcements/Announcements';

import styles from './plaza.module.css';

export default function StudentPage() {
    return (
        <div className={styles.studentPageContainer}>
            {/* 顶部搜索横幅保持不变 */}
            <AgentSearchBanner />

            <div className={styles.mainContentGrid}>
                {/* 主内容区，Agent瀑布流 */}
                <div className={styles.agentDisplayArea}>
                    <AgentCategoryFilter />
                    <AgentGrid />
                </div>

                {/* 右侧边栏区域，现在包含多个卡片 */}
                <aside className={styles.rightSidebarArea}>
                    {/*<MyRecentAgents />*/}
                    <HotAgents />
                    <Announcements />
                    <PopularCreators />
                </aside>
            </div>
        </div>
    );
}