import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import process from 'node:process';
import { fileURLToPath } from 'url';
import path from 'path';
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import avatarRoutes from './routes/avatarRoutes.js';
import workRoutes from './routes/workRoutes.js';
import commentRoutes from './routes/commentRoutes.js';
import likeSaveRoutes from './routes/likeSaveRoutes.js';
import articleRoutes from './routes/articleRoutes.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4444;
const uri = process.env.MONGO_URI;

app.use(cors({
  origin: [
    'https://luminio-project.netlify.app',
  ],
  credentials: true
}));

mongoose.connect(uri, {
  dbName: 'app',
})
  .then(() => console.log('MongoDB connected successfully'))
  .catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });

app.use(express.json());

app.use('/auth', authRoutes);
app.use('/users', userRoutes);
app.use('/users', likeSaveRoutes);
app.use('/avatars', avatarRoutes);
app.use('/avatars', express.static(path.join(__dirname, 'uploads', 'avatars')));
app.use('/works', workRoutes);
app.use('/works', express.static(path.join(__dirname, 'uploads', 'works')));
app.use('/works/:workId/comments', commentRoutes);
app.use('/articles', articleRoutes);

app.use((req, res, next) => {
  if (mongoose.connection.readyState !== 1) {
    return res.status(503).json({
      success: false,
      message: 'Database not connected',
    });
  }
  next();
});

app.use((err, req, res, next) => {
  console.error('Error:', err.stack);
  
  if (err.message === 'Not allowed by CORS') {
    return res.status(403).json({
      success: false,
      message: 'CORS policy: Access denied',
    });
  }
  
  res.status(500).json({
    success: false,
    message: 'Something broke!',
    error: process.env.NODE_ENV === 'development' ? err.message : 'Internal server error',
  });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});