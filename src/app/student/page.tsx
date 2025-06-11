// src/app/student/page.tsx
import React from 'react';
import StudentHeroBanner from '@/components/student/HeroBanner/StudentHeroBanner';
import StudentQuickAccess from '@/components/student/QuickAccess/StudentQuickAccess';
import StudentCreationTools from '@/components/student/CreationTools/StudentCreationTools';
import StudentRecommendations from '@/components/student/Recommendations/StudentRecommendations';

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