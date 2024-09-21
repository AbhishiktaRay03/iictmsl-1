document.addEventListener('DOMContentLoaded', () => {
    const carousel = document.querySelector('.carousel');
    let cards = document.querySelectorAll('.carousel-card'); // Get cards dynamically
    const navDots = document.querySelectorAll('.carousel-nav-dot');
    const cardWidth = cards[0].offsetWidth + 20; // Adjust for margin
    const visibleCards = 3; // Show 3 cards at a time
    let currentIndex = 0;

    // Clone first few cards for infinite loop effect
    function cloneCards() {
        for (let i = 0; i < visibleCards; i++) {
            const clone = cards[i].cloneNode(true);
            carousel.appendChild(clone);
        }
        cards = document.querySelectorAll('.carousel-card'); // Refresh NodeList after cloning
    }

    cloneCards();

    function updateCarousel() {
        const offset = -currentIndex * cardWidth;
        carousel.style.transform = `translateX(${offset}px)`;

        // Get the center card (2nd of 3 visible cards)
        const centerIndex = (currentIndex + 1) % cards.length;

        // Enlarge center card and reset others
        cards.forEach((card) => card.classList.remove('carousel-card-active'));
        cards[centerIndex].classList.add('carousel-card-active');

        // Update the navigation dots to match the center card
        const dotIndex = (currentIndex + 1) % navDots.length;
        navDots.forEach((dot, index) => {
            if (index === dotIndex) {
                dot.classList.add('carousel-nav-dot-active');
            } else {
                dot.classList.remove('carousel-nav-dot-active');
            }
        });
    }

    function nextSlide() {
        currentIndex++;

        // If at the last card, reset carousel
        if (currentIndex >= cards.length - visibleCards) {
            currentIndex = 0;
            carousel.style.transition = 'none'; // Disable transition temporarily
            carousel.style.transform = `translateX(0)`; // Reset position
            setTimeout(() => {
                carousel.style.transition = 'transform 0.5s ease'; // Re-enable transition
            }, 0);
        }
        updateCarousel();
    }

    function prevSlide() {
        currentIndex--;

        // If at the first card, jump to the end of the carousel
        if (currentIndex < 0) {
            currentIndex = cards.length - visibleCards - 1;
            carousel.style.transition = 'none'; // Disable transition temporarily
            carousel.style.transform = `translateX(${-(cards.length - visibleCards) * cardWidth}px)`; // Jump to last set
            setTimeout(() => {
                carousel.style.transition = 'transform 0.5s ease'; // Re-enable transition
            }, 0);
        }
        updateCarousel();
    }

    // Handle nav dot clicks
    navDots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentIndex = index;
            updateCarousel();
        });
    });

    // Initialize carousel
    updateCarousel();

    // Auto-scroll every 5 seconds
    setInterval(nextSlide, 3000);
});
