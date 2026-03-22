import re
import os

file_path = r'e:\appartmentservice\index.html'

with open(file_path, 'r', encoding='utf-8') as f:
    html = f.read()

# 1. Add AOS CSS to Head
if 'aos.css' not in html:
    html = html.replace('</head>', '    <link href="https://unpkg.com/aos@2.3.1/dist/aos.css" rel="stylesheet">\n</head>')

# 2. Add AOS JS and Init before closing body
aos_init = """
    <!-- AOS Library -->
    <script src="https://unpkg.com/aos@2.3.1/dist/aos.js"></script>
    <script>
        AOS.init({
            duration: 800,
            easing: 'ease-in-out',
            once: true,
            mirror: false,
            offset: 50
        });
    </script>
</body>"""
if 'aos.js' not in html:
    html = html.replace('</body>', aos_init)

# 3. Add data-aos safely to inner elements so it doesn't conflict with parent .reveal or gallery logic
replacements = [
    ('<h1 class="hero-title">', '<h1 class="hero-title" data-aos="fade-up">'),
    ('<p class="hero-subtitle">', '<p class="hero-subtitle" data-aos="fade-up" data-aos-delay="100">'),
    ('<div class="hero-buttons">', '<div class="hero-buttons" data-aos="fade-up" data-aos-delay="200">'),
    ('<h4 class="sub-heading">THE PROPERTY</h4>', '<h4 class="sub-heading" data-aos="fade-down">THE PROPERTY</h4>'),
    ('<h2 class="welcome-text">', '<h2 class="welcome-text" data-aos="fade-up">'), # Wait, it's <p class="welcome-text"> doesn't matter, we'll replace strings exactly.
    ('<p class="welcome-text">', '<p class="welcome-text" data-aos="fade-up">'),
    
    # Fan images
    ('<img src="images/Building/building_2.jpg" alt="Property Highlight 1" class="fan-img fan-1"',
     '<img src="images/Building/building_2.jpg" alt="Property Highlight 1" class="fan-img fan-1" data-aos="fade-right"'),
    ('<img src="images/Living%20Room/living_room_2.jpg" alt="Property Highlight 2" class="fan-img fan-2"',
     '<img src="images/Living%20Room/living_room_2.jpg" alt="Property Highlight 2" class="fan-img fan-2" data-aos="fade-down"'),
    ('<img src="images/Dining%20&%20Kitchen/dining_and_kitchen_2.jpg" alt="Property Highlight 3"\n                    class="fan-img fan-3"',
     '<img src="images/Dining%20&%20Kitchen/dining_and_kitchen_2.jpg" alt="Property Highlight 3"\n                    class="fan-img fan-3" data-aos="fade-up"'),
    ('<img src="images/Bedroom/bedroom_2.jpg" alt="Property Highlight 4" class="fan-img fan-4"',
     '<img src="images/Bedroom/bedroom_2.jpg" alt="Property Highlight 4" class="fan-img fan-4" data-aos="fade-left"'),

    # Bento items safe inside
    ('<i class="fas fa-home icon-glow"></i>', '<i class="fas fa-home icon-glow" data-aos="zoom-in-up"></i>'),
    ('<i class="fas fa-kitchen-set icon-glow"></i>', '<i class="fas fa-kitchen-set icon-glow" data-aos="zoom-in-up"></i>'),
    ('<i class="fas fa-couch icon-glow"></i>', '<i class="fas fa-couch icon-glow" data-aos="zoom-in-up"></i>'),
    ('<i class="fas fa-car icon-glow"></i>', '<i class="fas fa-car icon-glow" data-aos="zoom-in-up"></i>'),
    ('<i class="fas fa-shield-alt icon-glow"></i>', '<i class="fas fa-shield-alt icon-glow" data-aos="zoom-in-up"></i>'),
    ('<i class="fas fa-bolt icon-glow"></i>', '<i class="fas fa-bolt icon-glow" data-aos="zoom-in-up"></i>'),

    # Booking section
    ('<div class="booking-text">', '<div class="booking-text" data-aos="fade-right">'),
    ('<div class="booking-form-container">', '<div class="booking-form-container" data-aos="fade-left">'),
    
    # Contact section
    ('<div class="contact-info">', '<div class="contact-info" data-aos="fade-right">'),
    ('<div class="map-container">', '<div class="map-container" data-aos="fade-left">'),
]

for old, new in replacements:
    html = html.replace(old, new)

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(html)

print("AOS injected safely, leaving reveal classes and JS alone!")
