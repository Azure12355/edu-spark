// [!file src/features/teacher/assistant/ai-assistant/hooks/useTeacherAssistant.ts]
import { useState, useEffect, useCallback, useMemo } from 'react';
import { CourseVO, SyllabusVO } from '@/shared/types';
import { listCourseVOByPage } from '@/shared/services/courseService';
import { getSyllabusByCourseId } from '@/shared/services/syllabusService';
import { useToast } from '@/shared/hooks/useToast';

// 定义知识树中选中的节点类型
export interface SelectedNode {
    id: number | string;
    type: 'course' | 'chapter' | 'section' | 'point';
    name: string;
}

export const useTeacherAssistant = () => {
    // 状态管理
    const [courses, setCourses] = useState<CourseVO[]>([]);
    const [selectedCourse, setSelectedCourse] = useState<CourseVO | null>(null);
    const [syllabus, setSyllabus] = useState<SyllabusVO | null>(null);
    const [selectedNode, setSelectedNode] = useState<SelectedNode | null>(null);

    // 加载和错误状态
    const [isLoadingCourses, setIsLoadingCourses] = useState(true);
    const [isLoadingSyllabus, setIsLoadingSyllabus] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const showToast = useToast();

    // 1. 组件挂载时获取所有课程
    useEffect(() => {
        const fetchCourses = async () => {
            setIsLoadingCourses(true);
            setError(null);
            try {
                // 查询所有课程，所以分页参数可以简单设置
                const coursePage = await listCourseVOByPage({ current: 1, pageSize: 5 });
                if (coursePage.records && coursePage.records.length > 0) {
                    setCourses(coursePage.records);
                    // 默认选中第一个课程
                    setSelectedCourse(coursePage.records[0]);
                } else {
                    setCourses([]);
                    setSelectedCourse(null);
                    // 如果没有课程，设置一个提示
                    showToast({ message: "您还没有创建任何课程", type: 'info' });
                }
            } catch (e: any) {
                setError('获取课程列表失败，请稍后重试。');
                console.error(e);
                // 错误提示已由 apiClient 拦截器统一处理
            } finally {
                setIsLoadingCourses(false);
            }
        };

        fetchCourses();
    }, [showToast]);

    // 2. 当选中的课程变化时，获取该课程的教学大纲
    useEffect(() => {
        if (!selectedCourse) {
            setSyllabus(null);
            setSelectedNode(null);
            return;
        }

        const fetchSyllabus = async () => {
            setIsLoadingSyllabus(true);
            setError(null);
            try {
                const syllabusData = await getSyllabusByCourseId(selectedCourse.id);
                setSyllabus(syllabusData);
                // 课程切换后，默认选中整个课程作为上下文
                setSelectedNode({
                    id: selectedCourse.id,
                    type: 'course',
                    name: `整个课程: ${selectedCourse.name}`
                });
            } catch (e: any) {
                setError('获取教学大纲失败，请稍后重试。');
                console.error(e);
            } finally {
                setIsLoadingSyllabus(false);
            }
        };

        fetchSyllabus();
    }, [selectedCourse]);

    // 3. 切换课程的回调函数
    const handleSelectCourse = useCallback((course: CourseVO) => {
        if (course.id !== selectedCourse?.id) {
            showToast({ message: `已切换到《${course.name}》课程`, type: 'info' });
            setSelectedCourse(course);
        }
    }, [selectedCourse, showToast]);

    // 4. 选择教学大纲中节点的回调函数
    const handleSelectNode = useCallback((node: SelectedNode) => {
        setSelectedNode(node);
        showToast({ message: `上下文已切换到: ${node.name}`, type: 'info' });
    }, [showToast]);

    // 5. 使用 useMemo 组合加载状态，方便UI使用
    const isLoading = useMemo(() => isLoadingCourses || isLoadingSyllabus, [isLoadingCourses, isLoadingSyllabus]);

    // 6. 返回所有UI需要的状态和方法
    return {
        courses,
        selectedCourse,
        handleSelectCourse,
        syllabus,
        selectedNode,
        handleSelectNode,
        isLoading,
        error,
    };
};