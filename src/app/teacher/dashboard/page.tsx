// src/app/(teacher)/dashboard/page.tsx
"use client";
import React from 'react';
import { Typography, Row, Col, Card, Statistic, Button } from 'antd';
import { ReadOutlined, TeamOutlined, BarChartOutlined, PlusOutlined } from '@ant-design/icons';

const { Title, Paragraph } = Typography;

const DashboardPage = () => {
  return (
    <div>
      <Title level={2}>教学工作台</Title>
      <Paragraph type="secondary">
        欢迎回来，王老师！在这里，您可以快速开始新一天的工作，查看教学概览。
      </Paragraph>

      <Row gutter={[24, 24]} style={{ marginTop: '24px' }}>
        <Col xs={24} sm={12} md={8}>
          <Card hoverable>
            <Statistic title="进行中的课程" value={3} prefix={<ReadOutlined />} />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={8}>
          <Card hoverable>
            <Statistic title="管理的学生总数" value={128} prefix={<TeamOutlined />} />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={8}>
          <Card hoverable>
            <Statistic title="待批阅作业" value={12} prefix={<BarChartOutlined />} />
          </Card>
        </Col>
      </Row>

      <Card style={{ marginTop: '32px' }}>
        <Row align="middle" justify="space-between">
          <Col>
            <Title level={4} style={{ margin: 0 }}>快速开始</Title>
            <Paragraph type="secondary" style={{ margin: 0 }}>
              立即使用 AI 创建一份新的教案，或查看学生们的最新学情。
            </Paragraph>
          </Col>
          <Col>
            <Button type="primary" icon={<PlusOutlined />} size="large">
              创建新教案
            </Button>
          </Col>
        </Row>
      </Card>
    </div>
  );
};

export default DashboardPage;