document.addEventListener('DOMContentLoaded', () => {
    // 1. Resource-Efficient Scroll Reveal Animations (Intersection Observer)
    const revealElements = document.querySelectorAll('.reveal');
    
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            // Add 'active' class when element comes into view
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                // Optional: Stop observing once revealed to save resources
                // observer.unobserve(entry.target); 
            }
        });
    }, {
        root: null,
        rootMargin: '0px',
        threshold: 0.15 // Trigger when 15% of the element is visible
    });

    revealElements.forEach(el => {
        revealObserver.observe(el);
    });

    // 2. Progressive Disclosure Accordion Logic
    const accordionHeaders = document.querySelectorAll('.accordion-header');

    accordionHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const isExpanded = header.getAttribute('aria-expanded') === 'true';
            const content = header.nextElementSibling;
            
            // Close all other open accordions (optional, but keeps UI clean)
            accordionHeaders.forEach(otherHeader => {
                if (otherHeader !== header && otherHeader.getAttribute('aria-expanded') === 'true') {
                    otherHeader.setAttribute('aria-expanded', 'false');
                    const otherContent = otherHeader.nextElementSibling;
                    otherContent.style.maxHeight = null;
                }
            });

            // Toggle current accordion
            if (isExpanded) {
                header.setAttribute('aria-expanded', 'false');
                content.style.maxHeight = null;
            } else {
                header.setAttribute('aria-expanded', 'true');
                // Calculate actual height needed for smooth animation
                content.style.maxHeight = content.scrollHeight + "px";
            }
        });
    });

    // 3. Navbar Hide/Show on Scroll (Resource efficient using requestAnimationFrame pattern if needed, but simple scroll event is fine for basic use)
    let lastScrollTop = 0;
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', () => {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            // Scrolling down
            navbar.classList.add('hidden');
        } else {
            // Scrolling up
            navbar.classList.remove('hidden');
        }
        lastScrollTop = scrollTop;
    }, { passive: true }); // Passive listener for better scrolling performance
});
