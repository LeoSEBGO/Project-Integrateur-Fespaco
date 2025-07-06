(function() {
    'use strict';

    // Configuration
    const CONFIG = {
        SCROLL_THRESHOLD: 50,
        ANIMATION_DURATION: 1000,
        SLIDER_INTERVAL: 2000,
        PARALLAX_FACTOR: 0.5,
        THEME_TRANSITION_DURATION: 1200
    };

    // Variables globales
    let isScrolling = false;
    let sliderInterval = null;
    let currentSlide = 0;
    let isAutoPlaying = true;

    // Thèmes de couleurs pour chaque slide
    const SLIDE_THEMES = [
        { name: 'blue', primary: '#4A90E2', secondary: '#357ABD' },
        { name: 'teal', primary: '#50C878', secondary: '#27AE60' },
        { name: 'coral', primary: '#FF6B6B', secondary: '#E74C3C' },
        { name: 'gold', primary: '#FFD93D', secondary: '#F39C12' },
        { name: 'purple', primary: '#9B59B6', secondary: '#8E44AD' }
    ];

    // Initialisation
    document.addEventListener('DOMContentLoaded', function() {
        initializeHomepage();
    });

    function initializeHomepage() {
        // Initialiser tous les composants
        initializeNavigation();
        initializeSlider();
        initializeStats();
        initializeScrollAnimations();
        initializeParticles();
        initializeScrollEffects();
        initializeInteractions();
        initializeTouch();
        initializeLazyLoading();
        initializePerformanceOptimizations();
        initializeThemeTransitions();
    }

    // === Navigation ===
    function initializeNavigation() {
        const navbar = document.querySelector('.navbar');
        const navLinks = document.querySelectorAll('.nav-link');
        
        // Effet de défilement sur la navbar
        let lastScrollTop = 0;
        const scrollThreshold = 100;
        
        function handleScroll() {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            
            if (scrollTop > scrollThreshold) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
            
            // Cacher/afficher la navbar en fonction du scroll
            if (scrollTop > lastScrollTop && scrollTop > 200) {
                navbar.style.transform = 'translateY(-100%)';
            } else {
                navbar.style.transform = 'translateY(0)';
            }
            
            lastScrollTop = scrollTop;
        }
        
        // Optimisation avec throttle
        const throttledScroll = throttle(handleScroll, 16);
        window.addEventListener('scroll', throttledScroll);
        
        // Navigation fluide
        navLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                if (href && href.startsWith('#')) {
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
    }

    // === Carrousel auto-slidant avec changement de thème ===
    let slides = [];
    let slideInterval;

    // Fonctions globales pour le slider
    window.previousSlide = function() {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        updateSlider();
    };

    window.nextSlide = function() {
        currentSlide = (currentSlide + 1) % slides.length;
        updateSlider();
    };

    window.currentSlide = function(index) {
        currentSlide = index;
        updateSlider();
    };

    function initializeSlider() {
        slides = document.querySelectorAll('.slide');
        const indicators = document.querySelectorAll('.indicator');
        const prevBtn = document.querySelector('.prev-btn');
        const nextBtn = document.querySelector('.next-btn');
        
        if (slides.length === 0) return;
        
        // Attribuer des thèmes aux slides
        assignSlideThemes();
        
        // Démarrer le slider automatique
        startAutoSlide();
        
        // Événements des boutons
        if (prevBtn) prevBtn.addEventListener('click', () => {
            stopAutoSlide();
            window.previousSlide();
            startAutoSlide();
        });
        
        if (nextBtn) nextBtn.addEventListener('click', () => {
            stopAutoSlide();
            window.nextSlide();
            startAutoSlide();
        });
        
        // Événements des indicateurs
        indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => {
                stopAutoSlide();
                currentSlide(index);
                startAutoSlide();
            });
        });
        
        // Pause sur hover
        const slider = document.querySelector('.hero-slider');
        if (slider) {
            slider.addEventListener('mouseenter', () => {
                stopAutoSlide();
                isAutoPlaying = false;
            });
            slider.addEventListener('mouseleave', () => {
                if (!isAutoPlaying) {
                    startAutoSlide();
                    isAutoPlaying = true;
                }
            });
        }
        
        // Gestion du clavier
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') {
                stopAutoSlide();
                window.previousSlide();
                startAutoSlide();
            } else if (e.key === 'ArrowRight') {
                stopAutoSlide();
                window.nextSlide();
                startAutoSlide();
            } else if (e.key === ' ') {
                e.preventDefault();
                if (isAutoPlaying) {
                    stopAutoSlide();
                    isAutoPlaying = false;
                } else {
                    startAutoSlide();
                    isAutoPlaying = true;
                }
            }
        });

        // Gestion du swipe sur mobile
        let touchStartX = 0;
        let touchEndX = 0;

        slider.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        });

        slider.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        });

        function handleSwipe() {
            const swipeThreshold = 50;
            const diff = touchStartX - touchEndX;

            if (Math.abs(diff) > swipeThreshold) {
                if (diff > 0) {
                    // Swipe gauche
                    stopAutoSlide();
                    window.nextSlide();
                    startAutoSlide();
                } else {
                    // Swipe droite
                    stopAutoSlide();
                    window.previousSlide();
                    startAutoSlide();
                }
            }
        }
    }

    function assignSlideThemes() {
        slides.forEach((slide, index) => {
            const theme = SLIDE_THEMES[index % SLIDE_THEMES.length];
            slide.setAttribute('data-theme', theme.name);
            
            // Ajouter des classes CSS pour les animations de thème
            slide.classList.add(`theme-${theme.name}`);
        });
    }



    function updateSlider() {
        // Mettre à jour les slides avec transition fluide
        slides.forEach((slide, index) => {
            if (index === currentSlide) {
                slide.classList.add('active');
                slide.style.zIndex = '2';
            } else {
                slide.classList.remove('active');
                slide.style.zIndex = '1';
            }
        });
        
        // Mettre à jour les indicateurs
        const indicators = document.querySelectorAll('.indicator');
        indicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === currentSlide);
        });
        
        // Animation des contenus avec délai
        const activeSlide = slides[currentSlide];
        if (activeSlide) {
            const content = activeSlide.querySelector('.hero-content');
            if (content) {
                content.style.animation = 'none';
                content.offsetHeight; // Trigger reflow
                content.style.animation = 'fadeInUp 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
            }
        }

        // Mettre à jour le thème global
        updateGlobalTheme();
    }

    function updateGlobalTheme() {
        const currentTheme = SLIDE_THEMES[currentSlide % SLIDE_THEMES.length];
        const root = document.documentElement;
        
        // Transition douce des couleurs
        root.style.setProperty('--current-theme-primary', currentTheme.primary);
        root.style.setProperty('--current-theme-secondary', currentTheme.secondary);
        
        // Ajouter une classe pour les animations de thème
        document.body.className = document.body.className.replace(/theme-\w+/g, '');
        document.body.classList.add(`theme-${currentTheme.name}`);
    }

    function startAutoSlide() {
        if (slideInterval) clearInterval(slideInterval);
        slideInterval = setInterval(window.nextSlide, CONFIG.SLIDER_INTERVAL);
    }

    function stopAutoSlide() {
        if (slideInterval) {
            clearInterval(slideInterval);
            slideInterval = null;
        }
    }

    // === Transitions de thème ===
    function initializeThemeTransitions() {
        // Ajouter des styles CSS dynamiques pour les transitions de thème
        const style = document.createElement('style');
        style.textContent = `
            body {
                transition: background-color ${CONFIG.THEME_TRANSITION_DURATION}ms cubic-bezier(0.4, 0, 0.2, 1);
            }
            
            .theme-blue { --accent-color: #4A90E2; }
            .theme-teal { --accent-color: #50C878; }
            .theme-coral { --accent-color: #FF6B6B; }
            .theme-gold { --accent-color: #FFD93D; }
            .theme-purple { --accent-color: #9B59B6; }
            
            .slide {
                transition: opacity ${CONFIG.THEME_TRANSITION_DURATION}ms cubic-bezier(0.4, 0, 0.2, 1),
                            transform ${CONFIG.THEME_TRANSITION_DURATION}ms cubic-bezier(0.4, 0, 0.2, 1);
            }
        `;
        document.head.appendChild(style);
    }

    // === Statistiques animées ===
    function initializeStats() {
        const statNumbers = document.querySelectorAll('.stat-number');
        const statsSection = document.querySelector('.stats-section');
        
        if (!statsSection || statNumbers.length === 0) return;
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateStats();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(statsSection);
        
        function animateStats() {
            statNumbers.forEach((stat, index) => {
                const target = parseInt(stat.textContent.replace(/\D/g, ''));
                const suffix = stat.textContent.replace(/\d/g, '');
                let current = 0;
                const increment = target / 50;
                const timer = setInterval(() => {
                    current += increment;
                    if (current >= target) {
                        current = target;
                        clearInterval(timer);
                    }
                    stat.textContent = Math.floor(current) + suffix;
                }, 50 + (index * 10));
            });
        }
    }

    // === Animations de défilement ===
    function initializeScrollAnimations() {
        const animatedElements = document.querySelectorAll('.document-card, .news-card, .partner-logo, .social-sidebar, .facebook-feed');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in-up');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });
        
        animatedElements.forEach(el => {
            observer.observe(el);
        });
    }

    // === Système de particules ===
    function initializeParticles() {
        const particlesContainer = document.querySelector('.hero-section');
        if (!particlesContainer) return;
        
        // Créer le canvas pour les particules
        const canvas = document.createElement('canvas');
        canvas.style.position = 'absolute';
        canvas.style.top = '0';
        canvas.style.left = '0';
        canvas.style.width = '100%';
        canvas.style.height = '100%';
        canvas.style.pointerEvents = 'none';
        canvas.style.zIndex = '2';
        canvas.style.opacity = '0.6';
        
        particlesContainer.appendChild(canvas);
        
        const ctx = canvas.getContext('2d');
        const particles = [];
        let mouse = { x: 0, y: 0 };
        
        function resizeCanvas() {
            canvas.width = particlesContainer.offsetWidth;
            canvas.height = particlesContainer.offsetHeight;
        }
        
        function createParticle() {
            return {
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                size: Math.random() * 3 + 1,
                speedX: (Math.random() - 0.5) * 0.5,
                speedY: (Math.random() - 0.5) * 0.5,
                opacity: Math.random() * 0.5 + 0.2
            };
        }
        
        function initParticles() {
            particles.length = 0;
            for (let i = 0; i < 50; i++) {
                particles.push(createParticle());
            }
        }
        
        function updateParticles() {
            particles.forEach((particle, index) => {
                particle.x += particle.speedX;
                particle.y += particle.speedY;
                
                // Interaction avec la souris
                const dx = mouse.x - particle.x;
                const dy = mouse.y - particle.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 100) {
                    particle.x -= dx * 0.01;
                    particle.y -= dy * 0.01;
                }
                
                // Rebond sur les bords
                if (particle.x < 0 || particle.x > canvas.width) particle.speedX *= -1;
                if (particle.y < 0 || particle.y > canvas.height) particle.speedY *= -1;
                
                // Garder dans les limites
                particle.x = Math.max(0, Math.min(canvas.width, particle.x));
                particle.y = Math.max(0, Math.min(canvas.height, particle.y));
            });
        }
        
        function drawParticles() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            particles.forEach(particle => {
                ctx.beginPath();
                ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(255, 193, 7, ${particle.opacity})`;
                ctx.fill();
            });
            
            // Dessiner les connexions
            particles.forEach((particle, i) => {
                particles.slice(i + 1).forEach(otherParticle => {
                    const dx = particle.x - otherParticle.x;
                    const dy = particle.y - otherParticle.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    
                    if (distance < 80) {
                        ctx.beginPath();
                        ctx.moveTo(particle.x, particle.y);
                        ctx.lineTo(otherParticle.x, otherParticle.y);
                        ctx.strokeStyle = `rgba(255, 193, 7, ${0.3 - distance / 300})`;
                        ctx.lineWidth = 0.5;
                        ctx.stroke();
                    }
                });
            });
        }
        
        function animate() {
            updateParticles();
            drawParticles();
            requestAnimationFrame(animate);
        }
        
        // Initialiser
        resizeCanvas();
        initParticles();
        animate();
        
        // Événements
        window.addEventListener('resize', () => {
            resizeCanvas();
            initParticles();
        });
        
        particlesContainer.addEventListener('mousemove', (e) => {
            const rect = particlesContainer.getBoundingClientRect();
            mouse.x = e.clientX - rect.left;
            mouse.y = e.clientY - rect.top;
        });
    }

    // === Effets de défilement ===
    function initializeScrollEffects() {
        const parallaxElements = document.querySelectorAll('.hero-content, .qr-code-container');
        
        function handleParallax() {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            
            parallaxElements.forEach(element => {
                element.style.transform = `translateY(${rate}px)`;
            });
        }
        
        const throttledParallax = throttle(handleParallax, 16);
        window.addEventListener('scroll', throttledParallax);
    }

    // === Interactions ===
    function initializeInteractions() {
        // Boutons avec effet de ripple
        const buttons = document.querySelectorAll('.btn');
        buttons.forEach(button => {
            button.addEventListener('click', createRippleEffect);
        });
        
        // Cartes interactives
        const cards = document.querySelectorAll('.document-card, .news-card, .partner-logo');
        cards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-10px) scale(1.02)';
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(0) scale(1)';
            });
        });
        
        // Logo navbar avec animation
        const navbarLogo = document.querySelector('.navbar-logo');
        if (navbarLogo) {
            navbarLogo.addEventListener('click', () => {
                navbarLogo.style.animation = 'pulse 0.5s ease-in-out';
                setTimeout(() => {
                    navbarLogo.style.animation = '';
                }, 500);
            });
        }
    }

    // === Support tactile ===
    function initializeTouch() {
        const slider = document.querySelector('.hero-slider');
        if (!slider) return;
        
        let startX = 0;
        let startY = 0;
        let endX = 0;
        let endY = 0;
        
        slider.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            startY = e.touches[0].clientY;
        });
        
        slider.addEventListener('touchmove', (e) => {
            e.preventDefault(); // Empêcher le scroll
        });
        
        slider.addEventListener('touchend', (e) => {
            endX = e.changedTouches[0].clientX;
            endY = e.changedTouches[0].clientY;
            
            const deltaX = endX - startX;
            const deltaY = endY - startY;
            
            // Détecter le swipe horizontal
            if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 50) {
                stopAutoSlide();
                
                if (deltaX > 0) {
                    previousSlide();
                } else {
                    nextSlide();
                }
                
                startAutoSlide();
            }
        });
    }

    // === Chargement différé ===
    function initializeLazyLoading() {
        const images = document.querySelectorAll('img[data-src]');
        
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        images.forEach(img => {
            imageObserver.observe(img);
        });
    }

    // === Optimisations de performance ===
    function initializePerformanceOptimizations() {
        // Preload des images du slider
        const slideBackgrounds = document.querySelectorAll('.slide-background');
        slideBackgrounds.forEach(bg => {
            const imageUrl = bg.style.backgroundImage.match(/url\(['"]?(.*?)['"]?\)/);
            if (imageUrl) {
                const img = new Image();
                img.src = imageUrl[1];
            }
        });
        
        // Optimisation des événements de resize
        const resizeObserver = new ResizeObserver(entries => {
            entries.forEach(entry => {
                if (entry.target === document.body) {
                    // Recalculer les dimensions si nécessaire
                    const slider = document.querySelector('.hero-slider');
                    if (slider) {
                        const canvas = slider.querySelector('canvas');
                        if (canvas) {
                            canvas.width = slider.offsetWidth;
                            canvas.height = slider.offsetHeight;
                        }
                    }
                }
            });
        });
        
        resizeObserver.observe(document.body);
    }

    // === Fonctions utilitaires ===
    function throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }

    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    function createRippleEffect(e) {
        const button = e.currentTarget;
        const ripple = document.createElement('span');
        const rect = button.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');
        
        const existingRipple = button.querySelector('.ripple');
        if (existingRipple) {
            existingRipple.remove();
        }
        
        button.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    }

    // === Fonctions globales pour les contrôles du slider ===
    window.nextSlide = nextSlide;
    window.previousSlide = previousSlide;
    window.currentSlide = (index) => goToSlide(index - 1);

    // === Gestion des erreurs ===
    window.addEventListener('error', (e) => {
        console.error('Erreur JavaScript:', e.error);
    });

    // === Nettoyage ===
    window.addEventListener('beforeunload', () => {
        stopAutoSlide();
    });

    // === Styles CSS pour les animations ===
    const style = document.createElement('style');
    style.textContent = `
        .navbar.scrolled {
            background: rgba(15, 15, 15, 0.98) !important;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
        }
        
        .ripple {
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.3);
            transform: scale(0);
            animation: ripple-animation 0.6s linear;
            pointer-events: none;
        }
        
        @keyframes ripple-animation {
            to {
                transform: scale(2);
                opacity: 0;
            }
        }
        
        .lazy {
            opacity: 0;
            transition: opacity 0.3s;
        }
        
        .lazy.loaded {
            opacity: 1;
        }
        
        .hero-slider canvas {
            pointer-events: none;
        }
        
        @media (prefers-reduced-motion: reduce) {
            .hero-content,
            .qr-code-container {
                transform: none !important;
            }
            
            .hero-slider canvas {
                display: none;
            }
        }
    `;
    document.head.appendChild(style);

})(); 