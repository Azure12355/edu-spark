'use strict';

document.addEventListener('DOMContentLoaded', () => {
    console.log("Student Notebook DOM loaded");

    // --- 暗色模式逻辑 (与首页一致) ---
    const themeToggleBtn = document.getElementById('theme-toggle-btn');
    const themeIconLight = document.querySelector('.theme-icon-light');
    const themeIconDark = document.querySelector('.theme-icon-dark');
    const htmlElement = document.documentElement;

    function applyTheme(isDark) {
        if (themeIconLight && themeIconDark) {
            themeIconLight.classList.toggle('hidden', isDark);
            themeIconDark.classList.toggle('hidden', !isDark);
        }
        htmlElement.classList.toggle('dark', isDark);
        localStorage.setItem('color-theme', isDark ? 'dark' : 'light');
    }

    let isDarkMode = localStorage.getItem('color-theme') === 'dark' ||
                   (!('color-theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches);
    applyTheme(isDarkMode);

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            isDarkMode = htmlElement.classList.contains('dark');
            applyTheme(!isDarkMode);
        });
    }

    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
        if (!('color-theme' in localStorage)) {
           applyTheme(event.matches);
        }
    });

    // --- 知识库树形菜单交互 ---
    const courseHeaders = document.querySelectorAll('.knowledge-tree .course-header');
    courseHeaders.forEach(header => {
        header.addEventListener('click', (event) => {
            // 防止点击复选框时也触发展开/折叠
            if (event.target.type === 'checkbox') {
                return;
            }

            const materialsList = header.nextElementSibling; // ul.course-materials
            const arrowIcon = header.querySelector('.arrow-icon');

            if (materialsList && materialsList.classList.contains('course-materials')) {
                materialsList.classList.toggle('hidden');
                header.classList.toggle('open'); // 用于控制箭头方向或其他样式
                // arrowIcon.classList.toggle('fa-chevron-right');
                // arrowIcon.classList.toggle('fa-chevron-down');
            }
        });

        // (可选) 处理父复选框与子复选框的联动
        const parentCheckbox = header.querySelector('input[type="checkbox"]');
        const childCheckboxes = header.nextElementSibling?.querySelectorAll('input[type="checkbox"]');

        if (parentCheckbox && childCheckboxes && childCheckboxes.length > 0) {
            parentCheckbox.addEventListener('change', () => {
                childCheckboxes.forEach(child => {
                    child.checked = parentCheckbox.checked;
                });
            });

            childCheckboxes.forEach(child => {
                child.addEventListener('change', () => {
                    const allChecked = Array.from(childCheckboxes).every(c => c.checked);
                    const someChecked = Array.from(childCheckboxes).some(c => c.checked);
                    if (allChecked) {
                        parentCheckbox.checked = true;
                        parentCheckbox.indeterminate = false;
                    } else if (someChecked) {
                        parentCheckbox.checked = false;
                        parentCheckbox.indeterminate = true;
                    } else {
                        parentCheckbox.checked = false;
                        parentCheckbox.indeterminate = false;
                    }
                });
            });
        }
    });

    // --- 其他模拟页面跳转 (如果需要) ---
    // 例如，导航栏中的链接，现在只是刷新页面，未来可以用路由处理
    const navItems = document.querySelectorAll('nav .nav-item');
    navItems.forEach(item => {
        item.addEventListener('click', function(e) {
            // e.preventDefault(); // 如果是SPA，阻止默认跳转
            // console.log(`Navigating to ${this.textContent.trim()}`);
            // 在这里可以添加SPA路由逻辑
            navItems.forEach(i => i.classList.remove('active'));
            this.classList.add('active');
        });
    });

    console.log("Student Notebook UI initialized.");
});