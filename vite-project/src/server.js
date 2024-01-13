const express = require('express');
const multer = require('multer');
const path = require('path');
const app = express();
const port = 5173;

// Set up multer disk storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const timestamp = Date.now();
    const fileExtension = path.extname(file.originalname);
    const newFileName = `${timestamp}${fileExtension}`;
    cb(null, newFileName);
  },
});

const upload = multer({ storage: storage });

// Serve static files from the "public" directory
app.use(express.static('public'));

// Serve files from the "uploads" directory
app.use('/uploads', express.static('uploads'));

// Handle file upload
app.post('/upload', upload.single('wordDocument'), (req, res) => {
  const file = req.file;
  console.log('File received:', file.originalname, file.size, 'bytes');
  res.json({ message: 'File uploaded successfully' });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
