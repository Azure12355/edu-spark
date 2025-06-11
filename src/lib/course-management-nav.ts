// src/lib/course-management-nav.ts
import React from 'react';
import {
  AppstoreOutlined,
  TeamOutlined,
  FilePptOutlined,
  ReadOutlined,
  ContainerOutlined,
  DatabaseOutlined,
  ExperimentOutlined,
  FormOutlined,
  BarChartOutlined,
  HddOutlined,
} from '@ant-design/icons';

export interface CourseManagementSiderItem {
  key: string;
  label: React.ReactNode;
  icon?: React.ReactNode;
  href: (courseId: string) => string;
}

export const courseManagementNavItems: CourseManagementSiderItem[] = [
  {
    key: 'ai-workbench',
    label: 'AI 工作台',
    icon: React.createElement(AppstoreOutlined),
    href: (courseId) => `/teacher/course-management/${courseId}/ai-workbench`,
  },
  {
    key: 'class-management',
    label: '班级管理',
    icon: React.createElement(TeamOutlined),
    href: (courseId) => `/teacher/course-management/${courseId}/class-management`,
  },
  {
    key: 'courseware',
    label: '课件',
    icon: React.createElement(FilePptOutlined),
    href: (courseId) => `/teacher/course-management/${courseId}/courseware`,
  },
  {
    key: 'lesson-plan',
    label: '教案',
    icon: React.createElement(ReadOutlined),
    href: (courseId) => `/teacher/course-management/${courseId}/lesson-plan`,
  },
  {
    key: 'chapters',
    label: '章节',
    icon: React.createElement(ContainerOutlined),
    href: (courseId) => `/teacher/course-management/${courseId}/chapters`,
  },
  {
    key: 'knowledge-base',
    label: '知识库',
    icon: React.createElement(DatabaseOutlined),
    href: (courseId) => `/teacher/course-management/${courseId}/knowledge-base`,
  },
  {
    key: 'question-bank',
    label: '题库',
    icon: React.createElement(ExperimentOutlined),
    href: (courseId) => `/teacher/course-management/${courseId}/question-bank`,
  },
  {
    key: 'homework',
    label: '作业',
    icon: React.createElement(FormOutlined),
    href: (courseId) => `/teacher/course-management/${courseId}/homework`,
  },
  {
    key: 'exams',
    label: '考试',
    icon: React.createElement(HddOutlined),
    href: (courseId) => `/teacher/course-management/${courseId}/exams`,
  },
  {
    key: 'statistics',
    label: '统计',
    icon: React.createElement(BarChartOutlined),
    href: (courseId) => `/teacher/course-management/${courseId}/statistics`,
  },
];