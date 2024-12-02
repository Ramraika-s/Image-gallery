const images = [
    { src: 'images/Abstract-art.jpg', caption: 'Abstract Art', category: 'abstract' },
    { src: 'images/Forest.jpg', caption: 'Beautiful Forest', category: 'nature' },
    { src: 'images/city-view.jpg', caption: 'City View', category: 'city' },
    { src: 'images/sunset.jpg', caption: 'Sunset Scenery', category: 'nature' },
];

const gallery = document.getElementById('gallery');
const searchBar = document.getElementById('searchBar');
const categoryFilter = document.getElementById('categoryFilter');
const slideshowButton = document.getElementById('slideshowButton');
const toggleThemeButton = document.getElementById('toggleTheme');
const fullscreen = document.getElementById('fullscreen');
const fullscreenImg = document.getElementById('fullscreenImg');
const fullscreenCaption = document.getElementById('fullscreenCaption');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const closeFullscreen = document.getElementById('closeFullscreen');

let currentIndex = 0;
let slideshowInterval;

function renderGallery() {
    gallery.innerHTML = '';
    const query = searchBar.value.toLowerCase();
    const category = categoryFilter.value;

    images
        .filter(img =>
            (category === 'all' || img.category === category) &&
            img.caption.toLowerCase().includes(query)
        )
        .forEach((img, index) => {
            const card = document.createElement('div');
            card.className = 'card';
            card.innerHTML = `
                <img src="${img.src}" alt="${img.caption}" data-index="${index}">
                <div class="caption">${img.caption}</div>
            `;
            card.addEventListener('click', () => openFullscreen(index));
            gallery.appendChild(card);
        });
}

function openFullscreen(index) {
    currentIndex = index;
    fullscreenImg.src = images[currentIndex].src;
    fullscreenCaption.textContent = images[currentIndex].caption;
    fullscreen.classList.remove('hidden');
}

function closeFullscreenMode() {
    fullscreen.classList.add('hidden');
    clearInterval(slideshowInterval);
}

function showNextImage() {
    currentIndex = (currentIndex + 1) % images.length;
    openFullscreen(currentIndex);
}

function showPrevImage() {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    openFullscreen(currentIndex);
}

function startSlideshow() {
    if (!slideshowInterval) {
        slideshowInterval = setInterval(showNextImage, 3000);
    }
}

function toggleTheme() {
    document.body.classList.toggle('light-theme');
}

searchBar.addEventListener('input', renderGallery);
categoryFilter.addEventListener('change', renderGallery);
slideshowButton.addEventListener('click', startSlideshow);
toggleThemeButton.addEventListener('click', toggleTheme);
closeFullscreen.addEventListener('click', closeFullscreenMode);
prevBtn.addEventListener('click', showPrevImage);
nextBtn.addEventListener('click', showNextImage);

renderGallery();