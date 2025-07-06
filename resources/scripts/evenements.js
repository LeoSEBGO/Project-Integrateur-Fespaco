/* FESPACO - JavaScript pour la page Événements */

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