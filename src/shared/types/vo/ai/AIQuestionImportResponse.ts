// src/shared/types/vo/ai/AIQuestionImportResponse.ts

/**
 * @description AI题目导入响应的视图对象（VO）。
 * 严格对标后端的 'com.weilanx.eduspark.model.vo.ai.AIQuestionImportResponse.java'。
 */
export interface AIQuestionImportResponseVO {
    importedCount: number;
    message: string;
}