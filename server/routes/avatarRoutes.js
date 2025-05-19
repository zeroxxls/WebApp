import express from 'express';
import { uploadAvatar, getAvatar } from '../controllers/avatarController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';
import upload from '../utils/upload.js';

const router = express.Router();

router.patch(
  '/:id/avatar',
  authMiddleware,
  upload.single('avatar'),
  uploadAvatar
);

router.get('/:id/avatar', getAvatar);

export default router;