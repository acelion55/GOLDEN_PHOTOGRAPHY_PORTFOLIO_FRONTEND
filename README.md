<div align="center">

<img src="https://capsule-render.vercel.app/api?type=waving&color=C8941A&height=180&section=header&text=Golden%20Photography%20API&fontSize=40&fontColor=fff&fontAlignY=38&desc=Backend%20Upload%20Server%20•%20Node.js%20%2B%20Cloudinary&descAlignY=58&descSize=16&animation=fadeIn" width="100%"/>

<br/>

<a href="https://goldenphotography.vercel.app" target="_blank">
  <img src="https://img.shields.io/badge/🌐%20Frontend-goldenphotography.vercel.app-C8941A?style=for-the-badge" />
</a>

<br/><br/>

<img src="https://img.shields.io/badge/Node.js-20-339933?style=flat-square&logo=node.js&logoColor=white" />
<img src="https://img.shields.io/badge/Express-4-000000?style=flat-square&logo=express&logoColor=white" />
<img src="https://img.shields.io/badge/Cloudinary-Storage-3448C5?style=flat-square&logo=cloudinary&logoColor=white" />
<img src="https://img.shields.io/badge/Multer-Upload-FF6B6B?style=flat-square" />
<img src="https://img.shields.io/badge/Vercel-Deployed-000000?style=flat-square&logo=vercel&logoColor=white" />

</div>

---

## 📖 About

This is the **backend API server** for [Golden Photography](https://goldenphotography.vercel.app) — a paid commercial photography portfolio website. The backend handles all file uploads, streaming them directly to **Cloudinary** cloud storage and returning secure URLs to the frontend.

---

## 🔧 What It Does

```
Frontend selects image/video
        ↓
POST /api/upload (this server)
        ↓
Multer reads file into memory (no disk storage)
        ↓
Streams to Cloudinary → folder: golden-photography
        ↓
Returns { success: true, file: { url, type } }
        ↓
Frontend saves URL to Firebase Firestore
        ↓
Website displays image from Cloudinary CDN
```

---

## 🛠️ Tech Stack

| | |
|---|---|
| Runtime | Node.js 20 |
| Framework | Express 4 |
| File Handling | Multer (memory storage) |
| Cloud Storage | Cloudinary |
| Deployment | Vercel Serverless |

---

## 📁 Structure

```
backend/
├── server.js        # Express app + upload routes
├── .env             # Cloudinary credentials
├── vercel.json      # Vercel serverless config
└── package.json
```

---

## 🔌 API Endpoints

### `POST /api/upload`
Uploads a single image or video file to Cloudinary.

**Request:** `multipart/form-data` with field `file`

**Response:**
```json
{
  "success": true,
  "file": {
    "url": "https://res.cloudinary.com/dndungy7b/image/upload/...",
    "type": "image"
  }
}
```

**Supported formats:** `jpg`, `jpeg`, `png`, `gif`, `mp4`, `mov`, `avi`
**Max file size:** 10MB

---

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Set environment variables
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
PORT=3000

# Run server
node server.js
```

---

## 🌐 CORS Allowed Origins

```
http://localhost:8080
https://goldenphotography.in
https://goldenphotography.vercel.app
https://goldenbackend-six.vercel.app
```

---

<div align="center">
<img src="https://capsule-render.vercel.app/api?type=waving&color=C8941A&height=100&section=footer&animation=fadeIn" width="100%"/>

**Backend API for Golden Photography — A Paid Commercial Project**

</div>
