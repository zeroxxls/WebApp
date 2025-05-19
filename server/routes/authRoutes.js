import express from 'express';
import { 
    registerUser, 
    loginUser, 
    checkAuth 
} from '../controllers/authController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/check', authMiddleware, checkAuth); // Добавьте middleware здесь

export default router;