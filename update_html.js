const fs = require('fs');
const path = require('path');

const htmlPath = path.join(__dirname, 'index.html');
let html = fs.readFileSync(htmlPath, 'utf-8');

// Replace Hero Carousel placeholders
html = html.replace(
    /<div class="carousel-slide active" style="background-image: url\('placeholder-building.jpg'\);"><\/div>/,
    `<div class="carousel-slide active" style="background-image: url('images/Building/building_1.jpg');"></div>`
).replace(
    /<div class="carousel-slide" style="background-image: url\('placeholder-living.jpg'\);"><\/div>/,
    `<div class="carousel-slide" style="background-image: url('images/Living%20Room/living_room_1.jpg');"></div>`
).replace(
    /<div class="carousel-slide" style="background-image: url\('placeholder-kitchen.jpg'\);"><\/div>/,
    `<div class="carousel-slide" style="background-image: url('images/Dining%20&%20Kitchen/dining_and_kitchen_1.jpg');"></div>`
).replace(
    /<div class="carousel-slide" style="background-image: url\('placeholder-bedroom.jpg'\);"><\/div>/,
    `<div class="carousel-slide" style="background-image: url('images/Bedroom/bedroom_1.jpg');"></div>`
).replace(
    /<div class="carousel-slide" style="background-image: url\('placeholder-bathroom.jpg'\);"><\/div>/,
    `<div class="carousel-slide" style="background-image: url('images/Bathroom/bathroom_1.jpg');"></div>`
);

// Replace Welcome Section Fan Images
html = html.replace(
    /src="placeholder-building-1\.jpg"/,
    `src="images/Building/building_2.jpg"`
).replace(
    /src="placeholder-living-1\.jpg"/,
    `src="images/Living%20Room/living_room_2.jpg"`
).replace(
    /src="placeholder-kitchen-1\.jpg"/,
    `src="images/Dining%20&%20Kitchen/dining_and_kitchen_2.jpg"`
).replace(
    /src="placeholder-bedroom-1\.jpg"/,
    `src="images/Bedroom/bedroom_2.jpg"`
);

// Replace Gallery Grid
const categories = [
    { name: "Building", dir: "Building", class: "building" },
    { name: "Living Room", dir: "Living Room", class: "living" },
    { name: "Dining & Kitchen", dir: "Dining & Kitchen", class: "dining" },
    { name: "Bedroom", dir: "Bedroom", class: "bedroom" },
    { name: "Bathroom", dir: "Bathroom", class: "bathroom" },
    { name: "Laundry", dir: "Laundry", class: "laundry" }
];

let galleryHtml = "";
for (const cat of categories) {
    for (let i = 1; i <= 8; i++) {
        const filename = `${cat.dir.replace(/\s+/g, '_').replace(/&/g, 'and').toLowerCase()}_${i}.jpg`;
        const sizeClass = (i === 1 && cat.class === 'building') ? ' item-large' : '';
        const urlDir = encodeURI(cat.dir);
        galleryHtml += `                <div class="gallery-item${sizeClass} reveal" data-category="${cat.class}">\n`;
        galleryHtml += `                    <div class="card-image" style="background-image: url('images/${urlDir}/${filename}');"></div>\n`;
        galleryHtml += `                </div>\n`;
    }
}

html = html.replace(
    /<div class="gallery-grid">[\s\S]*?<\/section>/,
    `<div class="gallery-grid">\n${galleryHtml}            </div>\n        </div>\n    </section>`
);

fs.writeFileSync(htmlPath, html, 'utf-8');
console.log("HTML updated successfully.");
