/**
 * FESPACO - Scripts de la page contact
 * Fonctionnalités interactives et animations
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialisation des animations
    initContactAnimations();
    
    // Gestion du formulaire de contact
    initContactForm();
    
    // Animations des cartes de contact
    initContactCards();
    
    // Gestion des réseaux sociaux
    initSocialLinks();
    
    // Validation en temps réel
    initFormValidation();
});

/**
 * Initialisation des animations de la page contact
 */
function initContactAnimations() {
    // Animation des cartes au scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observer les éléments à animer
    document.querySelectorAll('.contact-card, .location-card, .transport-info, .social-card').forEach(el => {
        observer.observe(el);
    });
    
    // Animation du hero
    setTimeout(() => {
        document.querySelector('.hero-section-contact h1')?.classList.add('fade-in-up');
    }, 100);
    
    setTimeout(() => {
        document.querySelector('.hero-section-contact .lead')?.classList.add('fade-in-up');
    }, 300);
}

/**
 * Gestion du formulaire de contact
 */
function initContactForm() {
    const form = document.querySelector('.contact-form-3d');
    if (!form) return;
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Validation du formulaire
        if (validateForm()) {
            // Simulation d'envoi
            showFormSuccess();
        }
    });
    
    // Animation des champs au focus
    const inputs = form.querySelectorAll('input, textarea, select');
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', function() {
            if (!this.value) {
                this.parentElement.classList.remove('focused');
            }
        });
    });
}

/**
 * Validation du formulaire
 */
function validateForm() {
    const form = document.querySelector('.contact-form-3d');
    const requiredFields = form.querySelectorAll('[required]');
    let isValid = true;
    
    requiredFields.forEach(field => {
        if (!field.value.trim()) {
            showFieldError(field, 'Ce champ est requis');
            isValid = false;
        } else {
            clearFieldError(field);
        }
        
        // Validation email
        if (field.type === 'email' && field.value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(field.value)) {
                showFieldError(field, 'Email invalide');
                isValid = false;
            }
        }
        
        // Validation téléphone
        if (field.type === 'tel' && field.value) {
            const phoneRegex = /^[\+]?[0-9\s\-\(\)]{8,}$/;
            if (!phoneRegex.test(field.value)) {
                showFieldError(field, 'Numéro de téléphone invalide');
                isValid = false;
            }
        }
    });
    
    return isValid;
}

/**
 * Affichage des erreurs de champ
 */
function showFieldError(field, message) {
    clearFieldError(field);
    
    const errorDiv = document.createElement('div');
    errorDiv.className = 'field-error';
    errorDiv.textContent = message;
    errorDiv.style.cssText = `
        color: #dc3545;
        font-size: 0.875rem;
        margin-top: 0.25rem;
        animation: slideInDown 0.3s ease-out;
    `;
    
    field.parentElement.appendChild(errorDiv);
    field.classList.add('is-invalid');
}

/**
 * Suppression des erreurs de champ
 */
function clearFieldError(field) {
    const existingError = field.parentElement.querySelector('.field-error');
    if (existingError) {
        existingError.remove();
    }
    field.classList.remove('is-invalid');
}

/**
 * Affichage du succès du formulaire
 */
function showFormSuccess() {
    const form = document.querySelector('.contact-form-3d');
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    
    // Animation du bouton
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Envoi en cours...';
    submitBtn.disabled = true;
    
    // Simulation d'envoi
    setTimeout(() => {
        // Réinitialiser le formulaire
        form.reset();
        
        // Message de succès
        const successMessage = document.createElement('div');
        successMessage.className = 'alert alert-success mt-3';
        successMessage.innerHTML = `
            <i class="fas fa-check-circle me-2"></i>
            Votre message a été envoyé avec succès ! Nous vous répondrons dans les plus brefs délais.
        `;
        
        form.appendChild(successMessage);
        
        // Réinitialiser le bouton
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
        
        // Supprimer le message après 5 secondes
        setTimeout(() => {
            successMessage.remove();
        }, 5000);
        
        // Scroll vers le message
        successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
        
    }, 2000);
}

/**
 * Initialisation des cartes de contact
 */
function initContactCards() {
    const cards = document.querySelectorAll('.contact-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
        
        // Animation au clic
        card.addEventListener('click', function() {
            this.style.transform = 'translateY(-5px) scale(0.98)';
            setTimeout(() => {
                this.style.transform = 'translateY(-10px) scale(1.02)';
            }, 150);
        });
    });
}

/**
 * Initialisation des liens sociaux
 */
function initSocialLinks() {
    const socialLinks = document.querySelectorAll('.social-link-3d');
    
    socialLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Animation au clic
            const card = this.querySelector('.social-card');
            card.style.transform = 'translateY(-15px) rotateX(10deg) rotateY(10deg)';
            
            setTimeout(() => {
                card.style.transform = 'translateY(-10px) rotateX(5deg) rotateY(5deg)';
            }, 200);
        });
    });
}

/**
 * Validation en temps réel
 */
