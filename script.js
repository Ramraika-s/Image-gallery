// Open the modal with a clicked image
function openModal(imageElement) {
    const modal = document.getElementById("imageModal");
    const modalImage = document.getElementById("modalImage");
    const modalCaption = document.getElementById("modalCaption");
    const downloadBtn = document.getElementById("downloadBtn");

    // Set the modal image source and caption
    modalImage.src = imageElement.src;
    modalCaption.textContent = imageElement.alt;

    // Set the download button's href to the image source
    downloadBtn.href = imageElement.src;
    downloadBtn.style.display = "block"; // Show the download button

    // Show the modal
    modal.style.display = "block";
}

// Close the modal
function closeModal() {
    const modal = document.getElementById("imageModal");
    modal.style.display = "none";
}

// Attach click event to each image in the gallery for opening modal
const images = document.querySelectorAll('.gallery img');
images.forEach(image => {
    image.addEventListener('click', () => openModal(image));
});

// Close modal when clicking outside the image area
window.addEventListener('click', (event) => {
    const modal = document.getElementById("imageModal");
    if (event.target === modal) {
        closeModal();
    }
});

// Search functionality to filter images
function searchImages() {
    const searchTerm = document.getElementById("searchBar").value.toLowerCase();
    const images = document.querySelectorAll('.gallery img');

    images.forEach(image => {
        const imageAlt = image.alt.toLowerCase();
        if (imageAlt.includes(searchTerm)) {
            image.style.display = "block"; // Show matching image
        } else {
            image.style.display = "none"; // Hide non-matching image
        }
    });
}

// Event listener for search bar
document.getElementById("searchBar").addEventListener('input', searchImages);

// Category filter functionality
function filterCategory(category) {
    const images = document.querySelectorAll('.gallery img');

    images.forEach(image => {
        if (category === "all" || image.classList.contains(category)) {
            image.style.display = "block"; // Show images in the selected category
        } else {
            image.style.display = "none"; // Hide images not in the selected category
        }
    });
}

// Event listeners for category filter buttons
document.getElementById("categoryAll").addEventListener('click', () => filterCategory("all"));
document.getElementById("categoryAbstract").addEventListener('click', () => filterCategory("abstract"));
document.getElementById("categoryNature").addEventListener('click', () => filterCategory("nature"));
document.getElementById("categoryUrban").addEventListener('click', () => filterCategory("urban"));
document.getElementById("categorySunset").addEventListener('click', () => filterCategory("sunset"));

// Autoplay slideshow for fullscreen image view
let slideIndex = 0;
function showSlides() {
    const slides = document.querySelectorAll('.gallery img');
    slides.forEach(slide => slide.style.display = "none"); // Hide all images

    if (slideIndex >= slides.length) {
        slideIndex = 0;
    }

    slides[slideIndex].style.display = "block"; // Show the next image in the gallery
    slideIndex++;

    setTimeout(showSlides, 3000); // Change image every 3 seconds
}

// Start the slideshow when page is ready
window.onload = () => {
    showSlides();
};