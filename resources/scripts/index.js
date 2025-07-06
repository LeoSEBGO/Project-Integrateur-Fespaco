/* FESPACO - JavaScript copié du style FESPACO */

(function() {
    'use strict';

    // Configuration
    const CONFIG = {
        SCROLL_THRESHOLD: 50,
        ANIMATION_DURATION: 1000,
        SLIDER_INTERVAL: 5000,
        PARALLAX_FACTOR: 0.5
    };

    // Variables globales
    let isScrolling = false;
    let sliderInterval = null;
    let currentSlide = 0;

    // Initialisation
    document.addEventListener('DOMContentLoaded', function() {
        initNavigation();
        initHeroSlider();
        initScrollAnimations();
        initButtonEffects();
        initParallaxEffect();
        initNewsMarquee();
        initSmoothScrolling();
        initCardHovers();
        initSocialLinks();
        initResponsiveFeatures();
        initAccessibility();
    });

    // Navigation - Style FESPACO
    function initNavigation() {
        const navbar = document.querySelector('.navbar');
        const navbarToggler = document.querySelector('.navbar-toggler');
        const navbarCollapse = document.querySelector('.navbar-collapse');
        
        if (!navbar) return;

        // Effet de scroll sur la navbar
        function handleNavbarScroll() {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            
            if (scrollTop > CONFIG.SCROLL_THRESHOLD) {
                navbar.classList.add('scrolled');
                navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.15)';
            } else {
                navbar.classList.remove('scrolled');
                navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
            }
        }

        // Optimisation scroll avec requestAnimationFrame
        let ticking = false;
        window.addEventListener('scroll', function() {
            if (!ticking) {
                requestAnimationFrame(function() {
                    handleNavbarScroll();
                    ticking = false;
                });
                ticking = true;
            }
        });

        // Gestion du menu mobile
        if (navbarToggler && navbarCollapse) {
            navbarToggler.addEventListener('click', function() {
                navbarCollapse.classList.toggle('show');
                this.setAttribute('aria-expanded', navbarCollapse.classList.contains('show'));
            });

            // Fermer le menu en cliquant sur un lien
            document.querySelectorAll('.nav-link').forEach(link => {
                link.addEventListener('click', function() {
                    if (window.innerWidth < 992) {
                        navbarCollapse.classList.remove('show');
                        navbarToggler.setAttribute('aria-expanded', 'false');
                    }
                });
            });
        }

        // Fermer le menu en cliquant à l'extérieur
        document.addEventListener('click', function(e) {
            if (!navbar.contains(e.target) && navbarCollapse.classList.contains('show')) {
                navbarCollapse.classList.remove('show');
                navbarToggler.setAttribute('aria-expanded', 'false');
            }
        });
    }

    // Slider du Hero - Style FESPACO
    function initHeroSlider() {
        const slides = document.querySelectorAll('.slide');
        const heroSection = document.querySelector('.hero-section');
        
        if (!slides.length || !heroSection) return;

        function showSlide(index) {
            slides.forEach((slide, i) => {
                slide.classList.toggle('active', i === index);
            });
            currentSlide = index;
        }

        function nextSlide() {
            const nextIndex = (currentSlide + 1) % slides.length;
            showSlide(nextIndex);
        }

        // Auto-play du slider
        if (slides.length > 1) {
            sliderInterval = setInterval(nextSlide, CONFIG.SLIDER_INTERVAL);
            
            // Pause au survol
            heroSection.addEventListener('mouseenter', function() {
                clearInterval(sliderInterval);
            });
            
            heroSection.addEventListener('mouseleave', function() {
                sliderInterval = setInterval(nextSlide, CONFIG.SLIDER_INTERVAL);
            });
        }

        // Contrôles tactiles pour mobile
        let touchStartX = 0;
        let touchEndX = 0;
        
        heroSection.addEventListener('touchstart', function(e) {
            touchStartX = e.changedTouches[0].screenX;
        });
        
        heroSection.addEventListener('touchend', function(e) {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        });
        
        function handleSwipe() {
            const swipeThreshold = 50;
            const diff = touchStartX - touchEndX;
            
            if (Math.abs(diff) > swipeThreshold) {
                if (diff > 0) {
                    nextSlide();
                } else {
                    const prevIndex = (currentSlide - 1 + slides.length) % slides.length;
                    showSlide(prevIndex);
                }
            }
        }
    }

    // Animations au scroll - Style FESPACO
    function initScrollAnimations() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                    
                    // Animations spécifiques
                    if (entry.target.classList.contains('theme-icon')) {
                        entry.target.style.animation = 'pulse 2s ease-in-out infinite';
                    }
                    
                    if (entry.target.classList.contains('b2b-icon')) {
                        entry.target.style.animation = 'rotate 10s linear infinite';
                    }
                    
                    if (entry.target.classList.contains('festival-emblem')) {
                        entry.target.style.animation = 'float 3s ease-in-out infinite';
                    }
                    
                    // Animation des cartes
                    if (entry.target.classList.contains('document-card') || 
                        entry.target.classList.contains('country-card') || 
                        entry.target.classList.contains('gallery-item') ||
                        entry.target.classList.contains('news-card')) {
                        entry.target.style.animation = 'slideInUp 0.8s ease-out forwards';
                    }
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        // Observer les éléments
        document.querySelectorAll('.theme-icon, .b2b-icon, .festival-emblem, .document-card, .country-card, .gallery-item, .news-card, .facebook-feed, .social-sidebar').forEach(el => {
            observer.observe(el);
        });
    }

    // Effets des boutons - Style FESPACO
    function initButtonEffects() {
        document.querySelectorAll('.btn').forEach(button => {
            // Effet de ripple au clic
            button.addEventListener('click', function(e) {
                const rect = this.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const ripple = document.createElement('span');
                ripple.className = 'ripple-effect';
                ripple.style.left = x + 'px';
                ripple.style.top = y + 'px';
                
                this.appendChild(ripple);
                
                setTimeout(() => {
                    ripple.remove();
                }, 600);
            });
            
            // Effet de hover
            button.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-2px)';
            });
            
            button.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0)';
            });
        });
    }

    // Effet parallaxe - Style FESPACO
    function initParallaxEffect() {
        const parallaxElements = document.querySelectorAll('.slide-background, .digital-revolution-section::before');
        
        function handleParallax() {
            const scrollTop = window.pageYOffset;
            
            parallaxElements.forEach((element, index) => {
                const speed = CONFIG.PARALLAX_FACTOR * (index + 1);
                const yPos = -(scrollTop * speed);
                
                if (element.style) {
                    element.style.transform = `translateY(${yPos}px)`;
                }
            });
        }

        let ticking = false;
        window.addEventListener('scroll', function() {
            if (!ticking) {
                requestAnimationFrame(function() {
                    handleParallax();
                    ticking = false;
                });
                ticking = true;
            }
        });
    }

    // Marquee des actualités - Style FESPACO
    function initNewsMarquee() {
        const marquee = document.querySelector('marquee');
        
        if (marquee) {
            // Remplacer par une animation CSS moderne
            const text = marquee.textContent;
            marquee.innerHTML = `<span class="marquee-text">${text}</span>`;
            
            // Pause au survol
            marquee.addEventListener('mouseenter', function() {
                this.style.animationPlayState = 'paused';
            });
            
            marquee.addEventListener('mouseleave', function() {
                this.style.animationPlayState = 'running';
            });
        }
    }

    // Scroll fluide - Style FESPACO
    function initSmoothScrolling() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    const navbar = document.querySelector('.navbar');
                    const navbarHeight = navbar ? navbar.offsetHeight : 0;
                    const targetPosition = target.offsetTop - navbarHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    // Hover des cartes - Style FESPACO
    function initCardHovers() {
        const cards = document.querySelectorAll('.document-card, .country-card, .gallery-item, .news-card, .sponsor-logo');
        
        cards.forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-5px)';
                this.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.15)';
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0)';
                this.style.boxShadow = card.classList.contains('sponsor-logo') ? 
                    '0 5px 15px rgba(0, 0, 0, 0.1)' : 
                    'none';
            });
        });
    }

    // Liens sociaux - Style FESPACO
    function initSocialLinks() {
        document.querySelectorAll('.social-link').forEach(link => {
            link.addEventListener('mouseenter', function() {
                this.style.transform = 'scale(1.1)';
                this.style.boxShadow = '0 5px 15px rgba(255, 107, 53, 0.3)';
            });
            
            link.addEventListener('mouseleave', function() {
                this.style.transform = 'scale(1)';
                this.style.boxShadow = 'none';
            });
        });
    }

    // Fonctionnalités responsives - Style FESPACO
    function initResponsiveFeatures() {
        function handleResize() {
            const isMobile = window.innerWidth <= 768;
            
            // Ajuster les animations pour mobile
            if (isMobile) {
                // Réduire les animations coûteuses
                document.querySelectorAll('.festival-emblem, .theme-icon, .b2b-icon').forEach(el => {
                    el.style.animation = 'none';
                });
                
                // Pause du slider automatique sur mobile
                if (sliderInterval) {
                    clearInterval(sliderInterval);
                }
            } else {
                // Réactiver les animations sur desktop
                document.querySelectorAll('.festival-emblem').forEach(el => {
                    el.style.animation = 'float 3s ease-in-out infinite';
                });
                
                document.querySelectorAll('.theme-icon').forEach(el => {
                    el.style.animation = 'pulse 2s ease-in-out infinite';
                });
                
                document.querySelectorAll('.b2b-icon').forEach(el => {
                    el.style.animation = 'rotate 10s linear infinite';
                });
                
                // Réactiver le slider
                if (!sliderInterval && document.querySelectorAll('.slide').length > 1) {
                    sliderInterval = setInterval(nextSlide, CONFIG.SLIDER_INTERVAL);
                }
            }
        }
        
        // Debounce pour éviter les appels excessifs
        let resizeTimer;
        window.addEventListener('resize', function() {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(handleResize, 250);
        });
        
        // Appel initial
        handleResize();
    }

    // Accessibilité - Style FESPACO
    function initAccessibility() {
        // Gestion du focus au clavier
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Tab') {
                document.body.classList.add('keyboard-navigation');
            }
        });
        
        document.addEventListener('mousedown', function() {
            document.body.classList.remove('keyboard-navigation');
        });
        
        // Échap pour fermer les menus
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                const navbarCollapse = document.querySelector('.navbar-collapse.show');
                if (navbarCollapse) {
                    navbarCollapse.classList.remove('show');
                    document.querySelector('.navbar-toggler').setAttribute('aria-expanded', 'false');
                }
            }
        });
        
        // Améliorer l'accessibilité des boutons
        document.querySelectorAll('.btn').forEach(button => {
            if (!button.hasAttribute('aria-label') && !button.textContent.trim()) {
                button.setAttribute('aria-label', 'Bouton d\'action');
            }
        });
    }

    // Gestion des erreurs
    window.addEventListener('error', function(e) {
        console.error('Erreur JavaScript FESPACO:', e.error);
    });

    // Performance monitoring
    if (window.performance && window.performance.mark) {
        window.performance.mark('fespaco-init-start');
        
        window.addEventListener('load', function() {
            window.performance.mark('fespaco-init-end');
            window.performance.measure('fespaco-init', 'fespaco-init-start', 'fespaco-init-end');
            
            const measure = window.performance.getEntriesByName('fespaco-init')[0];
            console.log('Temps d\'initialisation FESPACO:', Math.round(measure.duration) + 'ms');
        });
    }

    // Gestion de la visibilité de la page
    document.addEventListener('visibilitychange', function() {
        if (document.hidden) {
            // Pause des animations coûteuses
            if (sliderInterval) {
                clearInterval(sliderInterval);
            }
        } else {
            // Reprise des animations
            if (document.querySelectorAll('.slide').length > 1) {
                sliderInterval = setInterval(nextSlide, CONFIG.SLIDER_INTERVAL);
            }
        }
    });

    // Utilitaires
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

    // Fonction nextSlide pour le slider
    function nextSlide() {
        const slides = document.querySelectorAll('.slide');
        if (slides.length > 1) {
            const nextIndex = (currentSlide + 1) % slides.length;
            slides.forEach((slide, i) => {
                slide.classList.toggle('active', i === nextIndex);
            });
            currentSlide = nextIndex;
        }
    }

    // Exposition des fonctions globales
    window.FESPACO = {
        version: '2.0.0',
        config: CONFIG,
        nextSlide: nextSlide,
        pauseSlider: function() {
            if (sliderInterval) {
                clearInterval(sliderInterval);
                sliderInterval = null;
            }
        },
        resumeSlider: function() {
            if (!sliderInterval && document.querySelectorAll('.slide').length > 1) {
                sliderInterval = setInterval(nextSlide, CONFIG.SLIDER_INTERVAL);
            }
        }
    };

    // Styles CSS pour les animations
    const styles = `
        .ripple-effect {
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.6);
            transform: scale(0);
            animation: ripple 0.6s linear;
            pointer-events: none;
        }
        
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
        
        @keyframes slideInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        .animate-in {
            animation: slideInUp 0.8s ease-out forwards;
        }
        
        .marquee-text {
            display: inline-block;
            animation: marquee 15s linear infinite;
        }
        
        @keyframes marquee {
            0% { transform: translateX(100%); }
            100% { transform: translateX(-100%); }
        }
        
        .keyboard-navigation *:focus {
            outline: 2px solid #FF6B35;
            outline-offset: 2px;
        }
        
        @media (prefers-reduced-motion: reduce) {
            * {
                animation-duration: 0.01ms !important;
                animation-iteration-count: 1 !important;
                transition-duration: 0.01ms !important;
            }
        }
    `;
    
    // Injection des styles
    const styleSheet = document.createElement('style');
    styleSheet.textContent = styles;
    document.head.appendChild(styleSheet);

})(); 