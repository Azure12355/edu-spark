// src/components/teacher/pages/CourseManagement/CourseManagementSider.tsx
"use client";
import React from 'react';
import Link from 'next/link';
import { usePathname, useParams } from 'next/navigation';
import { Menu, Avatar, Typography, Button, Space } from 'antd';
import { SettingOutlined } from '@ant-design/icons';
import Image from 'next/image';
import { courseManagementNavItems } from '@/lib/course-management-nav';
import styles from './CourseManagementSider.module.css';

const { Title, Text } = Typography;

const CourseManagementSider: React.FC = () => {
  const pathname = usePathname();
  const params = useParams();
  const courseId = params.courseId as string;

  const activeKey = courseManagementNavItems.find(item => pathname.includes(item.key))?.key || 'ai-workbench';
  
  const menuItems = courseManagementNavItems.map(item => ({
    key: item.key,
    icon: item.icon,
    label: <Link href={item.href(courseId)}>{item.label}</Link>,
  }));

  return (
    <aside className={styles.sider}>
        <div className={styles.courseInfo}>
            <div className={styles.courseAvatar}>
                {/* 替换为真实的课程封面图 */}
                <Image src="/images/DoubaoScenariosSection/8j7nxi49pry_ai模块-场景-智能座舱.png" alt="Python Course" layout="fill" objectFit="cover" />
            </div>
            <Title level={5} className={styles.courseTitle}>Python</Title>
            <Text type="secondary" className={styles.courseInstructor}>课程门户</Text>
        </div>

      <div className={styles.menu}>
        <Menu
          mode="inline"
          selectedKeys={[activeKey]}
          items={menuItems}
        />
      </div>

      <div className={styles.siderFooter}>
        <Button block icon={<SettingOutlined />}>课程管理</Button>
      </div>
    </aside>
  );
};

export default CourseManagementSider;