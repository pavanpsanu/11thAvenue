const https = require('https');
const fs = require('fs');
const path = require('path');

const baseDir = path.join(__dirname, 'images');
const categories = ["All", "Building", "Living Room", "Dining & Kitchen", "Bedroom", "Bathroom", "Laundry"];

if (!fs.existsSync(baseDir)) {
    fs.mkdirSync(baseDir);
}

const downloadImage = (url, filepath) => {
    return new Promise((resolve, reject) => {
        https.get(url, (response) => {
            if (response.statusCode >= 300 && response.statusCode < 400 && response.headers.location) {
                // follow redirect
                downloadImage(response.headers.location, filepath).then(resolve).catch(reject);
                return;
            }
            if (response.statusCode !== 200) {
                return reject(new Error(`Failed to get '${url}' (${response.statusCode})`));
            }
            const file = fs.createWriteStream(filepath);
            response.pipe(file);
            file.on('finish', () => {
                file.close(resolve);
            });
        }).on('error', (err) => {
            fs.unlink(filepath, () => reject(err));
        });
    });
};

async function main() {
    for (let i = 0; i < categories.length; i++) {
        const category = categories[i];
        const catDir = path.join(baseDir, category);
        
        if (!fs.existsSync(catDir)) {
            fs.mkdirSync(catDir);
        }
        
        for (let j = 1; j <= 8; j++) {
            const seed = `apartmentservice_${i}_${j}`;
            const url = `https://picsum.photos/seed/${seed}/800/600`;
            
            const filename = `${category.replace(/\s+/g, '_').replace(/&/g, 'and').toLowerCase()}_${j}.jpg`;
            const filepath = path.join(catDir, filename);
            
            try {
                await downloadImage(url, filepath);
                console.log(`Downloaded ${filepath}`);
            } catch (err) {
                console.error(`Failed to download ${filepath}: ${err.message}`);
            }
        }
    }
    console.log("Images generated successfully.");
}

main();
