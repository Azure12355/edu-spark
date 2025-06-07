// src/components/teacher/layout/TeacherHeader.tsx
import React from 'react';
import { Menu, Avatar, Badge, Space } from 'antd';
import { BellOutlined, QuestionCircleOutlined, UserOutlined } from '@ant-design/icons';
import styles from './TeacherHeader.module.css';

const TeacherHeader: React.FC = () => {
  return (
    // 使用 header 标签，并应用样式
    <header className={styles.header}>
      <div className={styles.logo}>
        <img src="/EduSpark-icon.png" alt="EduSpark Logo" style={{ height: 28, width: 28, marginRight: 8 }} />
        <span className={styles.logoText}>BigModel</span>
      </div>
      <Menu
        theme="light"
        mode="horizontal"
        defaultSelectedKeys={['console']}
        className={styles.menu}
        items={[
          { key: 'console', label: '控制台' },
          { key: 'experience', label: '体验中心' },
          { key: 'docs', label: '开发文档' },
          { key: 'finance', label: '财务' },
        ]}
      />
      <div className={styles.rightMenu}>
        <Space size="large">
          <QuestionCircleOutlined className={styles.actionIcon} />
          <Badge dot>
            <BellOutlined className={styles.actionIcon} />
          </Badge>
          <Avatar icon={<UserOutlined />} />
        </Space>
      </div>
    </header>
  );
};

export default TeacherHeader;