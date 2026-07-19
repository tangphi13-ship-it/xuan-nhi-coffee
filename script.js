// ===== DOM Ready =====
document.addEventListener('DOMContentLoaded', function() {
    'use strict';

    // ===== Mobile Menu Toggle =====
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('.nav');
    const navLinks = document.querySelectorAll('.nav ul li a');

    menuToggle.addEventListener('click', function() {
        nav.classList.toggle('active');
        const icon = menuToggle.querySelector('i');
        if (nav.classList.contains('active')) {
            icon.className = 'fas fa-times';
        } else {
            icon.className = 'fas fa-bars';
        }
    });

    // Close menu when clicking a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            nav.classList.remove('active');
            menuToggle.querySelector('i').className = 'fas fa-bars';
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!nav.contains(e.target) && !menuToggle.contains(e.target)) {
            nav.classList.remove('active');
            menuToggle.querySelector('i').className = 'fas fa-bars';
        }
    });

    // ===== Header Scroll Effect =====
    const header = document.querySelector('.header');
    const backToTop = document.querySelector('.back-to-top');

    window.addEventListener('scroll', function() {
        // Header shadow
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        // Back to top button
        if (window.scrollY > 500) {
            backToTop.classList.add('show');
        } else {
            backToTop.classList.remove('show');
        }

        // Active nav link based on scroll position
        updateActiveNavLink();
    });

    // ===== Active Nav Link =====
    function updateActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop - 150;
            const sectionHeight = section.offsetHeight;
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    }

    // ===== Menu Tabs Filtering =====
    const tabBtns = document.querySelectorAll('.tab-btn');
    const menuItems = document.querySelectorAll('.menu-item');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Update active tab
            tabBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');

            const category = this.getAttribute('data-category');

            // Filter menu items
            menuItems.forEach(item => {
                if (category === 'all' || item.getAttribute('data-category') === category) {
                    item.style.display = 'flex';
                    item.style.animation = 'fadeIn 0.5s ease';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });

    // ===== Testimonial Slider =====
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    const dots = document.querySelectorAll('.dot');
    let currentSlide = 0;
    let slideInterval;

    function showSlide(index) {
        testimonialCards.forEach(card => card.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));

        testimonialCards[index].classList.add('active');
        dots[index].classList.add('active');
        currentSlide = index;
    }

    function nextSlide() {
        const next = (currentSlide + 1) % testimonialCards.length;
        showSlide(next);
    }

    function startSlideShow() {
        slideInterval = setInterval(nextSlide, 5000);
    }

    function stopSlideShow() {
        clearInterval(slideInterval);
    }

    // Dot click
    dots.forEach((dot, index) => {
        dot.addEventListener('click', function() {
            stopSlideShow();
            showSlide(index);
            startSlideShow();
        });
    });

    // Start auto slide
    if (testimonialCards.length > 1) {
        startSlideShow();
    }

    // ===== Smooth Scroll for Anchor Links =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerHeight = header.offsetHeight;
                const targetPosition = target.offsetTop - headerHeight;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ===== Scroll Reveal Animation =====
    const revealElements = document.querySelectorAll('.about-content, .bestseller-grid, .menu-grid, .gifts-grid, .contact-content');

    function checkReveal() {
        const windowHeight = window.innerHeight;
        const revealPoint = 100;

        revealElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            if (elementTop < windowHeight - revealPoint) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    }

    // Set initial state
    revealElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(50px)';
        element.style.transition = 'all 0.8s ease';
    });

    window.addEventListener('scroll', checkReveal);
    checkReveal(); // Check on load

    // ===== Form Submission =====
    const contactForm = document.querySelector('.contact-form form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const submitBtn = this.querySelector('.btn-submit');
            const originalText = submitBtn.textContent;
            
            submitBtn.textContent = 'Đang gửi...';
            submitBtn.disabled = true;

            // Simulate sending
            setTimeout(() => {
                submitBtn.textContent = 'Gửi thành công! ✓';
                submitBtn.style.background = 'linear-gradient(135deg, #27ae60, #2ecc71)';
                
                setTimeout(() => {
                    submitBtn.textContent = originalText;
                    submitBtn.style.background = '';
                    submitBtn.disabled = false;
                    contactForm.reset();
                }, 3000);
            }, 1500);
        });
    }

    // ===== Newsletter Form =====
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const input = this.querySelector('input');
            const btn = this.querySelector('button');
            
            if (input.value.trim() !== '') {
                const originalIcon = btn.innerHTML;
                btn.innerHTML = '<i class="fas fa-check"></i>';
                btn.style.background = 'linear-gradient(135deg, #27ae60, #2ecc71)';
                
                setTimeout(() => {
                    btn.innerHTML = originalIcon;
                    btn.style.background = '';
                    input.value = '';
                }, 2000);
            }
        });
    }

    // ===== Product Card Hover Effect =====
    const productCards = document.querySelectorAll('.product-card');
    productCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            const badge = this.querySelector('.product-badge');
            if (badge) {
                badge.style.transform = 'scale(1.1)';
            }
        });
        card.addEventListener('mouseleave', function() {
            const badge = this.querySelector('.product-badge');
            if (badge) {
                badge.style.transform = 'scale(1)';
            }
        });
    });

    // ===== Counter Animation for Stats =====
    function animateCounter(element, target, suffix = '') {
        let current = 0;
        const increment = Math.ceil(target / 60);
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            element.textContent = current + suffix;
        }, 25);
    }

    // Check if stats are visible and animate
    const statNumbers = document.querySelectorAll('.stat-number');
    let statsAnimated = false;

    function checkStats() {
        if (statsAnimated) return;
        
        const stats = document.querySelector('.about-stats');
        if (stats) {
            const statsTop = stats.getBoundingClientRect().top;
            if (statsTop < window.innerHeight - 50) {
                statsAnimated = true;
                // Animate each stat
                const statValues = [
                    { element: statNumbers[0], target: 5, suffix: '+' },
                    { element: statNumbers[1], target: 50, suffix: '+' },
                    { element: statNumbers[2], target: 10, suffix: 'K+' }
                ];
                statValues.forEach(stat => {
                    animateCounter(stat.element, stat.target, stat.suffix);
                });
            }
        }
    }

    window.addEventListener('scroll', checkStats);
    checkStats();
});