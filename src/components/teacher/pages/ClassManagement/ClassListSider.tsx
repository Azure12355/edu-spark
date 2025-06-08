// src/components/teacher/pages/ClassManagement/ClassListSider.tsx
"use client";
import React from 'react';
import { Button, Input, List, Space, Dropdown } from 'antd';
import { PlusOutlined, SettingOutlined, MoreOutlined, SearchOutlined } from '@ant-design/icons';
import { mockClassData } from '@/lib/class-data';
import type { ClassInfo } from '@/lib/class-data';
import styles from './ClassListSider.module.css';

interface ClassListSiderProps {
  selectedClassId: string;
  onSelectClass: (id: string) => void;
}

const ClassListSider: React.FC<ClassListSiderProps> = ({ selectedClassId, onSelectClass }) => {
  return (
    <aside className={styles.classListSider}>
      <Space direction="vertical" className={styles.header} style={{width: '100%'}}>
        {/* 核心修改：按钮垂直排列 */}
        <Button type="primary" icon={<PlusOutlined />} block>新建班级</Button>
        <Button icon={<SettingOutlined />} block>管理班级</Button>
        <Input placeholder="搜索班级" prefix={<SearchOutlined />} />
      </Space>
      <div className={styles.listContainer}>
        <List
          dataSource={mockClassData}
          renderItem={(item: ClassInfo) => (
            <div
              onClick={() => onSelectClass(item.id)}
              className={`${styles.listItem} ${selectedClassId === item.id ? styles.active : ''}`}
            >
              <span className={styles.listItemName}>{item.name}</span>
              <Dropdown menu={{items: [{key: '1', label: '重命名'}, {key: '2', label: '归档'}]}} trigger={['click']}>
                <Button type="text" shape="circle" icon={<MoreOutlined />} onClick={e => e.stopPropagation()} className={styles.moreButton} />
              </Dropdown>
            </div>
          )}
        />
      </div>
    </aside>
  );
};

export default ClassListSider;