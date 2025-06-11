// src/app/teacher/course-management/[courseId]/class-management/page.tsx
"use client";
import React, { useState } from 'react';
import { Tabs } from 'antd';
import ClassListSider from '@/components/teacher/pages/ClassManagement/ClassListSider';
import StudentManagementPanel from '@/components/teacher/pages/ClassManagement/StudentManagementPanel';
import GradingWeightsPanel from '@/components/teacher/pages/ClassManagement/GradingWeightsPanel';
import CourseSettingsPanel from '@/components/teacher/pages/ClassManagement/CourseSettingsPanel';
import { mockClassData } from '@/lib/class-data';

const ClassManagementPage: React.FC = () => {
  const [selectedClassId, setSelectedClassId] = useState<string>(mockClassData[0].id);

  const tabItems = [
    { label: '班级管理', key: '1', children: <StudentManagementPanel classId={selectedClassId} /> },
    { label: '教师团队管理', key: '2', children: <div style={{padding: 24}}>教师团队管理功能正在开发中...</div> },
    { label: '成绩权重', key: '3', children: <GradingWeightsPanel /> },
    { label: '课程管理', key: '4', children: <CourseSettingsPanel /> },
    { label: '操作日志', key: '5', children: <div style={{padding: 24}}>操作日志功能正在开发中...</div> },
    { label: '课程评审', key: '6', children: <div style={{padding: 24}}>课程评审功能正在开发中...</div> },
  ];

  return (
    <div style={{ display: 'flex', height: '100%', width: '100%' }}>
      <ClassListSider
        selectedClassId={selectedClassId}
        onSelectClass={setSelectedClassId}
      />
      <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column' }}>
        <Tabs
          defaultActiveKey="1"
          items={tabItems}
          type="line"
          // 核心修改：通过样式使 Tabs 内容区撑满
          style={{ height: '100%', display: 'flex', flexDirection: 'column', marginLeft: 16 }}
          className="class-management-tabs"
        />
      </div>
      {/* 
        添加全局样式来修复 antd Tabs 组件的高度问题。
        这比 CSS Modules 更适合修改第三方库的深层样式。
      */}
      <style jsx global>{`
        .class-management-tabs .ant-tabs-content-holder {
          flex: 1;
          overflow: hidden;
        }
        .class-management-tabs .ant-tabs-content {
          height: 100%;
        }
        .class-management-tabs .ant-tabs-tabpane {
          height: 100%;
          overflow-y: auto;
        }
      `}</style>
    </div>
  );
};

export default ClassManagementPage;