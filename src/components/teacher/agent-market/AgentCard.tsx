"use client";
import React from 'react';
import { Avatar, Tag, Button, Tooltip } from 'antd';
import { MessageOutlined, UserOutlined } from '@ant-design/icons';
import styles from './AgentCard.module.css';

interface AgentCardProps {
  icon: React.ReactNode;
  title: string;
  id: string;
  author: string;
  description: string;
  tags: string[];
  date: string;
  bgColor: string;
}

const AgentCard: React.FC<AgentCardProps> = ({ icon, title, id, author, description, tags, date, bgColor }) => {
  return (
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        <Avatar size={48} icon={icon} style={{ backgroundColor: bgColor }} />
        <div className={styles.titleSection}>
          <h3 className={styles.title}>{title}</h3>
          <span className={styles.idAuthor}>
            ID:{id} | 开发者: {author}
          </span>
        </div>
      </div>
      <p className={styles.description}>{description}</p>
      <div className={styles.tags}>
        {tags.map(tag => (
          <Tag key={tag} className={styles.tag}>{tag}</Tag>
        ))}
      </div>
      <div className={styles.cardFooter}>
        <span className={styles.date}>{date} 发布</span>
        <Button type="text" icon={<MessageOutlined />} className={styles.chatButton}>
          对话
        </Button>
      </div>
    </div>
  );
};

export default AgentCard;