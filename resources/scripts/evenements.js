class FespacoEventsPage {
    constructor() {
        this.films = [];
        this.filteredFilms = [];
        this.currentPage = 1;
        this.filmsPerPage = 9;
        this.currentFilter = 'tous';
        this.searchQuery = '';
        this.init();
    }

    init() {
        this.setupFilters();
        this.setupSearch();
        this.setupPagination();
        this.setupModals();
        this.setupScrollAnimations();
        this.loadFilms();
    }

    // Configuration des filtres
    setupFilters() {
        const filterBtns = document.querySelectorAll('.filter-btn');
        
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Mise à jour des boutons actifs
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                
                // Mise à jour du filtre
                this.currentFilter = btn.dataset.filter;
                this.currentPage = 1;
                
                // Filtrage et affichage
                this.filterFilms();
                this.displayFilms();
                this.updatePagination();
            });
        });
    }

    // Configuration de la recherche
    setupSearch() {
        const searchInput = document.querySelector('.search-input');
        
        if (searchInput) {
            // Debounce pour éviter trop de requêtes
            searchInput.addEventListener('input', this.debounce((e) => {
                this.searchQuery = e.target.value.toLowerCase();
                this.currentPage = 1;
                this.filterFilms();
                this.displayFilms();
                this.updatePagination();
            }, 300));
        }
    }

    // Configuration de la pagination
    setupPagination() {
        const paginationContainer = document.querySelector('.pagination');
        
        if (paginationContainer) {
            paginationContainer.addEventListener('click', (e) => {
                if (e.target.classList.contains('pagination-btn')) {
                    const page = parseInt(e.target.dataset.page);
                    if (page && page !== this.currentPage) {
                        this.currentPage = page;
                        this.displayFilms();
                        this.updatePagination();
                        this.scrollToTop();
                    }
                }
            });
        }
    }

    // Configuration des modals
    setupModals() {
        const modal = document.querySelector('.film-modal');
        const closeBtn = document.querySelector('.modal-close');
        
        if (closeBtn) {
            closeBtn.addEventListener('click', () => {
                this.closeModal();
            });
        }

        if (modal) {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    this.closeModal();
                }
            });
        }

        // Fermer avec Escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeModal();
            }
        });
    }

    // Animations au scroll
    setupScrollAnimations() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('entering');
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        // Observer les cartes de films
        document.querySelectorAll('.film-card').forEach(card => {
            observer.observe(card);
        });
    }

    // Chargement des films (données simulées)
    loadFilms() {
        // Données simulées pour les films
        this.films = [
            {
                id: 1,
                title: "Yeelen",
                year: 2023,
                duration: "105 min",
                genre: "drame",
                country: "Mali",
                director: "Souleymane Cissé",
                description: "Un jeune homme hérite des pouvoirs magiques de son père et doit affronter les défis de la tradition...",
                tags: ["drame", "traditionnel", "magie"],
                poster: "placeholder-poster.jpg"
            },
            {
                id: 2,
                title: "Sarraounia",
                year: 2023,
                duration: "130 min",
                genre: "historique",
                country: "Niger",
                director: "Med Hondo",
                description: "L'histoire de la reine Sarraounia qui résista courageusement à la colonisation française...",
                tags: ["historique", "résistance", "reine"],
                poster: "placeholder-poster.jpg"
            },
            {
                id: 3,
                title: "Tilai",
                year: 2023,
                duration: "81 min",
                genre: "drame",
                country: "Burkina Faso",
                director: "Idrissa Ouédraogo",
                description: "Un drame familial qui explore les traditions et les conflits générationnels...",
                tags: ["drame", "famille", "tradition"],
                poster: "placeholder-poster.jpg"
            },
            {
                id: 4,
                title: "Wend Kuuni",
                year: 2023,
                duration: "71 min",
                genre: "drame",
                country: "Burkina Faso",
                director: "Gaston Kaboré",
                description: "L'histoire touchante d'un enfant muet qui retrouve sa voix et sa famille...",
                tags: ["drame", "enfance", "famille"],
                poster: "placeholder-poster.jpg"
            },
            {
                id: 5,
                title: "Buud Yam",
                year: 2023,
                duration: "97 min",
                genre: "comédie",
                country: "Burkina Faso",
                director: "Gaston Kaboré",
                description: "Une comédie satirique qui critique les mœurs politiques contemporaines...",
                tags: ["comédie", "politique", "satire"],
                poster: "placeholder-poster.jpg"
            },
            {
                id: 6,
                title: "Finzan",
                year: 2023,
                duration: "107 min",
                genre: "drame",
                country: "Mali",
                director: "Cheick Oumar Sissoko",
                description: "Le récit de deux femmes qui luttent contre les traditions oppressives...",
                tags: ["drame", "femmes", "tradition"],
                poster: "placeholder-poster.jpg"
            }
        ];

        // Ajouter plus de films pour tester la pagination
        for (let i = 7; i <= 20; i++) {
            this.films.push({
                id: i,
                title: `Film ${i}`,
                year: 2023,
                duration: `${90 + Math.floor(Math.random() * 40)} min`,
                genre: ['drame', 'comédie', 'historique'][Math.floor(Math.random() * 3)],
                country: ['Mali', 'Burkina Faso', 'Niger', 'Sénégal'][Math.floor(Math.random() * 4)],
                director: `Réalisateur ${i}`,
                description: `Description du film ${i}. Un récit captivant qui explore les thèmes profonds de la société africaine...`,
                tags: ['drame', 'moderne', 'société'],
                poster: "placeholder-poster.jpg"
            });
        }

        this.filteredFilms = [...this.films];
        this.displayFilms();
        this.updatePagination();
    }

    // Filtrage des films
    filterFilms() {
        this.filteredFilms = this.films.filter(film => {
            const matchesFilter = this.currentFilter === 'tous' || film.genre === this.currentFilter;
            const matchesSearch = film.title.toLowerCase().includes(this.searchQuery) ||
                                film.director.toLowerCase().includes(this.searchQuery) ||
                                film.description.toLowerCase().includes(this.searchQuery);
            
            return matchesFilter && matchesSearch;
        });
    }

    // Affichage des films
    displayFilms() {
        const grid = document.querySelector('.films-grid');
        if (!grid) return;

        // Calculer les films pour la page actuelle
        const startIndex = (this.currentPage - 1) * this.filmsPerPage;
        const endIndex = startIndex + this.filmsPerPage;
        const filmsToShow = this.filteredFilms.slice(startIndex, endIndex);

        // Afficher un message si aucun film
        if (filmsToShow.length === 0) {
            grid.innerHTML = `
                <div class="no-results">
                    <i class="fas fa-search"></i>
                    <h3>Aucun film trouvé</h3>
                    <p>Essayez de modifier vos critères de recherche</p>
                </div>
            `;
            return;
        }

        // Générer le HTML des films
        grid.innerHTML = filmsToShow.map(film => `
            <div class="film-card" data-film-id="${film.id}">
                <div class="film-poster">
                    <img src="resources/assets/images/films/${film.poster}" alt="${film.title}" 
                         onerror="this.parentElement.innerHTML='<div class=film-placeholder><i class=fas fa-film></i></div>'">
                    <div class="film-overlay">
                        <div class="play-button">
                            <i class="fas fa-play"></i>
                        </div>
                    </div>
                </div>
                <div class="film-info">
                    <h4 class="film-title">${film.title}</h4>
                    <div class="film-meta">
                        <span class="film-year">${film.year}</span>
                        <span class="film-duration">${film.duration}</span>
                    </div>
                    <p class="film-description">${film.description}</p>
                    <div class="film-tags">
                        ${film.tags.map(tag => `<span class="film-tag">${tag}</span>`).join('')}
                    </div>
                    <div class="film-actions">
                        <button class="btn-film primary" onclick="fespacoEvents.openModal(${film.id})">
                            Voir détails
                        </button>
                        <button class="btn-film secondary" onclick="fespacoEvents.toggleFavorite(${film.id})">
                            <i class="fas fa-heart"></i>
                        </button>
                    </div>
                </div>
            </div>
        `).join('');

        // Réobserver les nouvelles cartes
        this.setupScrollAnimations();
    }

    // Mise à jour de la pagination
    updatePagination() {
        const pagination = document.querySelector('.pagination');
        if (!pagination) return;

        const totalPages = Math.ceil(this.filteredFilms.length / this.filmsPerPage);
        
        if (totalPages <= 1) {
            pagination.innerHTML = '';
            return;
        }

        let paginationHTML = '';
        
        // Bouton précédent
        if (this.currentPage > 1) {
            paginationHTML += `<button class="pagination-btn" data-page="${this.currentPage - 1}">
                <i class="fas fa-chevron-left"></i>
            </button>`;
        }

        // Numéros de page
        for (let i = 1; i <= totalPages; i++) {
            if (i === this.currentPage ||
                i === 1 ||
                i === totalPages ||
                (i >= this.currentPage - 1 && i <= this.currentPage + 1)) {
                
                paginationHTML += `<button class="pagination-btn ${i === this.currentPage ? 'active' : ''}" 
                                            data-page="${i}">${i}</button>`;
            } else if (i === this.currentPage - 2 || i === this.currentPage + 2) {
                paginationHTML += `<span class="pagination-ellipsis">...</span>`;
            }
        }

        // Bouton suivant
        if (this.currentPage < totalPages) {
            paginationHTML += `<button class="pagination-btn" data-page="${this.currentPage + 1}">
                <i class="fas fa-chevron-right"></i>
            </button>`;
        }

        pagination.innerHTML = paginationHTML;
    }

    // Ouvrir le modal
    openModal(filmId) {
        const film = this.films.find(f => f.id === filmId);
        if (!film) return;

        const modal = document.querySelector('.film-modal');
        const modalBody = document.querySelector('.modal-body');
        
        if (modal && modalBody) {
            modalBody.innerHTML = `
                <div class="modal-film-info">
                    <div class="modal-film-poster">
                        <img src="resources/assets/images/films/${film.poster}" alt="${film.title}"
                             onerror="this.parentElement.innerHTML='<div class=film-placeholder><i class=fas fa-film></i></div>'">
                    </div>
                    <div class="modal-film-details">
                        <h2>${film.title}</h2>
                        <div class="film-meta">
                            <span><strong>Année:</strong> ${film.year}</span>
                            <span><strong>Durée:</strong> ${film.duration}</span>
                            <span><strong>Genre:</strong> ${film.genre}</span>
                            <span><strong>Pays:</strong> ${film.country}</span>
                            <span><strong>Réalisateur:</strong> ${film.director}</span>
                        </div>
                        <p>${film.description}</p>
                        <div class="film-tags">
                            ${film.tags.map(tag => `<span class="film-tag">${tag}</span>`).join('')}
                        </div>
                        <div class="modal-actions">
                            <button class="btn-film primary">
                                <i class="fas fa-play"></i> Voir la bande-annonce
                            </button>
                            <button class="btn-film secondary" onclick="fespacoEvents.toggleFavorite(${film.id})">
                                <i class="fas fa-heart"></i> Ajouter aux favoris
                            </button>
                        </div>
                    </div>
                </div>
            `;

            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    }

    // Fermer le modal
    closeModal() {
        const modal = document.querySelector('.film-modal');
        if (modal) {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        }
    }

    // Basculer les favoris
    toggleFavorite(filmId) {
        const film = this.films.find(f => f.id === filmId);
        if (film) {
            film.favorite = !film.favorite;
            
            // Mettre à jour l'affichage
            const heartIcon = document.querySelector(`[data-film-id="${filmId}"] .fa-heart`);
            if (heartIcon) {
                heartIcon.style.color = film.favorite ? '#ff4757' : '';
            }
            
            // Notification
            this.showNotification(film.favorite ? 'Ajouté aux favoris' : 'Retiré des favoris');
        }
    }

    // Afficher une notification
    showNotification(message) {
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: var(--gradient-gold);
            color: var(--dark-bg);
            padding: 1rem;
            border-radius: 0.5rem;
            font-weight: 500;
            z-index: 1001;
            transform: translateX(100%);
            transition: transform 0.3s ease;
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }

    // Scroll vers le haut
    scrollToTop() {
        const filmsGrid = document.querySelector('.films-grid');
        if (filmsGrid) {
            filmsGrid.scrollIntoView({ behavior: 'smooth' });
        }
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
let fespacoEvents;
document.addEventListener('DOMContentLoaded', () => {
    fespacoEvents = new FespacoEventsPage();
});

// Gestion du responsive
window.addEventListener('resize', () => {
    if (window.innerWidth < 768) {
        // Adapter la grille pour mobile
        const grid = document.querySelector('.films-grid');
        if (grid) {
            grid.style.gridTemplateColumns = '1fr';
        }
    }
});

// Page Événements FESPACO - JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Initialisation des composants
    initEventFilters();
    initEventAnimations();
    initEventInteractions();
    initTimelineAnimations();
    initStatsCounter();
    initAccessibility();
});

