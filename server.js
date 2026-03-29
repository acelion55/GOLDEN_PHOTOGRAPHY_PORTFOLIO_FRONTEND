const express = require('express');
const multer = require('multer');
const cors = require('cors');
const cloudinary = require('cloudinary').v2;
require('dotenv').config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const app = express();

app.use(cors({ origin: '*', methods: ['GET', 'POST', 'OPTIONS'], allowedHeaders: ['Content-Type'] }));
app.use(express.json());

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 }
});

app.get('/', (req, res) => res.json({ status: 'Golden Photography API OK' }));

const handleUpload = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ success: false, error: 'No file uploaded' });

    const isVideo = req.file.mimetype.startsWith('video');

    const result = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        { resource_type: isVideo ? 'video' : 'auto', folder: 'golden-photography' },
        (error, result) => {
          if (error) return reject(error);
          if (!result) return reject(new Error('No result from Cloudinary'));
          resolve(result);
        }
      ).end(req.file.buffer);
    });

    return res.json({
      success: true,
      file: {
        url: result.secure_url,
        type: isVideo ? 'video' : 'image'
      }
    });
  } catch (err) {
    console.error('Upload error:', err);
    return res.status(500).json({ success: false, error: err.message || 'Upload failed' });
  }
};

app.post('/api/upload', upload.single('file'), handleUpload);
app.post('/upload', upload.single('file'), handleUpload);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

module.exports = app;
