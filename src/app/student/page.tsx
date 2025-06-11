// src/app/student/page.tsx
import React from 'react';
import StudentHeroBanner from '@/components/student/component/HeroBanner/StudentHeroBanner';
import StudentQuickAccess from '@/components/student/component/QuickAccess/StudentQuickAccess';
import StudentCreationTools from '@/components/student/component/CreationTools/StudentCreationTools';
import StudentRecommendations from '@/components/student/component/Recommendations/StudentRecommendations';

export default function StudentPage() {
    return (
        <div>
            <StudentHeroBanner />
            <StudentQuickAccess />
            <StudentCreationTools />
            <StudentRecommendations />
        </div>
    );
}