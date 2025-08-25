# 🚀 Deployment Guide

## Frontend Deployment (Vercel)

### Step 1: Push to GitHub
```bash
cd "d:\Kartik\Learning\Projects\Local Cloud Storage"
git add .
git commit -m "Add Vercel configuration and production settings"
git push origin main
```

### Step 2: Deploy to Vercel
1. Go to [vercel.com](https://vercel.com)
2. Sign in with GitHub
3. Click "New Project"
4. Import `simple-cloud-storage-frontend` repository
5. Configure:
   - **Framework Preset**: Other
   - **Root Directory**: `./`
   - **Build Command**: Leave empty (static site)
   - **Output Directory**: `./`
6. Click "Deploy"

Your frontend will be available at: `https://your-app-name.vercel.app`

## Backend Deployment (Railway - Recommended for Private Repos)

### Step 1: Push Backend to GitHub
```bash
cd "d:\Kartik\Learning\Projects\storage-backend"
git add .
git commit -m "Add production CORS and deployment settings"
git push origin main
```

### Step 2: Deploy to Railway
1. Go to [railway.app](https://railway.app)
2. Sign in with GitHub
3. Click "New Project" → "Deploy from GitHub repo"
4. Select `simple-cloud-storage-backend` (private repo)
5. Railway will auto-detect Node.js and deploy
6. Set environment variables:
   - `NODE_ENV`: `production`
   - `PORT`: `3000` (Railway will override this)

### Step 3: Update Frontend with Backend URL
After backend deployment, update `script.js`:
```javascript
const BACKEND_URL = window.location.hostname === 'localhost' 
    ? 'http://localhost:3000'  
    : 'https://your-backend-app.railway.app'; // Your actual Railway URL
```

### Step 4: Update Backend CORS
Update `server.js` with your Vercel frontend URL:
```javascript
origin: process.env.NODE_ENV === 'production' 
    ? ['https://your-frontend-app.vercel.app'] // Your actual Vercel URL
    : ['http://localhost:8080', 'http://localhost:8000'],
```

## Alternative: Heroku Deployment

If you prefer Heroku for backend:

1. Install Heroku CLI
2. ```bash
   cd "d:\Kartik\Learning\Projects\storage-backend"
   heroku create your-storage-backend
   git push heroku main
   ```

## 🎯 Final Architecture

```
Internet
    ↓
[Vercel Frontend] (Public)
    ↓ API calls
[Railway/Heroku Backend] (Private repo, public endpoint)
    ↓ File storage
[Server File System] (Your uploaded files)
```

## 🔒 Security Notes

- Backend repo is private ✅
- Files stored on your backend server ✅
- Frontend accessible from anywhere ✅
- Can add authentication later if needed ✅

Your personal cloud storage will be accessible worldwide! 🌍
