import multer from 'multer';
import path from 'path';

const upload = multer({
  storage: multer.memoryStorage(), // Храним файл в памяти как Buffer
  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|png|gif/;
    const mimetype = filetypes.test(file.mimetype);
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    
    if (mimetype && extname) {
      return cb(null, true);
    }
    cb(new Error('Only image files are allowed!'));
  },
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
});

export default upload;