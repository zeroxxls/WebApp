import express from 'express';
import { 
  registerUser,
  loginUser,
  getUserById,
  uploadAvatar,
  getAvatar, 
  checkAuth,
} from '../controllers/authController.js';
import upload from '../utils/upload.js';
import User from '../models/User.js';
import {authMiddleware} from '../middlewares/authMiddleware.js';
import {verifyToken} from '../middlewares/verifyToken.js'

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/user/:id', getUserById);
router.get('/avatar/:id', getAvatar);
router.get('/me', verifyToken, checkAuth);
router.patch(
  '/upload-avatar/:id', 
  authMiddleware,
  upload.single('avatar'), 
  uploadAvatar
);
router.patch(
  '/update-profile/:id',
  verifyToken,
  async (req, res) => {
    try {
      const { bio, techStack, contacts } = req.body;
      
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        { 
          bio,
          techStack,
          contacts
        },
        { new: true }
      ).select('-passwordHash');
      
      res.json({
        success: true,
        user: updatedUser
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Failed to update profile',
        error: error.message
      });
    }
  }
);

export default router;
