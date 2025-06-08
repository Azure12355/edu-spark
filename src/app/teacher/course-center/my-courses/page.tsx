// src/app/teacher/course-center/my-courses/page.tsx
"use client";
import React, { useState } from 'react';
import { Typography, Button, Space, Row, Col, Input, Dropdown, MenuProps } from 'antd';
import { DownOutlined, SearchOutlined } from '@ant-design/icons';
import { myJoinedCourses } from '@/lib/course-data';
import CourseCard from '@/components/teacher/pages/CourseCenter/CourseCard';

const { Title, Paragraph } = Typography;

const filterTags = ['全部', '人工智能', '软件工程', '理论课', '进阶'];

const sortItems: MenuProps['items'] = [
  { key: '1', label: '按最新加入' },
  { key: '2', label: '按更新时间' },
];

const MyJoinedCoursesPage = () => {
  const [activeTag, setActiveTag] = useState('全部');

  return (
    <div>
      <Title level={2}>我加入的课程</Title>
      <Paragraph type="secondary" style={{ maxWidth: 800 }}>
        这里是您作为学生或协作者加入的所有课程。您可以进入课程学习、完成练习，或参与课程讨论。
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
            <Input placeholder="搜索加入的课程" prefix={<SearchOutlined />} style={{width: 200}} />
            <Dropdown menu={{ items: sortItems }}>
                <Button>
                    <Space>
                        按最新加入
                        <DownOutlined />
                    </Space>
                </Button>
            </Dropdown>
        </Space>
      </div>

      <Row gutter={[24, 24]}>
        {myJoinedCourses.map(course => (
          <Col key={course.id} xs={24} sm={12} md={12} lg={8} xl={8}>
            <CourseCard course={course} />
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default MyJoinedCoursesPage;