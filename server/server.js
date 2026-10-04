import './env.js';
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dns from 'node:dns';
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
import Work from './models/Work.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const app = express();
app.set('trust proxy', 1);
const PORT = process.env.PORT || 4444;
const uri = process.env.MONGO_URI;

const allowedOrigins = [
  'http://localhost:5173',
  'https://luminio-project.netlify.app',
  'https://web-app-beryl-gamma.vercel.app',
];

const dnsServers = process.env.MONGO_DNS_SERVERS
  ?.split(',')
  .map(server => server.trim())
  .filter(Boolean);
if (dnsServers?.length) {
  dns.setServers(dnsServers);
}

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));

app.use(express.json());

app.use('/auth', authRoutes);
app.use('/users', userRoutes);
app.use('/users', likeSaveRoutes);
app.use('/avatars', avatarRoutes);
app.use('/works', workRoutes);
app.use('/works/:workId/comments', commentRoutes);
app.use('/articles', articleRoutes);
app.use('/static/avatars', express.static(path.join(__dirname, 'uploads', 'avatars')));
app.use('/static/works', express.static(path.join(__dirname, 'uploads', 'works')));

app.use((req, res, next) => {
  if (mongoose.connection.readyState !== 1) {
    return res.status(503).json({
      success: false,
      message: 'Database not connected',
    });
  }
  next();
});

app.use((err, req, res, _next) => {
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

const startServer = async () => {
  if (!uri) {
    throw new Error('MONGO_URI is missing. Add it to server/.env.');
  }

  await mongoose.connect(uri, { dbName: 'app' });
  await Work.createIndexes();
  console.log('MongoDB connected successfully');

  app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
};

startServer().catch(error => {
  console.error('Server startup failed:', error.message);
  if (error.code === 'ECONNREFUSED' && error.syscall?.startsWith('query')) {
    console.error('Node could not reach its DNS resolver. Check the active DNS server or set MONGO_DNS_SERVERS in server/.env.');
  }
  process.exit(1);
});
