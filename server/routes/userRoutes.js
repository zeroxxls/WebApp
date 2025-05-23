import express from 'express';
import { getUserById,updateUserProfile  } from '../controllers/userController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.get('/:id', getUserById);
router.patch('/:id', authMiddleware, updateUserProfile);

export default router;