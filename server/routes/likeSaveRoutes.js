import express from 'express';
import { authMiddleware } from '../middlewares/authMiddleware.js';
import { requireSelfUser } from '../middlewares/requireSelfUser.js';
import { likeWork, unlikeWork, saveWork, unsaveWork, getLikedWorks, getSavedWorks } from '../controllers/likeSaveController.js';

const router = express.Router();

router.get('/:userId/liked', authMiddleware, requireSelfUser, getLikedWorks);

router.get('/:userId/saved', authMiddleware, requireSelfUser, getSavedWorks);

router.patch('/:userId/like/:workId', authMiddleware, requireSelfUser, likeWork);
router.patch('/:userId/unlike/:workId', authMiddleware, requireSelfUser, unlikeWork);
router.patch('/:userId/save/:workId', authMiddleware, requireSelfUser, saveWork);
router.patch('/:userId/unsave/:workId', authMiddleware, requireSelfUser, unsaveWork);

export default router;
