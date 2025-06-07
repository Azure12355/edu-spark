"use client";
import React from 'react';
import { Avatar, Badge, Dropdown, Input, Space, Button } from 'antd';
import { BellOutlined, SearchOutlined, UserOutlined, SettingOutlined, LogoutOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import styles from './DashboardHeader.module.css';

const userMenuItems: MenuProps['items'] = [
  { key: '1', label: '个人中心', icon: <UserOutlined /> },
  { key: '2', label: '账户设置', icon: <SettingOutlined /> },
  { type: 'divider' },
  { key: '3', label: '退出登录', icon: <LogoutOutlined />, danger: true },
];

const DashboardHeader = () => {
  return (
    <header className={styles.header}>
      <div className={styles.leftSection}>
        {/* Can add breadcrumbs or other info here later */}
      </div>
      <div className={styles.rightSection}>
        <Space size="large" align="center">
          <Input
            placeholder="搜索智能体..."
            prefix={<SearchOutlined style={{ color: 'rgba(0,0,0,.45)' }} />}
            className={styles.searchInput}
            variant="filled"
          />
          <nav className={styles.topNav}>
              <a href="#">控制台</a>
              <a href="#">体验中心</a>
              <a href="#">开发文档</a>
              <a href="#">财务</a>
          </nav>
          <Badge dot>
            <BellOutlined className={styles.icon} />
          </Badge>
          <Dropdown menu={{ items: userMenuItems }} trigger={['click']}>
            <a onClick={(e) => e.preventDefault()}>
              <Avatar size="default" icon={<UserOutlined />} className={styles.avatar} />
            </a>
          </Dropdown>
        </Space>
      </div>
    </header>
  );
};

export default DashboardHeader;