// Sample photo data
const photoData = [
    {
        id: 1,
        url: 'https://images.unsplash.com/photo-1454942901704-3c44c11b2ad1?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        title: 'Mountain Sunrise',
        username: 'naturelover',
        likes: 245,
        date: '2 days ago',
        description: 'Beautiful sunrise captured from the top of Mount Rainier. The colors were absolutely breathtaking.'
    },
    {
        id: 2,
        url: 'https://images.unsplash.com/photo-1554793000-245d3a3c2a51?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8VXJiYW4lMjBBcmNoaXRlY3R1cmV8ZW58MHx8MHx8fDA%3D',
        title: 'Urban Architecture',
        username: 'cityexplorer',
        likes: 189,
        date: '4 days ago',
        description: 'Modern architecture in downtown Seattle. The geometric patterns and reflections caught my eye.'
    },
    {
        id: 3,
        url: 'https://plus.unsplash.com/premium_photo-1669748157617-a3a83cc8ea23?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8YmVhY2glMjBzdW5zZXR8ZW58MHx8MHx8fDA%3D',
        title: 'Beach Sunset',
        username: 'travelphotographer',
        likes: 367,
        date: '1 week ago',
        description: 'Golden hour at Malibu Beach. The waves were perfect and the sky was on fire.'
    },
    {
        id: 4,
        url: 'https://images.unsplash.com/photo-1541902001797-3989f96ab97e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8QXV0dW1uJTIwQ29sb3JzfGVufDB8fDB8fHww',
        title: 'Autumn Colors',
        username: 'seasonalshots',
        likes: 213,
        date: '3 days ago',
        description: 'Fall foliage in New England. The red and orange leaves created a magical atmosphere.'
    },
    {
        id: 5,
        url: 'https://plus.unsplash.com/premium_photo-1724458589661-a2f42eb58aca?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Q2l0eSUyME5pZ2h0bGlmZXxlbnwwfHwwfHx8MA%3D%3D',
        title: 'City Nightlife',
        username: 'urbanphotos',
        likes: 298,
        date: '5 days ago',
        description: 'Night photography in Times Square. The neon lights and bustling crowds make for an exciting scene.'
    },
    {
        id: 6,
        url: 'https://plus.unsplash.com/premium_photo-1661884151947-ad09dee18a07?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8Rm9yZXN0JTIwUGF0aHxlbnwwfHwwfHx8MA%3D%3D',
        title: 'Forest Path',
        username: 'hikerpro',
        likes: 176,
        date: '2 weeks ago',
        description: 'Hiking trail through an old-growth forest. The morning mist created a mystical atmosphere.'
    }
];

// DOM Elements
const photoGrid = document.getElementById('photoGrid');
const uploadBtn = document.getElementById('uploadBtn');
const uploadModal = document.getElementById('uploadModal');
const closeModal = document.getElementById('closeModal');
const photoViewModal = document.getElementById('photoViewModal');
const closeViewModal = document.getElementById('closeViewModal');
const dropArea = document.getElementById('dropArea');
const fileInput = document.getElementById('fileInput');
const uploadForm = document.getElementById('uploadForm');

// Render photos
function renderPhotos() {
    photoGrid.innerHTML = '';
    photoData.forEach(photo => {
        const photoCard = document.createElement('div');
        photoCard.className = 'photo-card';
        photoCard.innerHTML = `
            <div class="photo-container">
                <img src="${photo.url}" alt="${photo.title}" class="photo-img">
                <div class="photo-overlay">
                    <div class="overlay-actions">
                        <button class="overlay-btn like-btn" data-id="${photo.id}">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
            <div class="photo-info">
                <h3 class="photo-title">${photo.title}</h3>
                <div class="photo-meta">
                    <span>by ${photo.username}</span>
                    <span class="like-count" data-id="${photo.id}">❤️ ${photo.likes}</span>
                </div>
            </div>
        `;
        photoGrid.appendChild(photoCard);
        
        // Add click event to the entire card to view the photo
        photoCard.addEventListener('click', () => {
            viewPhoto(photo.id);
        });
    });
    
    // Add event listeners to the like buttons
    document.querySelectorAll('.like-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation(); // Prevent triggering the card click
            handleLike(e);
        });
    });
}

