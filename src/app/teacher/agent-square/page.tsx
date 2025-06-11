// src/app/(teacher)/agent-square/page.tsx
"use client";
import React, { useState } from 'react';
import { Typography, Button, Space, Row, Col, Dropdown } from 'antd';
import { PlusOutlined, DownOutlined } from '@ant-design/icons';
import { agentData } from '@/lib/teacher-data';
import AgentCard from '@/components/teacher/pages/AgentSquare/AgentCard';

const { Title, Paragraph } = Typography;

const filterTags = ['全部', '商业服务', '写作辅助', '工作提效', '教育辅助', '生活助手', '其他'];

const AgentSquarePage = () => {
  const [activeTag, setActiveTag] = useState('全部');

  return (
    <div>
      <Title level={2}>智能体广场</Title>
      <Paragraph type="secondary" style={{ maxWidth: 800 }}>
        您可以在智能体广场，查看或体验基于模型创建的智能体。这些智能体由官方发布，涉及各类行业及应用场景。
      </Paragraph>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '24px 0' }}>
        <Space size="small" wrap>
          {filterTags.map(tag => (
            <Button
              key={tag}
              type={activeTag === tag ? 'primary' : 'default'}
              onClick={() => setActiveTag(tag)}
            >
              {tag}
            </Button>
          ))}
        </Space>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
         <Dropdown menu={{ items: [{key: '1', label: '全部智能体'}] }} >
            <a onClick={(e) => e.preventDefault()} style={{color: 'black', fontWeight: '500', fontSize: '16px'}}>
              <Space>
                全部智能体
                <DownOutlined />
              </Space>
            </a>
          </Dropdown>
        <Button type="primary" icon={<PlusOutlined />}>创建智能体</Button>
      </div>

      <Row gutter={[24, 24]}>
        {agentData.map(agent => (
          // 修改这里的栅格属性
          <Col key={agent.id} xs={24} sm={12} md={12} lg={8} xl={8}>
            <AgentCard agent={agent} />
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default AgentSquarePage;