/**
 * Initialisation des filtres d'événements
 */
function initEventFilters() {
    const filterButtons = document.querySelectorAll('[data-filter]');
    const eventCards = document.querySelectorAll('.event-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            
            // Mise à jour des boutons actifs
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Filtrage des événements
            filterEvents(filter, eventCards);
        });
    });
}

/**
 * Filtrage des événements
 */
function filterEvents(filter, eventCards) {
    eventCards.forEach(card => {
        const category = card.getAttribute('data-category');
        
        if (filter === 'all' || category === filter) {
            card.style.display = 'block';
            card.style.animation = 'fadeInUp 0.6s ease-out';
        } else {
            card.style.display = 'none';
        }
    });
    
    // Animation des cartes visibles
    const visibleCards = Array.from(eventCards).filter(card => 
        card.style.display !== 'none'
    );
    
    visibleCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
    });
}

/**
 * Animations des événements
 */
function initEventAnimations() {
    // Animation des cartes d'événements
    const eventCards = document.querySelectorAll('.event-card');
    eventCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.2}s`;
        card.classList.add('fade-in-up');
    });

    // Animation de la section statistiques
    const statCards = document.querySelectorAll('.stat-card');
    statCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.3}s`;
        card.classList.add('fade-in-up');
    });

    // Animation des cartes de salles
    const venueCards = document.querySelectorAll('.venue-card');
    venueCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.2}s`;
        card.classList.add('fade-in-up');
    });
}

/**
 * Interactions avec les événements
 */
function initEventInteractions() {
    // Effet de survol sur les cartes
    const eventCards = document.querySelectorAll('.event-card');
    eventCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Interactions avec les boutons d'action
    const actionButtons = document.querySelectorAll('.btn');
    actionButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Effet de ripple
            createRippleEffect(e, this);
        });
    });

    // Animation des badges de statut
    const statusBadges = document.querySelectorAll('.status-badge');
    statusBadges.forEach(badge => {
        badge.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1)';
        });
        
        badge.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });
}

/**
 * Animations de la timeline
 */
function initTimelineAnimations() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    // Animation au scroll
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateX(0)';
            }
        });
    }, { threshold: 0.5 });

    timelineItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateX(-50px)';
        item.style.transition = 'all 0.8s ease';
        observer.observe(item);
    });
}

/**
 * Compteur animé des statistiques
 */
function initStatsCounter() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    statNumbers.forEach(number => {
        observer.observe(number);
    });
}

/**
 * Animation du compteur
 */
function animateCounter(element) {
    const target = parseInt(element.textContent.replace(/\D/g, ''));
    const suffix = element.textContent.replace(/\d/g, '');
    let current = 0;
    const increment = target / 50;
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        element.textContent = Math.floor(current) + suffix;
    }, 30);
}

/**
 * Effet de ripple sur les boutons
 */
function createRippleEffect(event, element) {
    const ripple = document.createElement('span');
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    ripple.classList.add('ripple');
    
    element.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

/**
 * Accessibilité
 */
function initAccessibility() {
    // Navigation au clavier
    const focusableElements = document.querySelectorAll('button, a, input, select, textarea');
    
    focusableElements.forEach(element => {
        element.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    });

    // Annonces pour les lecteurs d'écran
    const filterButtons = document.querySelectorAll('[data-filter]');
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            const eventCount = document.querySelectorAll(`.event-card[data-category="${filter}"]`).length;
            
            // Annonce pour les lecteurs d'écran
            announceToScreenReader(`${eventCount} événements affichés pour la catégorie ${filter}`);
        });
    });
}

/**
 * Annonce pour les lecteurs d'écran
 */
function announceToScreenReader(message) {
    const announcement = document.createElement('div');
    announcement.setAttribute('aria-live', 'polite');
    announcement.setAttribute('aria-atomic', 'true');
    announcement.style.position = 'absolute';
    announcement.style.left = '-10000px';
    announcement.style.width = '1px';
    announcement.style.height = '1px';
    announcement.style.overflow = 'hidden';
    announcement.textContent = message;
    
    document.body.appendChild(announcement);
    
    setTimeout(() => {
        document.body.removeChild(announcement);
    }, 1000);
}

/**
 * Gestion des préférences utilisateur
 */
function initUserPreferences() {
    // Respect des préférences de réduction de mouvement
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        document.documentElement.style.setProperty('--transition-normal', 'none');
        document.documentElement.style.setProperty('--transition-fast', 'none');
    }

    // Mode sombre
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        document.documentElement.classList.add('dark-mode');
    }
}

/**
 * Gestion du responsive
 */
function initResponsive() {
    // Adaptation des filtres sur mobile
    const filterGroup = document.querySelector('.btn-group');
    if (filterGroup && window.innerWidth <= 768) {
        filterGroup.classList.add('flex-column');
    }

    // Adaptation de la timeline sur mobile
    const timelineContainer = document.querySelector('.timeline-container');
    if (timelineContainer && window.innerWidth <= 768) {
        timelineContainer.style.paddingLeft = '20px';
    }
}

/**
 * Gestion des erreurs
 */
function handleErrors() {
    window.addEventListener('error', function(e) {
        console.error('Erreur JavaScript:', e.error);
        
        // Affichage d'un message d'erreur utilisateur
        showErrorMessage('Une erreur est survenue. Veuillez rafraîchir la page.');
    });
}

/**
 * Affichage d'un message d'erreur
 */
function showErrorMessage(message) {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'alert alert-danger alert-dismissible fade show position-fixed';
    errorDiv.style.top = '20px';
    errorDiv.style.right = '20px';
    errorDiv.style.zIndex = '9999';
    errorDiv.innerHTML = `
        <i class="fas fa-exclamation-triangle me-2"></i>
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    
    document.body.appendChild(errorDiv);
    
    // Suppression automatique après 5 secondes
    setTimeout(() => {
        if (errorDiv.parentNode) {
            errorDiv.remove();
        }
    }, 5000);
}

