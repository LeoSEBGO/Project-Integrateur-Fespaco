/* FESPACO - JavaScript de la page partenaires refactorisé */
/* Effets modernes avec filtrage des catégories et animations */

(function() {
    'use strict';

    // Configuration
    const CONFIG = {
        ANIMATION_DURATION: 800,
        FILTER_DELAY: 300,
        SCROLL_THRESHOLD: 100
    };

    // Variables globales
    let currentCategory = 'all';
    let isAnimating = false;

    // Initialisation
    document.addEventListener('DOMContentLoaded', function() {
        initializePartnersPage();
    });

    function initializePartnersPage() {
        initializeCategoryFilter();
        initializeScrollAnimations();
        initializePartnerCards();
        initializeTestimonials();
        initializeLevelCards();
        initializePerformanceOptimizations();
    }

    // === Filtrage des catégories ===
    function initializeCategoryFilter() {
        const categoryButtons = document.querySelectorAll('.category-btn');
        const partnerCards = document.querySelectorAll('.partner-card');

        categoryButtons.forEach(button => {
            button.addEventListener('click', function() {
                if (isAnimating) return;
                
                const category = this.getAttribute('data-category');
                if (category === currentCategory) return;

                // Mettre à jour l'état actif
                categoryButtons.forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');

                // Filtrer les cartes
                filterPartners(category, partnerCards);
                currentCategory = category;
            });
        });
    }

    function filterPartners(category, cards) {
        isAnimating = true;

        cards.forEach((card, index) => {
            const cardCategory = card.getAttribute('data-category');
            const shouldShow = category === 'all' || cardCategory === category;

            // Animation de sortie
            if (!shouldShow) {
                card.style.transform = 'scale(0.8)';
                card.style.opacity = '0';
                setTimeout(() => {
                    card.style.display = 'none';
                }, CONFIG.FILTER_DELAY);
            } else {
                // Animation d'entrée
                card.style.display = 'block';
                setTimeout(() => {
                    card.style.transform = 'scale(1)';
                    card.style.opacity = '1';
                }, index * 100);
            }
        });

        // Réinitialiser l'état d'animation
        setTimeout(() => {
            isAnimating = false;
        }, cards.length * 100 + CONFIG.FILTER_DELAY);
    }

    // === Animations au scroll ===
    function initializeScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                    
                    // Animation spéciale pour les statistiques
                    if (entry.target.classList.contains('stat-item')) {
                        animateStatItem(entry.target);
                    }
                }
            });
        }, observerOptions);
        
        // Observer les éléments
        const animatedElements = document.querySelectorAll('.partner-card, .level-card, .testimonial-card, .stat-item');
        animatedElements.forEach(el => observer.observe(el));
    }

    function animateStatItem(statItem) {
        const number = statItem.querySelector('.stat-number');
        const target = parseInt(number.textContent.replace(/\D/g, ''));
        const suffix = number.textContent.replace(/\d/g, '');
        
        let current = 0;
        const increment = target / 50;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            number.textContent = Math.floor(current) + suffix;
        }, 50);
    }

    // === Cartes des partenaires ===
    function initializePartnerCards() {
        const partnerCards = document.querySelectorAll('.partner-card');

        partnerCards.forEach(card => {
            // Effet de hover 3D
            card.addEventListener('mouseenter', function(e) {
                const rect = this.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const rotateX = (y - centerY) / 10;
                const rotateY = (centerX - x) / 10;
                
                this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(20px)`;
            });

            card.addEventListener('mouseleave', function() {
                this.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)';
            });

            // Effet de ripple au clic
            card.addEventListener('click', createRippleEffect);
        });
    }

    // === Témoignages ===
    function initializeTestimonials() {
        const testimonialCards = document.querySelectorAll('.testimonial-card');

        testimonialCards.forEach(card => {
            // Animation d'entrée avec délai
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        setTimeout(() => {
                            entry.target.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
                            entry.target.style.opacity = '1';
                            entry.target.style.transform = 'translateY(0)';
                        }, Math.random() * 500);
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.3 });
            
            observer.observe(card);
        });
    }

    // === Cartes des niveaux ===
    function initializeLevelCards() {
        const levelCards = document.querySelectorAll('.level-card');

        levelCards.forEach((card, index) => {
            // Animation d'entrée séquentielle
            card.style.opacity = '0';
            card.style.transform = 'translateY(50px) scale(0.9)';
            
            setTimeout(() => {
                card.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
                card.style.opacity = '1';
                card.style.transform = 'translateY(0) scale(1)';
            }, index * 200);

            // Effet de hover avec parallaxe
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-10px) scale(1.02)';
                this.style.boxShadow = '0 20px 60px rgba(0, 0, 0, 0.15)';
            });

            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) scale(1)';
                this.style.boxShadow = '0 6px 30px rgba(0, 0, 0, 0.1)';
            });
        });
    }

    // === Optimisations de performance ===
    function initializePerformanceOptimizations() {
        // Lazy loading des images
        const images = document.querySelectorAll('img[data-src]');
        
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));

        // Préchargement des images importantes
        const preloadImages = [
            '../resources/assets/images/partners/Logos-site-web-FESPACO-03.png',
            '../resources/assets/images/partners/Logos-site-web-FESPACO-04.png',
            '../resources/assets/images/partners/Logos-site-web-FESPACO-05.png'
        ];
        
        preloadImages.forEach(src => {
            const link = document.createElement('link');
            link.rel = 'preload';
            link.as = 'image';
            link.href = src;
            document.head.appendChild(link);
        });
    }

    // === Effet de ripple ===
    function createRippleEffect(e) {
        const button = e.currentTarget;
        const ripple = document.createElement('span');
        const rect = button.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
            background: rgba(74, 144, 226, 0.3);
            border-radius: 50%;
            transform: scale(0);
            animation: ripple 0.6s linear;
            pointer-events: none;
            z-index: 1;
        `;
        
        button.style.position = 'relative';
        button.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    }

    // === Utilitaires ===
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

    // === Animations CSS dynamiques ===
    function addDynamicStyles() {
        const style = document.createElement('style');
        style.textContent = `
            @keyframes ripple {
                to {
                    transform: scale(4);
                    opacity: 0;
                }
            }
            
            @keyframes fadeInUp {
                from {
                    opacity: 0;
                    transform: translateY(30px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
            
            @keyframes scaleIn {
                from {
                    opacity: 0;
                    transform: scale(0.9);
                }
                to {
                    opacity: 1;
                    transform: scale(1);
                }
            }
            
            .partner-card,
            .level-card,
            .testimonial-card {
                transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            }
            
            .animate-in {
                animation: fadeInUp 0.6s cubic-bezier(0.4, 0, 0.2, 1) forwards;
            }
            
            .stat-item {
                transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            }
            
            .category-btn {
                transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            }
        `;
        document.head.appendChild(style);
    }

    // Ajouter les styles dynamiques
    addDynamicStyles();

})();

// Gestion responsive
window.addEventListener('resize', () => {
    if (window.innerWidth < 768) {
        // Adapter les cartes pour mobile
        const cards = document.querySelectorAll('.partner-card');
        cards.forEach(card => {
            card.style.margin = '0 0 1rem 0';
        });
    }
});

// Gestion des liens externes
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('partner-link') || e.target.closest('.partner-link')) {
        const link = e.target.closest('.partner-link');
        if (link && link.getAttribute('href') !== '#') {
            // Tracking ou analytics ici si nécessaire
            console.log('Clic sur partenaire:', link.textContent);
        }
    }
}); 