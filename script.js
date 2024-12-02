document.addEventListener("DOMContentLoaded", () => {
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

            item.style.display = matchesSearch && matchesCategory ? "block" : "none";
        });
    };

    searchInput.addEventListener("input", filterImages);
    categoryFilter.addEventListener("change", filterImages);

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

    const lazyObserver = new IntersectionObserver(lazyLoad, { threshold: 0.1 });
    lazyImages.forEach(img => lazyObserver.observe(img));

    const modal = document.getElementById("imageModal");
    const modalImage = document.getElementById("modalImage");
    const modalCaption = document.getElementById("modalCaption");
    const downloadBtn = document.getElementById("downloadBtn");

    const openModal = (img, caption) => {
        modalImage.src = img.dataset.src || img.src;
        modalCaption.textContent = caption;
        downloadBtn.href = modalImage.src;
        modal.style.display = "flex";
    };

    const closeModal = () => {
        modal.style.display = "none";
    };

    imageItems.forEach(item => {
        const img = item.querySelector(".gallery-image");
        const caption = item.querySelector("figcaption").textContent;

        img.addEventListener("click", () => openModal(img, caption));
    });

    modal.querySelector(".close-btn").addEventListener("click", closeModal);
    modal.addEventListener("click", e => {
        if (e.target === modal) closeModal();
    });

    filterImages();
});