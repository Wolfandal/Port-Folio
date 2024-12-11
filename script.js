document.addEventListener("DOMContentLoaded", () => {
    // Carrousel
    const carousel = document.querySelector('.carousel');
    const prevButton = document.getElementById('prev');
    const nextButton = document.getElementById('next');
    let currentIndex = 0;
    const totalItems = carousel.children.length;
    let isTransitioning = false;
    let autoSlideInterval;

    function updateCarousel() {
        if (isTransitioning) return;
        isTransitioning = true;

        const offset = -currentIndex * 100;
        carousel.style.transition = 'transform 0.5s ease-in-out';
        carousel.style.transform = `translateX(${offset}%)`;

        carousel.addEventListener('transitionend', onTransitionEnd, false);
    }

    function onTransitionEnd() {
        isTransitioning = false;
        carousel.removeEventListener('transitionend', onTransitionEnd);
    }

    function startAutoSlide() {
        autoSlideInterval = setInterval(() => {
            currentIndex = (currentIndex + 1) % totalItems;
            updateCarousel();
        }, 1800); // 1.8 secondes
    }

    function stopAutoSlide() {
        clearInterval(autoSlideInterval);
    }

    nextButton.addEventListener('click', () => {
        stopAutoSlide();
        currentIndex = (currentIndex + 1) % totalItems;
        updateCarousel();
        startAutoSlide();
    });

    prevButton.addEventListener('click', () => {
        stopAutoSlide();
        currentIndex = (currentIndex - 1 + totalItems) % totalItems;
        updateCarousel();
        startAutoSlide();
    });

    carousel.addEventListener('mouseenter', stopAutoSlide);
    carousel.addEventListener('mouseleave', startAutoSlide);

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

    // Démarrer le défilement automatique au chargement de la page
    startAutoSlide();

    // Validation du formulaire de contact
    const form = document.getElementById('contactForm');
    const errorMessage = document.getElementById('error-message');
    const successMessage = document.getElementById('success-message');

    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Empêche l'envoi du formulaire par défaut

        const prenom = document.getElementById('prenom').value.trim();
        const nom = document.getElementById('nom').value.trim();
        const message = document.getElementById('message').value.trim();

        let error = false;
        let errorText = '';

        if (!prenom) {
            error = true;
            errorText += 'Le prénom est requis.<br>';
        }
        if (!nom) {
            error = true;
            errorText += 'Le nom est requis.<br>';
        }
        if (!message) {
            error = true;
            errorText += 'Le message est requis.<br>';
        }

        if (error) {
            errorMessage.innerHTML = errorText;
        } else {
            errorMessage.innerHTML = '';
            sendEmail(prenom, nom, message);
        }
    });

    function sendEmail(prenom, nom, message) {
        const xhr = new XMLHttpRequest();
        xhr.open('POST', 'send_email.php', true);
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4 && xhr.status === 200) {
                successMessage.innerHTML = 'Votre message a été envoyé à Arthur.jumelle@epfedu.fr';
                successMessage.style.display = 'block';
                form.reset();
                setTimeout(() => {
                    successMessage.style.opacity = '0';
                    setTimeout(() => {
                        successMessage.style.display = 'none';
                        successMessage.style.opacity = '1';
                    }, 500); // Attendre que l'animation de fade soit terminée
                }, 1500); // 1.5 secondes
            }
        };
        xhr.send(`prenom=${encodeURIComponent(prenom)}&nom=${encodeURIComponent(nom)}&message=${encodeURIComponent(message)}`);
    }
});
