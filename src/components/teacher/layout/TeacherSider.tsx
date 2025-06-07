// src/components/teacher/layout/TeacherSider.tsx
import React from 'react';
import { Menu, Button, Card, Avatar, Space, Typography } from 'antd';
import {
  ApartmentOutlined,
  CloseOutlined,
  DashboardOutlined,
  DatabaseOutlined,
  FileDoneOutlined,
  NodeIndexOutlined,
  QuestionCircleOutlined,
  RobotOutlined,
  TeamOutlined,
  ToolOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import styles from './TeacherSider.module.css';

const { Text } = Typography;
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
  getItem('概览', '1', <DashboardOutlined />),
  getItem('模型中心', '2', <ApartmentOutlined />),
  getItem('模型调优', '3', <ToolOutlined />),
  getItem('数据管理', '4', <DatabaseOutlined />),
  getItem('模型评测', '5', <FileDoneOutlined />),
  getItem('批量处理', '6', <NodeIndexOutlined />),
  getItem('智能体中心', 'sub1', <RobotOutlined />, [
    getItem('我的智能体', '7'),
    getItem('智能体广场', '8'),
    getItem('插件中心', '9'),
    getItem('知识问答', '10'),
    getItem('知识库', '11'),
  ]),
  getItem('另一个菜单项', '14', <DashboardOutlined />),
  getItem('又一个菜单项', '15', <DashboardOutlined />),
  getItem('再来一个', '16', <ApartmentOutlined />),
  getItem('还有一个', '17', <ToolOutlined />),
  getItem('最后加一个', '18', <DatabaseOutlined />),
  { type: 'divider' },
  getItem('帮助中心', '12', <QuestionCircleOutlined />),
  getItem('技术社群', '13', <TeamOutlined />),
];

const TeacherSider: React.FC = () => {
  return (
    <aside className={styles.siderContainer}>
      <div className={styles.scrollableArea}>
        <Menu
          mode="inline"
          defaultSelectedKeys={['13']}
          defaultOpenKeys={['sub1']}
          items={items}
          className={styles.menu}
        />
      </div>
      <div className={styles.footerArea}>
        <Button type="primary" danger block className={styles.issuesButton}>
          <Space align="center" style={{ width: '100%', justifyContent: 'space-between' }}>
            <Space><Avatar size="small" className={styles.issuesAvatar}>N</Avatar><Text className={styles.issuesText}>4 Issues</Text></Space>
            <CloseOutlined style={{ fontSize: '10px' }}/>
          </Space>
        </Button>
        <Card className={styles.promoCard}>
          <div className={styles.promoTitle}>GLM-4-Plus 价格直降90%</div>
          <div className={styles.promoDesc}>旗舰模型价格直降</div>
          <Button type="primary" size="small" className={styles.promoButton}>了解详情 →</Button>
        </Card>
      </div>
    </aside>
  );
};

export default TeacherSider;