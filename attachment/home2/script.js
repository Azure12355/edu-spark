// script.js
document.addEventListener('DOMContentLoaded', function() {

    // Back to top button
    const backToTopButton = document.querySelector('.back-to-top');
    if (backToTopButton) {
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) { // Show button after scrolling 300px
                backToTopButton.style.display = 'flex';
            } else {
                backToTopButton.style.display = 'none';
            }
        });

        backToTopButton.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // Pricing Tabs (Simplified example, assumes only one set of tabs on the page)
    const tabButtons = document.querySelectorAll('.pricing-tabs .tab-btn');
    // const tabContents = document.querySelectorAll('.pricing-tab-content'); // You'd need to add these content divs in HTML

    if (tabButtons.length > 0) {
        tabButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Remove active class from all buttons
                tabButtons.forEach(btn => btn.classList.remove('active'));
                // Add active class to clicked button
                button.classList.add('active');

                const tabId = button.dataset.tab;

                // Hide all tab contents
                // tabContents.forEach(content => content.style.display = 'none');
                
                // Show the target tab content
                // const targetContent = document.getElementById(tabId + '-content'); // e.g., ondemand-content
                // if (targetContent) {
                //     targetContent.style.display = 'block';
                // }
                
                // For this demo, since we only have one table, we'll just log
                console.log("Switched to tab:", tabId); 
                // In a real scenario, you would show/hide different table data or sections.
                // The current HTML has one table, so this part is illustrative.
            });
        });
    }

    // Add smooth scroll for anchor links if any (not strictly in screenshots but good practice)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href.length > 1 && document.querySelector(href)) { // Check if it's a valid selector and not just "#"
                e.preventDefault();
                document.querySelector(href).scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

});