/**
 * Initialisation des performances
 */
function initPerformance() {
    // Lazy loading des images
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

    images.forEach(img => imageObserver.observe(img));
}

// Initialisation des préférences utilisateur
initUserPreferences();

// Initialisation du responsive
initResponsive();

// Gestion des erreurs
handleErrors();

// Initialisation des performances
initPerformance();

// Styles CSS dynamiques
const style = document.createElement('style');
style.textContent = `
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        animation: ripple-animation 0.6s linear;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    .fade-in-up {
        animation: fadeInUp 0.6s ease-out forwards;
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
    
    .event-card {
        transition: all 0.3s ease;
    }
    
    .status-badge {
        transition: transform 0.3s ease;
    }
    
    .timeline-item {
        transition: all 0.8s ease;
    }
    
    /* Mode sombre */
    .dark-mode .event-card .card,
    .dark-mode .venue-card,
    .dark-mode .timeline-content {
        background: #343a40;
        border-color: #6c757d;
    }
    
    .dark-mode .event-card .card-text,
    .dark-mode .venue-card p {
        color: #ffffff;
    }
    
    /* Responsive */
    @media (max-width: 768px) {
        .btn-group {
            flex-direction: column;
        }
        
        .timeline-container {
            padding-left: 20px;
        }
    }
    
    /* Accessibilité */
    @media (prefers-reduced-motion: reduce) {
        .event-card,
        .venue-card,
        .timeline-item,
        .status-badge {
            transition: none;
        }
        
        .fade-in-up {
            animation: none;
        }
    }
`;
document.head.appendChild(style); 