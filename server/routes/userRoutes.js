import express from 'express';
import { getUserById,updateUserProfile,} from '../controllers/userController.js';
import { purchaseWorks } from '../controllers/purchaseWorks.js';
import { 
  followUser, 
  unfollowUser, 
  getFollowers, 
  getFollowing 
} from '../controllers/followController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.get('/:id', getUserById);
router.patch('/:id', authMiddleware, updateUserProfile);
router.post('/me/purchase', authMiddleware, purchaseWorks);

router.post('/:id/follow', authMiddleware, followUser);
router.post('/:id/unfollow', authMiddleware, unfollowUser);
router.get('/:id/followers', getFollowers);
router.get('/:id/following', getFollowing);

export default router;