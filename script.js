document.addEventListener("DOMContentLoaded", () => {
    // Search Functionality
    const searchInput = document.getElementById("searchInput");
    const categoryFilter = document.getElementById("categoryFilter");
    const imageItems = document.querySelectorAll(".image-item");

    const filterImages = () => {
        const searchQuery = searchInput.value.toLowerCase();
        const selectedCategory = categoryFilter.value;

        imageItems.forEach(item => {
            const caption = item.querySelector("figcaption").textContent.toLowerCase();
            const category = item.getAttribute("data-category");

            const matchesSearch = caption.includes(searchQuery);
            const matchesCategory = selectedCategory === "all" || category === selectedCategory;

            if (matchesSearch && matchesCategory) {
                item.style.display = "block";
            } else {
                item.style.display = "none";
            }
        });
    };

    searchInput.addEventListener("input", filterImages);
    categoryFilter.addEventListener("change", filterImages);

    // Lazy Loading Images
    const lazyImages = document.querySelectorAll(".lazy");

    const lazyLoad = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove("lazy");
                observer.unobserve(img);
            }
        });
    };

    const lazyObserver = new IntersectionObserver(lazyLoad, {
        root: null,
        rootMargin: "0px",
        threshold: 0.1,
    });

    lazyImages.forEach(img => lazyObserver.observe(img));

    // Modal Functionality
    const imageModal = document.getElementById("imageModal");
    const modalImage = document.getElementById("modalImage");
    const modalCaption = document.getElementById("modalCaption");
    const downloadBtn = document.getElementById("downloadBtn");

    const openModal = (img, caption) => {
        modalImage.src = img.dataset.src || img.src;
        modalCaption.textContent = caption;
        downloadBtn.href = modalImage.src;
        downloadBtn.style.display = "inline-block";
        imageModal.style.display = "flex";
    };

    const closeModal = () => {
        imageModal.style.display = "none";
        modalImage.src = "";
    };

    imageItems.forEach(item => {
        const img = item.querySelector(".gallery-image");
        const caption = item.querySelector("figcaption").textContent;

        img.addEventListener("click", () => openModal(img, caption));
    });

    document.querySelector(".close-btn").addEventListener("click", closeModal);
    imageModal.addEventListener("click", (e) => {
        if (e.target === imageModal) closeModal();
    });

    // Initialize the filter on page load
    filterImages();
});