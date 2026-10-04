import express from 'express';
import { 
    registerUser, 
    loginUser, 
    checkAuth,
} from '../controllers/authController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';
import rateLimit from 'express-rate-limit';

const router = express.Router();

const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 10,
    standardHeaders: 'draft-8',
    legacyHeaders: false,
    message: { success: false, message: 'Too many login attempts. Try again later.' },
});

const registrationLimiter = rateLimit({
    windowMs: 60 * 60 * 1000,
    limit: 5,
    standardHeaders: 'draft-8',
    legacyHeaders: false,
    message: { success: false, message: 'Too many registration attempts. Try again later.' },
});

router.post('/register', registrationLimiter, registerUser);
router.post('/login', loginLimiter, loginUser);
router.get('/check', authMiddleware, checkAuth);

export default router;
