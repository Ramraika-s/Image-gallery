let currentSlideIndex = 0;
const images = document.querySelectorAll('.image-item img');
const lightbox = document.getElementById('lightbox');
const lightboxImage = document.getElementById('lightbox-image');
const searchInput = document.getElementById('search-bar');
const categoryFilter = document.getElementById('category-filter');

// Open lightbox
function openLightbox(index) {
    currentSlideIndex = index;
    lightbox.style.display = 'flex';
    lightboxImage.src = images[currentSlideIndex].src;
}

// Close lightbox
function closeLightbox() {
    lightbox.style.display = 'none';
}

// Navigation through images
function moveSlide(direction) {
    currentSlideIndex += direction;
    if (currentSlideIndex >= images.length) currentSlideIndex = 0;
    if (currentSlideIndex < 0) currentSlideIndex = images.length - 1;
    lightboxImage.src = images[currentSlideIndex].src;
}

// Filter images based on search and category
function filterImages() {
    const query = searchInput.value.toLowerCase();
    const category = categoryFilter.value;

    images.forEach(image => {
        const caption = image.alt.toLowerCase();
        const categoryMatch = category === "all" || image.parentElement.dataset.category === category;
        const searchMatch = caption.includes(query);

        if (categoryMatch && searchMatch) {
            image.parentElement.style.display = 'block';
        } else {
            image.parentElement.style.display = 'none';
        }
    });
}

// Download image
function downloadImage(imageName) {
    const link = document.createElement('a');
    link.href = `assets/images/${imageName}`;
    link.download = imageName;
    link.click();
}

// Attach event listeners to images for lightbox
images.forEach((image, index) => {
    image.addEventListener('click', () => openLightbox(index));
});

// Load initial images
filterImages();