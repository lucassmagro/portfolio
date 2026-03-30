/* ═══════════════════════════════════════════════════
   DARK MODE — Theme Toggle with localStorage
   ═══════════════════════════════════════════════════ */
// Execute immediately to prevent flash
const root = document.documentElement;
const storedTheme = localStorage.getItem('lumina-theme');

if (storedTheme === 'dark') {
    root.setAttribute('data-theme', 'dark');
} else if (storedTheme === 'light') {
    root.setAttribute('data-theme', 'light');
}

document.addEventListener('DOMContentLoaded', () => {
    const initTheme = () => {
        const toggleBtns = document.querySelectorAll('.theme-toggle');

        toggleBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const current = root.getAttribute('data-theme');
                const isDark = current === 'dark' ||
                    (!current && window.matchMedia('(prefers-color-scheme: dark)').matches);

                if (isDark) {
                    root.setAttribute('data-theme', 'light');
                    localStorage.setItem('lumina-theme', 'light');
                } else {
                    root.setAttribute('data-theme', 'dark');
                    localStorage.setItem('lumina-theme', 'dark');
                }
            });
        });
    };

    initTheme();

    /* ═══════════════════════════════════════════════════
       HEADER SCROLL EFFECT
       ═══════════════════════════════════════════════════ */
    const header = document.querySelector('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    /* ═══════════════════════════════════════════════════
       HERO CAROUSEL
       ═══════════════════════════════════════════════════ */
    const initHeroCarousel = () => {
        const slides = document.querySelectorAll('.hero-slide');
        if (slides.length === 0) return;

        let currentSlide = 0;
        const slideInterval = 5000;

        const nextSlide = () => {
            slides[currentSlide].classList.remove('active');
            currentSlide = (currentSlide + 1) % slides.length;
            slides[currentSlide].classList.add('active');
        };

        setInterval(nextSlide, slideInterval);
    };

    initHeroCarousel();

    /* ═══════════════════════════════════════════════════
       MOBILE NAVIGATION TOGGLE
       ═══════════════════════════════════════════════════ */
    const hamburger = document.querySelector('.hamburger');
    const mobileOverlay = document.querySelector('.mobile-nav-overlay');
    const mobileLinks = document.querySelectorAll('.mobile-nav-content a');

    if (hamburger) {
        hamburger.addEventListener('click', () => {
            mobileOverlay.classList.toggle('active');
            hamburger.classList.toggle('active');
            
            const spans = hamburger.querySelectorAll('span');
            if (mobileOverlay.classList.contains('active')) {
                spans[0].style.transform = 'translateY(8px) rotate(45deg)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'translateY(-8px) rotate(-45deg)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
    }

    // Close mobile nav when clicking a link
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileOverlay.classList.remove('active');
            hamburger.classList.remove('active');
            const spans = hamburger.querySelectorAll('span');
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        });
    });

    /* ═══════════════════════════════════════════════════
       BOOKING FORM VALIDATION
       ═══════════════════════════════════════════════════ */
    const bookingForm = document.getElementById('bookingForm');
    if (bookingForm) {
        bookingForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const checkInInput = document.getElementById('checkin');
            const checkOutInput = document.getElementById('checkout');
            const guestsInput = document.getElementById('guests');

            const checkIn = new Date(checkInInput.value);
            const checkOut = new Date(checkOutInput.value);
            const guests = parseInt(guestsInput.value);

            let errors = [];

            if (!checkInInput.value) {
                errors.push("Por favor, selecione uma data de check-in.");
            }
            
            if (!checkOutInput.value) {
                errors.push("Por favor, selecione uma data de check-out.");
            }

            if (checkIn && checkOut && checkOut.getTime() <= checkIn.getTime()) {
                errors.push("A data de check-out deve ser posterior à data de check-in.");
            }

            if (isNaN(guests) || guests < 1) {
                errors.push("O número de hóspedes deve ser pelo menos 1.");
            }

            if (errors.length > 0) {
                alert(errors.join('\n'));
                return false;
            }

            // Success simulation
            window.location.href = 'busca.html';
        });
    }

    /* ═══════════════════════════════════════════════════
       CONTACT FORM VALIDATION
       ═══════════════════════════════════════════════════ */
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert("Sua mensagem foi enviada com sucesso! Entraremos em contato em breve.");
            contactForm.reset();
        });
    }
});
