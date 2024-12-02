const images = [
    { src: 'image1.jpg', caption: 'Sunset', category: 'nature' },
    { src: 'image2.jpg', caption: 'City View', category: 'city' },
    { src: 'image3.jpg', caption: 'Abstract Art', category: 'abstract' },
    { src: 'image4.jpg', caption: 'Forest', category: 'nature' },
];

let currentIndex = 0;
let slideshowInterval = null;

function renderGallery() {
    const gallery = document.getElementById('gallery');
    gallery.innerHTML = images.map((img, index) => `
        <div class="image-container" onclick="openLightbox(${index})">
            <img src="${img.src}" alt="${img.caption}">
        </div>
    `).join('');
}

function openLightbox(index) {
    currentIndex = index;
    const lightbox = document.getElementById('lightbox');
    document.getElementById('lightboxImage').src = images[currentIndex].src;
    document.getElementById('caption').textContent = images[currentIndex].caption;
    lightbox.style.display = 'flex';
}

function closeLightbox() {
    document.getElementById('lightbox').style.display = 'none';
    stopSlideshow();
}

function changeImage(direction) {
    currentIndex = (currentIndex + direction + images.length) % images.length;
    openLightbox(currentIndex);
}

function searchImages() {
    const query = document.getElementById('searchBar').value.toLowerCase();
    const filtered = images.filter(img => img.caption.toLowerCase().includes(query));
    renderGallery(filtered);
}

function filterImages() {
    const category = document.getElementById('categoryFilter').value;
    const filtered = category === 'all' ? images : images.filter(img => img.category === category);
    renderGallery(filtered);
}

function startSlideshow() {
    if (slideshowInterval) return;
    slideshowInterval = setInterval(() => changeImage(1), 2000);
}

function stopSlideshow() {
    clearInterval(slideshowInterval);
    slideshowInterval = null;
}

function toggleTheme() {
    document.body.classList.toggle('light-mode');
}

function downloadImage() {
    const a = document.createElement('a');
    a.href = images[currentIndex].src;
    a.download = images[currentIndex].caption;
    a.click();
}

// Initial Render
renderGallery();