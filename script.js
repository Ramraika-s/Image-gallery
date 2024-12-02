const images = [
    { src: 'image1.jpg', caption: 'Beautiful Sunset' },
    { src: 'image2.jpg', caption: 'Mountain Landscape' },
    { src: 'image3.jpg', caption: 'Ocean View' },
    { src: 'image4.jpg', caption: 'City Skyline' },
];

let currentIndex = 0;

function openLightbox(index) {
    currentIndex = index;
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.getElementById('lightboxImage');
    const caption = document.getElementById('caption');

    lightbox.style.display = 'flex';
    lightboxImage.src = images[currentIndex].src;
    caption.textContent = images[currentIndex].caption;
}

function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    lightbox.style.display = 'none';
}

function changeImage(direction) {
    currentIndex += direction;

    if (currentIndex < 0) {
        currentIndex = images.length - 1;
    } else if (currentIndex >= images.length) {
        currentIndex = 0;
    }

    const lightboxImage = document.getElementById('lightboxImage');
    const caption = document.getElementById('caption');

    lightboxImage.src = images[currentIndex].src;
    caption.textContent = images[currentIndex].caption;
}
