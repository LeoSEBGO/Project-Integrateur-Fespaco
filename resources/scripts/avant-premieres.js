// Avant-Premières Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initFilterButtons();
    initFilmCards();
    initScheduleTabs();
    initAnimations();
    initScrollEffects();
});

// Filter functionality for films
function initFilterButtons() {
    const filterButtons = document.querySelectorAll('.filter-buttons .btn');
    const filmCards = document.querySelectorAll('#films-grid .col-lg-4');

    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            const filter = this.getAttribute('data-filter');
            
            // Filter films
            filmCards.forEach(card => {
                const category = card.getAttribute('data-category');
                
                if (filter === 'all' || category === filter) {
                    card.style.display = 'block';
                    card.classList.add('fade-in');
                } else {
                    card.style.display = 'none';
                    card.classList.remove('fade-in');
                }
            });
        });
    });
}

// Film card interactions
function initFilmCards() {
    const filmCards = document.querySelectorAll('.film-card');
    
    filmCards.forEach(card => {
        // Add hover effects
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
        
        // Add click handlers for action buttons
        const actionButtons = card.querySelectorAll('.film-actions .btn');
        actionButtons.forEach(button => {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                
                const action = this.textContent.trim();
                const filmTitle = card.querySelector('h4, h5').textContent;
                
                handleFilmAction(action, filmTitle);
            });
        });
    });
}

// Handle film actions (trailer, details, etc.)
function handleFilmAction(action, filmTitle) {
    if (action.includes('Bande-annonce')) {
        showTrailerModal(filmTitle);
    } else if (action.includes('Détails')) {
        showFilmDetails(filmTitle);
    }
}

// Show trailer modal
function showTrailerModal(filmTitle) {
    // Create modal HTML
    const modalHTML = `
        <div class="modal fade" id="trailerModal" tabindex="-1">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Bande-annonce - ${filmTitle}</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                    </div>
                    <div class="modal-body text-center">
                        <div class="ratio ratio-16x9">
                            <iframe src="https://www.youtube.com/embed/dQw4w9WgXcQ" 
                                    title="Bande-annonce" 
                                    frameborder="0" 
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                                    allowfullscreen>
                            </iframe>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // Remove existing modal if any
    const existingModal = document.getElementById('trailerModal');
    if (existingModal) {
        existingModal.remove();
    }
    
    // Add modal to body
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    
    // Show modal
    const modal = new bootstrap.Modal(document.getElementById('trailerModal'));
    modal.show();
    
    // Clean up modal when hidden
    document.getElementById('trailerModal').addEventListener('hidden.bs.modal', function() {
        this.remove();
    });
}

// Show film details
function showFilmDetails(filmTitle) {
    // Create modal HTML
    const modalHTML = `
        <div class="modal fade" id="detailsModal" tabindex="-1">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Détails - ${filmTitle}</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                    </div>
                    <div class="modal-body">
                        <div class="row">
                            <div class="col-md-4">
                                <img src="../resources/assets/images/slide/Couverture-1.jpeg" 
                                     alt="${filmTitle}" 
                                     class="img-fluid rounded">
                            </div>
                            <div class="col-md-8">
                                <h4>${filmTitle}</h4>
                                <div class="film-meta mb-3">
                                    <span class="badge bg-primary me-2">Burkina Faso</span>
                                    <span class="badge bg-secondary me-2">120 min</span>
                                    <span class="badge bg-warning">Drame</span>
                                </div>
                                <p><strong>Réalisateur:</strong> Amadou Koné</p>
                                <p><strong>Distribution:</strong> Fatou Traoré, Issouf Ouédraogo</p>
                                <p><strong>Synopsis:</strong> Une histoire poignante sur la quête d'identité et la résilience face aux défis de la vie moderne en Afrique. Ce film explore les thèmes universels de la famille, de l'amour et de la persévérance dans un contexte africain contemporain.</p>
                                <div class="mt-3">
                                    <button class="btn btn-warning me-2">
                                        <i class="fas fa-play me-2"></i>Voir la bande-annonce
                                    </button>
                                    <button class="btn btn-primary">
                                        <i class="fas fa-ticket-alt me-2"></i>Réserver une place
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // Remove existing modal if any
    const existingModal = document.getElementById('detailsModal');
    if (existingModal) {
        existingModal.remove();
    }
    
    // Add modal to body
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    
    // Show modal
    const modal = new bootstrap.Modal(document.getElementById('detailsModal'));
    modal.show();
    
    // Clean up modal when hidden
    document.getElementById('detailsModal').addEventListener('hidden.bs.modal', function() {
        this.remove();
    });
}

