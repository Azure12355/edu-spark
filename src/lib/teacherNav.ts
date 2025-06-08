// src/lib/teacherNav.ts
import React from 'react';
import {
  DashboardOutlined,
  ReadOutlined,
  FormOutlined,
  TeamOutlined,
  BarChartOutlined,
  AppstoreOutlined,
  ExperimentOutlined,
  RobotOutlined,
  HddOutlined,
  QuestionCircleOutlined,
  SettingOutlined,
  PlusOutlined,
  BookOutlined,
} from '@ant-design/icons';
import { DEFAULT_AGENT_ID } from './agentExperienceData'; // 引入默认ID

/**
 * 定义顶部导航栏菜单项的类型
 */
export interface TeacherHeaderItem {
  key: string;
  label: string;
  href: string;
}

/**
 * 定义侧边栏菜单项的类型 (兼容 Ant Design Menu)
 */
export interface TeacherSiderItem {
  key: string;
  label: React.ReactNode;
  icon?: React.ReactNode;
  href?: string;
  children?: TeacherSiderItem[];
  type?: 'group' | 'divider';
}

// 顶部导航栏数据
export const teacherHeaderNavItems: TeacherHeaderItem[] = [
  { key: 'workbench', label: '我的工作台', href: '/teacher/dashboard' },
  { key: 'agentSquare', label: '智能体广场', href: '/teacher/agent-square' },
  // 新增智能体体验中心入口
  { key: 'agentExperience', label: '智能体体验中心', href: `/teacher/agent-experience/${DEFAULT_AGENT_ID}` },
  { key: 'docs', label: '使用指南', href: '/docs' },
  { key: 'community', label: '交流社区', href: '/community' },
];

// 侧边栏导航数据 (保持不变)
export const teacherSiderNavItems: TeacherSiderItem[] = [
  {
    key: 'dashboard',
    label: '教学工作台',
    icon: React.createElement(DashboardOutlined),
    href: '/teacher/dashboard',
  },
  {
    key: 'lesson-prep',
    label: '智能备课',
    icon: React.createElement(ReadOutlined),
    children: [
      {
        key: 'create-lesson',
        label: '创建新教案',
        icon: React.createElement(FormOutlined),
        href: '/teacher/lesson-prep/create',
      },
      {
        key: 'my-lessons',
        label: '我的教案库',
        icon: React.createElement(HddOutlined),
        href: '/teacher/lesson-prep/list',
      },
    ],
  },
  {
    key: 'course-center',
    label: '课程中心',
    icon: React.createElement(BookOutlined),
    children: [
      {
        key: 'my-courses',
        label: '加入的课程',
        icon: React.createElement(TeamOutlined),
        href: '/teacher/course-center/my-courses',
      },
      {
        key: 'created-courses',
        label: '创建的课程',
        icon: React.createElement(BookOutlined),
        href: '/teacher/course-center/created-courses',
      },
      {
        key: 'create-course',
        label: '创建新课程',
        icon: React.createElement(PlusOutlined),
        href: '/teacher/course-center/create-courses',
      },
    ],
  },
  {
    key: 'student-analytics',
    label: '学生与学情',
    icon: React.createElement(TeamOutlined),
    children: [
      {
        key: 'student-management',
        label: '学生管理',
        icon: React.createElement(TeamOutlined),
        href: '/teacher/students/management',
      },
      {
        key: 'analytics-dashboard',
        label: '学情分析',
        icon: React.createElement(BarChartOutlined),
        href: '/teacher/students/analytics',
      },
    ],
  },
  {
    key: 'resources',
    label: '资源中心',
    icon: React.createElement(AppstoreOutlined),
    children: [
      {
        key: 'knowledge-base',
        label: '我的知识库',
        icon: React.createElement(HddOutlined),
        href: '/teacher/resources/knowledge-base',
      },
      {
        key: 'agent-square-link', // key需要唯一
        label: '智能体广场',
        icon: React.createElement(RobotOutlined),
        href: '/teacher/agent-square',
      },
      {
        key: 'public-exercises',
        label: '公共题库',
        icon: React.createElement(ExperimentOutlined),
        href: '/teacher/resources/exercises',
      },
    ],
  },

  {
    key: 'settings',
    label: '个人设置',
    icon: React.createElement(SettingOutlined),
    href: '/teacher/settings',
  },
  {
    key: 'help',
    label: '帮助与反馈',
    icon: React.createElement(QuestionCircleOutlined),
    href: '/help',
  },
];