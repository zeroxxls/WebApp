import express from 'express';
import { S3Client, GetObjectCommand } from '@aws-sdk/client-s3';
import dotenv from 'dotenv';
import process from 'node:process';
import {
  createArticle,
  getArticles,
  getArticleById,
  updateArticle,
  deleteArticle,
  getUserArticles,
  addComment
} from '../controllers/articleController.js';

import { authMiddleware } from '../middlewares/authMiddleware.js';
import upload from '../middlewares/uploadMiddleware.js';

dotenv.config();
const s3Client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});
const bucketName = process.env.AWS_BUCKET_NAME;
const router = express.Router();

router.get('/image/:key', async (req, res) => {
  try {
    const { key } = req.params;
    const command = new GetObjectCommand({
      Bucket: bucketName,
      Key: decodeURIComponent(key)
    });

    const { Body, ContentType } = await s3Client.send(command);
    
    // Устанавливаем правильные заголовки
    res.set({
      'Content-Type': ContentType,
      'Cache-Control': 'public, max-age=31536000' // Кэшируем на год
    });
    
    // Потоково передаем изображение
    Body.pipe(res);
  } catch (err) {
    console.error('Error fetching image:', err);
    res.status(404).send('Image not found');
  }
});
router.post('/', authMiddleware, upload.array('images'), createArticle);
router.get('/', (req, res, next) => {
  console.log('GET /articles triggered');
  next();
}, getArticles);
router.get('/:id', getArticleById);
router.get('/user/:userId', getUserArticles);
router.put('/:id', authMiddleware, upload.array('images'), updateArticle);
router.delete('/:id', authMiddleware, deleteArticle);

router.post('/:id/comments', authMiddleware, addComment);

export default router;