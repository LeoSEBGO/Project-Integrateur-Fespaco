// FESPACO 2025 - Gestionnaire d'images automatique
class ImageManager {
    constructor() {
        this.imageCache = new Map();
        this.assetsPath = '../resources/assets/images/';
        this.imageCategories = {
            slide: [],
            gallery: [],
            partners: [],
            logo: [],
            events: [],
            'code-qr': []
        };
        this.init();
    }

    async init() {
        await this.scanAssets();
        this.setupLazyLoading();
        this.setupImageOptimization();
        this.setupErrorHandling();
    }

    // Scanner automatiquement tous les assets
    async scanAssets() {
        try {
            // Simuler la structure des fichiers basée sur ce que nous avons trouvé
            this.imageCategories = {
                slide: [
                    'Couverture-1.jpeg',
                    'Couverture-2.jpeg',
                    'Couverture-3.jpeg',
                    'Couverture-4.jpeg',
                    'Couverture-5.jpeg',
                    'Couverture-6.jpeg',
                    'Couverture-7.jpeg',
                    'Couverture-11.jpeg',
                    '1080x700_RAM_FESPACO_1.jpg',
                    '1080x700_World_Cola.png'
                ],
                gallery: [
                    'Conference-de-presse-du-FESPACO-2025-scaled-1-1080x675.jpg',
                    'Conference-de-presse-du-FESPACO-2025-scaled-1-980x653.jpg',
                    'Conference-de-presse-du-FESPACO-2025-scaled-1-480x320.jpg'
                ],
                partners: [
                    'Logos-site-web-FESPACO-03.png',
                    'Logos-site-web-FESPACO-04.png',
                    'Logos-site-web-FESPACO-05.png',
                    'Logos-site-web-FESPACO-06.png',
                    'Logos-site-web-FESPACO-07.png',
                    'Logos-site-web-FESPACO-12.png',
                    'Logos-site-web-FESPACO-13.png',
                    'Logos-site-web-FESPACO_Plan-de-travail-1.png'
                ],
                logo: [
                    'Logo-FESPACO-2025-02.png'
                ],
                'code-qr': [
                    'Code-qr-FESPACO-.jpg',
                    'Code-qr-FESPACO--261x300.jpg'
                ]
            };

            // Précharger les images critiques
            await this.preloadCriticalImages();
            
            console.log('Images scannées avec succès:', this.imageCategories);
        } catch (error) {
            console.error('Erreur lors du scan des assets:', error);
        }
    }

    // Précharger les images critiques
    async preloadCriticalImages() {
        const criticalImages = [
            ...this.imageCategories.slide.slice(0, 3), // Premières slides
            ...this.imageCategories.logo,
            this.imageCategories.partners[0] // Premier logo partenaire
        ];

        const preloadPromises = criticalImages.map(filename => {
            const category = this.getCategoryFromFilename(filename);
            return this.preloadImage(this.assetsPath + category + '/' + filename);
        });

        try {
            await Promise.all(preloadPromises);
            console.log('Images critiques préchargées');
        } catch (error) {
            console.warn('Erreur lors du préchargement:', error);
        }
    }

    // Déterminer la catégorie d'une image
    getCategoryFromFilename(filename) {
        for (const [category, files] of Object.entries(this.imageCategories)) {
            if (files.includes(filename)) {
                return category;
            }
        }
        return 'slide'; // Par défaut
    }

    // Précharger une image
    preloadImage(src) {
        return new Promise((resolve, reject) => {
            if (this.imageCache.has(src)) {
                resolve(this.imageCache.get(src));
                return;
            }

            const img = new Image();
            img.onload = () => {
                this.imageCache.set(src, img);
                resolve(img);
            };
            img.onerror = reject;
            img.src = src;
        });
    }

