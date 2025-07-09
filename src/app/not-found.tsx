// [!file src/app/not-found.tsx]
"use client"; // not-found 文件在App Router中可以是客户端组件

import React from 'react';
import UnderConstruction from '@/shared/components/common/UnderConstruction/UnderConstruction';
import { useRouter } from 'next/navigation'; // 用于实现返回按钮

// 为了让返回按钮更通用，我们创建一个带按钮的包装组件
const NotFoundPage = () => {
    const router = useRouter();

    const buttonStyle: React.CSSProperties = {
        marginTop: '24px',
        padding: '12px 24px',
        fontSize: '16px',
        fontWeight: 500,
        color: 'white',
        backgroundColor: '#3b82f6',
        border: 'none',
        borderRadius: '8px',
        cursor: 'pointer',
        display: 'inline-flex',
        alignItems: 'center',
        gap: '8px',
        transition: 'all 0.2s ease',
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
            <UnderConstruction
                pageTitle="页面不存在或正在建设中"
                featureName="您访问的页面"
            />
            <button
                onClick={() => router.back()} // 使用 router.back() 返回上一页
                style={buttonStyle}
                onMouseOver={(e) => (e.currentTarget.style.opacity = '0.9')}
                onMouseOut={(e) => (e.currentTarget.style.opacity = '1')}
            >
                <i className="fas fa-arrow-left"></i>
                返回上一页
            </button>
        </div>
    );
};

export default NotFoundPage;