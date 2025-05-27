import express from 'express';
import User from '../models/User.js'; // <-- важно!
import { authMiddleware } from '../middlewares/authMiddleware.js';
import { likeWork, unlikeWork, saveWork, unsaveWork, getSavedWorks } from '../controllers/likeSaveController.js';
import { getFileUrls } from '../utils/fileUtils.js'; // Импортируем getFileUrls

const router = express.Router();

router.get('/:id/liked', async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
      .populate({
        path: 'likedWorks',
        populate: [
          {
            path: 'author',
            select: 'fullName avatar',
          },
          {
            path: 'files',
          },
        ],
      });

    const likedWorksWithUrls = await Promise.all(user.likedWorks.map(async (work) => ({
      ...work.toObject(),
      files: await getFileUrls(work.files),
    })));

    res.json({ likedWorks: likedWorksWithUrls });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Ошибка при получении лайкнутых работ' });
  }
});

router.get('/:userId/saved', authMiddleware, getSavedWorks);

router.patch('/:userId/like/:workId', authMiddleware, likeWork);
router.patch('/:userId/unlike/:workId', authMiddleware, unlikeWork);
router.patch('/:userId/save/:workId', authMiddleware, saveWork);
router.patch('/:userId/unsave/:workId', authMiddleware, unsaveWork);

export default router;