// Handle like functionality
function handleLike(e) {
    const photoId = parseInt(e.currentTarget.getAttribute('data-id'));
    const photo = photoData.find(p => p.id === photoId);
    if (photo) {
        photo.likes++;
        // Update the like count in the UI
        const likeCount = document.querySelector(`.like-count[data-id="${photoId}"]`);
        if (likeCount) {
            likeCount.textContent = `❤️ ${photo.likes}`;
        }
    }
}

// View photo in modal
function viewPhoto(photoId) {
    const photo = photoData.find(p => p.id === photoId);
    if (photo) {
        // Set photo details in the modal
        document.getElementById('viewPhotoTitle').textContent = photo.title;
        document.getElementById('viewPhotoImg').src = photo.url;
        document.getElementById('viewPhotoImg').alt = photo.title;
        document.getElementById('viewPhotoUser').textContent = `by ${photo.username}`;
        document.getElementById('viewPhotoDate').textContent = photo.date;
        document.getElementById('viewPhotoDescription').textContent = photo.description || 'No description available';
        document.getElementById('viewPhotoLikes').textContent = photo.likes;
        document.getElementById('viewPhotoLikes').dataset.photoId = photo.id;
        
        // Open the modal
        photoViewModal.classList.add('active');
        
        // Add event listener to the like button in the view modal
        document.getElementById('viewPhotoLike').onclick = function() {
            photo.likes++;
            document.getElementById('viewPhotoLikes').textContent = photo.likes;
            // Update the like count in the grid as well
            const likeCount = document.querySelector(`.like-count[data-id="${photoId}"]`);
            if (likeCount) {
                likeCount.textContent = `❤️ ${photo.likes}`;
            }
        };
        
    }
}

// Event listeners
uploadBtn.addEventListener('click', () => {
    uploadModal.classList.add('active');
});

closeModal.addEventListener('click', () => {
    uploadModal.classList.remove('active');
});

closeViewModal.addEventListener('click', () => {
    photoViewModal.classList.remove('active');
});

dropArea.addEventListener('click', () => {
    fileInput.click();
});

// Preview uploaded image
let uploadedImage = null;
fileInput.addEventListener('change', (e) => {
    if (e.target.files.length > 0) {
        const file = e.target.files[0];
        uploadedImage = file;
        
        // Show preview of the image
        const reader = new FileReader();
        reader.onload = function(event) {
            dropArea.innerHTML = `
                <img src="${event.target.result}" alt="Preview" style="max-width: 100%; max-height: 200px; border-radius: 8px;">
                <p class="upload-text">Image ready to upload</p>
            `;
        };
        reader.readAsDataURL(file);
        
        dropArea.classList.add('active');
    }
});

uploadForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form values
    const title = document.getElementById('photoTitle').value;
    const description = document.getElementById('photoDescription').value;
    
    if (!uploadedImage) {
        alert('Please select an image to upload');
        return;
    }
    
    // Create a URL for the uploaded image
    const imageUrl = URL.createObjectURL(uploadedImage);
    
    // Add the new photo to the beginning of the array
    photoData.unshift({
        id: Date.now(), 
        url: imageUrl,
        title: title || 'Untitled Photo',
        username: 'you',
        likes: 0,
        date: 'Just now',
        description: description || 'No description provided'
    });
    
    // Re-render the photos grid
    renderPhotos();
    
    // Close the modal and reset the form
    uploadModal.classList.remove('active');
    uploadForm.reset();
    
    // Reset the drop area
    dropArea.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round">
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
            <circle cx="8.5" cy="8.5" r="1.5"></circle>
            <polyline points="21 15 16 10 5 21"></polyline>
        </svg>
        <p class="upload-text">Drag and drop your photo here</p>
        <p class="upload-subtext">or click to browse files</p>
    `;
    dropArea.classList.remove('active');
    
    // Clear the uploaded image
    uploadedImage = null;
    
    alert('Photo uploaded successfully!');
});

// Initialize the app
renderPhotos();