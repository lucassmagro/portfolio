document.addEventListener('DOMContentLoaded', () => {
    // 0. Page Load Fade
    document.body.classList.add('page-load-fade');

    // 1. Dark Mode System
    const toggleButtons = document.querySelectorAll('.dark-mode-toggle');
    const isDarkMode = localStorage.getItem('darkMode') === 'enabled';
    if (isDarkMode) {
        document.body.classList.add('dark-mode');
    }

    toggleButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            document.body.classList.toggle('dark-mode');
            if (document.body.classList.contains('dark-mode')) {
                localStorage.setItem('darkMode', 'enabled');
            } else {
                localStorage.setItem('darkMode', 'disabled');
            }
        });
    });

    // 2. Active Nav Highlight
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    const navLinksList = document.querySelectorAll('.nav-links a, .nav-drawer a');
    navLinksList.forEach(link => {
        const linkPath = link.getAttribute('href').split('/').pop();
        if (linkPath === currentPath) {
            link.classList.add('active');
        }
    });

    // 3. Sticky Navigation
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // 4. Mobile Drawer Toggle
    const hamburger = document.querySelector('.hamburger');
    const navDrawer = document.querySelector('.nav-drawer');

    if (hamburger && navDrawer) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navDrawer.classList.toggle('active');
            document.body.style.overflow = navDrawer.classList.contains('active') ? 'hidden' : '';
        });

        navLinksList.forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navDrawer.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
    }

    // 5. Back to Top Button
    const btnTop = document.createElement('button');
    btnTop.className = 'btn-top';
    btnTop.textContent = '↑ Topo';
    document.body.appendChild(btnTop);

    window.addEventListener('scroll', () => {
        if (window.scrollY > 400) {
            btnTop.classList.add('visible');
        } else {
            btnTop.classList.remove('visible');
        }
    });
    btnTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    });

    // 6. Fade-in animations via Intersection Observer
    const fadeElements = document.querySelectorAll('.fade-in');
    const observerOptions = {
        root: null, 
        rootMargin: '0px',
        threshold: 0.15 
    };

    const fadeObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    fadeElements.forEach(el => fadeObserver.observe(el));
    
    setTimeout(() => {
        fadeElements.forEach(el => {
            const rect = el.getBoundingClientRect();
            if (rect.top < window.innerHeight && rect.bottom >= 0) {
                 el.classList.add('visible');
                 fadeObserver.unobserve(el);
            }
        });
    }, 100);
});
