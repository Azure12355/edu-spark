// src/components/teacher/layout/TeacherSider.tsx
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, Button } from 'antd';
import { QuestionCircleOutlined, GithubOutlined } from '@ant-design/icons';
import { teacherSiderNavItems, TeacherSiderItem } from '@/lib/teacherNav';
import styles from './TeacherSider.module.css';

// 递归函数，为没有 href 的父菜单项渲染文本，有 href 的渲染链接
const renderMenuItems = (items: TeacherSiderItem[]): any[] => {
  return items.map(item => {
    if (item.type === 'divider') {
      return { type: 'divider', key: item.key };
    }
    
    const label = item.href ? <Link href={item.href}>{item.label}</Link> : item.label;

    if (item.children) {
      return {
        key: item.key,
        icon: item.icon,
        label: item.label, // 父菜单项本身不可点击
        children: renderMenuItems(item.children),
      };
    }
    
    return {
      key: item.key,
      icon: item.icon,
      label: label,
    };
  });
};

const TeacherSider: React.FC = () => {
  const pathname = usePathname();

  // 找到当前路径匹配的菜单项 key
  const findActiveKey = (items: TeacherSiderItem[]): string => {
      for (const item of items) {
          if (item.href && pathname.startsWith(item.href)) {
              return item.key;
          }
          if (item.children) {
              const childKey = findActiveKey(item.children);
              if (childKey) return childKey;
          }
      }
      return '';
  };
  
  const activeKey = findActiveKey(teacherSiderNavItems);
  
  // 找到当前激活项所属的父菜单 key
  const findOpenKey = (items: TeacherSiderItem[]): string => {
      for (const item of items) {
          if (item.children?.some(child => child.key === activeKey)) {
              return item.key;
          }
      }
      return '';
  }
  const openKey = findOpenKey(teacherSiderNavItems);

  return (
    <aside className={styles.siderContainer}>
      <div className={styles.scrollableArea}>
        <Menu
          mode="inline"
          selectedKeys={[activeKey]}
          defaultOpenKeys={[openKey]}
          items={renderMenuItems(teacherSiderNavItems)}
          className={styles.menu}
        />
      </div>
      {/* 移除了商业化推广卡片，替换为简洁的帮助/反馈区域 */}
      <div className={styles.footerArea}>
        <Button 
          icon={<QuestionCircleOutlined />} 
          type="text" 
          block 
          style={{ textAlign: 'left', color: '#4E5969' }}
        >
          帮助与反馈
        </Button>
        <Button 
          icon={<GithubOutlined />} 
          type="text" 
          block 
          style={{ textAlign: 'left', color: '#4E5969' }}
        >
          项目源码
        </Button>
      </div>
    </aside>
  );
};

export default TeacherSider;