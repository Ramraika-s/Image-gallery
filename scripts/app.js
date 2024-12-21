const gallery = document.getElementById('gallery');
const searchInput = document.getElementById('search');
const lightbox = document.getElementById('lightbox');
const lightboxImage = document.getElementById('lightbox-image');
const lightboxTitle = document.getElementById('lightbox-title');
const lightboxDescription = document.getElementById('lightbox-description');
const lightboxClose = document.getElementById('lightbox-close');

// Fetch and Render Images
async function fetchImages() {
    try {
        const res = await fetch('data/images.json');
        const images = await res.json();
        
        gallery.innerHTML = images
            .map(
                (img) => `
            <div class="image-item">
                <img src="${img.thumb}" alt="${img.title}" 
                    data-full="${img.full}" 
                    data-title="${img.title}" 
                    data-description="${img.description}" 
                    loading="lazy" />
            </div>`
            )
            .join('');
        
        initLightbox();
    } catch (error) {
        console.error('Failed to load images:', error);
    }
}

// Initialize Lightbox Functionality
function initLightbox() {
    const imageItems = document.querySelectorAll('.image-item img');
    imageItems.forEach((img) => {
        img.addEventListener('click', (e) => {
            const fullSrc = e.target.dataset.full;
            const title = e.target.dataset.title;
            const description = e.target.dataset.description;

            lightboxImage.src = fullSrc;
            lightboxTitle.textContent = title;
            lightboxDescription.textContent = description;
            lightbox.style.display = 'flex';
            lightbox.setAttribute('aria-hidden', 'false');
        });
    });

    // Close the lightbox when the close button is clicked
    lightboxClose.addEventListener('click', () => {
        lightbox.style.display = 'none';
        lightbox.setAttribute('aria-hidden', 'true');
    });

    // Close the lightbox when clicking outside the content area
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            lightbox.style.display = 'none';
            lightbox.setAttribute('aria-hidden', 'true');
        }
    });
}

// Implement Search Functionality
searchInput.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase();
    const images = document.querySelectorAll('.image-item');
    images.forEach((img) => {
        const title = img.querySelector('img').alt.toLowerCase();
        if (title.includes(query)) {
            img.style.display = '';
        } else {
            img.style.display = 'none';
        }
    });
});

// Load images when the page is ready
fetchImages();