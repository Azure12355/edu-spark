// src/lib/data/infoData.ts

// 文档类型分布数据
export const documentTypeData = [
    { type: 'PDF', count: 15, color: '#3b82f6' },
    { type: 'DOCX', count: 8, color: '#2563eb' },
    { type: 'Markdown', count: 12, color: '#64748b' },
    { type: 'PPTX', count: 5, color: '#ef4444' },
    { type: 'XLSX', count: 6, color: '#16a34a' },
];

// 切片数量趋势数据 (最近7天)
export const chunkTrendData = [
    { date: '06-06', count: 120 },
    { date: '06-07', count: 150 },
    { date: '06-08', count: 130 },
    { date: '06-09', count: 180 },
    { date: '06-10', count: 250 },
    { date: '06-11', count: 220 },
    { date: '06-12', count: 300 },
];

// 最近处理任务数据
export interface RecentTask {
    id: string;
    fileName: string;
    status: 'completed' | 'failed' | 'processing';
    timestamp: string;
}
export const recentTasksData: RecentTask[] = [
    { id: 'task-1', fileName: '机器学习导论.pdf', status: 'completed', timestamp: '5分钟前' },
    { id: 'task-2', fileName: '年度财务报告.xlsx', status: 'completed', timestamp: '1小时前' },
    { id: 'task-3', fileName: 'api_documentation.md', status: 'failed', timestamp: '3小时前' },
    { id: 'task-4', fileName: '项目规划.pptx', status: 'processing', timestamp: '进行中' },
];