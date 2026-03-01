const fs = require('fs');
const path = require('path');

const htmlPath = path.join(__dirname, 'index.html');
let html = fs.readFileSync(htmlPath, 'utf-8');

const lightboxJS = `
        // Lightbox Logic
        const lightbox = document.createElement('div');
        lightbox.className = 'lightbox';
        lightbox.innerHTML = \`
            <div class="lightbox-close"><i class="fas fa-times"></i></div>
            <div class="lightbox-prev"><i class="fas fa-chevron-left"></i></div>
            <div class="lightbox-next"><i class="fas fa-chevron-right"></i></div>
            <div class="lightbox-content">
                <img src="" alt="Gallery Image" class="lightbox-img">
            </div>
            <div class="lightbox-controls">
                <div class="lightbox-zoom-in"><i class="fas fa-search-plus"></i></div>
                <div class="lightbox-zoom-out"><i class="fas fa-search-minus"></i></div>
            </div>
        \`;
        document.body.appendChild(lightbox);

        const lightboxImg = lightbox.querySelector('.lightbox-img');
        const closeBtn = lightbox.querySelector('.lightbox-close');
        const prevBtn = lightbox.querySelector('.lightbox-prev');
        const nextBtn = lightbox.querySelector('.lightbox-next');
        const zoomInBtn = lightbox.querySelector('.lightbox-zoom-in');
        const zoomOutBtn = lightbox.querySelector('.lightbox-zoom-out');
        const lightboxContent = lightbox.querySelector('.lightbox-content');
        
        let currentImageIndex = 0;
        let visibleGalleryItems = [];
        let currentZoom = 1;

        // Function to extract URL from background-image string
        const extractUrl = (bgImageStr) => {
            return bgImageStr.replace(/^url\\(['"]?/, '').replace(/['"]?\\)$/, '');
        };

        const updateLightboxImage = () => {
            if (visibleGalleryItems.length > 0) {
                const bgImage = visibleGalleryItems[currentImageIndex].querySelector('.card-image').style.backgroundImage;
                lightboxImg.src = extractUrl(bgImage);
                currentZoom = 1;
                lightboxContent.style.transform = \`scale(\${currentZoom})\`;
            }
        };

        const openLightbox = (index) => {
            currentImageIndex = index;
            updateLightboxImage();
            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden'; // prevent scrolling
        };

        const closeLightbox = () => {
            lightbox.classList.remove('active');
            document.body.style.overflow = '';
        };

        // Attach click events to gallery items
        galleryItems.forEach(item => {
            item.addEventListener('click', () => {
                // Determine visible items based on current filter
                const activeFilterBtn = document.querySelector('.filter-btn.active');
                const filterValue = activeFilterBtn ? activeFilterBtn.getAttribute('data-filter') : 'all';
                
                visibleGalleryItems = Array.from(galleryItems).filter(gItem => {
                    const itemCategory = gItem.getAttribute('data-category');
                    return filterValue === 'all' || filterValue === itemCategory;
                });

                const index = visibleGalleryItems.indexOf(item);
                if (index !== -1) {
                    openLightbox(index);
                }
            });
        });

        // Controls
        closeBtn.addEventListener('click', closeLightbox);
        
        prevBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            if (visibleGalleryItems.length > 0) {
                currentImageIndex = (currentImageIndex - 1 + visibleGalleryItems.length) % visibleGalleryItems.length;
                updateLightboxImage();
            }
        });

        nextBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            if (visibleGalleryItems.length > 0) {
                currentImageIndex = (currentImageIndex + 1) % visibleGalleryItems.length;
                updateLightboxImage();
            }
        });

        zoomInBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            currentZoom += 0.25;
            lightboxContent.style.transform = \`scale(\${currentZoom})\`;
        });

        zoomOutBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            if (currentZoom > 0.5) {
                currentZoom -= 0.25;
                lightboxContent.style.transform = \`scale(\${currentZoom})\`;
            }
        });

        // Close when clicking outside image
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox || e.target === lightboxContent) {
                closeLightbox();
            }
        });

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (lightbox.classList.contains('active')) {
                if (e.key === 'Escape') closeLightbox();
                if (e.key === 'ArrowLeft') {
                    if (visibleGalleryItems.length > 0) {
                        currentImageIndex = (currentImageIndex - 1 + visibleGalleryItems.length) % visibleGalleryItems.length;
                        updateLightboxImage();
                    }
                }
                if (e.key === 'ArrowRight') {
                    if (visibleGalleryItems.length > 0) {
                        currentImageIndex = (currentImageIndex + 1) % visibleGalleryItems.length;
                        updateLightboxImage();
                    }
                }
            }
        });
</script>`;

html = html.replace('</script>', lightboxJS);
fs.writeFileSync(htmlPath, html, 'utf-8');
console.log("HTML updated successfully with lightbox JS.");
