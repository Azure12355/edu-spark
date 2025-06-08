// src/components/teacher/pages/ClassManagement/StudentManagementPanel.tsx
"use client";
import React, { useState, useEffect } from 'react';
import { Table, Button, Input, Space, Typography, Tag, Dropdown, Modal, Form, Popconfirm, message } from 'antd';
import type { TableProps } from 'antd';
import { UserAddOutlined, UploadOutlined, SettingOutlined, SearchOutlined, MoreOutlined } from '@ant-design/icons';
import { mockStudentData } from '@/lib/student-data';
import type { Student } from '@/lib/student-data';
import { mockClassData } from '@/lib/class-data';
import styles from './StudentManagementPanel.module.css';

const { Title, Text } = Typography;

interface StudentManagementPanelProps {
  classId: string;
}

const StudentManagementPanel: React.FC<StudentManagementPanelProps> = ({ classId }) => {
    const [students, setStudents] = useState<Student[]>([]);
    const [selectedClassName, setSelectedClassName] = useState('');
  
    useEffect(() => {
        setStudents(mockStudentData[classId] || []);
        setSelectedClassName(mockClassData.find(c => c.id === classId)?.name || '');
    }, [classId]);
  
    const handleRemoveStudent = (id: string) => {
      setStudents(prev => prev.filter(s => s.id !== id));
      message.success("学生已移除");
    };
  
    const columns: TableProps<Student>['columns'] = [
        { title: '姓名', dataIndex: 'name', key: 'name' },
        { title: '学号/工号', dataIndex: 'studentId', key: 'studentId', sorter: (a, b) => a.studentId.localeCompare(b.studentId) },
        { title: '学院', dataIndex: 'college', key: 'college', ellipsis: true },
        { title: '专业', dataIndex: 'major', key: 'major' },
        { title: '加入时间', dataIndex: 'joinDate', key: 'joinDate', sorter: (a, b) => new Date(a.joinDate).getTime() - new Date(b.joinDate).getTime()},
        {
            title: '操作', key: 'action',
            render: (_, record) => (
                <Space>
                    <Popconfirm title="确定要移除该学生吗？" onConfirm={() => handleRemoveStudent(record.id)}>
                        <Button type="link" danger>移除</Button>
                    </Popconfirm>
                    <Button type="link">更多</Button>
                </Space>
            ),
        },
    ];
  
    return (
      <div className={styles.panelWrapper}>
        <header className={styles.header}>
            <Title level={4} style={{ margin: 0 }}>{selectedClassName} <Tag icon={<SettingOutlined />} style={{marginLeft: 8, cursor: 'pointer'}}>设置</Tag></Title>
            <Space>
                <Button icon={<UserAddOutlined />} type="primary">添加学生</Button>
                <Button icon={<UploadOutlined />}>导出学生名单</Button>
                <Button>分组管理</Button>
            </Space>
        </header>

        <div className={styles.tableToolbar}>
            <Text>全部学生</Text>
            <Space>
                <Input placeholder="请输入姓名或学号" prefix={<SearchOutlined />} />
                <Text type="secondary">共 {students.length} 人</Text>
            </Space>
        </div>
        
        <div className={styles.tableWrapper}>
            <Table
                columns={columns}
                dataSource={students}
                rowKey="id"
                rowSelection={{ type: 'checkbox' }}
                pagination={{ pageSize: 10, showSizeChanger: false }}
                scroll={{y: '100%'}}
            />
        </div>
      </div>
    );
  };
  
  export default StudentManagementPanel;