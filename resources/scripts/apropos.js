/* FESPACO - JavaScript pour la page À propos */

class FespacoAboutPage {
    constructor() {
        this.init();
    }

    init() {
        this.setupTimeline();
        this.setupMissionCards();
        this.setupVisionCards();
        this.setupScrollAnimations();
        this.setupStatsCounter();
        this.setupParallax();
    }

    // Configuration de la timeline
    setupTimeline() {
        const timelineItems = document.querySelectorAll('.timeline-item');
        
        // Observer pour animer les éléments de la timeline
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate');
                }
            });
        }, {
            threshold: 0.3,
            rootMargin: '0px 0px -50px 0px'
        });

        timelineItems.forEach(item => {
            observer.observe(item);
        });

        // Interaction avec les éléments de la timeline
        timelineItems.forEach(item => {
            const content = item.querySelector('.timeline-content');
            const year = item.querySelector('.timeline-year');
            
            item.addEventListener('mouseenter', () => {
                year.style.transform = 'scale(1.2) rotateY(360deg)';
                year.style.background = 'linear-gradient(135deg, #FFD700 0%, #D4AF37 100%)';
            });

            item.addEventListener('mouseleave', () => {
                year.style.transform = 'scale(1) rotateY(0deg)';
                year.style.background = 'var(--gradient-gold)';
            });

            // Effet de clic pour expansion
            content.addEventListener('click', () => {
                this.expandTimelineItem(item);
            });
        });
    }

    // Expansion d'un élément de timeline
    expandTimelineItem(item) {
        const content = item.querySelector('.timeline-content');
        const isExpanded = content.classList.contains('expanded');
        
        // Fermer les autres éléments
        document.querySelectorAll('.timeline-content.expanded').forEach(el => {
            if (el !== content) {
                el.classList.remove('expanded');
            }
        });

        // Basculer l'état de l'élément courant
        if (isExpanded) {
            content.classList.remove('expanded');
        } else {
            content.classList.add('expanded');
            
            // Créer du contenu supplémentaire s'il n'existe pas
            if (!content.querySelector('.expanded-content')) {
                this.createExpandedContent(content, item);
            }
        }
    }

    // Créer du contenu élargi pour la timeline
    createExpandedContent(content, item) {
        const expandedDiv = document.createElement('div');
        expandedDiv.className = 'expanded-content';
        expandedDiv.style.cssText = `
            margin-top: 1rem;
            padding-top: 1rem;
            border-top: 1px solid rgba(212, 175, 55, 0.3);
            opacity: 0;
            transform: translateY(10px);
            transition: all 0.3s ease;
        `;

        // Contenu par défaut selon l'année
        const year = item.querySelector('.timeline-year').textContent;
        const additionalContent = this.getAdditionalContentForYear(year);
        
        expandedDiv.innerHTML = additionalContent;
        content.appendChild(expandedDiv);

        // Animer l'apparition
        setTimeout(() => {
            expandedDiv.style.opacity = '1';
            expandedDiv.style.transform = 'translateY(0)';
        }, 100);
    }

    // Contenu supplémentaire pour chaque année
    getAdditionalContentForYear(year) {
        const contents = {
            '1969': `
                <div class="expanded-details">
                    <h5 style="color: var(--primary-gold); margin-bottom: 0.5rem;">Détails de la création</h5>
                    <p style="color: rgba(255, 255, 255, 0.8); margin-bottom: 1rem;">
                        Le FESPACO a été créé dans un contexte post-colonial, visant à promouvoir 
                        l'identité culturelle africaine à travers le cinéma.
                    </p>
                    <div class="timeline-metrics">
                        <span class="metric">📽️ 5 films présentés</span>
                        <span class="metric">🌍 8 pays participants</span>
                        <span class="metric">👥 500 spectateurs</span>
                    </div>
                </div>
            `,
            '1972': `
                <div class="expanded-details">
                    <h5 style="color: var(--primary-gold); margin-bottom: 0.5rem;">Expansion continentale</h5>
                    <p style="color: rgba(255, 255, 255, 0.8); margin-bottom: 1rem;">
                        Le festival s'ouvre aux productions de toute l'Afrique, renforçant 
                        son statut de plateforme panafricaine.
                    </p>
                    <div class="timeline-metrics">
                        <span class="metric">📽️ 23 films présentés</span>
                        <span class="metric">🌍 15 pays participants</span>
                        <span class="metric">👥 2000 spectateurs</span>
                    </div>
                </div>
            `,
            '1979': `
                <div class="expanded-details">
                    <h5 style="color: var(--primary-gold); margin-bottom: 0.5rem;">Reconnaissance internationale</h5>
                    <p style="color: rgba(255, 255, 255, 0.8); margin-bottom: 1rem;">
                        Création de l'Étalon de Yennenga, le prix le plus prestigieux 
                        du cinéma africain.
                    </p>
                    <div class="timeline-metrics">
                        <span class="metric">🏆 Premier Étalon d'or</span>
                        <span class="metric">📺 Couverture médiatique</span>
                        <span class="metric">🎬 Industrie reconnue</span>
                    </div>
                </div>
            `
        };

        return contents[year] || `
            <div class="expanded-details">
                <p style="color: rgba(255, 255, 255, 0.8);">
                    Une année importante dans l'histoire du FESPACO avec de nombreuses 
                    innovations et développements significatifs.
                </p>
            </div>
        `;
    }

    // Configuration des cartes de mission
    setupMissionCards() {
        const missionCard = document.querySelector('.mission-card-3d');
        const missionItems = document.querySelectorAll('.mission-item');
        
        // Effet de survol sur la carte principale
        if (missionCard) {
            missionCard.addEventListener('mouseenter', () => {
                missionCard.style.transform = 'translateY(-15px) rotateX(10deg) rotateY(10deg)';
            });

            missionCard.addEventListener('mouseleave', () => {
                missionCard.style.transform = 'translateY(0) rotateX(0deg) rotateY(0deg)';
            });
        }

        // Animation des éléments de mission
        missionItems.forEach((item, index) => {
            item.style.animationDelay = `${index * 0.2}s`;
            
            item.addEventListener('click', () => {
                // Rotation de l'icône
                const icon = item.querySelector('i');
                if (icon) {
                    icon.style.transform = 'scale(1.3) rotateY(720deg)';
                    setTimeout(() => {
                        icon.style.transform = 'scale(1) rotateY(0deg)';
                    }, 600);
                }
            });
        });
    }

    // Configuration des cartes de vision
    setupVisionCards() {
        const visionCards = document.querySelectorAll('.vision-card');
        
        visionCards.forEach((card, index) => {
            // Délai d'animation en cascade
            card.style.animationDelay = `${index * 0.15}s`;
            
            // Effet de survol amélioré
            card.addEventListener('mouseenter', () => {
                const icon = card.querySelector('i');
                if (icon) {
                    icon.style.transform = 'scale(1.2) rotateY(360deg)';
                    icon.style.color = '#FFD700';
                }
            });

            card.addEventListener('mouseleave', () => {
                const icon = card.querySelector('i');
                if (icon) {
                    icon.style.transform = 'scale(1) rotateY(0deg)';
                    icon.style.color = 'var(--primary-gold)';
                }
            });

            // Effet de clic
            card.addEventListener('click', () => {
                card.style.transform = 'translateY(-15px) rotateX(5deg) rotateY(5deg) scale(1.02)';
                setTimeout(() => {
                    card.style.transform = '';
                }, 300);
            });
        });
    }

    // Animations au scroll
    setupScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate');
                    
                    // Animation spéciale pour les sections
                    if (entry.target.classList.contains('vision-section')) {
                        this.animateVisionSection(entry.target);
                    }
                }
            });
        }, observerOptions);

        // Observer les sections
        document.querySelectorAll('.fade-in-up, .timeline-3d, .vision-section').forEach(el => {
            observer.observe(el);
        });
    }

    // Animation de la section vision
    animateVisionSection(section) {
        const cards = section.querySelectorAll('.vision-card');
        
        cards.forEach((card, index) => {
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, index * 100);
        });
    }

    // Compteur animé pour les statistiques
    setupStatsCounter() {
        const statsSection = document.querySelector('.stats-about');
        if (!statsSection) return;

        const stats = document.querySelectorAll('.stats-about .stat-item h3');
        let hasAnimated = false;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !hasAnimated) {
                    hasAnimated = true;
                    stats.forEach(stat => {
                        this.animateCounter(stat);
                    });
                }
            });
        }, { threshold: 0.5 });

        if (statsSection) {
            observer.observe(statsSection);
        }
    }

    // Animation du compteur
    animateCounter(element) {
        const originalText = element.textContent;
        const number = parseInt(originalText.replace(/\D/g, ''));
        
        if (isNaN(number)) return;
        
        const duration = 2000;
        const step = number / (duration / 16);
        let current = 0;

        const timer = setInterval(() => {
            current += step;
            if (current >= number) {
                current = number;
                clearInterval(timer);
            }
            
            // Conserver le suffixe original
            let suffix = '';
            if (originalText.includes('+')) suffix = '+';
            if (originalText.includes('K')) suffix = 'K';
            if (originalText.includes('M')) suffix = 'M';
            
            element.textContent = Math.floor(current) + suffix;
        }, 16);
    }

    // Effet parallax léger
    setupParallax() {
        let ticking = false;

        function updateParallax() {
            const scrollTop = window.pageYOffset;

            // Parallax sur les sections
            document.querySelectorAll('.hero-section-about').forEach(section => {
                const yPos = -(scrollTop * 0.3);
                section.style.transform = `translateY(${yPos}px)`;
            });

            // Parallax sur les éléments de la timeline
            document.querySelectorAll('.timeline-year').forEach((year, index) => {
                const yPos = -(scrollTop * 0.05 * (index + 1));
                year.style.transform = `translateY(${yPos}px)`;
            });

            ticking = false;
        }

        function requestTick() {
            if (!ticking) {
                requestAnimationFrame(updateParallax);
                ticking = true;
            }
        }

        window.addEventListener('scroll', requestTick);
    }

    // Gestion des gestes tactiles
    setupTouchGestures() {
        const timelineItems = document.querySelectorAll('.timeline-item');
        
        timelineItems.forEach(item => {
            let startX = 0;
            let startY = 0;
            
            item.addEventListener('touchstart', (e) => {
                startX = e.touches[0].clientX;
                startY = e.touches[0].clientY;
            });

            item.addEventListener('touchend', (e) => {
                const endX = e.changedTouches[0].clientX;
                const endY = e.changedTouches[0].clientY;
                
                const diffX = Math.abs(endX - startX);
                const diffY = Math.abs(endY - startY);
                
                // Swipe horizontal pour expandre/rétracter
                if (diffX > diffY && diffX > 50) {
                    this.expandTimelineItem(item);
                }
            });
        });
    }

    // Utilitaires
    debounce(func, wait) {
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
}

