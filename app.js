// Sample video data
let videoDatabase = [
    { 
        id: 1, make: 'Maruti Suzuki', model: 'Swift', product: 'Seat Covers',
        title: 'Maruti Swift Premium Seat Cover Installation',
        description: 'Complete guide to installing premium fabric seat covers on Maruti Suzuki Swift.',
        duration: '5:15',
        thumbnail: 'https://placehold.co/400x225?text=Swift+Seat+Covers',
        videoUrl: 'https://sample-videos.com/video123/mp4/720/big_buck_bunny.mp4'
    },
    { 
        id: 2, make: 'Maruti Suzuki', model: 'Baleno', product: 'LED Lights',
        title: 'Baleno LED Headlight Upgrade',
        description: 'Professional LED headlight installation for Maruti Suzuki Baleno.',
        duration: '7:30',
        thumbnail: 'https://placehold.co/400x225?text=Baleno+LED',
        videoUrl: 'https://sample-videos.com/video123/mp4/720/big_buck_bunny.mp4'
    },
    { 
        id: 3, make: 'Maruti Suzuki', model: 'Dzire', product: 'Floor Mats',
        title: 'Maruti Dzire Custom Floor Mats',
        description: 'Custom-fit rubber floor mats installation for Maruti Suzuki Dzire.',
        duration: '3:45',
        thumbnail: 'https://placehold.co/400x225?text=Dzire+Mats',
        videoUrl: 'https://sample-videos.com/video123/mp4/720/big_buck_bunny.mp4'
    }
];

// Car models data
const carModels = {
  'Maruti Suzuki': [
    'Alto K10', 'S-Presso', 'Celerio', 'Swift', 'Ignis',
    'Dzire', 'Ciaz',
    'Brezza', 'Fronx', 'Jimny', 'Grand Vitara', 'Vitara', 'e-Vitara',
    'Ertiga', 'XL6', 'Eeco', 'Omni'
  ],
  'Hyundai': [
    'Grand i10 Nios', 'i20', 'i20 N-Line',
    'Aura', 'Verna',
    'Exter', 'Venue', 'Venue N-Line', 'Creta', 'Creta N-Line',
    'Alcazar', 'Tucson',
    'Creta Electric', 'Ioniq 5'
  ],
  'Tata': [
    'Tiago', 'Tigor', 'Altroz', 'Punch', 'Nexon', 'Nexon EV', 
    'Harrier', 'Safari'
  ],
  'Mahindra': [
    'Thar', 'Scorpio', 'Scorpio-N', 'XUV700', 'XUV 3XO', 
    'Bolero', 'Bolero Neo', 'Marazzo'
  ],
  'Toyota': [
    'Glanza', 'Urban Cruiser', 'Innova Crysta', 
    'Innova Hycross', 'Fortuner', 'Camry'
  ],
  'Kia': [
    'Sonet', 'Seltos', 'Carens', 'Carnival', 'Syros'
  ],
  'Skoda': [
    'Slavia', 'Kushaq', 'Kodiaq'
  ],
  'Volkswagen': [
    'Polo', 'Virtus', 'Taigun', 'Tiguan'
  ],
  'Renault': [
    'Kwid', 'Triber', 'Kiger'
  ],
  'Nissan': [
    'Magnite'
  ],
  'MG': [
    'Hector', 'Hector Plus', 'Astor', 'ZS EV', 'Gloster'
  ],
  'Honda': [
    'City', 'Amaze', 'Elevate'
  ]
};

// DOM elements
const carMakeSelect = document.getElementById('carMake');
const carModelSelect = document.getElementById('carModel');
const productTypeSelect = document.getElementById('productType');
const searchBtn = document.getElementById('searchBtn');
const clearBtn = document.getElementById('clearBtn');
const resultsSection = document.getElementById('resultsSection');
const videoGrid = document.getElementById('videoGrid');
const resultCount = document.getElementById('resultCount');
const loading = document.getElementById('loading');
const noResults = document.getElementById('noResults');
const videoModal = document.getElementById('videoModal');
const modalVideo = document.getElementById('modalVideo');
const modalTitle = document.getElementById('modalTitle');
const videoDescription = document.getElementById('videoDescription');
const closeModal = document.getElementById('closeModal');
const uploadBtn = document.getElementById('uploadBtn');
const uploadModal = document.getElementById('uploadModal');
const closeUploadModal = document.getElementById('closeUploadModal');
const cancelUpload = document.getElementById('cancelUpload');
const uploadForm = document.getElementById('uploadForm');
const dropZone = document.getElementById('dropZone');
const videoFileInput = document.getElementById('videoFile');
const fileName = document.getElementById('fileName');
const uploadProgress = document.getElementById('uploadProgress');
const progressFilled = document.getElementById('progressFilled');
const progressText = document.getElementById('progressText');
const uploadCarMake = document.getElementById('uploadCarMake');
const uploadCarModel = document.getElementById('uploadCarModel');
const uploadProductType = document.getElementById('uploadProductType');
const uploadDuration = document.getElementById('uploadDuration');
const uploadTitle = document.getElementById('uploadTitle');
const uploadDescription = document.getElementById('uploadDescription');
const uploadThumbnail = document.getElementById('uploadThumbnail');
const totalVideos = document.getElementById('totalVideos');

