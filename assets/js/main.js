// Hadi CCTV Website - Main JavaScript

// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close menu when clicking on a link
        const navLinks = navMenu.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            const isClickInsideNav = navMenu.contains(event.target);
            const isClickOnHamburger = hamburger.contains(event.target);
            
            if (!isClickInsideNav && !isClickOnHamburger && navMenu.classList.contains('active')) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    }

    // Hero Slider
    const slides = document.querySelectorAll('.hero-slide');
    const dots = document.querySelectorAll('.hero-dot');
    const prevBtn = document.getElementById('heroPrev');
    const nextBtn = document.getElementById('heroNext');
    let currentSlide = 0;
    const SLIDE_INTERVAL = 6500;
    let sliderTimer;

    function showSlide(index) {
        if (!slides.length) return;
        slides.forEach((slide, i) => {
            slide.classList.toggle('active', i === index);
        });
        if (dots.length) {
            dots.forEach((dot, i) => {
                dot.classList.toggle('active', i === index);
            });
        }
        currentSlide = index;
    }

    function nextSlide() {
        const nextIndex = (currentSlide + 1) % slides.length;
        showSlide(nextIndex);
    }

    function startSlider() {
        if (sliderTimer) clearInterval(sliderTimer);
        if (slides.length > 1) {
            sliderTimer = setInterval(nextSlide, SLIDE_INTERVAL);
        }
    }

    if (slides.length) {
        startSlider();
    }

    if (dots.length) {
        dots.forEach(dot => {
            dot.addEventListener('click', () => {
                const target = parseInt(dot.getAttribute('data-target'), 10);
                if (!Number.isNaN(target)) {
                    showSlide(target);
                    startSlider();
                }
            });
        });
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            const prevIndex = (currentSlide - 1 + slides.length) % slides.length;
            showSlide(prevIndex);
            startSlider();
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            const nextIndex = (currentSlide + 1) % slides.length;
            showSlide(nextIndex);
            startSlider();
        });
    }

    // Contact Form Handling
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const phone = document.getElementById('phone').value;
            const service = document.getElementById('service').value;
            const location = document.getElementById('location').value;
            const message = document.getElementById('message').value;
            
            const serviceSelect = document.getElementById('service');
            const serviceLabel = serviceSelect && serviceSelect.value
                ? serviceSelect.options[serviceSelect.selectedIndex].text
                : '';

            let whatsappMessage = `Hello Hadi CCTV! I would like a free quote.\n\n`;
            whatsappMessage += `Name: ${name}\n`;
            whatsappMessage += `Phone: ${phone}\n`;
            if (serviceLabel) whatsappMessage += `Service: ${serviceLabel}\n`;
            if (location) whatsappMessage += `Location: ${location}\n`;
            whatsappMessage += `Message: ${message}`;
            
            // Encode message for URL
            const encodedMessage = encodeURIComponent(whatsappMessage);
            const whatsappURL = `https://wa.me/923265613640?text=${encodedMessage}`;
            
            // Open WhatsApp
            window.open(whatsappURL, '_blank');
            
            // Show success message
            alert('Opening WhatsApp... Please send your message there!');
            
            // Optional: Reset form
            // contactForm.reset();
        });
    }

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href !== '#' && href.length > 1) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });

    // Add scroll effect to header
    let lastScroll = 0;
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.15)';
        } else {
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        }
        
        lastScroll = currentScroll;
    });

    // Animate elements on scroll (simple fade-in with optional delays)
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const delay = entry.target.getAttribute('data-animate-delay') || '0';
                entry.target.style.transitionDelay = `${delay}ms`;
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.service-card, .project-card, .project-card-premium, .feature-item, .testimonial-card, .testimonial-card-premium, .camera-type-card, .why-item, .why-choose-header, .solution-card, .solution-pill, .solutions-header, .solutions-column, .feature-benefit-card, .features-benefits-header, .service-area-column, .area-group, .service-areas-header, .service-areas-footer, .services-filter-bar, .services-cta-banner, .testimonials-premium-header, .testimonials-rating-panel-wrap, .testimonials-premium-grid, .testimonials-premium-cta, .faq-premium-sidebar, .faq-accordion, .about-hero-premium-inner, .about-hero-stats, .about-intro-premium-text, .about-intro-premium-visual, .about-mv-card, .about-svc-card, .about-why-card, .about-stat-item, .about-project-card, .about-area-col, .about-value-item, .about-team-card, .about-cta-inner, .about-section-header, .services-hero-inner, .projects-hero-inner, .projects-intro, .projects-featured-locations, .projects-expertise-card, .projects-areas-group, .projects-areas-note, .contact-hero-inner, .contact-quick-card, .contact-main-header, .contact-info-card, .contact-areas-box, .contact-social-box, .contact-premium-form-wrap, .contact-trust-item, .contact-map-header, .contact-map-frame, .sp-details-header, .sp-detail-item, [data-animate]').forEach(el => {
        const animationType = el.getAttribute('data-animate') || 'fade-up';
        el.classList.add('will-animate', `anim-${animationType}`);
        observer.observe(el);
    });

    // Counter Animation for Experience Numbers
    function animateCounter(element) {
        const target = parseInt(element.getAttribute('data-count'));
        const suffix = element.getAttribute('data-suffix') || '';
        const duration = 2000; // 2 seconds
        const increment = target / (duration / 16); // 60fps
        let current = 0;

        const updateCounter = () => {
            current += increment;
            if (current < target) {
                element.textContent = Math.floor(current) + suffix;
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = target + suffix;
            }
        };

        updateCounter();
    }

    // Observer for counter elements
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
                entry.target.classList.add('counted');
                animateCounter(entry.target);
                counterObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.5
    });

    // Observe all experience number elements
    document.querySelectorAll('.experience-number').forEach(el => {
        counterObserver.observe(el);
    });

    // Services section category filter (homepage + services page)
    const serviceCards = document.querySelectorAll('#servicesGrid .service-card');
    const serviceDetailItems = document.querySelectorAll('#servicesDetailsList .sp-detail-item');

    function applyServiceFilter(filter) {
        const toggleItems = (items) => {
            items.forEach(item => {
                const category = item.getAttribute('data-category');
                const show = filter === 'all' || category === filter;
                item.classList.remove('is-hidden', 'is-filtering');
                if (!show) {
                    item.classList.add('is-hidden');
                } else if (!item.classList.contains('animate-in')) {
                    item.classList.add('will-animate', 'anim-fade-up');
                    requestAnimationFrame(() => item.classList.add('animate-in'));
                }
            });
        };
        if (serviceCards.length) toggleItems(serviceCards);
        if (serviceDetailItems.length) toggleItems(serviceDetailItems);
    }

    const servicesFilterBar = document.querySelector('#services-overview .services-filter-bar, .services-showcase .services-filter-bar:not(.projects-filter-bar)');
    const scopedServiceFilterBtns = servicesFilterBar ? servicesFilterBar.querySelectorAll('.services-filter-btn') : [];

    if (scopedServiceFilterBtns.length && (serviceCards.length || serviceDetailItems.length)) {
        scopedServiceFilterBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                const filter = this.getAttribute('data-filter');
                scopedServiceFilterBtns.forEach(b => {
                    b.classList.remove('active');
                    b.setAttribute('aria-selected', 'false');
                });
                this.classList.add('active');
                this.setAttribute('aria-selected', 'true');
                applyServiceFilter(filter);
            });
        });
    }

    // Projects page category filter
    const projectsFilterBar = document.querySelector('.projects-filter-bar');
    const projectCards = document.querySelectorAll('#projectsGrid .project-card-premium');

    function applyProjectFilter(filter) {
        projectCards.forEach(card => {
            const category = card.getAttribute('data-category');
            const show = filter === 'all' || category === filter;
            card.classList.remove('is-hidden');
            if (!show) {
                card.classList.add('is-hidden');
            } else if (!card.classList.contains('animate-in')) {
                card.classList.add('will-animate', 'anim-fade-up');
                requestAnimationFrame(() => card.classList.add('animate-in'));
            }
        });
    }

    if (projectsFilterBar && projectCards.length) {
        const projectFilterBtns = projectsFilterBar.querySelectorAll('.services-filter-btn');
        projectFilterBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                const filter = this.getAttribute('data-filter');
                projectFilterBtns.forEach(b => {
                    b.classList.remove('active');
                    b.setAttribute('aria-selected', 'false');
                });
                this.classList.add('active');
                this.setAttribute('aria-selected', 'true');
                applyProjectFilter(filter);
            });
        });
    }

    // FAQ Accordion
    const faqItems = document.querySelectorAll('.faq-premium .faq-item');

    function setFaqOpen(item, open) {
        const answer = item.querySelector('.faq-answer');
        const btn = item.querySelector('.faq-question');
        if (!answer) return;

        if (open) {
            item.classList.add('active');
            if (btn) btn.setAttribute('aria-expanded', 'true');
            answer.style.maxHeight = answer.scrollHeight + 'px';
        } else {
            item.classList.remove('active');
            if (btn) btn.setAttribute('aria-expanded', 'false');
            answer.style.maxHeight = '0';
        }
    }

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        if (!question) return;

        question.addEventListener('click', function() {
            const isActive = item.classList.contains('active');

            faqItems.forEach(faqItem => setFaqOpen(faqItem, false));

            if (!isActive) {
                setFaqOpen(item, true);
            }
        });
    });
});

// Add loading animation
window.addEventListener('load', function() {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.3s';
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

