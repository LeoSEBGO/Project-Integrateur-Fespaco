/* FESPACO - JavaScript pour la page Partenaires */

class FespacoPartnersPage {
    constructor() {
        this.partners = [];
        this.currentCategory = 'tous';
        this.init();
    }

    init() {
        this.setupCategoryFilters();
        this.setupPartnerCards();
        this.setupScrollAnimations();
        this.setupTestimonials();
        this.loadPartners();
    }

    // Configuration des filtres de catégories
    setupCategoryFilters() {
        const categoryBtns = document.querySelectorAll('.category-btn');
        
        categoryBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Mise à jour des boutons actifs
                categoryBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                
                // Mise à jour de la catégorie
                this.currentCategory = btn.dataset.category;
                
                // Filtrage et affichage
                this.filterPartners();
            });
        });
    }

    // Configuration des cartes de partenaires
    setupPartnerCards() {
        document.addEventListener('click', (e) => {
            if (e.target.closest('.partner-card')) {
                const card = e.target.closest('.partner-card');
                this.animatePartnerCard(card);
            }
        });
    }

    // Animation des cartes de partenaires
    animatePartnerCard(card) {
        const logo = card.querySelector('.partner-logo');
        
        // Animation de rotation du logo
        if (logo) {
            logo.classList.add('rotating');
            setTimeout(() => {
                logo.classList.remove('rotating');
            }, 600);
        }
        
        // Effet de clic sur la carte
        card.style.transform = 'translateY(-15px) rotateX(10deg) rotateY(10deg) scale(1.05)';
        setTimeout(() => {
            card.style.transform = '';
        }, 300);
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
                    if (entry.target.classList.contains('partners-section')) {
                        entry.target.classList.add('visible');
                        this.animatePartnerCards(entry.target);
                    } else if (entry.target.classList.contains('partner-card')) {
                        entry.target.classList.add('entering');
                    }
                }
            });
        }, observerOptions);

        // Observer les sections et cartes
        document.querySelectorAll('.partners-section, .partner-card').forEach(el => {
            observer.observe(el);
        });
    }

    // Animation en cascade des cartes de partenaires
    animatePartnerCards(section) {
        const cards = section.querySelectorAll('.partner-card');
        
        cards.forEach((card, index) => {
            setTimeout(() => {
                card.classList.add('entering');
            }, index * 100);
        });
    }

    // Configuration des témoignages
    setupTestimonials() {
        const testimonialCards = document.querySelectorAll('.testimonial-card');
        
        testimonialCards.forEach((card, index) => {
            // Animation décalée
            card.style.animationDelay = `${index * 0.2}s`;
            
            // Effet de survol
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-10px) scale(1.02)';
            });

            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(0) scale(1)';
            });
        });
    }

    // Chargement des partenaires (données simulées)
    loadPartners() {
        this.partners = [
            // Partenaires officiels
            {
                id: 1,
                name: "UNESCO",
                type: "Organisation Internationale",
                category: "officiels",
                description: "Soutien institutionnel et culturel au développement du cinéma africain",
                logo: "unesco-logo.png",
                link: "https://unesco.org"
            },
            {
                id: 2,
                name: "Union Africaine",
                type: "Organisation Continentale",
                category: "officiels",
                description: "Promotion de l'intégration culturelle africaine",
                logo: "ua-logo.png",
                link: "https://au.int"
            },
            {
                id: 3,
                name: "Ministère de la Culture",
                type: "Institution Gouvernementale",
                category: "officiels",
                description: "Soutien gouvernemental au festival et aux arts",
                logo: "ministere-culture.png",
                link: "#"
            },
            
            // Partenaires médias
            {
                id: 4,
                name: "Canal+ Afrique",
                type: "Chaîne de Télévision",
                category: "medias",
                description: "Diffusion et promotion du cinéma africain",
                logo: "canal-plus.png",
                link: "https://canalplus.com"
            },
            {
                id: 5,
                name: "Africa24",
                type: "Chaîne d'Information",
                category: "medias",
                description: "Couverture médiatique du festival",
                logo: "africa24.png",
                link: "https://africa24tv.com"
            },
            {
                id: 6,
                name: "Jeune Afrique",
                type: "Magazine",
                category: "medias",
                description: "Couverture éditoriale et promotion",
                logo: "jeune-afrique.png",
                link: "https://jeuneafrique.com"
            },
            
            // Partenaires techniques
            {
                id: 7,
                name: "Kodak",
                type: "Équipement Cinématographique",
                category: "techniques",
                description: "Fourniture d'équipements et support technique",
                logo: "kodak.png",
                link: "https://kodak.com"
            },
            {
                id: 8,
                name: "Arri",
                type: "Matériel de Cinéma",
                category: "techniques",
                description: "Caméras et équipements de production",
                logo: "arri.png",
                link: "https://arri.com"
            },
            {
                id: 9,
                name: "Dolby",
                type: "Technologies Audio",
                category: "techniques",
                description: "Solutions audio pour les projections",
                logo: "dolby.png",
                link: "https://dolby.com"
            },
            
            // Partenaires financiers
            {
                id: 10,
                name: "Bank of Africa",
                type: "Institution Financière",
                category: "financiers",
                description: "Soutien financier aux productions",
                logo: "boa.png",
                link: "https://bank-of-africa.net"
            },
            {
                id: 11,
                name: "Orange",
                type: "Télécommunications",
                category: "financiers",
                description: "Sponsor principal et connectivité",
                logo: "orange.png",
                link: "https://orange.com"
            },
            {
                id: 12,
                name: "Total Énergies",
                type: "Énergie",
                category: "financiers",
                description: "Sponsor énergétique du festival",
                logo: "total.png",
                link: "https://totalenergies.com"
            }
        ];

        this.displayPartners();
    }

    // Filtrage des partenaires
    filterPartners() {
        const filteredPartners = this.currentCategory === 'tous' 
            ? this.partners 
            : this.partners.filter(partner => partner.category === this.currentCategory);
        
        this.displayPartners(filteredPartners);
    }

    // Affichage des partenaires
    displayPartners(partnersToShow = this.partners) {
        const sections = document.querySelectorAll('.partners-section');
        
        if (this.currentCategory === 'tous') {
            this.displayAllCategories();
        } else {
            this.displaySingleCategory(partnersToShow);
        }
    }

    // Affichage de toutes les catégories
    displayAllCategories() {
        const categories = {
            officiels: { title: 'Partenaires Officiels', partners: [] },
            medias: { title: 'Partenaires Médias', partners: [] },
            techniques: { title: 'Partenaires Techniques', partners: [] },
            financiers: { title: 'Partenaires Financiers', partners: [] }
        };

        // Regrouper par catégorie
        this.partners.forEach(partner => {
            if (categories[partner.category]) {
                categories[partner.category].partners.push(partner);
            }
        });

        // Générer le HTML
        const mainContainer = document.querySelector('.partners-main');
        if (mainContainer) {
            mainContainer.innerHTML = Object.keys(categories).map(key => `
                <section class="partners-section" data-category="${key}">
                    <div class="container">
                        <div class="section-header">
                            <h2 class="section-title">${categories[key].title}</h2>
                            <p class="section-description">
                                ${this.getCategoryDescription(key)}
                            </p>
                        </div>
                        <div class="partners-grid">
                            ${categories[key].partners.map(partner => this.createPartnerCard(partner)).join('')}
                        </div>
                    </div>
                </section>
            `).join('');
        }

        // Réinitialiser les animations
        this.setupScrollAnimations();
    }

    // Affichage d'une seule catégorie
    displaySingleCategory(partners) {
        const mainContainer = document.querySelector('.partners-main');
        if (mainContainer) {
            mainContainer.innerHTML = `
                <section class="partners-section visible" data-category="${this.currentCategory}">
                    <div class="container">
                        <div class="section-header">
                            <h2 class="section-title">${this.getCategoryTitle(this.currentCategory)}</h2>
                            <p class="section-description">
                                ${this.getCategoryDescription(this.currentCategory)}
                            </p>
                        </div>
                        <div class="partners-grid">
                            ${partners.map(partner => this.createPartnerCard(partner)).join('')}
                        </div>
                    </div>
                </section>
            `;
        }

        // Réinitialiser les animations
        this.setupScrollAnimations();
    }

    // Créer une carte de partenaire
    createPartnerCard(partner) {
        return `
            <div class="partner-card" data-partner-id="${partner.id}">
                <div class="partner-logo">
                    <img src="resources/assets/images/partners/${partner.logo}" alt="${partner.name}"
                         onerror="this.parentElement.innerHTML='<i class=partner-placeholder>${this.getPartnerIcon(partner.category)}</i>'">
                </div>
                <h4 class="partner-name">${partner.name}</h4>
                <p class="partner-type">${partner.type}</p>
                <p class="partner-description">${partner.description}</p>
                <a href="${partner.link}" class="partner-link" target="_blank" rel="noopener">
                    Visiter le site <i class="fas fa-external-link-alt"></i>
                </a>
            </div>
        `;
    }

    // Obtenir l'icône pour une catégorie
    getPartnerIcon(category) {
        const icons = {
            officiels: 'fas fa-building',
            medias: 'fas fa-broadcast-tower',
            techniques: 'fas fa-cogs',
            financiers: 'fas fa-coins'
        };
        return `<i class="${icons[category] || 'fas fa-handshake'}"></i>`;
    }

    // Obtenir le titre d'une catégorie
    getCategoryTitle(category) {
        const titles = {
            officiels: 'Partenaires Officiels',
            medias: 'Partenaires Médias',
            techniques: 'Partenaires Techniques',
            financiers: 'Partenaires Financiers'
        };
        return titles[category] || 'Partenaires';
    }

    // Obtenir la description d'une catégorie
    getCategoryDescription(category) {
        const descriptions = {
            officiels: 'Institutions et organisations qui soutiennent officiellement le FESPACO',
            medias: 'Médias qui assurent la couverture et la promotion du festival',
            techniques: 'Entreprises fournissant le matériel et le support technique',
            financiers: 'Sponsors et partenaires financiers du festival'
        };
        return descriptions[category] || 'Nos précieux partenaires';
    }

    // Gestion des gestes tactiles
    setupTouchGestures() {
        const partnerCards = document.querySelectorAll('.partner-card');
        
        partnerCards.forEach(card => {
            let startX = 0;
            let startY = 0;
            
            card.addEventListener('touchstart', (e) => {
                startX = e.touches[0].clientX;
                startY = e.touches[0].clientY;
            });

            card.addEventListener('touchend', (e) => {
                const endX = e.changedTouches[0].clientX;
                const endY = e.changedTouches[0].clientY;
                
                const diffX = Math.abs(endX - startX);
                const diffY = Math.abs(endY - startY);
                
                // Tap pour animation
                if (diffX < 10 && diffY < 10) {
                    this.animatePartnerCard(card);
                }
            });
        });
    }

    // Animation d'entrée pour les nouvelles cartes
    animateNewCards() {
        const cards = document.querySelectorAll('.partner-card:not(.entering)');
        
        cards.forEach((card, index) => {
            setTimeout(() => {
                card.classList.add('entering');
            }, index * 50);
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
    new FespacoPartnersPage();
});

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