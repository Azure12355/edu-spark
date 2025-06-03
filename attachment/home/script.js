// --- 严格模式 ---
'use strict';

// --- 全局变量与常量 ---
const themeToggleBtn = document.getElementById('theme-toggle');
const themeToggleDarkIcon = document.getElementById('theme-toggle-dark-icon');
const themeToggleLightIcon = document.getElementById('theme-toggle-light-icon');
const htmlElement = document.documentElement;

// --- DOMContentLoaded Wrapper ---
document.addEventListener('DOMContentLoaded', () => {

    console.log("DOM fully loaded and parsed for EduSpark AI");

    initializeDarkMode();
    initializeAOS();
    initializeSmoothScroll();
    initializeGsapAnimations();

}); // End DOMContentLoaded

// --- 暗色模式逻辑 ---
function initializeDarkMode() {
    let isDarkMode = localStorage.getItem('color-theme') === 'dark' ||
                   (!('color-theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches);
    applyTheme(isDarkMode);

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            isDarkMode = htmlElement.classList.contains('dark');
            applyTheme(!isDarkMode);
            console.log(`Theme toggled to: ${!isDarkMode ? 'dark' : 'light'}`);
        });
    } else {
        console.error("Theme toggle button not found!");
    }

    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
        if (!('color-theme' in localStorage)) {
           applyTheme(event.matches);
           console.log(`System theme changed. Applied: ${event.matches ? 'dark' : 'light'}`);
        }
    });
}

function applyTheme(isDark) {
    if (themeToggleLightIcon && themeToggleDarkIcon) {
        themeToggleLightIcon.classList.toggle('hidden', isDark);
        themeToggleDarkIcon.classList.toggle('hidden', !isDark);
    }
    htmlElement.classList.toggle('dark', isDark);
    localStorage.setItem('color-theme', isDark ? 'dark' : 'light');
}

// --- AOS 初始化 ---
function initializeAOS() {
    if (typeof AOS === 'undefined') {
        console.error("AOS library not loaded!");
        return;
    }
    AOS.init({
        duration: 800,
        easing: 'ease-out-cubic',
        once: true,
        offset: 50,
        delay: 0,
    });
    console.log("AOS initialized");
}

// --- 平滑滚动 ---
function initializeSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId && targetId.startsWith('#') && targetId.length > 1) {
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    e.preventDefault();
                    const headerOffset = document.querySelector('header')?.offsetHeight || 64;
                    const elementPosition = targetElement.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                    window.scrollTo({
                         top: offsetPosition,
                         behavior: "smooth"
                    });
                    console.log(`Smooth scrolling to: ${targetId}`);
                } else {
                    console.warn(`Smooth scroll target not found: ${targetId}`);
                }
            }
        });
    });
}

// --- GSAP 动画 ---
function initializeGsapAnimations() {
    if (typeof gsap === 'undefined') {
        console.error("GSAP library not loaded!");
        return;
    }
    console.log("Initializing GSAP animations...");

    const tl = gsap.timeline({ defaults: { ease: "power3.out", duration: 0.8 } });

    tl.fromTo('#hero-badge',
        { opacity: 0, y: -30, scale: 0.8 },
        { opacity: 1, y: 0, scale: 1, duration: 0.6, delay: 0.2 }
      )
      .fromTo('#hero-title-main',
        { opacity: 0, y: 40, skewX: -10 },
        { opacity: 1, y: 0, skewX: 0, duration: 1 },
        "-=0.4"
      )
      .fromTo('#hero-title-sub',
        { opacity: 0, y: 30, scale: 0.9 },
        { opacity: 1, y: 0, scale: 1 },
        "-=0.7"
      )
      .fromTo('#hero-desc',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.7 },
        "-=0.5"
      )
      .fromTo('#hero-buttons > a',
        { opacity: 0, y: 20, scale: 0.8 },
        { opacity: 1, y: 0, scale: 1, stagger: 0.15 },
        "-=0.4"
      );

    console.log("GSAP Hero entrance animation configured.");

    gsap.to("#global-gradient-1 circle", {
        duration: 45,
        rotation: 360,
        scale: 1.15,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        svgOrigin: "500 500",
        transformOrigin: "50% 50%"
    });

    gsap.to("#global-gradient-2 circle", {
        duration: 55,
        rotation: -360,
        scale: 1.2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        svgOrigin: "450 450",
        transformOrigin: "50% 50%"
    });

     console.log("GSAP Global background animations started.");

} // End initializeGsapAnimations