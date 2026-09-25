import User from '../models/User.js';
import { getFileUrls } from '../utils/fileUtils.js';
import mongoose from 'mongoose';

const assertWorkId = (workId) => {
  if (!mongoose.Types.ObjectId.isValid(workId)) {
    const error = new Error('Invalid work ID');
    error.statusCode = 400;
    throw error;
  }
};

export const likeWorkService = async (userId, workId) => {
  assertWorkId(workId);
  const user = await User.findById(userId).select('+likedWorks');
  if (!user) throw new Error('User not found');

  if (!user.likedWorks.some(id => id.equals(workId))) {
    user.likedWorks.push(workId);
    await user.save();
  }
  return user.likedWorks;
};

export const unlikeWorkService = async (userId, workId) => {
  assertWorkId(workId);
  const user = await User.findById(userId).select('+likedWorks');
  if (!user) throw new Error('User not found');

  user.likedWorks = user.likedWorks.filter(id => !id.equals(workId));
  await user.save();
  return user.likedWorks;
};

export const saveWorkService = async (userId, workId) => {
  assertWorkId(workId);
  const user = await User.findById(userId).select('+savedWorks');
  if (!user) throw new Error('User not found');

  if (!user.savedWorks.some(id => id.equals(workId))) {
    user.savedWorks.push(workId);
    await user.save();
  }
  return user.savedWorks;
};

export const unsaveWorkService = async (userId, workId) => {
  assertWorkId(workId);
  const user = await User.findById(userId).select('+savedWorks');
  if (!user) throw new Error('User not found');

  user.savedWorks = user.savedWorks.filter(id => !id.equals(workId));
  await user.save();
  return user.savedWorks;
};

export const getLikedWorksService = async (userId) => {
  const user = await User.findById(userId).select('+likedWorks').populate({
    path: 'likedWorks',
    populate: [
      { path: 'author', select: 'fullName avatar' },
      { path: 'owner', select: 'fullName avatar' },
      { path: 'owner', select: 'fullName avatar' },
      { path: 'files' },
    ],
  });
  if (!user) throw new Error('User not found');

  return Promise.all(user.likedWorks.map(async work => ({
    ...work.toObject(),
    files: await getFileUrls(work.files),
  })));
};

export const getSavedWorksService = async (userId) => {
  const user = await User.findById(userId).select('+savedWorks').populate({
    path: 'savedWorks',
    populate: [
      { path: 'author', select: 'fullName avatar' },
      { path: 'owner', select: 'fullName avatar' },
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
