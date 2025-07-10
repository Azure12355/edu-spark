// src/app/(home)/layout.tsx
"use client"
import Header from "@/shared/components/common/Header/Header";
import React from "react";
import Footer from "@/features/home/layout/Footer/Footer";
import './home.css'
import {usePathname} from "next/navigation";

// 注意：这里不再有 <html>, <head>, <body> 标签
export default function HomeLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {

    const pathname = usePathname();

    const navLinks = [
        {name: '首页', href: '/home'},
        {name: '对话历史', href: '/history'},
        {name: '课程智能体', href: '/assistant'},
        {name: '排行榜', href: '/leaderboard'},
        {name: '共享资源', href: '/shared-resources'},
    ];

    const isHome = pathname === '/home';
    const isAssistant = pathname === '/assistant';
    const showFullContainer = pathname === '/home' || '/assistant';

    return (
        <div className="layout-wrapper">
            <Header navLinks={navLinks} name={"首页"}/>
            {isAssistant ?
                <main className={"main-full"}>
                    {children}
                </main> :
                <main className={`"main-container ${isHome ? '': 'mainContent'}`}> {children} </main>
            }
        </div>
    );
}