// Event listeners
if (carMakeSelect) carMakeSelect.addEventListener('change', updateCarModels);
if (searchBtn) searchBtn.addEventListener('click', searchVideos);
if (clearBtn) clearBtn.addEventListener('click', clearFilters);
if (closeModal) closeModal.addEventListener('click', () => videoModal.classList.add('hidden'));
if (uploadBtn) uploadBtn.addEventListener('click', () => uploadModal.classList.remove('hidden'));
if (closeUploadModal) closeUploadModal.addEventListener('click', closeUploadModalHandler);
if (cancelUpload) cancelUpload.addEventListener('click', closeUploadModalHandler);
if (uploadCarMake) uploadCarMake.addEventListener('change', updateUploadCarModels);
if (uploadForm) uploadForm.addEventListener('submit', handleUploadSubmit);
if (videoFileInput) videoFileInput.addEventListener('change', handleFileSelect);

if (dropZone) {
    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(ev => {
        dropZone.addEventListener(ev, preventDefaults, false);
    });
    ['dragenter', 'dragover'].forEach(ev => dropZone.addEventListener(ev, highlight, false));
    ['dragleave', 'drop'].forEach(ev => dropZone.addEventListener(ev, unhighlight, false));
    dropZone.addEventListener('drop', handleDrop, false);
}

// Functions
function updateCarModels() {
    const make = carMakeSelect.value;
    carModelSelect.innerHTML = '<option value="">Select Model</option>';
    if (make && carModels[make]) {
        carModelSelect.disabled = false;   // fixed bug here
        carModels[make].forEach(model => {
            const opt = document.createElement('option');
            opt.value = model;
            opt.textContent = model;
            carModelSelect.appendChild(opt);
        });
    } else {
        carModelSelect.disabled = true;
    }
}

function updateUploadCarModels() {
    const make = uploadCarMake.value;
    uploadCarModel.innerHTML = '<option value="">Select Model</option>';
    if (make && carModels[make]) {
        uploadCarModel.disabled = false;
        carModels[make].forEach(model => {
            const opt = document.createElement('option');
            opt.value = model;
            opt.textContent = model;
            uploadCarModel.appendChild(opt);
        });
    } else {
        uploadCarModel.disabled = true;
    }
}

function searchVideos() {
    const make = carMakeSelect.value;
    const model = carModelSelect.value;
    const product = productTypeSelect.value;

    resultsSection.classList.remove('hidden');
    loading.classList.remove('hidden');
    videoGrid.innerHTML = '';
    noResults.classList.add('hidden');

    setTimeout(() => {
        const filtered = videoDatabase.filter(v =>
            (!make || v.make === make) &&
            (!model || v.model === model) &&
            (!product || v.product === product)
        );
        displayResults(filtered);
        loading.classList.add('hidden');
    }, 500);
}

function displayResults(videos) {
    videoGrid.innerHTML = '';
    resultCount.textContent = `${videos.length} video${videos.length !== 1 ? 's' : ''} found`;

    if (!videos.length) {
        noResults.classList.remove('hidden');
        return;
    }

    videos.forEach(video => {
        const card = document.createElement('div');
        card.className = 'video-card bg-white rounded-lg shadow-md overflow-hidden';
        card.innerHTML = `
            <div class="video-thumbnail relative cursor-pointer" onclick="openVideoModal(${video.id})">
                <img src="${video.thumbnail}" alt="${video.title}" onerror="this.src='https://placehold.co/400x225?text=No+Image'">
                <div class="absolute bottom-2 right-2 bg-black bg-opacity-75 text-white px-2 py-1 rounded text-sm">
                    ${video.duration}
                </div>
            </div>
            <div class="p-2">
                <h3 class="font-semibold">${video.title}</h3>
                <small>${video.make} ${video.model} • ${video.product}</small>
            </div>
        `;
        videoGrid.appendChild(card);
    });
}

