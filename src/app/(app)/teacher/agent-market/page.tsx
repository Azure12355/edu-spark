"use client";
import React from 'react';
import { Button, Dropdown, Radio, Space, Typography } from 'antd';
import { AppstoreOutlined, DownOutlined, PlusOutlined, ReadOutlined, CustomerServiceOutlined, FundViewOutlined, EditOutlined, BulbOutlined } from '@ant-design/icons';
import AgentCard from '@/components/teacher/agent-market/AgentCard';
import styles from './AgentMarket.module.css';

const { Title, Paragraph } = Typography;

const agentsData = [
  {
    icon: <CustomerServiceOutlined />, bgColor: '#40a9ff', title: '客服小谱', id: '1854...', author: '智能涌现',
    description: '智谱开放平台AI客服，知识内容为专项知识库不支持自定义，智能体自有知识库。',
    tags: ['商业服务', '工作提效'], date: '2024-11-10',
  },
  {
    icon: <ReadOutlined />, bgColor: '#73d13d', title: '诊疗陪练', id: '1840...', author: '智能涌现',
    description: '诊疗陪练AI应用通过AI模拟患者，辅助医学学生展开问诊，提供问诊评估分析、扮演特定角色，支持Agent...',
    tags: ['商业服务', '工作提效'], date: '2024-11-06',
  },
  {
    icon: <EditOutlined />, bgColor: '#ff7a45', title: '小红书营销文案助理', id: '1840...', author: '智能涌现',
    description: '一键生成小红书爆款文案，帮助你轻松吸引粉丝，提升品牌影响力。只是一个主题，只要一键，一键就做爆款！',
    tags: ['写作辅助', '商业服务', '工作提效'], date: '2024-11-06',
  },
  {
    icon: <FundViewOutlined />, bgColor: '#597ef7', title: '景点百晓生(拍照识图)', id: '1840...', author: '智能涌现',
    description: '拍照识图神器，上传任意图片，秒级解析介绍，轻松解读未知风光、海内外景点、美食、历史典故。一图get',
    tags: ['商业服务', '生活助手'], date: '2025-04-01',
  },
  {
    icon: <BulbOutlined />, bgColor: '#ffc53d', title: '市场报告查询助手', id: '18457...', author: '智能涌现',
    description: '市场报告查询助手，通过搜索公开信息，快速生成行业市场报告，洞悉市场规模、产品结构和关键数据...',
    tags: ['商业服务', '写作辅助', '工作提效'], date: '2024-11-06',
  },
  {
    icon: <AppstoreOutlined />, bgColor: '#f759ab', title: '作业助手', id: '1840...', author: '智能涌现',
    description: '作业助手能根据照片题目，精准识别题目，高效辅助学习，用户可根据题目，自助逐步获取解题答案。',
    tags: ['商业服务', '教育辅助'], date: '2025-04-01',
  },
  {
    icon: <CustomerServiceOutlined />, bgColor: '#40a9ff', title: '客服小谱', id: '1854...', author: '智能涌现',
    description: '智谱开放平台AI客服，知识内容为专项知识库不支持自定义，智能体自有知识库。',
    tags: ['商业服务', '工作提效'], date: '2024-11-10',
  },
  {
    icon: <ReadOutlined />, bgColor: '#73d13d', title: '诊疗陪练', id: '1840...', author: '智能涌现',
    description: '诊疗陪练AI应用通过AI模拟患者，辅助医学学生展开问诊，提供问诊评估分析、扮演特定角色，支持Agent...',
    tags: ['商业服务', '工作提效'], date: '2024-11-06',
  },
  {
    icon: <EditOutlined />, bgColor: '#ff7a45', title: '小红书营销文案助理', id: '1840...', author: '智能涌现',
    description: '一键生成小红书爆款文案，帮助你轻松吸引粉丝，提升品牌影响力。只是一个主题，只要一键，一键就做爆款！',
    tags: ['写作辅助', '商业服务', '工作提效'], date: '2024-11-06',
  },
  {
    icon: <FundViewOutlined />, bgColor: '#597ef7', title: '景点百晓生(拍照识图)', id: '1840...', author: '智能涌现',
    description: '拍照识图神器，上传任意图片，秒级解析介绍，轻松解读未知风光、海内外景点、美食、历史典故。一图get',
    tags: ['商业服务', '生活助手'], date: '2025-04-01',
  },
  {
    icon: <BulbOutlined />, bgColor: '#ffc53d', title: '市场报告查询助手', id: '18457...', author: '智能涌现',
    description: '市场报告查询助手，通过搜索公开信息，快速生成行业市场报告，洞悉市场规模、产品结构和关键数据...',
    tags: ['商业服务', '写作辅助', '工作提效'], date: '2024-11-06',
  },
  {
    icon: <AppstoreOutlined />, bgColor: '#f759ab', title: '作业助手', id: '1840...', author: '智能涌现',
    description: '作业助手能根据照片题目，精准识别题目，高效辅助学习，用户可根据题目，自助逐步获取解题答案。',
    tags: ['商业服务', '教育辅助'], date: '2025-04-01',
  },
];

const AgentMarketPage = () => {
  return (
    <div className={styles.pageContainer}>
      <div className={styles.pageHeader}>
        <Title level={3} style={{ margin: 0 }}>智能体广场</Title>
        <Paragraph type="secondary">
          您可以在智能体广场，查看或体验基于基础模型创建的智能体。这些智能体由平台或开发者发布，涉及各类行业及开发场景的应用。
        </Paragraph>
      </div>

      <div className={styles.filterBar}>
        <Radio.Group defaultValue="all" buttonStyle="solid">
          <Radio.Button value="all">全部</Radio.Button>
          <Radio.Button value="business">商业服务</Radio.Button>
          <Radio.Button value="writing">写作辅助</Radio.Button>
          <Radio.Button value="efficiency">工作提效</Radio.Button>
          <Radio.Button value="education">教育辅助</Radio.Button>
          <Radio.Button value="life">生活助手</Radio.Button>
          <Radio.Button value="other">其他</Radio.Button>
        </Radio.Group>
        <Space>
          <Dropdown
            menu={{
              items: [{ key: '1', label: '全部智能体' }, { key: '2', label: '我的智能体' }],
            }}
          >
            <Button>
              全部智能体 <DownOutlined />
            </Button>
          </Dropdown>
          <Button type="primary" icon={<PlusOutlined />}>
            创建智能体
          </Button>
        </Space>
      </div>

      <div className={styles.agentGrid}>
        {agentsData.map((agent, index) => (
          <AgentCard key={index} {...agent} />
        ))}
      </div>
    </div>
  );
};

export default AgentMarketPage;