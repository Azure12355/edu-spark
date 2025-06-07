"use client";
import React from 'react';
import {
  AppstoreOutlined,
  BarChartOutlined,
  CloudOutlined,
  DesktopOutlined,
  HddOutlined,
  MessageOutlined,
  ReadOutlined,
  SettingOutlined,
  TeamOutlined,
  ToolOutlined,
  QuestionCircleOutlined,
  CustomerServiceOutlined,
  GiftOutlined
} from '@ant-design/icons';
import { Menu, Space, Button } from 'antd';
import type { MenuProps } from 'antd';
import Image from 'next/image';
import styles from './DashboardSidebar.module.css';

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: 'group',
): MenuItem {
  return { key, icon, children, label, type } as MenuItem;
}

const items: MenuItem[] = [
  getItem('概览', '1', <DesktopOutlined />),
  getItem('模型中心', 'sub1', <CloudOutlined />, [
    getItem('模型广场', '2'),
    getItem('我的模型', '3'),
  ]),
  getItem('数据管理', '4', <HddOutlined />),
  getItem('模型评测', '5', <BarChartOutlined />),
  getItem('批量处理', '6', <ToolOutlined />),

  getItem('智能体中心', 'sub2', <AppstoreOutlined />, [
    getItem('智能体广场', '7'),
    getItem('我的智能体', '8'),
    getItem('插件中心', '9'),
    getItem('知识问答', '10'),
    getItem('知识库', '11'),
  ]),
  getItem('帮助中心', '12', <QuestionCircleOutlined />),
  getItem('技术社群', '13', <TeamOutlined />),
];

const DashboardSidebar = () => {
  return (
    <aside className={styles.sidebar}>
      <div className={styles.logoContainer}>
        <Image src="/EduSpark-icon-font.png" alt="EduSpark Logo" width={160} height={28} />
      </div>
      <Menu
        defaultSelectedKeys={['7']}
        defaultOpenKeys={['sub2']}
        mode="inline"
        theme="light"
        items={items}
        className={styles.menu}
      />
      <div className={styles.promoCard}>
        <GiftOutlined className={styles.promoIcon}/>
        <div className={styles.promoText}>
          <h4>GLM-4-Plus 价格直降90%</h4>
          <p>性能提升，成本更优</p>
        </div>
        <Button type="primary" size="small" className={styles.promoButton}>
          了解详情
        </Button>
      </div>
    </aside>
  );
};

export default DashboardSidebar;