// Schedule tabs functionality
function initScheduleTabs() {
    const scheduleTabs = document.querySelectorAll('#scheduleTabs .nav-link');
    
    scheduleTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // Add loading state
            const tabContent = document.querySelector(this.getAttribute('data-bs-target'));
            tabContent.classList.add('loading');
            
            // Simulate loading delay
            setTimeout(() => {
                tabContent.classList.remove('loading');
            }, 500);
        });
    });
    
    // Add click handlers for reservation buttons
    const reservationButtons = document.querySelectorAll('.schedule-item .btn');
    reservationButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            const filmTitle = this.closest('.schedule-item').querySelector('h5').textContent;
            const time = this.closest('.schedule-item').querySelector('.time').textContent;
            
            showReservationModal(filmTitle, time);
        });
    });
}

// Show reservation modal
function showReservationModal(filmTitle, time) {
    const modalHTML = `
        <div class="modal fade" id="reservationModal" tabindex="-1">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Réserver une place</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                    </div>
                    <div class="modal-body">
                        <div class="alert alert-info">
                            <i class="fas fa-info-circle me-2"></i>
                            Réservation pour <strong>${filmTitle}</strong> à <strong>${time}</strong>
                        </div>
                        <form>
                            <div class="mb-3">
                                <label for="reservationName" class="form-label">Nom complet</label>
                                <input type="text" class="form-control" id="reservationName" required>
                            </div>
                            <div class="mb-3">
                                <label for="reservationEmail" class="form-label">Email</label>
                                <input type="email" class="form-control" id="reservationEmail" required>
                            </div>
                            <div class="mb-3">
                                <label for="reservationPhone" class="form-label">Téléphone</label>
                                <input type="tel" class="form-control" id="reservationPhone" required>
                            </div>
                            <div class="mb-3">
                                <label for="reservationSeats" class="form-label">Nombre de places</label>
                                <select class="form-select" id="reservationSeats" required>
                                    <option value="">Choisir...</option>
                                    <option value="1">1 place</option>
                                    <option value="2">2 places</option>
                                    <option value="3">3 places</option>
                                    <option value="4">4 places</option>
                                    <option value="5">5 places</option>
                                </select>
                            </div>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Annuler</button>
                        <button type="button" class="btn btn-primary" onclick="submitReservation()">
                            <i class="fas fa-check me-2"></i>Confirmer la réservation
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // Remove existing modal if any
    const existingModal = document.getElementById('reservationModal');
    if (existingModal) {
        existingModal.remove();
    }
    
    // Add modal to body
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    
    // Show modal
    const modal = new bootstrap.Modal(document.getElementById('reservationModal'));
    modal.show();
    
    // Clean up modal when hidden
    document.getElementById('reservationModal').addEventListener('hidden.bs.modal', function() {
        this.remove();
    });
}

// Submit reservation
function submitReservation() {
    const name = document.getElementById('reservationName').value;
    const email = document.getElementById('reservationEmail').value;
    const phone = document.getElementById('reservationPhone').value;
    const seats = document.getElementById('reservationSeats').value;
    
    if (!name || !email || !phone || !seats) {
        alert('Veuillez remplir tous les champs obligatoires.');
        return;
    }
    
    // Simulate reservation submission
    const submitButton = document.querySelector('#reservationModal .btn-primary');
    const originalText = submitButton.innerHTML;
    
    submitButton.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Traitement...';
    submitButton.disabled = true;
    
    setTimeout(() => {
        // Close modal
        const modal = bootstrap.Modal.getInstance(document.getElementById('reservationModal'));
        modal.hide();
        
        // Show success message
        showSuccessMessage('Réservation confirmée ! Vous recevrez un email de confirmation.');
        
        // Reset button
        submitButton.innerHTML = originalText;
        submitButton.disabled = false;
    }, 2000);
}

// Show success message
function showSuccessMessage(message) {
    const alertHTML = `
        <div class="alert alert-success alert-dismissible fade show position-fixed" 
             style="top: 20px; right: 20px; z-index: 9999; min-width: 300px;">
            <i class="fas fa-check-circle me-2"></i>
            ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', alertHTML);
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        const alert = document.querySelector('.alert-success');
        if (alert) {
            alert.remove();
        }
    }, 5000);
}

// Initialize animations
function initAnimations() {
    // Add animation classes to elements when they come into view
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.film-card, .schedule-item, .stat-item');
    animatedElements.forEach(el => {
        observer.observe(el);
    });
}

// Initialize scroll effects
function initScrollEffects() {
    // Parallax effect for hero section
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const heroBackground = document.querySelector('.hero-background');
        
        if (heroBackground) {
            heroBackground.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    });
    
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Utility functions
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

// Handle window resize
window.addEventListener('resize', debounce(function() {
    // Reinitialize components if needed
    initFilterButtons();
}, 250));

// Add loading states for better UX
function showLoading(element) {
    element.classList.add('loading');
}

function hideLoading(element) {
    element.classList.remove('loading');
}

// Export functions for global access
window.handleFilmAction = handleFilmAction;
window.submitReservation = submitReservation; 