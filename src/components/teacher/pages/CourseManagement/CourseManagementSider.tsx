// src/components/teacher/pages/CourseManagement/CourseManagementSider.tsx
"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useParams } from 'next/navigation';
import { Menu, Tooltip, Typography, Button } from 'antd';
import { SettingOutlined, LeftOutlined, RightOutlined } from '@ant-design/icons';
import Image from 'next/image';
import { courseManagementNavItems } from '@/lib/course-management-nav';
import styles from './CourseManagementSider.module.css';

const { Title, Text } = Typography;
const { Item: MenuItem } = Menu;

const CourseManagementSider: React.FC = () => {
  const pathname = usePathname();
  const params = useParams();
  const courseId = params.courseId as string;

  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    setCollapsed(pathname.includes('/class-management'));
  }, [pathname]);

  const activeKey = courseManagementNavItems.find(item => pathname.startsWith(item.href(courseId)))?.key || 'ai-workbench';
  
  return (
    <aside className={`${styles.sider} ${collapsed ? styles.collapsed : ''}`}>
        <Button
            shape="circle"
            icon={collapsed ? <RightOutlined /> : <LeftOutlined />}
            className={styles.collapseButton}
            onClick={() => setCollapsed(!collapsed)}
        />
        <div className={styles.courseInfo}>
            <div className={styles.courseAvatar}>
                <Image src="/images/HeroSection/banner.png" alt="Course Banner" layout="fill" objectFit="cover" />
            </div>
            {!collapsed && (
                <>
                    <Title level={5} className={styles.courseTitle}>Python</Title>
                    <Text type="secondary" className={styles.courseInstructor}>课程门户</Text>
                </>
            )}
        </div>

      <div className={styles.menuContainer}>
        {collapsed ? (
            // 自定义的折叠菜单
            <div className={styles.collapsedMenu}>
                {courseManagementNavItems.map(item => (
                    <Tooltip placement="right" title={item.label} key={item.key}>
                        <Link 
                            href={item.href(courseId)}
                            className={`${styles.collapsedMenuItem} ${item.key === activeKey ? styles.active : ''}`}
                        >
                            {item.icon}
                        </Link>
                    </Tooltip>
                ))}
            </div>
        ) : (
            // 默认的展开菜单
            <Menu
                mode="inline"
                selectedKeys={[activeKey]}
                className={styles.expandedMenu}
            >
                {courseManagementNavItems.map(item => (
                    <MenuItem key={item.key} icon={item.icon}>
                        <Link href={item.href(courseId)}>{item.label}</Link>
                    </MenuItem>
                ))}
            </Menu>
        )}
      </div>

      <div className={styles.siderFooter}>
        <Tooltip title={collapsed ? "课程设置" : ""} placement="right">
          <Button block icon={<SettingOutlined />} type={collapsed ? 'text' : 'default'} style={{ borderRadius: collapsed ? '50%' : '6px', width: collapsed ? 40 : 'auto', height: collapsed ? 40 : 32 }}>
              {!collapsed && '课程设置'}
          </Button>
        </Tooltip>
      </div>
    </aside>
  );
};

export default CourseManagementSider;