// Get elements
const galleryItems = document.querySelectorAll('.gallery-item img');
const lightbox = document.querySelector('.lightbox');
const lightboxImage = document.querySelector('.lightbox-image');
const lightboxCaption = document.querySelector('.lightbox-caption');
const closeBtn = document.querySelector('.lightbox .close');
const prevBtn = document.querySelector('.lightbox .prev');
const nextBtn = document.querySelector('.lightbox .next');

// Variables
let currentIndex = 0;

// Open Lightbox
galleryItems.forEach((item, index) => {
    item.addEventListener('click', () => {
        currentIndex = index;
        showLightbox(item);
    });
});

function showLightbox(item) {
    lightbox.style.display = 'flex';
    lightboxImage.src = item.src;
    lightboxCaption.textContent = item.dataset.caption;
}

// Close Lightbox
closeBtn.addEventListener('click', () => {
    lightbox.style.display = 'none';
});

// Navigate Images
prevBtn.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + galleryItems.length) % galleryItems.length;
    updateLightbox();
});

nextBtn.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % galleryItems.length;
    updateLightbox();
});

function updateLightbox() {
    const item = galleryItems[currentIndex];
    lightboxImage.src = item.src;
    lightboxCaption.textContent = item.dataset.caption;
}

// Keyboard Navigation
document.addEventListener('keydown', (e) => {
    if (lightbox.style.display === 'flex') {
        if (e.key === 'ArrowLeft') prevBtn.click();
        if (e.key === 'ArrowRight') nextBtn.click();
        if (e.key === 'Escape') closeBtn.click();
    }
});