import User from '../models/User.js';
import { getFileUrls } from '../utils/fileUtils.js';

export const likeWork = async (req, res) => {
  const { userId, workId } = req.params;
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    if (!user.likedWorks.includes(workId)) {
      user.likedWorks.push(workId);
      await user.save();
    }
    res.json({ likedWorks: user.likedWorks });
  } catch (error) {
    console.error('Error liking work:', error);
    res.status(500).json({ message: 'Something went wrong' });
  }
};

export const unlikeWork = async (req, res) => {
  const { userId, workId } = req.params;
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    user.likedWorks = user.likedWorks.filter(id => id !== workId);
    await user.save();
    res.json({ likedWorks: user.likedWorks });
  } catch (error) {
    console.error('Error unliking work:', error);
    res.status(500).json({ message: 'Something went wrong' });
  }
};

export const saveWork = async (req, res) => {
  const { userId, workId } = req.params;
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    if (!user.savedWorks.includes(workId)) {
      user.savedWorks.push(workId);
      await user.save();
    }
    res.json({ savedWorks: user.savedWorks });
  } catch (error) {
    console.error('Error saving work:', error);
    res.status(500).json({ message: 'Something went wrong' });
  }
};

export const unsaveWork = async (req, res) => {
  const { userId, workId } = req.params;
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    user.savedWorks = user.savedWorks.filter(id => id !== workId);
    await user.save();
    res.json({ savedWorks: user.savedWorks });
  } catch (error) {
    console.error('Error unsaving work:', error);
    res.status(500).json({ message: 'Something went wrong' });
  }
};

export const getLikedWorks = async (req, res) => {
  const { userId } = req.params;
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ likedWorks: user.likedWorks });
  } catch (error) {
    console.error('Error getting liked works:', error);
    res.status(500).json({ message: 'Something went wrong' });
  }
};

export const getSavedWorks = async (req, res) => {
  const { userId } = req.params;
  try {
    const user = await User.findById(userId).populate({
      path: 'savedWorks',
      populate: [
        { path: 'author', select: 'fullName avatar' },
        { path: 'files' },
      ],
    });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const savedWorksWithUrls = await Promise.all(user.savedWorks.map(async (work) => ({
      ...work.toObject(),
      files: await getFileUrls(work.files),
    })));

    res.json({ savedWorks: savedWorksWithUrls });
  } catch (error) {
    console.error('Error getting saved works:', error);
    res.status(500).json({ message: 'Something went wrong' });
  }
};