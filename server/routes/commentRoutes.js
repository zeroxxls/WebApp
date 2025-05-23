import express from 'express';
import { authMiddleware } from '../middlewares/authMiddleware.js';
import { addComment, getCommentsForWork } from '../controllers/commentController.js';

const router = express.Router({ mergeParams: true });

router.route('/')
  .post(authMiddleware, addComment)
  .get(getCommentsForWork);

export default router;