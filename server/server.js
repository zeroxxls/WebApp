import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import process from 'node:process';
import authRoutes from './routes/authRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4444;
const uri = process.env.MONGO_URI;

mongoose.connect(uri, {
  dbName: 'app',
})
  .then(() => console.log('✅ MongoDB connected successfully'))
  .catch(err => {
    console.error('❌ MongoDB connection error:', err);
    process.exit(1);
  });

app.use(cors());
app.use(express.json());

// Middleware для проверки подключения к базе
app.use((req, res, next) => {
  if (mongoose.connection.readyState !== 1) {
    return res.status(503).json({
      success: false,
      message: 'Database not connected',
    });
  }
  next();
});

app.use('/auth', authRoutes);

// Global error handler
app.use((err, req, res,) => {
  console.error('🔥', err.stack);
  res.status(500).json({
    success: false,
    message: 'Something broke!',
    error: err.message,
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});

