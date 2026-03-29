import express from 'express';
import multer from 'multer';
import cors from 'cors';
import path from 'path';
import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';
dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const app = express();

app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const allowed = /jpeg|jpg|png|gif|mp4|mov|avi/;
    if (allowed.test(path.extname(file.originalname).toLowerCase()) && allowed.test(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Only images and videos allowed'));
    }
  }
});

app.get('/', (req, res) => res.json({ status: 'Golden Photography API OK' }));

const handleUpload = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ success: false, error: 'No file uploaded' });

    const isVideo = req.file.mimetype.startsWith('video');

    const uploadResult = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        { resource_type: isVideo ? 'video' : 'auto', folder: 'golden-photography' },
        (error, result) => {
          if (error || !result) return reject(error || new Error('Upload failed'));
          resolve(result);
        }
      ).end(req.file.buffer);
    });

    return res.json({
      success: true,
      file: {
        url: uploadResult.secure_url,
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

export default app;
