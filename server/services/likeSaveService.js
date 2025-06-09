import User from '../models/User.js';
import { getFileUrls } from '../utils/fileUtils.js';

export const likeWorkService = async (userId, workId) => {
  const user = await User.findById(userId);
  if (!user) throw new Error('User not found');

  if (!user.likedWorks.includes(workId)) {
    user.likedWorks.push(workId);
    await user.save();
  }
  return user.likedWorks;
};

export const unlikeWorkService = async (userId, workId) => {
  const user = await User.findById(userId);
  if (!user) throw new Error('User not found');

  user.likedWorks = user.likedWorks.filter(id => id !== workId);
  await user.save();
  return user.likedWorks;
};

export const saveWorkService = async (userId, workId) => {
  const user = await User.findById(userId);
  if (!user) throw new Error('User not found');

  if (!user.savedWorks.includes(workId)) {
    user.savedWorks.push(workId);
    await user.save();
  }
  return user.savedWorks;
};

export const unsaveWorkService = async (userId, workId) => {
  const user = await User.findById(userId);
  if (!user) throw new Error('User not found');

  user.savedWorks = user.savedWorks.filter(id => id !== workId);
  await user.save();
  return user.savedWorks;
};

export const getLikedWorksService = async (userId) => {
  const user = await User.findById(userId);
  if (!user) throw new Error('User not found');

  return user.likedWorks;
};

export const getSavedWorksService = async (userId) => {
  const user = await User.findById(userId).populate({
    path: 'savedWorks',
    populate: [
      { path: 'author', select: 'fullName avatar' },
      { path: 'files' },
    ],
  });

  if (!user) throw new Error('User not found');

  const savedWorksWithUrls = await Promise.all(
    user.savedWorks.map(async (work) => ({
      ...work.toObject(),
      files: await getFileUrls(work.files),
    }))
  );

  return savedWorksWithUrls;
};