// Initialisation
document.addEventListener('DOMContentLoaded', () => {
    new FespacoAboutPage();
});

// Gestion responsive
window.addEventListener('resize', () => {
    // Réajustement pour mobile
    if (window.innerWidth < 768) {
        document.querySelectorAll('.timeline-item').forEach(item => {
            item.style.paddingLeft = '60px';
        });
    } else {
        document.querySelectorAll('.timeline-item').forEach(item => {
            item.style.paddingLeft = '80px';
        });
    }
});

// Ajout des styles CSS pour les éléments expandus
const expandedStyles = `
    .timeline-content.expanded {
        max-height: none;
        overflow: visible;
    }
    
    .timeline-metrics {
        display: flex;
        flex-wrap: wrap;
        gap: 0.5rem;
    }
    
    .metric {
        background: rgba(212, 175, 55, 0.2);
        color: var(--primary-gold);
        padding: 0.25rem 0.5rem;
        border-radius: 0.25rem;
        font-size: 0.8rem;
        font-weight: 500;
    }
    
    @media (max-width: 768px) {
        .timeline-metrics {
            flex-direction: column;
        }
    }
`;

// Injection des styles
const styleSheet = document.createElement('style');
styleSheet.textContent = expandedStyles;
document.head.appendChild(styleSheet); 