    // Configurer le chargement différé
    setupLazyLoading() {
        const lazyImages = document.querySelectorAll('img[data-src]');
        
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    this.loadImage(img);
                    imageObserver.unobserve(img);
                }
            });
        }, {
            rootMargin: '50px'
        });

        lazyImages.forEach(img => imageObserver.observe(img));
    }

    // Charger une image avec gestion d'erreur
    async loadImage(img) {
        try {
            const src = img.dataset.src;
            await this.preloadImage(src);
            
            img.src = src;
            img.classList.add('loaded');
            img.classList.remove('lazy');
            
            // Animation de fondu
            img.style.opacity = '0';
            img.style.transition = 'opacity 0.3s ease';
            
            img.onload = () => {
                img.style.opacity = '1';
            };
            
        } catch (error) {
            console.error('Erreur lors du chargement de l\'image:', error);
            img.src = this.getPlaceholderImage();
            img.classList.add('error');
        }
    }

    // Image de remplacement
    getPlaceholderImage() {
        return 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iI2RkZCIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LXNpemU9IjE4IiBmaWxsPSIjOTk5IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+RkVTUEFDTyAyMDI1PC90ZXh0Pjwvc3ZnPg==';
    }

    // Optimisation des images
    setupImageOptimization() {
        // Adapter la qualité selon la connexion
        if ('connection' in navigator) {
            const connection = navigator.connection;
            if (connection.effectiveType === 'slow-2g' || connection.effectiveType === '2g') {
                this.enableLowQualityMode();
            }
        }

        // Responsive images
        this.setupResponsiveImages();
    }

    // Mode basse qualité
    enableLowQualityMode() {
        const style = document.createElement('style');
        style.textContent = `
            img {
                image-rendering: -webkit-optimize-contrast;
                image-rendering: crisp-edges;
            }
        `;
        document.head.appendChild(style);
    }

    // Images responsive
    setupResponsiveImages() {
        const images = document.querySelectorAll('img[data-responsive]');
        
        images.forEach(img => {
            const baseSrc = img.dataset.responsive;
            const screenWidth = window.innerWidth;
            
            let size = 'large';
            if (screenWidth < 768) {
                size = 'small';
            } else if (screenWidth < 1200) {
                size = 'medium';
            }
            
            // Adapter le src selon la taille d'écran
            const optimizedSrc = this.getOptimizedSrc(baseSrc, size);
            img.src = optimizedSrc;
        });
    }

    // Obtenir une src optimisée
    getOptimizedSrc(baseSrc, size) {
        // Logique pour retourner différentes tailles d'images
        // Pour l'instant, retourner l'original
        return baseSrc;
    }

    // Gestion des erreurs
    setupErrorHandling() {
        document.addEventListener('error', (e) => {
            if (e.target.tagName === 'IMG') {
                const img = e.target;
                if (!img.classList.contains('error-handled')) {
                    img.classList.add('error-handled');
                    img.src = this.getPlaceholderImage();
                    
                    // Log l'erreur
                    console.warn('Image non trouvée:', img.src);
                }
            }
        }, true);
    }

    // Méthodes publiques pour utilisation externe
    getSlideImages() {
        return this.imageCategories.slide.map(filename => 
            this.assetsPath + 'slide/' + filename
        );
    }

    getGalleryImages() {
        return this.imageCategories.gallery.map(filename => 
            this.assetsPath + 'gallery/' + filename
        );
    }

    getPartnerLogos() {
        return this.imageCategories.partners.map(filename => 
            this.assetsPath + 'partners/' + filename
        );
    }

    getLogoUrl() {
        return this.assetsPath + 'logo/' + this.imageCategories.logo[0];
    }

    getQRCodeUrl() {
        return this.assetsPath + 'code-qr/' + this.imageCategories['code-qr'][0];
    }

    // Créer automatiquement une galerie
    createGallery(containerId, category = 'gallery') {
        const container = document.getElementById(containerId);
        if (!container) return;

        const images = this.imageCategories[category];
        if (!images || images.length === 0) return;

        const gallery = document.createElement('div');
        gallery.className = 'auto-gallery';
        gallery.innerHTML = `
            <div class="gallery-grid">
                ${images.map((filename, index) => `
                    <div class="gallery-item" data-index="${index}">
                        <img src="${this.assetsPath + category + '/' + filename}" 
                             alt="FESPACO ${category} ${index + 1}"
                             class="gallery-image"
                             loading="lazy">
                        <div class="gallery-overlay">
                            <i class="fas fa-expand"></i>
                        </div>
                    </div>
                `).join('')}
            </div>
        `;

        container.appendChild(gallery);
        this.setupGalleryInteractions(gallery);
    }

    // Interactions de galerie
    setupGalleryInteractions(gallery) {
        const items = gallery.querySelectorAll('.gallery-item');
        
        items.forEach(item => {
            item.addEventListener('click', () => {
                const index = parseInt(item.dataset.index);
                this.openLightbox(index, gallery);
            });
        });
    }

    // Lightbox
    openLightbox(startIndex, gallery) {
        const images = gallery.querySelectorAll('.gallery-image');
        const lightbox = document.createElement('div');
        lightbox.className = 'lightbox';
        lightbox.innerHTML = `
            <div class="lightbox-content">
                <span class="lightbox-close">&times;</span>
                <img class="lightbox-image" src="${images[startIndex].src}" alt="FESPACO">
                <div class="lightbox-nav">
                    <button class="lightbox-prev">‹</button>
                    <button class="lightbox-next">›</button>
                </div>
                <div class="lightbox-counter">${startIndex + 1} / ${images.length}</div>
            </div>
        `;

        document.body.appendChild(lightbox);
        
        let currentIndex = startIndex;
        
        // Navigation
        const updateLightbox = () => {
            const lightboxImg = lightbox.querySelector('.lightbox-image');
            const counter = lightbox.querySelector('.lightbox-counter');
            
            lightboxImg.src = images[currentIndex].src;
            counter.textContent = `${currentIndex + 1} / ${images.length}`;
        };
        
        // Événements
        lightbox.querySelector('.lightbox-close').addEventListener('click', () => {
            document.body.removeChild(lightbox);
        });
        
        lightbox.querySelector('.lightbox-prev').addEventListener('click', () => {
            currentIndex = (currentIndex - 1 + images.length) % images.length;
            updateLightbox();
        });
        
        lightbox.querySelector('.lightbox-next').addEventListener('click', () => {
            currentIndex = (currentIndex + 1) % images.length;
            updateLightbox();
        });
        
        // Fermer en cliquant à l'extérieur
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                document.body.removeChild(lightbox);
            }
        });
        
        // Navigation au clavier
        document.addEventListener('keydown', function handleKeydown(e) {
            if (e.key === 'Escape') {
                document.body.removeChild(lightbox);
                document.removeEventListener('keydown', handleKeydown);
            } else if (e.key === 'ArrowLeft') {
                currentIndex = (currentIndex - 1 + images.length) % images.length;
                updateLightbox();
            } else if (e.key === 'ArrowRight') {
                currentIndex = (currentIndex + 1) % images.length;
                updateLightbox();
            }
        });
    }

    // Créer un slider automatique
    createSlider(containerId, category = 'slide') {
        const container = document.getElementById(containerId);
        if (!container) return;

        const images = this.imageCategories[category];
        if (!images || images.length === 0) return;

        const slider = document.createElement('div');
        slider.className = 'auto-slider';
        slider.innerHTML = `
            <div class="slider-container">
                ${images.map((filename, index) => `
                    <div class="slider-slide ${index === 0 ? 'active' : ''}">
                        <img src="${this.assetsPath + category + '/' + filename}" 
                             alt="FESPACO slide ${index + 1}"
                             class="slider-image">
                    </div>
                `).join('')}
            </div>
            <div class="slider-controls">
                <button class="slider-prev">‹</button>
                <button class="slider-next">›</button>
            </div>
            <div class="slider-indicators">
                ${images.map((_, index) => `
                    <span class="slider-indicator ${index === 0 ? 'active' : ''}" 
                          data-slide="${index}"></span>
                `).join('')}
            </div>
        `;

        container.appendChild(slider);
        this.setupSliderInteractions(slider);
    }

    // Interactions du slider
    setupSliderInteractions(slider) {
        const slides = slider.querySelectorAll('.slider-slide');
        const indicators = slider.querySelectorAll('.slider-indicator');
        const prevBtn = slider.querySelector('.slider-prev');
        const nextBtn = slider.querySelector('.slider-next');
        
        let currentSlide = 0;
        let sliderInterval;
        
        const updateSlider = () => {
            slides.forEach((slide, index) => {
                slide.classList.toggle('active', index === currentSlide);
            });
            
            indicators.forEach((indicator, index) => {
                indicator.classList.toggle('active', index === currentSlide);
            });
        };
        
        const nextSlide = () => {
            currentSlide = (currentSlide + 1) % slides.length;
            updateSlider();
        };
        
        const prevSlide = () => {
            currentSlide = (currentSlide - 1 + slides.length) % slides.length;
            updateSlider();
        };
        
        const goToSlide = (index) => {
            currentSlide = index;
            updateSlider();
        };
        
        // Auto-play
        const startAutoPlay = () => {
            sliderInterval = setInterval(nextSlide, 5000);
        };
        
        const stopAutoPlay = () => {
            if (sliderInterval) {
                clearInterval(sliderInterval);
                sliderInterval = null;
            }
        };
        
        // Événements
        nextBtn.addEventListener('click', () => {
            stopAutoPlay();
            nextSlide();
            startAutoPlay();
        });
        
        prevBtn.addEventListener('click', () => {
            stopAutoPlay();
            prevSlide();
            startAutoPlay();
        });
        
        indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => {
                stopAutoPlay();
                goToSlide(index);
                startAutoPlay();
            });
        });
        
        // Pause au survol
        slider.addEventListener('mouseenter', stopAutoPlay);
        slider.addEventListener('mouseleave', startAutoPlay);
        
        // Démarrer l'auto-play
        startAutoPlay();
    }
}

