// Slider Logic
const slides = document.querySelectorAll('.slide');
const dotsContainer = document.querySelector('.dots');
const slider = document.querySelector('.slider');
let currentSlide = 0;
let slideInterval;

// Create dots dynamically
function createDots() {
    slides.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        if (index === 0) dot.classList.add('active');

        // Add click event to dot
        dot.addEventListener('click', () => {
            goToSlide(index);
            resetTimer(); // Reset auto-slide timer on interaction
        });

        dotsContainer.appendChild(dot);
    });
}

// Update active dot class
function updateDots() {
    const dots = document.querySelectorAll('.dot');
    dots.forEach((dot, index) => {
        if (index === currentSlide) {
            dot.classList.add('active');
        } else {
            dot.classList.remove('active');
        }
    });
}

// Go to specific slide
function goToSlide(index) {
    // Remove active class from current
    slides[currentSlide].classList.remove('active');

    // Calculate new index (looping)
    currentSlide = (index + slides.length) % slides.length;

    // Add active class to new
    slides[currentSlide].classList.add('active');

    // Update dots
    updateDots();
}

// Next slide helper
function nextSlide() {
    goToSlide(currentSlide + 1);
}

// Prev slide helper
function prevSlide() {
    goToSlide(currentSlide - 1);
}

// Timer Logic
function startTimer() {
    slideInterval = setInterval(nextSlide, 4000);
}

function resetTimer() {
    clearInterval(slideInterval);
    startTimer();
}

// Initialize Slider
if (slides.length > 0) {
    createDots();
    startTimer();
}

// Touch / Swipe Logic
let touchStartX = 0;
let touchEndX = 0;

if (slider) {
    slider.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true }); // passive improves scroll performance

    slider.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, { passive: true });
}

function handleSwipe() {
    const swipeThreshold = 50; // Minimum distance to count as swipe
    const diff = touchStartX - touchEndX;

    if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
            // Swipe Left -> Next Slide
            nextSlide();
        } else {
            // Swipe Right -> Prev Slide
            prevSlide();
        }
        resetTimer();
    }
}

// Mobile Menu Toggle
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });
}