import express from 'express';
import { 
  registerUser,
  loginUser,
  getUserById,
  uploadAvatar 
} from '../controllers/authController.js';
import upload from '../utils/upload.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/user/:id', getUserById);
router.patch('/upload-avatar/:id', upload.single('avatar'), uploadAvatar);

export default router;