// Initialisation globale
const imageManager = new ImageManager();

// Export pour utilisation externe
window.FESPACO = window.FESPACO || {};
window.FESPACO.ImageManager = imageManager;

// Styles CSS pour les fonctionnalités auto-générées
const styles = `
<style>
.auto-gallery {
    margin: 2rem 0;
}

.gallery-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1.5rem;
}

.gallery-item {
    position: relative;
    overflow: hidden;
    border-radius: 15px;
    cursor: pointer;
    transition: transform 0.3s ease;
}

.gallery-item:hover {
    transform: scale(1.05);
}

.gallery-image {
    width: 100%;
    height: 200px;
    object-fit: cover;
    transition: transform 0.3s ease;
}

.gallery-item:hover .gallery-image {
    transform: scale(1.1);
}

.gallery-overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.7);
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
    transition: opacity 0.3s ease;
}

.gallery-item:hover .gallery-overlay {
    opacity: 1;
}

.gallery-overlay i {
    color: white;
    font-size: 2rem;
}

.lightbox {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.9);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 10000;
}

.lightbox-content {
    position: relative;
    max-width: 90%;
    max-height: 90%;
}

.lightbox-image {
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
}

.lightbox-close {
    position: absolute;
    top: -40px;
    right: 0;
    color: white;
    font-size: 2rem;
    cursor: pointer;
    background: none;
    border: none;
}

.lightbox-nav {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    width: 100%;
    display: flex;
    justify-content: space-between;
    pointer-events: none;
}

.lightbox-prev,
.lightbox-next {
    background: rgba(255, 255, 255, 0.2);
    color: white;
    border: none;
    padding: 1rem;
    cursor: pointer;
    font-size: 2rem;
    border-radius: 50%;
    pointer-events: auto;
    transition: background 0.3s ease;
}

.lightbox-prev:hover,
.lightbox-next:hover {
    background: rgba(255, 255, 255, 0.4);
}

.lightbox-counter {
    position: absolute;
    bottom: -40px;
    left: 50%;
    transform: translateX(-50%);
    color: white;
    font-size: 1.1rem;
}

.auto-slider {
    position: relative;
    overflow: hidden;
    border-radius: 15px;
    margin: 2rem 0;
}

.slider-container {
    position: relative;
    height: 400px;
}

.slider-slide {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    transition: opacity 0.5s ease;
}

.slider-slide.active {
    opacity: 1;
}

.slider-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.slider-controls {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    width: 100%;
    display: flex;
    justify-content: space-between;
    padding: 0 2rem;
    pointer-events: none;
}

.slider-prev,
.slider-next {
    background: rgba(255, 107, 53, 0.8);
    color: white;
    border: none;
    padding: 1rem;
    cursor: pointer;
    font-size: 1.5rem;
    border-radius: 50%;
    pointer-events: auto;
    transition: background 0.3s ease;
}

.slider-prev:hover,
.slider-next:hover {
    background: var(--fespaco-primary);
}

.slider-indicators {
    position: absolute;
    bottom: 1rem;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    gap: 0.5rem;
}

.slider-indicator {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.5);
    cursor: pointer;
    transition: background 0.3s ease;
}

.slider-indicator.active {
    background: var(--fespaco-accent);
}

.lazy {
    opacity: 0;
    transition: opacity 0.3s ease;
}

.lazy.loaded {
    opacity: 1;
}

.error-handled {
    filter: grayscale(1);
    opacity: 0.5;
}

@media (max-width: 768px) {
    .gallery-grid {
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: 1rem;
    }
    
    .slider-container {
        height: 300px;
    }
    
    .slider-controls {
        padding: 0 1rem;
    }
    
    .slider-prev,
    .slider-next {
        padding: 0.5rem;
        font-size: 1.2rem;
    }
}
</style>
`;

// Ajouter les styles
document.head.insertAdjacentHTML('beforeend', styles); 