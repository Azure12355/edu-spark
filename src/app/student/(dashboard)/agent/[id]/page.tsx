"use client";
import React from 'react';
import { useParams } from 'next/navigation';
import styles from './agentDetail.module.css';
import { agentDetailData } from '@/lib/data/agentDetailData';
import AgentDetailHeader from '@/components/student/component/agent-detail/AgentDetailHeader';
import CoreCapabilities from '@/components/student/component/agent-detail/CoreCapabilities';
import ContentSection from '@/components/student/component/agent-detail/ContentSection';
import FloatingCta from '@/components/student/component/agent-detail/FloatingCta';

export default function AgentDetailPage() {
    const params = useParams();
    const agent = agentDetailData;

    return (
        <div className={styles.pageContainer}>
            <div className={styles.scrollableContent}>
                {/* --- 核心修改：用新的容器包裹 Header 和 Capabilities --- */}
                <div className={styles.firstScreenContainer}>
                    <AgentDetailHeader agent={agent} />
                    <CoreCapabilities capabilities={agent.coreCapabilities} />
                </div>
                {/* --- 结束修改 --- */}

                <div className={styles.contentArea}>
                    <ContentSection title="智能体介绍" markdownContent={agent.introduction} />
                    <ContentSection title="使用场景与技巧" markdownContent={agent.usageScenarios} />
                    <ContentSection title="模型与知识库" markdownContent={agent.techSpec} />
                    <ContentSection title="适用课程与人群" markdownContent={agent.targetAudience} />
                </div>
                <div className={styles.footerDisclaimer}>
                    <p>
                        © 版权声明: 若无特殊声明，本站所有版权归EduSpark原创和所有，未经许可，任何个人、媒体、网站、团体不得转载、转贴、链接或以其他方式复制发表本站内容，或在非我站所属的服务器上建立镜像。否则，我站将依法追究相关法律责任的权利。
                    </p>
                </div>
            </div>
            <FloatingCta />
        </div>
    );
}