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

    // 4. Hamburger mobile nav
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    hamburger.addEventListener('click', () => {
        const isOpen = hamburger.classList.toggle('active');
        hamburger.setAttribute('aria-expanded', String(isOpen));
        navLinks.classList.toggle('open', isOpen);
    });

    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            hamburger.setAttribute('aria-expanded', 'false');
            navLinks.classList.remove('open');
        });
    });

    // 5. Mobile read-more for about card paragraphs
    if (window.innerWidth <= 768) {
        document.querySelectorAll('.about-card-text p').forEach(p => {
            p.classList.add('clamped');
            const btn = document.createElement('button');
            btn.className = 'read-more-btn';
            btn.textContent = 'Read more';
            btn.addEventListener('click', () => {
                const expanded = p.classList.toggle('expanded');
                p.classList.toggle('clamped', !expanded);
                btn.textContent = expanded ? 'Read less' : 'Read more';
            });
            p.insertAdjacentElement('afterend', btn);
        });
    }

    // 6. Portfolio Tab Interactivity
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetTab = btn.getAttribute('data-tab');
            
            // Remove active classes
            tabButtons.forEach(b => b.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));
            
            // Add active classes
            btn.classList.add('active');
            const activeContent = document.getElementById(`${targetTab}-projects`);
            if (activeContent) {
                activeContent.classList.add('active');
                
                // Trigger a scroll event to force IntersectionObserver check on newly visible elements
                window.dispatchEvent(new Event('scroll'));
            }
        });
    });
});
