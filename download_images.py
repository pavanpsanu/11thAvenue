import os
import urllib.request
import time

base_dir = r"e:\appartmentservice\images"
categories = ["All", "Building", "Living Room", "Dining & Kitchen", "Bedroom", "Bathroom", "Laundry"]

if not os.path.exists(base_dir):
    os.makedirs(base_dir)

for i, category in enumerate(categories):
    cat_dir = os.path.join(base_dir, category)
    if not os.path.exists(cat_dir):
        os.makedirs(cat_dir)
    
    for j in range(1, 9):
        seed = f"apartmentservice_{i}_{j}"
        url = f"https://picsum.photos/seed/{seed}/800/600"
        
        filename = f"{category.replace(' ', '_').replace('&', 'and').lower()}_{j}.jpg"
        filepath = os.path.join(cat_dir, filename)
        
        try:
            req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
            with urllib.request.urlopen(req) as response, open(filepath, 'wb') as out_file:
                out_file.write(response.read())
            print(f"Downloaded {filepath}")
        except Exception as e:
            print(f"Failed to download {filepath}: {e}")
        time.sleep(0.2)

print("Images generated successfully.")
