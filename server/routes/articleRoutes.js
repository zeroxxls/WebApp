import express from 'express';
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

const router = express.Router();

router.post('/', authMiddleware, upload.array('images'), createArticle);
router.get('/', getArticles);
router.get('/:id', getArticleById);
router.get('/user/:userId', getUserArticles);
router.put('/:id', authMiddleware, upload.array('images'), updateArticle);
router.delete('/:id', authMiddleware, deleteArticle);

router.post('/:id/comments', authMiddleware, addComment);

export default router;