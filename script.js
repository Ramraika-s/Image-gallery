// Image Gallery Navigation
let currentSlideIndex = 0;
let images = document.querySelectorAll('.image-item img');
let lightbox = document.getElementById('lightbox');
let lightboxImage = document.getElementById('lightbox-img');

function openLightbox(index) {
    currentSlideIndex = index;
    lightbox.style.display = 'flex';
    lightboxImage.src = images[currentSlideIndex].src;
}

function closeLightbox() {
    lightbox.style.display = 'none';
}

function moveSlide(direction) {
    currentSlideIndex += direction;
    if (currentSlideIndex >= images.length) currentSlideIndex = 0;
    if (currentSlideIndex < 0) currentSlideIndex = images.length - 1;
    lightboxImage.src = images[currentSlideIndex].src;
}

// Download Button
document.querySelectorAll('.download-btn').forEach((btn, index) => {
    btn.addEventListener('click', () => {
        let imageSrc = images[index].src;
        let a = document.createElement('a');
        a.href = imageSrc;
        a.download = `image_${index + 1}.jpg`;
        a.click();
    });
});

// Search Bar Filter
function filterImages() {
    let query = document.getElementById('search-bar').value.toLowerCase();
    document.querySelectorAll('.image-item').forEach(item => {
        let caption = item.querySelector('figcaption').textContent.toLowerCase();
        if (caption.includes(query)) {
            item.style.display = 'block';
        } else {
            item.style.display = 'none';
        }
    });
}

// Category Filter
function filterCategory(category) {
    document.querySelectorAll('.image-item').forEach(item => {
        if (item.classList.contains(category)) {
            item.style.display = 'block';
        } else {
            item.style.display = 'none';
        }
    });
}

function showAll() {
    document.querySelectorAll('.image-item').forEach(item => {
        item.style.display = 'block';
    });
}