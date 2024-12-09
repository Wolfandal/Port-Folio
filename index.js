document.addEventListener("DOMContentLoaded", () => {
    const projets = document.querySelectorAll(".projet");

    projets.forEach((projet, index) => {
        // Ajout de classes pour la disposition en quinconce
        projet.style.position = "relative";
        projet.style.transformStyle = "preserve-3d";
        projet.style.transition = "transform 0.6s";
        if (index % 2 === 0) {
            projet.style.marginLeft = "20%";
        } else {
            projet.style.marginRight = "20%";
        }

        // Création de l'élément de description
        const description = document.createElement("div");
        description.className = "description";
        description.style.position = "absolute";
        description.style.top = "0";
        description.style.right = "-300px";
        description.style.width = "250px";
        description.style.padding = "10px";
        description.style.backgroundColor = "#333";
        description.style.color = "white";
        description.style.borderRadius = "8px";
        description.style.display = "none";
        description.textContent = `Description détaillée du projet ${index + 1}.`;
        projet.appendChild(description);

        // Effet de rotation et affichage de la description
        projet.addEventListener("mouseover", () => {
            projet.style.transform = "rotateY(180deg)";
            description.style.display = "block";
        });

        projet.addEventListener("mouseout", () => {
            projet.style.transform = "rotateY(0deg)";
            description.style.display = "none";
        });

        // Arrière du projet pour simuler la rotation 3D
        const back = document.createElement("div");
        back.style.position = "absolute";
        back.style.top = "0";
        back.style.left = "0";
        back.style.width = "100%";
        back.style.height = "100%";
        back.style.backfaceVisibility = "hidden";
        back.style.backgroundColor = "#555";
        back.style.color = "white";
        back.style.display = "flex";
        back.style.alignItems = "center";
        back.style.justifyContent = "center";
        back.style.borderRadius = "8px";
        back.style.transform = "rotateY(180deg)";
        back.textContent = `Arrière du projet ${index + 1}`;
        projet.appendChild(back);

        // Ajustement du projet initial (face avant)
        projet.style.position = "relative";
        projet.style.perspective = "1000px";
        projet.style.display = "flex";
        projet.style.alignItems = "center";
        projet.style.justifyContent = "center";
    });
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
