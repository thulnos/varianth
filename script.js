// Navigasyon butonu ve navigasyon linklerinin bağlanması

const hamButton = document.getElementById("toggleMenu");

const navMenu = document.querySelector(".nav-links");

hamButton.addEventListener("click", () => {
    navMenu.classList.toggle("active");
})

//

// Navigasyon menüsü açıkken başka bir yere tıklandığında menü kapansın
    
document.addEventListener("click", (event) => {
    if (!navMenu.contains(event.target) && !hamButton.contains(event.target) && navMenu.classList.contains("active")) {
        navMenu.classList.remove("active");
    }
})

//
