// src/shared/lib/data/timelineCardData.ts
import { TimelineCardData } from '@/features/student/home/components/common/TimelineCard/TimelineCard';

export const timelineCardMockData: TimelineCardData[] = [
    {
        id: 'event-1',
        year: '1453',
        title: '君士坦丁堡陷落',
        description: '奥斯曼帝国攻陷东罗马帝国首都，标志着中世纪的结束。',
        era: '中世纪晚期',
        theme: 'war',
    },
    {
        id: 'event-2',
        year: '1492',
        title: '新大陆发现',
        description: '克里斯托弗·哥伦布的航行开启了全球大航海时代。',
        era: '大航海时代',
        theme: 'discovery',
    },
    {
        id: 'event-3',
        year: '1789',
        title: '法国大革命',
        description: '推翻君主制，建立共和制，对世界历史产生深远影响。',
        era: '近代史',
        theme: 'art', // 这里可以根据内容选择更贴切的主题，这里仅为示例
    },
    {
        id: 'event-4',
        year: '1905',
        title: '狭义相对论',
        description: '爱因斯坦提出时空观念革命，奠定现代物理基础。',
        era: '现代物理',
        theme: 'science',
    },
    {
        id: 'event-5',
        year: '1929',
        title: '大萧条爆发',
        description: '美国股市崩盘，引发全球性的经济危机。',
        era: '20世纪',
        theme: 'war',
    },
    {
        id: 'event-6',
        year: '1969',
        title: '人类登月',
        description: '阿波罗11号成功登月，尼尔·阿姆斯特朗踏出人类一小步。',
        era: '太空探索',
        theme: 'discovery',
    },
    {
        id: 'event-7',
        year: '1991',
        title: '万维网诞生',
        description: '蒂姆·伯纳斯-李发明万维网，开启信息时代。',
        era: '信息革命',
        theme: 'science',
    },
    {
        id: 'event-8',
        year: '2007',
        title: 'iPhone发布',
        description: '苹果公司推出iPhone，重新定义智能手机和移动互联。',
        era: '科技前沿',
        theme: 'science',
    },
];