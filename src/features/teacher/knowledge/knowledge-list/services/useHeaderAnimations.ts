import { useRef } from 'react';
import { useMotionValue, useTransform, useMotionTemplate } from 'framer-motion';

/**
 * @description 管理 Header 动画和交互效果的 UI 逻辑 Hook
 */
export const useHeaderAnimations = () => {
    const containerRef = useRef<HTMLDivElement>(null);

    // 动态辉光效果
    const lightX = useMotionValue(0);
    const lightY = useMotionValue(0);
    const lightGradient = useMotionTemplate`radial-gradient(circle 200px at ${lightX}px ${lightY}px, rgba(255, 255, 255, 0.1), transparent)`;

    const handleLightMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        lightX.set(e.clientX - rect.left);
        lightY.set(e.clientY - rect.top);
    };

    // 视差效果
    const parallaxMouseX = useMotionValue(0);
    const parallaxMouseY = useMotionValue(0);
    const rotateX = useTransform(parallaxMouseY, [-100, 100], [8, -8]); // 反转以符合直觉
    const rotateY = useTransform(parallaxMouseX, [-100, 100], [-8, 8]);

    const handleParallaxMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        parallaxMouseX.set(e.clientX - rect.left - centerX);
        parallaxMouseY.set(e.clientY - rect.top - centerY);
    };

    const handleMouseLeave = () => {
        parallaxMouseX.set(0);
        parallaxMouseY.set(0);
    };

    // Framer Motion 动画变体
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1, delayChildren: 0.2 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100 } }
    };

    return {
        containerRef,
        animationProps: {
            containerVariants,
            itemVariants,
        },
        interactionProps: {
            onMouseMove: (e: React.MouseEvent<HTMLDivElement>) => {
                handleLightMove(e);
                handleParallaxMove(e);
            },
            onMouseLeave: handleMouseLeave,
        },
        styleProps: {
            rotateX,
            rotateY,
            lightGradient,
        }
    };
};