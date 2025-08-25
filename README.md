# Simple Cloud Storage

A simple, elegant file upload interface for your personal cloud storage system.

## Features

- 🎯 **Simple Interface**: Clean, modern design with drag-and-drop support
- 📱 **Responsive**: Works perfectly on desktop and mobile devices  
- 🚀 **Fast Uploads**: Efficient file handling with progress tracking
- 🔒 **Secure**: Ready to connect to your secure backend storage
- 📁 **Multi-file**: Upload multiple files at once
- 💫 **Interactive**: Beautiful animations and user feedback

## Project Structure

```
Local Cloud Storage/
├── index.html          # Main page
├── styles.css          # Styling and responsive design
├── script.js           # Upload logic and UI interactions
└── README.md          # This file
```

## Quick Start

1. **Frontend Setup** (Current):
   ```bash
   # Simply open index.html in your browser
   # Or serve it locally:
   python -m http.server 8000
   # Then visit: http://localhost:8000
   ```

2. **Backend Integration** (Next Step):
   - Create a separate GitHub repository for your storage backend
   - Update the `BACKEND_URL` in `script.js`
   - Uncomment the real upload code
   - Deploy your backend (Heroku, Vercel, etc.)

## Backend Requirements

Your storage backend should have an endpoint that accepts:

```javascript
POST /upload
Content-Type: multipart/form-data

// FormData containing:
// - file: The uploaded file
// - timestamp: Upload timestamp
```

## Recommended Backend Technologies

- **Node.js + Express**: For JavaScript consistency
- **Python + FastAPI**: For ML integration
- **Go + Gin**: For performance
- **Any cloud storage**: AWS S3, Google Cloud, Azure Blob

## Demo Mode

Currently running in demo mode with simulated uploads. The interface is fully functional and ready to connect to your backend!

## Customization

- **Colors**: Edit the CSS gradients and color variables
- **Upload Logic**: Modify the `uploadFile` method in `script.js`
- **UI Elements**: Update HTML structure as needed

## Security Considerations

- Implement file type validation on backend
- Add file size limits
- Use authentication if needed
- Sanitize file names
- Scan for malware if handling public uploads

---

**Next Steps**: Create your storage backend repository and connect it to this frontend!