function openVideoModal(id) {
    const video = videoDatabase.find(v => v.id === id);
    if (video) {
        modalTitle.textContent = video.title;
        videoDescription.textContent = video.description;
        modalVideo.src = video.videoUrl;
        videoModal.classList.remove('hidden');
    }
}

function clearFilters() {
    carMakeSelect.value = '';
    carModelSelect.innerHTML = '<option value="">Select Model</option>';
    carModelSelect.disabled = true;
    productTypeSelect.value = '';
    resultsSection.classList.add('hidden');
}

function closeUploadModalHandler() {
    if (uploadModal) uploadModal.classList.add('hidden');
    resetUploadForm();
}

function resetUploadForm() {
    if (!uploadForm) return;
    uploadForm.reset();
    if (fileName) fileName.classList.add('hidden');
    if (uploadProgress) uploadProgress.classList.add('hidden');
    if (progressFilled) progressFilled.style.width = '0%';
    if (progressText) progressText.textContent = '0% uploaded';
    if (uploadCarModel) {
        uploadCarModel.innerHTML = '<option value="">Select Model</option>';
        uploadCarModel.disabled = true;
    }
}

function preventDefaults(e) { e.preventDefault(); e.stopPropagation(); }
function highlight() { dropZone.classList.add('dragover'); }
function unhighlight() { dropZone.classList.remove('dragover'); }

function handleDrop(e) { handleFiles(e.dataTransfer.files); }
function handleFileSelect(e) { handleFiles(e.target.files); }

function handleFiles(files) {
    if (files.length > 0) {
        const file = files[0];
        if (file.type.startsWith('video/')) {
            fileName.textContent = file.name;
            fileName.classList.remove('hidden');
            simulateFileUpload();
        } else {
            alert('Please select a valid video file.');
        }
    }
}

function simulateFileUpload() {
    uploadProgress.classList.remove('hidden');
    let progress = 0;
    const interval = setInterval(() => {
        progress += 5;
        progressFilled.style.width = `${progress}%`;
        progressText.textContent = `${progress}% uploaded`;
        if (progress >= 100) {
            clearInterval(interval);
            progressText.textContent = 'Upload complete!';
        }
    }, 100);
}

function handleUploadSubmit(e) {
    e.preventDefault();
    if (!fileName.textContent) {
        alert('Please select a video file to upload.');
        return;
    }
    if (!uploadCarMake.value || !uploadCarModel.value || !uploadProductType.value ||
        !uploadTitle.value || !uploadDescription.value || !uploadDuration.value || !uploadThumbnail.value) {
        alert('Please fill in all required fields.');
        return;
    }

    const newVideo = {
        id: videoDatabase.length + 1,
        make: uploadCarMake.value,
        model: uploadCarModel.value,
        product: uploadProductType.value,
        title: uploadTitle.value,
        description: uploadDescription.value,
        duration: uploadDuration.value,
        thumbnail: uploadThumbnail.value || 'https://placehold.co/400x225',
        videoUrl: 'https://sample-videos.com/video123/mp4/720/big_buck_bunny.mp4'
    };

    videoDatabase.push(newVideo);
    updateTotalVideosCount();
    closeUploadModalHandler();
    alert('Video uploaded successfully!');
    if (!resultsSection.classList.contains('hidden')) searchVideos();
}

function updateTotalVideosCount() {
    totalVideos.textContent = `${videoDatabase.length} videos available`;
}

// Close modals on ESC or outside click
document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
        if (!videoModal.classList.contains('hidden')) {
            videoModal.classList.add('hidden');
            modalVideo.pause(); modalVideo.src = '';
        }
        if (!uploadModal.classList.contains('hidden')) closeUploadModalHandler();
    }
});
if (videoModal) videoModal.addEventListener('click', e => {
    if (e.target === videoModal) {
        videoModal.classList.add('hidden');
        modalVideo.pause(); modalVideo.src = '';
    }
});
if (uploadModal) uploadModal.addEventListener('click', e => {
    if (e.target === uploadModal) closeUploadModalHandler();
});

// Init
updateTotalVideosCount();
