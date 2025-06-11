// src/components/teacher/pages/CourseCenter/CourseCard.tsx
import React from 'react';
import { Card, Avatar, Typography, Tag, Button, Space } from 'antd';
import { TeamOutlined, EditOutlined, ReadOutlined } from '@ant-design/icons';
import type { Course } from '@/lib/course-data';
import styles from './CourseCard.module.css';
import Link from 'next/link';

const { Title, Text, Paragraph } = Typography;

interface CourseCardProps {
  course: Course;
}

const CourseCard: React.FC<CourseCardProps> = ({ course }) => {
  const cardContent = (
    <Card className={styles.courseCard} bordered={false}>
      <div className={styles.cardHeader}>
        <Avatar
          size={52}
          style={{ backgroundColor: course.avatarColor }}
          shape="square"
          className={styles.avatarText}
        >
          {course.avatarText}
        </Avatar>
        <div className={styles.titleGroup}>
          <Title level={5} className={styles.title}>{course.title}</Title>
          <Text className={styles.instructor}>讲师: {course.instructor}</Text>
        </div>
      </div>
      <Paragraph className={styles.description} ellipsis={{ rows: 3 }}>
        {course.description}
      </Paragraph>
      <div className={styles.tagsContainer}>
        <Space size={[0, 8]} wrap>
          {course.tags.map((tag, index) => (
            <Tag key={index} color="blue">{tag}</Tag>
          ))}
        </Space>
      </div>
      <div className={styles.cardFooter}>
        <div className={styles.stats}>
            <span className={styles.statsItem}>
                <TeamOutlined /> {course.studentCount}
            </span>
            <Text type="secondary" style={{fontSize: 13}}>更新于 {course.lastUpdated}</Text>
        </div>
        {course.isCreator ? (
            <Button type="primary" icon={<EditOutlined />}>管理课程</Button>
        ) : (
            <Button type="primary" ghost icon={<ReadOutlined />}>进入学习</Button>
        )}
      </div>
    </Card>
  );

  // 如果是创建者，则整个卡片可点击跳转
  if (course.isCreator) {
    return (
      <Link href={`/teacher/course-management/${course.id}/ai-workbench`}>
        {cardContent}
      </Link>
    );
  }

  return cardContent;
};

export default CourseCard;