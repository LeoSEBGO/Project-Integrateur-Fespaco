let currentSlideIndex = 0;
const slides = document.querySelectorAll('.slide');
const indicators = document.querySelectorAll('.indicator');
let slideInterval;

function showSlide(index) {
    slides.forEach(slide => slide.classList.remove('active'));
    indicators.forEach(indicator => indicator.classList.remove('active'));
    
    slides[index].classList.add('active');
    indicators[index].classList.add('active');
}

function nextSlide() {
    currentSlideIndex = (currentSlideIndex + 1) % slides.length;
    showSlide(currentSlideIndex);
}

function previousSlide() {
    currentSlideIndex = (currentSlideIndex - 1 + slides.length) % slides.length;
    showSlide(currentSlideIndex);
}

function currentSlide(index) {
    currentSlideIndex = index - 1;
    showSlide(currentSlideIndex);
    resetInterval();
}

function resetInterval() {
    clearInterval(slideInterval);
    slideInterval = setInterval(nextSlide, 4000);
}

function startSlideShow() {
    slideInterval = setInterval(nextSlide, 4000);
}

function openTrailerModal() {
    const modal = new bootstrap.Modal(document.getElementById('trailerModal'));
    modal.show();
    
    const video = document.getElementById('trailerVideo');
    if (video) {
        video.currentTime = 0;
        video.play();
    }
}

function closeTrailerModal() {
    const video = document.getElementById('trailerVideo');
    if (video) {
        video.pause();
    }
}

window.previousSlide = previousSlide;
window.nextSlide = nextSlide;
window.currentSlide = currentSlide;
window.openTrailerModal = openTrailerModal;

document.addEventListener('DOMContentLoaded', function() {
    startSlideShow();
    
    const sliderControls = document.querySelector('.slider-controls');
    if (sliderControls) {
        sliderControls.addEventListener('mouseenter', () => clearInterval(slideInterval));
        sliderControls.addEventListener('mouseleave', startSlideShow);
    }
    
    const trailerButtons = document.querySelectorAll('button');
    trailerButtons.forEach(button => {
        if (button.textContent.includes('Bande-annonce')) {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                openTrailerModal();
            });
        }
    });
    
    const trailerModal = document.getElementById('trailerModal');
    if (trailerModal) {
        trailerModal.addEventListener('hidden.bs.modal', closeTrailerModal);
    }
}); 