import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import process from 'node:process';
import { fileURLToPath } from 'url';
import path from 'path';
import authRoutes from './routes/authRoutes.js'
import userRoutes from './routes/userRoutes.js'
import avatarRoutes from './routes/avatarRoutes.js'
import workRoutes from './routes/workRoutes.js'
import commentRoutes from './routes/commentRoutes.js';
import likeSaveRoutes from './routes/likeSaveRoutes.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4444;
const uri = process.env.MONGO_URI;

mongoose.connect(uri, {
  dbName: 'app',
})
  .then(() => console.log('MongoDB connected successfully'))
  .catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });

const corsOptions = {
  origin: 'http://localhost:5173', 
  credentials: true, 
  optionsSuccessStatus: 200 
};

app.use(cors(corsOptions));
app.use(express.json());

// Routes
app.use('/auth', authRoutes);
app.use('/users', userRoutes);
app.use('/users', likeSaveRoutes);
app.use('/avatars', avatarRoutes);
app.use('/avatars', express.static(path.join(__dirname, 'uploads', 'avatars')));
app.use('/works', workRoutes);
app.use('/works', express.static(path.join(__dirname, 'uploads', 'works')));
app.use('/works/:workId/comments', commentRoutes);

app.use((req, res, next) => {
  if (mongoose.connection.readyState !== 1) {
    return res.status(503).json({
      success: false,
      message: 'Database not connected',
    });
  }
  next();
});

app.use((err, req, res,next) => {
  console.error('error:', err.stack);
  res.status(500).json({
    success: false,
    message: 'Something broke!',
    error: err.message,
  });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});