function initFormValidation() {
    const form = document.querySelector('.contact-form-3d');
    if (!form) return;
    
    const inputs = form.querySelectorAll('input, textarea, select');
    
    inputs.forEach(input => {
        input.addEventListener('input', function() {
            if (this.value.trim()) {
                this.classList.add('is-valid');
                this.classList.remove('is-invalid');
                clearFieldError(this);
            } else {
                this.classList.remove('is-valid');
            }
        });
        
        input.addEventListener('blur', function() {
            if (this.hasAttribute('required') && !this.value.trim()) {
                this.classList.add('is-invalid');
            }
        });
    });
}

/**
 * Gestion de la carte interactive
 */
function initMapInteractions() {
    // Contrôles de zoom personnalisés
    const zoomInBtn = document.querySelector('.map-control-btn[onclick*="setZoom"]');
    const zoomOutBtn = document.querySelector('.map-control-btn[onclick*="setZoom"]');
    const centerBtn = document.querySelector('.map-control-btn[onclick*="setCenter"]');
    
    if (zoomInBtn) {
        zoomInBtn.addEventListener('click', function() {
            this.style.transform = 'scale(0.9)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
        });
    }
    
    if (zoomOutBtn) {
        zoomOutBtn.addEventListener('click', function() {
            this.style.transform = 'scale(0.9)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
        });
    }
    
    if (centerBtn) {
        centerBtn.addEventListener('click', function() {
            this.style.transform = 'scale(0.9)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
        });
    }
}

/**
 * Animations CSS personnalisées
 */
const customAnimations = `
    @keyframes slideInDown {
        from {
            opacity: 0;
            transform: translateY(-10px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    @keyframes pulse {
        0%, 100% {
            transform: scale(1);
        }
        50% {
            transform: scale(1.05);
        }
    }
    
    .contact-card:hover .contact-icon {
        animation: pulse 1s ease-in-out;
    }
    
    .form-group.focused .form-label {
        color: var(--primary-blue);
        transform: translateY(-2px);
    }
    
    .is-valid {
        border-color: #198754 !important;
        box-shadow: 0 0 0 0.2rem rgba(25, 135, 84, 0.25) !important;
    }
    
    .is-invalid {
        border-color: #dc3545 !important;
        box-shadow: 0 0 0 0.2rem rgba(220, 53, 69, 0.25) !important;
    }
`;

// Ajouter les animations CSS
const style = document.createElement('style');
style.textContent = customAnimations;
document.head.appendChild(style);

/**
 * Gestion du responsive
 */
function handleResponsive() {
    const mapContainer = document.querySelector('.map-container');
    const mapOverlay = document.querySelector('.map-overlay');
    
    if (window.innerWidth <= 767) {
        if (mapOverlay) {
            mapOverlay.style.position = 'relative';
            mapOverlay.style.top = '0';
            mapOverlay.style.left = '0';
            mapOverlay.style.marginTop = '1rem';
        }
    } else {
        if (mapOverlay) {
            mapOverlay.style.position = 'absolute';
            mapOverlay.style.top = '1rem';
            mapOverlay.style.left = '1rem';
            mapOverlay.style.marginTop = '0';
        }
    }
}

// Écouter les changements de taille d'écran
window.addEventListener('resize', handleResponsive);

// Initialiser au chargement
handleResponsive();

/**
 * Gestion de l'accessibilité
 */
function initAccessibility() {
    // Navigation au clavier
    const focusableElements = document.querySelectorAll('button, input, textarea, select, a[href]');
    
    focusableElements.forEach(element => {
        element.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    });
    
    // Annonces pour les lecteurs d'écran
    const form = document.querySelector('.contact-form-3d');
    if (form) {
        form.setAttribute('aria-label', 'Formulaire de contact FESPACO');
    }
    
    const map = document.getElementById('fespaco-map');
    if (map) {
        map.setAttribute('aria-label', 'Carte interactive montrant l\'emplacement du FESPACO à Ouagadougou');
    }
}

// Initialiser l'accessibilité
initAccessibility();

/**
 * Gestion des erreurs
 */
window.addEventListener('error', function(e) {
    console.error('Erreur JavaScript:', e.error);
    
    // Afficher un message d'erreur convivial
    if (e.error && e.error.message.includes('Google Maps')) {
        const mapContainer = document.getElementById('fespaco-map');
        if (mapContainer) {
            mapContainer.innerHTML = `
                <div class="map-fallback">
                    <div class="map-fallback-content">
                        <i class="fas fa-exclamation-triangle fa-4x text-warning mb-3"></i>
                        <h4>Erreur de chargement de la carte</h4>
                        <p>Impossible de charger la carte interactive.</p>
                        <a href="https://maps.google.com/?q=Ouagadougou,Burkina+Faso" target="_blank" class="btn btn-primary">
                            <i class="fas fa-external-link-alt me-2"></i>Voir sur Google Maps
                        </a>
                    </div>
                </div>
            `;
        }
    }
});

// Exporter les fonctions pour utilisation globale
window.FESPACOContact = {
    initContactAnimations,
    initContactForm,
    validateForm,
    showFormSuccess,
    initMapInteractions,
    handleResponsive
}; 