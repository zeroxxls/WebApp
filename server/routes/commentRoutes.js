import express from 'express';
import { authMiddleware } from '../middlewares/authMiddleware.js';
import { addComment, getCommentsForWork } from '../controllers/commentController.js';

const router = express.Router();

router.post('/', authMiddleware, addComment);
router.get('/', getCommentsForWork);

export default router;