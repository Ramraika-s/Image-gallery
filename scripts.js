// Open the modal to view image in full-screen mode
function openModal(imageSrc, captionText, downloadUrl) {
    const modal = document.getElementById('imageModal');
    const modalImage = document.getElementById('modalImage');
    const modalCaption = document.getElementById('modalCaption');
    const downloadBtn = document.getElementById('downloadBtn');

    modal.style.display = 'block';
    modalImage.src = imageSrc;
    modalCaption.textContent = captionText;
    downloadBtn.href = downloadUrl;
    downloadBtn.style.display = 'inline-block'; // Show the download button
}

// Close the modal
function closeModal() {
    const modal = document.getElementById('imageModal');
    modal.style.display = 'none';
}

// Handle image click to open modal
const imageItems = document.querySelectorAll('.image-item');
imageItems.forEach(item => {
    const image = item.querySelector('.gallery-image');
    const caption = item.querySelector('figcaption').textContent;
    const imageSrc = image.src;
    const downloadUrl = image.src; // Assuming you want to allow download of the image file

    item.addEventListener('click', () => {
        openModal(imageSrc, caption, downloadUrl);
    });
});

// Search functionality
document.getElementById('searchBar').addEventListener('input', filterImages);
document.getElementById('categoryFilter').addEventListener('change', filterImages);

function filterImages() {
    const searchQuery = document.getElementById('searchBar').value.toLowerCase();
    const selectedCategory = document.getElementById('categoryFilter').value;

    const imageItems = document.querySelectorAll('.image-item');
    imageItems.forEach(item => {
        const caption = item.querySelector('figcaption').textContent.toLowerCase();
        const category = item.getAttribute('data-category');

        const matchesSearch = caption.includes(searchQuery);
        const matchesCategory = selectedCategory ? category === selectedCategory : true;

        if (matchesSearch && matchesCategory) {
            item.style.display = 'block';
        } else {
            item.style.display = 'none';
        }
    });
}