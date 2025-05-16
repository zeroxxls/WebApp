import express from 'express';
import { 
  registerUser,
  loginUser,
  getUserById,
  uploadAvatar,
  getAvatar, 
} from '../controllers/authController.js';
import upload from '../utils/upload.js';
import {authMiddleware} from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/user/:id', getUserById);
router.get('/avatar/:id', getAvatar);
router.patch(
  '/upload-avatar/:id', 
  authMiddleware,
  upload.single('avatar'), 
  uploadAvatar
);

export default router;
