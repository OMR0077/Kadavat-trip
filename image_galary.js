// Define an array with image filenames
const images = [
    '1.jpeg',
    '2.jpeg',
    '3.jpeg',
    '4.jpeg',
    '5.jpeg',
    '6.jpeg',
    '7.jpeg',
    '8.jpeg',
    '9.jpeg',
    '10.jpeg',
    '11.jpeg',
    '12.jpeg',
    '13.jpeg',
    '14.jpeg',
    '15.jpeg',
    '16.jpeg',
    '17.jpeg',
    '18.jpeg',
    '19.jpeg',
    '20.jpeg',
    '21.jpeg',
    '22.jpeg',
    '23.jpeg',
    '24.jpeg',
    '25.jpeg',
    '26.jpeg',
    '27.jpeg',
    '28.jpeg',
    '29.jpeg',
    '30.jpeg',
    '31.jpeg',
    '32.jpeg',
    '33.jpeg',
    '34.jpeg',
    '35.jpeg',
    '36.jpeg',
    '37.jpeg',
    '38.jpeg',
    '39.jpeg',
    '40.jpeg',
    '41.jpeg',
    '42.jpeg',
    '43.jpeg',
    '44.jpeg',
    '45.jpeg',
    '46.jpeg',
    '47.jpeg',
    '48.jpeg',
    '49.jpeg',
    '50.jpeg',
    '51.jpeg',
    '52.jpeg',
    '53.jpeg',
    '54.jpeg',
    '55.jpeg',
    '56.jpeg',
    '57.jpeg',
    '58.jpeg',
    '59.jpeg',
    '60.jpeg',
    '61.jpeg',
    '62.jpeg',
    '63.jpeg',
    '64.jpeg',
    '65.jpeg',
    '66.jpeg',
    '67.jpeg',
    '68.jpeg',
    '69.jpeg',
    '70.jpeg',
    '71.jpeg',
    '72.jpeg',
    '73.jpeg',
    '74.jpeg',
    '75.jpeg',
    '76.jpeg',
    '77.jpeg',
    '78.jpeg',
    '79.jpeg',
    '80.jpeg'

    // Add all your image filenames here
];

// Path to the images folder
const imageFolderPath = 'tripimages/';

// Get the gallery element
const gallery = document.getElementById('gallery');

// Dynamically create and append images to the gallery
images.forEach(image => {
    const galleryItem = document.createElement('div');
    galleryItem.classList.add('gallery-item');

    const imgElement = document.createElement('img');
    imgElement.src = imageFolderPath + image;
    imgElement.alt = 'Gallery Image';

    galleryItem.appendChild(imgElement);
    gallery.appendChild(galleryItem);
});

// Lightbox functionality
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const close = document.querySelector('.close');

// Open the lightbox when clicking an image
document.querySelectorAll('.gallery-item img').forEach(image => {
    image.addEventListener('click', () => {
        lightbox.style.display = 'block';
        lightboxImg.src = image.src;
    });
});

// Close the lightbox
close.addEventListener('click', () => {
    lightbox.style.display = 'none';
});

// Close the lightbox when clicking outside the image
lightbox.addEventListener('click', (e) => {
    if (e.target !== lightboxImg) {
        lightbox.style.display = 'none';
    }
});
