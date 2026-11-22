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

// Çizgi roman ekleme

const openPopupBtn = document.getElementById("openPopupButton");
const comicPopup = document.getElementById("comicPopup");
const closePopupBtn = document.getElementById("closePopupButton");
const cancelPopupBtn = document.getElementById("cancelPopup");
const addComic = document.getElementById("addComic");

const comicTitleInput = document.getElementById("comicTitle");
const comicAuthorInput = document.getElementById("comicAuthor");
const comicCoverInput = document.getElementById("comicCover");

const previewImage = document.getElementById("previewImage");
const previewPlaceholder = document.getElementById("previewPlaceholder");
const previewTitle = document.getElementById("previewTitle");
const previewAuthor = document.getElementById("previewAuthor");

if (openPopupBtn && comicPopup && addComic) {
    const resetPreview = () => {
        previewImage.removeAttribute("src");
        previewImage.classList.remove("loaded");
        previewPlaceholder.classList.remove("hidden");
        previewTitle.textContent = "Çizgi Roman İsmi";
        previewAuthor.textContent = "Yazar";
    };

    const closePopup = () => {
        comicPopup.classList.remove("active");
        addComic.reset();
        resetPreview();
    }

    openPopupBtn.addEventListener("click", () => {
        comicPopup.classList.add("active");
    })

    closePopupBtn.addEventListener("click", closePopup);
    cancelPopupBtn.addEventListener("click", closePopup);

    comicPopup.addEventListener("click", (event) => {
        if (event.target === comicPopup) {
            closePopup();
        }
    });

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape" && comicPopup.classList.contains("active")) {
            closePopup();
        }
    });
    
    comicTitleInput.addEventListener("input", () => {
        previewTitle.textContent = comicTitleInput.value.trim() || "Çizgi Roman İsmi";
    });

    comicAuthorInput.addEventListener("input", () => {
        previewAuthor.textContent = comicAuthorInput.value.trim() || "Yazar"; 
    });
    
    comicCoverInput.addEventListener("input", () => {
        const url = comicCoverInput.value.trim();

        if (!url) {
            previewImage.removeAttribute("src");
            previewImage.classList.remove("loaded");
            previewPlaceholder.classList.remove("hidden");
            return;
        }

        previewImage.src = url;
    });

    previewImage.addEventListener("load", () => {
        previewImage.classList.add("loaded");
        previewPlaceholder.classList.add("hidden");
    });

    previewImage.addEventListener("error", () => {
        previewImage.classList.remove("loaded");
        previewPlaceholder.classList.remove("hidden");
    });

    addComic.addEventListener("submit", (event) => {
        event.preventDefault();

        const title = comicTitleInput.value.trim();
        const author = comicAuthorInput.value.trim();
        const coverSrc = comicCoverInput.value.trim();

        const newCard = document.createElement("article");
        newCard.classList.add("cover-card");
        newCard.dataset.title = title;
        newCard.dataset.author = author;

        const img = document.createElement("img");
        img.src = coverSrc;
        img.alt = `${title} - ${author}`;
        img.title = `${title} (${author})`;

        newCard.appendChild(img);
        openPopupBtn.after(newCard);
        closePopup();
    })
}
