// src/components/teacher/pages/AgentSquare/AgentCard.tsx
import React from 'react';
import { Card, Avatar, Typography, Tag, Button, Space } from 'antd';
import { CommentOutlined } from '@ant-design/icons';
import type { Agent } from '@/lib/teacher-data';
import styles from './AgentCard.module.css';

const { Title, Text, Paragraph } = Typography;

interface AgentCardProps {
  agent: Agent;
}

const AgentCard: React.FC<AgentCardProps> = ({ agent }) => {
  return (
    <Card hoverable className={styles.agentCard}>
      <div className={styles.cardHeader}>
        <Avatar
          size={48}
          style={{ backgroundColor: agent.avatarColor, verticalAlign: 'middle' }}
        >
          <span className={styles.avatarText}>{agent.avatarText}</span>
        </Avatar>
        <div className={styles.titleGroup}>
          <Title level={5} className={styles.title}>{agent.title}</Title>
          <Text type="secondary" className={styles.author}>ID:{agent.id} | 来自 {agent.author}</Text>
        </div>
      </div>
      <Paragraph className={styles.description} ellipsis={{ rows: 3 }}>
        {agent.description}
      </Paragraph>
      <div className={styles.tagsContainer}>
        <Space size={[0, 8]} wrap>
          {agent.tags.map((tag, index) => (
            <Tag key={index}>{tag}</Tag>
          ))}
        </Space>
      </div>
      <div className={styles.cardFooter}>
        <Text type="secondary" className={styles.date}>{agent.releaseDate} 发布</Text>
        <Button icon={<CommentOutlined />}>对话</Button>
      </div>
    </Card>
  );
};

export default AgentCard;