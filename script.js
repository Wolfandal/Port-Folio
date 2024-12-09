document.addEventListener("DOMContentLoaded", () => {
    // Carrousel
    const carousel = document.querySelector('.carousel');
    const prevButton = document.getElementById('prev');
    const nextButton = document.getElementById('next');
    let currentIndex = 0;
    const totalItems = carousel.children.length;
    let isTransitioning = false;

    function updateCarousel() {
        if (isTransitioning) return;
        isTransitioning = true;

        const offset = -currentIndex * 100;
        carousel.style.transition = 'transform 0.5s ease-in-out';
        carousel.style.transform = `translateX(${offset}%)`;

        carousel.addEventListener('transitionend', onTransitionEnd, false);
    }

    function onTransitionEnd() {
        if (currentIndex === 0) {
            carousel.style.transition = 'none';
            carousel.style.transform = `translateX(${-totalItems * 100}%)`;
        } else if (currentIndex === totalItems) {
            carousel.style.transition = 'none';
            carousel.style.transform = `translateX(0%)`;
        }

        currentIndex = (currentIndex + totalItems) % totalItems;
        isTransitioning = false;
        carousel.removeEventListener('transitionend', onTransitionEnd);
    }

    nextButton.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % totalItems;
        updateCarousel();
    });

    prevButton.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + totalItems) % totalItems;
        updateCarousel();
    });

    // Détection du scroll
    let lastScrollTop = 0; // Dernière position du scroll

    window.addEventListener("scroll", function() {
        let footer = document.getElementById("footer");

        // Si on est en haut de la page, on montre le footer
        if (window.scrollY <= 50) { // "50" définit une zone autour du haut où on affiche le footer
            footer.classList.add("show");
        } else {
            footer.classList.remove("show");
        }

        lastScrollTop = window.scrollY; // On garde en mémoire la position actuelle du scroll
    });
});
