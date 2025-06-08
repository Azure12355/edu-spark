// src/components/teacher/layout/TeacherHeader.tsx
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, Avatar, Badge, Space } from 'antd';
import { BellOutlined, QuestionCircleOutlined, UserOutlined } from '@ant-design/icons';
import { teacherHeaderNavItems } from '@/lib/teacherNav';
import styles from './TeacherHeader.module.css';

const TeacherHeader: React.FC = () => {
  const pathname = usePathname();

  let selectedKey = 'workbench'; // 默认key

  // 关键改动：更智能地判断当前选中的菜单项
  if (pathname.startsWith('/teacher/agent-experience')) {
    selectedKey = 'agentExperience';
  } else {
    // 使用之前的逻辑作为回退
    const currentItem = teacherHeaderNavItems.find(item => pathname.startsWith(item.href));
    if (currentItem) {
      selectedKey = currentItem.key;
    }
  }

  const menuItems = teacherHeaderNavItems.map(item => ({
    key: item.key,
    label: <Link href={item.href}>{item.label}</Link>,
  }));

  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Link href="/teacher/dashboard" style={{ display: 'flex', alignItems: 'center' }}>
          <img src="/EduSpark-icon.png" alt="EduSpark Logo" style={{ height: 28, width: 28, marginRight: 8 }} />
          <span className={styles.logoText}>EduSpark</span>
        </Link>
      </div>
      <Menu
        theme="light"
        mode="horizontal"
        selectedKeys={[selectedKey]}
        items={menuItems}
        className={styles.menu}
      />
      <div className={styles.rightMenu}>
        <Space size="large">
          <QuestionCircleOutlined className={styles.actionIcon} />
          <Badge count={3}>
            <BellOutlined className={styles.actionIcon} />
          </Badge>
          <Avatar icon={<UserOutlined />} />
        </Space>
      </div>
    </header>
  );
};

export default TeacherHeader;