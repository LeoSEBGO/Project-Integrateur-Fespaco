/* FESPACO - JavaScript pour la page Contact */

class FespacoContactPage {
    constructor() {
        this.form = null;
        this.isSubmitting = false;
        this.init();
    }

    init() {
        this.setupForm();
        this.setupSocialLinks();
        this.setupScrollAnimations();
        this.setupFormValidation();
        this.setupMapInteraction();
    }

    // Configuration du formulaire
    setupForm() {
        this.form = document.querySelector('.contact-form');
        
        if (this.form) {
            this.form.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleFormSubmit();
            });

            // Animation des champs au focus
            const formControls = this.form.querySelectorAll('.form-control');
            formControls.forEach(control => {
                control.addEventListener('focus', () => {
                    this.animateFieldFocus(control);
                });

                control.addEventListener('blur', () => {
                    this.validateField(control);
                });

                control.addEventListener('input', () => {
                    this.clearFieldError(control);
                });
            });
        }
    }

    // Animation des champs au focus
    animateFieldFocus(field) {
        const formGroup = field.closest('.form-group');
        const label = formGroup.querySelector('.form-label');
        
        if (label) {
            label.style.color = 'var(--primary-gold)';
            label.style.transform = 'scale(1.05)';
        }

        field.style.borderColor = 'var(--primary-gold)';
        field.style.boxShadow = '0 0 0 0.3rem rgba(212, 175, 55, 0.25)';
    }

    // Validation des champs
    validateField(field) {
        const formGroup = field.closest('.form-group');
        const label = formGroup.querySelector('.form-label');
        const value = field.value.trim();
        let isValid = true;
        let errorMessage = '';

        // Réinitialiser les styles
        if (label) {
            label.style.color = 'var(--primary-gold)';
            label.style.transform = 'scale(1)';
        }

        // Validation selon le type de champ
        switch (field.name) {
            case 'nom':
                if (!value) {
                    isValid = false;
                    errorMessage = 'Le nom est requis';
                } else if (value.length < 2) {
                    isValid = false;
                    errorMessage = 'Le nom doit contenir au moins 2 caractères';
                }
                break;

            case 'email':
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!value) {
                    isValid = false;
                    errorMessage = 'L\'email est requis';
                } else if (!emailRegex.test(value)) {
                    isValid = false;
                    errorMessage = 'Format d\'email invalide';
                }
                break;

            case 'sujet':
                if (!value) {
                    isValid = false;
                    errorMessage = 'Le sujet est requis';
                } else if (value.length < 5) {
                    isValid = false;
                    errorMessage = 'Le sujet doit contenir au moins 5 caractères';
                }
                break;

            case 'message':
                if (!value) {
                    isValid = false;
                    errorMessage = 'Le message est requis';
                } else if (value.length < 20) {
                    isValid = false;
                    errorMessage = 'Le message doit contenir au moins 20 caractères';
                }
                break;

            case 'telephone':
                if (value && !/^[\d\s+\-()]+$/.test(value)) {
                    isValid = false;
                    errorMessage = 'Format de téléphone invalide';
                }
                break;
        }

        // Afficher ou masquer l'erreur
        if (!isValid) {
            this.showFieldError(field, errorMessage);
        } else {
            this.clearFieldError(field);
        }

        return isValid;
    }

    // Afficher l'erreur sur un champ
    showFieldError(field, message) {
        const formGroup = field.closest('.form-group');
        let errorElement = formGroup.querySelector('.field-error');
        
        if (!errorElement) {
            errorElement = document.createElement('div');
            errorElement.className = 'field-error';
            errorElement.style.cssText = `
                color: #dc3545;
                font-size: 0.875rem;
                margin-top: 0.25rem;
                opacity: 0;
                transform: translateY(-10px);
                transition: all 0.3s ease;
            `;
            formGroup.appendChild(errorElement);
        }

        errorElement.textContent = message;
        field.style.borderColor = '#dc3545';
        
        setTimeout(() => {
            errorElement.style.opacity = '1';
            errorElement.style.transform = 'translateY(0)';
        }, 50);
    }

    // Effacer l'erreur sur un champ
    clearFieldError(field) {
        const formGroup = field.closest('.form-group');
        const errorElement = formGroup.querySelector('.field-error');
        
        if (errorElement) {
            errorElement.style.opacity = '0';
            errorElement.style.transform = 'translateY(-10px)';
            setTimeout(() => {
                errorElement.remove();
            }, 300);
        }

        field.style.borderColor = 'rgba(212, 175, 55, 0.3)';
    }

    // Configuration de la validation du formulaire
    setupFormValidation() {
        const checkbox = document.querySelector('.checkbox-input');
        
        if (checkbox) {
            checkbox.addEventListener('change', () => {
                this.validateCheckbox(checkbox);
            });
        }
    }

    // Validation de la checkbox
    validateCheckbox(checkbox) {
        const formCheckbox = checkbox.closest('.form-checkbox');
        let errorElement = formCheckbox.querySelector('.checkbox-error');
        
        if (!checkbox.checked) {
            if (!errorElement) {
                errorElement = document.createElement('div');
                errorElement.className = 'checkbox-error';
                errorElement.style.cssText = `
                    color: #dc3545;
                    font-size: 0.875rem;
                    margin-top: 0.25rem;
                    opacity: 0;
                    transform: translateY(-10px);
                    transition: all 0.3s ease;
                `;
                formCheckbox.appendChild(errorElement);
            }
            
            errorElement.textContent = 'Vous devez accepter les conditions';
            setTimeout(() => {
                errorElement.style.opacity = '1';
                errorElement.style.transform = 'translateY(0)';
            }, 50);
            
            return false;
        } else {
            if (errorElement) {
                errorElement.style.opacity = '0';
                errorElement.style.transform = 'translateY(-10px)';
                setTimeout(() => {
                    errorElement.remove();
                }, 300);
            }
            return true;
        }
    }

    // Gestion de la soumission du formulaire
    async handleFormSubmit() {
        if (this.isSubmitting) return;

        const formData = new FormData(this.form);
        const data = {};
        
        // Collecter les données
        for (let [key, value] of formData.entries()) {
            data[key] = value;
        }

        // Validation complète
        const isValid = this.validateForm();
        
        if (!isValid) {
            this.showFormMessage('Veuillez corriger les erreurs dans le formulaire', 'error');
            return;
        }

        // Afficher le loader
        this.showFormLoading(true);
        this.isSubmitting = true;

        try {
            // Simulation d'envoi (remplacer par vraie API)
            await this.simulateFormSubmission(data);
            
            // Succès
            this.showFormMessage('Votre message a été envoyé avec succès !', 'success');
            this.form.reset();
            this.createSuccessAnimation();
            
        } catch (error) {
            // Erreur
            this.showFormMessage('Une erreur est survenue. Veuillez réessayer.', 'error');
            console.error('Erreur lors de l\'envoi:', error);
        } finally {
            this.showFormLoading(false);
            this.isSubmitting = false;
        }
    }

    // Validation complète du formulaire
    validateForm() {
        const fields = this.form.querySelectorAll('.form-control');
        const checkbox = this.form.querySelector('.checkbox-input');
        let isValid = true;

        // Valider tous les champs
        fields.forEach(field => {
            if (!this.validateField(field)) {
                isValid = false;
            }
        });

        // Valider la checkbox
        if (checkbox && !this.validateCheckbox(checkbox)) {
            isValid = false;
        }

        return isValid;
    }

    // Simulation d'envoi du formulaire
    simulateFormSubmission(data) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                // Simulation d'une réponse aléatoire
                if (Math.random() > 0.1) { // 90% de succès
                    resolve(data);
                } else {
                    reject(new Error('Erreur de simulation'));
                }
            }, 2000);
        });
    }

    // Afficher le message du formulaire
    showFormMessage(message, type) {
        let messageElement = document.querySelector('.form-message');
        
        if (!messageElement) {
            messageElement = document.createElement('div');
            messageElement.className = 'form-message';
            this.form.appendChild(messageElement);
        }

        messageElement.textContent = message;
        messageElement.className = `form-message ${type}`;
        messageElement.classList.add('show');
        
        setTimeout(() => {
            messageElement.classList.remove('show');
        }, 5000);
    }

    // Afficher/masquer le loader
    showFormLoading(show) {
        const submitBtn = this.form.querySelector('.submit-btn');
        const loader = this.form.querySelector('.form-loading');
        
        if (show) {
            submitBtn.disabled = true;
            submitBtn.style.opacity = '0.7';
            
            if (!loader) {
                const loaderElement = document.createElement('div');
                loaderElement.className = 'form-loading show';
                loaderElement.innerHTML = `
                    <div class="spinner"></div>
                    <span class="loading-text">Envoi en cours...</span>
                `;
                this.form.appendChild(loaderElement);
            } else {
                loader.classList.add('show');
            }
        } else {
            submitBtn.disabled = false;
            submitBtn.style.opacity = '1';
            
            if (loader) {
                loader.classList.remove('show');
            }
        }
    }

    // Animation de succès
    createSuccessAnimation() {
        const successElement = document.createElement('div');
        successElement.className = 'success-animation';
        successElement.innerHTML = `
            <div class="success-icon">
                <i class="fas fa-check-circle"></i>
            </div>
        `;
        successElement.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%) scale(0);
            z-index: 1000;
            color: var(--primary-gold);
            font-size: 4rem;
            text-align: center;
            transition: transform 0.3s ease;
        `;
        
        document.body.appendChild(successElement);
        
        setTimeout(() => {
            successElement.style.transform = 'translate(-50%, -50%) scale(1)';
        }, 100);
        
        setTimeout(() => {
            successElement.style.transform = 'translate(-50%, -50%) scale(0)';
            setTimeout(() => {
                document.body.removeChild(successElement);
            }, 300);
        }, 2000);
    }

    // Configuration des liens sociaux
    setupSocialLinks() {
        const socialLinks = document.querySelectorAll('.social-link');
        
        socialLinks.forEach(link => {
            link.addEventListener('mouseenter', () => {
                link.style.transform = 'translateY(-10px) scale(1.1)';
            });

            link.addEventListener('mouseleave', () => {
                link.style.transform = 'translateY(0) scale(1)';
            });

            link.addEventListener('click', (e) => {
                // Animation de clic
                link.style.transform = 'translateY(-15px) scale(1.2)';
                setTimeout(() => {
                    link.style.transform = 'translateY(-10px) scale(1.1)';
                }, 150);
            });
        });
    }

    // Configuration des animations au scroll
    setupScrollAnimations() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate');
                    
                    // Animation spéciale pour les cartes d'info
                    if (entry.target.classList.contains('contact-info-card')) {
                        this.animateInfoCard(entry.target);
                    }
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        // Observer les éléments
        document.querySelectorAll('.fade-in-up, .contact-info-card').forEach(el => {
            observer.observe(el);
        });
    }

    // Animation des cartes d'info
    animateInfoCard(card) {
        const icon = card.querySelector('.info-icon');
        
        if (icon) {
            setTimeout(() => {
                icon.style.transform = 'scale(1.2) rotateY(360deg)';
                setTimeout(() => {
                    icon.style.transform = 'scale(1) rotateY(0deg)';
                }, 600);
            }, 300);
        }
    }

    // Configuration de l'interaction avec la carte
    setupMapInteraction() {
        const mapSection = document.querySelector('.map-section');
        
        if (mapSection) {
            mapSection.addEventListener('click', () => {
                this.showMapModal();
            });
        }
    }

    // Afficher le modal de la carte
    showMapModal() {
        const modal = document.createElement('div');
        modal.className = 'map-modal';
        modal.innerHTML = `
            <div class="map-modal-content">
                <div class="map-modal-header">
                    <h3>Localisation FESPACO</h3>
                    <button class="map-modal-close">&times;</button>
                </div>
                <div class="map-modal-body">
                    <div class="map-placeholder">
                        <i class="fas fa-map-marker-alt"></i>
                        <h4>Ouagadougou, Burkina Faso</h4>
                        <p>Adresse complète du festival</p>
                        <a href="https://maps.google.com" target="_blank" class="btn-map">
                            Voir sur Google Maps
                        </a>
                    </div>
                </div>
            </div>
        `;
        
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.8);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 1000;
            opacity: 0;
            transition: opacity 0.3s ease;
        `;
        
        document.body.appendChild(modal);
        
        setTimeout(() => {
            modal.style.opacity = '1';
        }, 100);
        
        // Fermer le modal
        const closeBtn = modal.querySelector('.map-modal-close');
        const closeModal = () => {
            modal.style.opacity = '0';
            setTimeout(() => {
                document.body.removeChild(modal);
            }, 300);
        };
        
        closeBtn.addEventListener('click', closeModal);
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal();
            }
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
    new FespacoContactPage();
});

// Gestion responsive
window.addEventListener('resize', () => {
    if (window.innerWidth < 768) {
        // Adapter le formulaire pour mobile
        const formRows = document.querySelectorAll('.form-row');
        formRows.forEach(row => {
            row.style.gridTemplateColumns = '1fr';
        });
    }
});

// Gestion des raccourcis clavier
document.addEventListener('keydown', (e) => {
    // Ctrl + Enter pour soumettre le formulaire
    if (e.ctrlKey && e.key === 'Enter') {
        const form = document.querySelector('.contact-form');
        if (form) {
            form.dispatchEvent(new Event('submit'));
        }
    }
}); 