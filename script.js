// Configuration - Backend URL
const BACKEND_URL = window.location.hostname === 'localhost' 
    ? 'http://localhost:3000'  // Local development
    : 'https://your-backend-app.railway.app'; // Production backend URL (update this after deploying backend)

class FileUploader {
    constructor() {
        this.uploadArea = document.getElementById('uploadArea');
        this.fileInput = document.getElementById('fileInput');
        this.uploadBtn = document.getElementById('uploadBtn');
        this.progressSection = document.getElementById('progressSection');
        this.progressFill = document.getElementById('progressFill');
        this.progressText = document.getElementById('progressText');
        this.fileList = document.getElementById('fileList');
        this.statusMessage = document.getElementById('statusMessage');
        
        this.initEventListeners();
    }
    
    initEventListeners() {
        // Click to upload
        this.uploadArea.addEventListener('click', () => {
            this.fileInput.click();
        });
        
        this.uploadBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            this.fileInput.click();
        });
        
        // File input change
        this.fileInput.addEventListener('change', (e) => {
            this.handleFiles(e.target.files);
        });
        
        // Drag and drop
        this.uploadArea.addEventListener('dragover', (e) => {
            e.preventDefault();
            this.uploadArea.classList.add('dragover');
        });
        
        this.uploadArea.addEventListener('dragleave', () => {
            this.uploadArea.classList.remove('dragover');
        });
        
        this.uploadArea.addEventListener('drop', (e) => {
            e.preventDefault();
            this.uploadArea.classList.remove('dragover');
            this.handleFiles(e.dataTransfer.files);
        });
    }
    
    handleFiles(files) {
        if (files.length === 0) return;
        
        this.showStatus('Preparing files for upload...', 'info');
        this.fileList.innerHTML = '';
        
        // Convert FileList to Array and process each file
        Array.from(files).forEach((file, index) => {
            const fileItem = this.addFileToList(file);
            setTimeout(() => this.uploadFile(file, fileItem), index * 100); // Stagger uploads slightly
        });
    }
    
    addFileToList(file) {
        const fileItem = document.createElement('div');
        fileItem.className = 'file-item';
        fileItem.id = `file-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
        
        const fileExtension = file.name.split('.').pop().toUpperCase();
        const fileSize = this.formatFileSize(file.size);
        
        fileItem.innerHTML = `
            <div class="file-info">
                <div class="file-icon">${fileExtension}</div>
                <div class="file-details">
                    <h4>${file.name}</h4>
                    <p>${fileSize}</p>
                </div>
            </div>
            <div class="file-status status-uploading">Uploading...</div>
        `;
        
        this.fileList.appendChild(fileItem);
        return fileItem;
    }
    
    async uploadFile(file, fileItem) {
        
        try {
            // Show progress
            this.showProgress(true);
            
            // Create FormData
            const formData = new FormData();
            formData.append('file', file);
            
            // Real backend upload
            const response = await fetch(`${BACKEND_URL}/upload`, {
                method: 'POST',
                body: formData
            });
            
            if (!response.ok) {
                throw new Error(`Upload failed: ${response.statusText}`);
            }
            
            const result = await response.json();
            
            this.updateFileStatus(fileItem, 'uploaded', 'Uploaded');
            this.showStatus(`File "${file.name}" uploaded successfully!`, 'success');
            
        } catch (error) {
            console.error('Upload error:', error);
            this.updateFileStatus(fileItem, 'error', 'Error');
            this.showStatus(`Failed to upload "${file.name}": ${error.message}`, 'error');
        } finally {
            this.hideProgress();
        }
    }
    
    // Simulate upload progress (remove this when backend is ready)
    async simulateUpload(file, fileItem) {
        return new Promise((resolve) => {
            let progress = 0;
            const interval = setInterval(() => {
                progress += Math.random() * 20;
                if (progress >= 100) {
                    progress = 100;
                    clearInterval(interval);
                    resolve();
                }
                this.updateProgress(progress);
            }, 200);
        });
    }
    
    updateFileStatus(fileItem, statusClass, statusText) {
        const statusElement = fileItem.querySelector('.file-status');
        statusElement.className = `file-status status-${statusClass}`;
        statusElement.textContent = statusText;
    }
    
    showProgress(show = true) {
        this.progressSection.style.display = show ? 'block' : 'none';
        if (show) {
            this.updateProgress(0);
        }
    }
    
    hideProgress() {
        setTimeout(() => {
            this.progressSection.style.display = 'none';
        }, 1000);
    }
    
    updateProgress(percent) {
        this.progressFill.style.width = `${percent}%`;
        this.progressText.textContent = `Uploading... ${Math.round(percent)}%`;
    }
    
    showStatus(message, type) {
        this.statusMessage.textContent = message;
        this.statusMessage.className = `status-message ${type}`;
        this.statusMessage.style.display = 'block';
        
        // Auto-hide success messages
        if (type === 'success') {
            setTimeout(() => {
                this.statusMessage.style.display = 'none';
            }, 3000);
        }
    }
    
    formatFileSize(bytes) {
        if (bytes === 0) return '0 Bytes';
        
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }
}

// Initialize the file uploader when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new FileUploader();
});

// Add some helpful console messages for developers
console.log('🚀 Simple Cloud Storage Frontend loaded!');
console.log('📝 To connect to your backend:');
console.log('   1. Update the BACKEND_URL in script.js');
console.log('   2. Uncomment the real upload code in uploadFile method');
console.log('   3. Remove the simulateUpload method');
console.log('💡 Current status: Demo mode (simulated uploads)');
