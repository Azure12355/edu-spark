import type { KnowledgeBaseVO } from './vo/kb/kb/KnowledgeBaseVO';

export type KnowledgeBase = KnowledgeBaseVO;
export type KnowledgeStatus = 'READY' | 'PROCESSING' | 'FAILED' | 'BUILDING' | 'ERROR' | 'DISABLED';
export type KnowledgeFormatType = 0 | 1 | 2;
