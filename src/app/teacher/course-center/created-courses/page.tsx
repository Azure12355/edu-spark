// src/app/teacher/course-center/created-courses/page.tsx
"use client";
import React, { useState } from 'react';
import { Typography, Button, Space, Row, Col, Input, Dropdown, MenuProps } from 'antd';
import { PlusOutlined, DownOutlined, SearchOutlined } from '@ant-design/icons';
import Link from 'next/link';
import { myCreatedCourses } from '@/lib/course-data';
import CourseCard from '@/components/teacher/pages/CourseCenter/CourseCard';

const { Title, Paragraph } = Typography;

const filterTags = ['全部', '计算机', '数据科学', '前端开发', '进行中', '已结课'];

const sortItems: MenuProps['items'] = [
  { key: '1', label: '按最新创建' },
  { key: '2', label: '按学生人数' },
  { key: '3', label: '按更新时间' },
];

const MyCreatedCoursesPage = () => {
  const [activeTag, setActiveTag] = useState('全部');

  return (
    <div>
      <Title level={2}>我创建的课程</Title>
      <Paragraph type="secondary" style={{ maxWidth: 800 }}>
        在这里管理您创建的所有课程。您可以查看课程概况、编辑课程内容、分析学情数据，或创建一门全新的课程。
      </Paragraph>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '24px 0', flexWrap: 'wrap', gap: '16px' }}>
        <Space size="small" wrap>
          {filterTags.map(tag => (
            <Button
              key={tag}
              type={activeTag === tag ? 'primary' : 'default'}
              onClick={() => setActiveTag(tag)}
              shape="round"
            >
              {tag}
            </Button>
          ))}
        </Space>
        <Space wrap>
            <Input placeholder="搜索我的课程" prefix={<SearchOutlined />} style={{width: 200}} />
            <Dropdown menu={{ items: sortItems }}>
                <Button>
                    <Space>
                        按最新创建
                        <DownOutlined />
                    </Space>
                </Button>
            </Dropdown>
            <Link href="/teacher/course-center/create-courses">
                <Button type="primary" icon={<PlusOutlined />}>创建新课程</Button>
            </Link>
        </Space>
      </div>

      <Row gutter={[24, 24]}>
        {myCreatedCourses.map(course => (
          <Col key={course.id} xs={24} sm={12} md={12} lg={8} xl={8}>
            <CourseCard course={course} />
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default MyCreatedCoursesPage;