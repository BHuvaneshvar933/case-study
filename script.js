const photoData = [
    { id: 1, url: 'https://images.unsplash.com/photo-1454942901704-3c44c11b2ad1?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', title: 'Mountain Sunrise', username: 'naturelover', likes: 245, date: '2 days ago', description: 'Beautiful sunrise captured from the top of Mount Rainier. The colors were absolutely breathtaking.' },
    { id: 2, url: 'https://images.unsplash.com/photo-1554793000-245d3a3c2a51?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8VXJiYW4lMjBBcmNoaXRlY3R1cmV8ZW58MHx8MHx8fDA%3D', title: 'Urban Architecture', username: 'cityexplorer', likes: 189, date: '4 days ago', description: 'Modern architecture in downtown Seattle. The geometric patterns and reflections caught my eye.' },
    { id: 3, url: 'https://plus.unsplash.com/premium_photo-1669748157617-a3a83cc8ea23?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8YmVhY2glMjBzdW5zZXR8ZW58MHx8MHx8fDA%3D', title: 'Beach Sunset', username: 'travelphotographer', likes: 367, date: '1 week ago', description: 'Golden hour at Malibu Beach. The waves were perfect and the sky was on fire.' },
    { id: 4, url: 'https://images.unsplash.com/photo-1541902001797-3989f96ab97e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8QXV0dW1uJTIwQ29sb3JzfGVufDB8fDB8fHww', title: 'Autumn Colors', username: 'seasonalshots', likes: 213, date: '3 days ago', description: 'Fall foliage in New England. The red and orange leaves created a magical atmosphere.' },
    { id: 5, url: 'https://plus.unsplash.com/premium_photo-1724458589661-a2f42eb58aca?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Q2l0eSUyME5pZ2h0bGlmZXxlbnwwfHwwfHx8MA%3D%3D', title: 'City Nightlife', username: 'urbanphotos', likes: 298, date: '5 days ago', description: 'Night photography in Times Square. The neon lights and bustling crowds make for an exciting scene.' },
    { id: 6, url: 'https://plus.unsplash.com/premium_photo-1661884151947-ad09dee18a07?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8Rm9yZXN0JTIwUGF0aHxlbnwwfHwwfHx8MA%3D%3D', title: 'Forest Path', username: 'hikerpro', likes: 176, date: '2 weeks ago', description: 'Hiking trail through an old-growth forest. The morning mist created a mystical atmosphere.' }
];

// DOM Elements
const photoGrid = document.getElementById('photoGrid');
const uploadBtn = document.getElementById('uploadBtn');
const uploadModal = document.getElementById('uploadModal');
const closeModal = document.getElementById('closeModal');
const dropArea = document.getElementById('dropArea');
const fileInput = document.getElementById('fileInput');
const uploadForm = document.getElementById('uploadForm');
let uploadedImage = null;

// Render all photos
function renderPhotos() {
    photoGrid.innerHTML = photoData.map(photo => `
        <div class="photo-card">
            <div class="photo-container">
                <img src="${photo.url}" alt="${photo.title}" class="photo-img">
                <div class="photo-overlay">
                    <div class="overlay-actions">
                        <button class="overlay-btn like-btn" data-id="${photo.id}">❤️</button>
                    </div>
                </div>
            </div>
            <div class="photo-info">
                <h3>${photo.title}</h3>
                <div class="photo-meta">
                    <span>by ${photo.username}</span>
                    <span class="like-count" data-id="${photo.id}">❤️ ${photo.likes}</span>
                </div>
            </div>
        </div>
    `).join('');

    document.querySelectorAll('.like-btn').forEach(btn =>
        btn.onclick = () => handleLike(+btn.dataset.id)
    );
}

// Handle like button click
function handleLike(id) {
    const photo = photoData.find(p => p.id === id);
    if (photo) {
        photo.likes++;
        document.querySelector(`.like-count[data-id="${id}"]`).textContent = `❤️ ${photo.likes}`;
    }
}

// Upload image preview
fileInput.onchange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    uploadedImage = file;

    const reader = new FileReader();
    reader.onload = (e) => {
        dropArea.innerHTML = `<img src="${e.target.result}" alt="Preview" style="max-width:100%; max-height:200px; border-radius:8px;">
        <p class="upload-text">Image ready to upload</p>`;
        dropArea.classList.add('active');
    };
    reader.readAsDataURL(file);
};

// Upload form submit
uploadForm.onsubmit = (e) => {
    e.preventDefault();
    const title = document.getElementById('photoTitle').value || 'Untitled Photo';
    const description = document.getElementById('photoDescription').value || 'No description provided';
    if (!uploadedImage) return alert('Please select an image to upload');

    photoData.unshift({
        id: Date.now(),
        url: URL.createObjectURL(uploadedImage),
        title,
        username: 'you',
        likes: 0,
        date: 'Just now',
        description
    });

    renderPhotos();
    uploadForm.reset();
    uploadedImage = null;
    uploadModal.classList.remove('active');
    dropArea.classList.remove('active');
    dropArea.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>
        <p class="upload-text">Drag and drop your photo here</p>
        <p class="upload-subtext">or click to browse files</p>`;
    alert('Photo uploaded successfully!');
};

// Event listeners
uploadBtn.onclick = () => uploadModal.classList.add('active');
closeModal.onclick = () => uploadModal.classList.remove('active');
dropArea.onclick = () => fileInput.click();

// Initialize
renderPhotos();
