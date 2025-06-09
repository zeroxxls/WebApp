import User from '../models/User.js';
import mongoose from 'mongoose';

const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);

export const followUserService = async (currentUserId, targetUserId) => {
  if (currentUserId === targetUserId) {
    throw new Error('You cannot follow yourself');
  }

  if (!isValidObjectId(targetUserId)) {
    throw new Error('Invalid user ID');
  }

  const [currentUserExists, targetUserExists] = await Promise.all([
    User.exists({ _id: currentUserId }),
    User.exists({ _id: targetUserId }),
  ]);

  if (!currentUserExists || !targetUserExists) {
    throw new Error('User not found');
  }

  const [currentUser, targetUser] = await Promise.all([
    User.findByIdAndUpdate(
      currentUserId,
      { $addToSet: { following: targetUserId } },
      { new: true, select: 'following' }
    ).lean(),
    User.findByIdAndUpdate(
      targetUserId,
      { $addToSet: { followers: currentUserId } },
      { new: true, select: 'followers' }
    ).lean()
  ]);

  if (!currentUser || !targetUser) {
    throw new Error('Failed to update follow status');
  }

  return {
    followingCount: currentUser.following?.length || 0,
    followersCount: targetUser.followers?.length || 0
  };
};

export const unfollowUserService = async (currentUserId, targetUserId) => {
  if (currentUserId === targetUserId) {
    throw new Error('You cannot unfollow yourself');
  }

  if (!isValidObjectId(targetUserId)) {
    throw new Error('Invalid user ID');
  }

  // Очищаем массивы от некорректных значений перед операцией
  await Promise.all([
    User.updateOne(
      { _id: currentUserId },
      { $pull: { following: { $not: { $type: 'objectId' } } } }
    ),
    User.updateOne(
      { _id: targetUserId },
      { $pull: { followers: { $not: { $type: 'objectId' } } } }
    )
  ]);

  const [currentUser, targetUser] = await Promise.all([
    User.findByIdAndUpdate(
      currentUserId,
      { $pull: { following: targetUserId } },
      { new: true, select: 'following' }
    ),
    User.findByIdAndUpdate(
      targetUserId,
      { $pull: { followers: currentUserId } },
      { new: true, select: 'followers' }
    )
  ]);

  if (!currentUser || !targetUser) {
    throw new Error('Failed to update unfollow status');
  }

  return {
    following: currentUser.following.length,
    followers: targetUser.followers.length
  };
};

export const getFollowersService = async (userId, page = 1, limit = 20) => {
  if (!isValidObjectId(userId)) {
    throw new Error('Invalid user ID');
  }

  const user = await User.findById(userId);
  if (!user) {
    throw new Error('User not found');
  }

  const options = {
    page: parseInt(page),
    limit: parseInt(limit),
    select: 'fullName avatar createdAt',
    sort: { createdAt: -1 }
  };

  const result = await User.paginate(
    { _id: { $in: user.followers } },
    options
  );

  return {
    data: result.docs,
    total: result.totalDocs,
    pages: result.totalPages,
    page: result.page
  };
};

export const getFollowingService = async (userId, page = 1, limit = 20) => {
  if (!isValidObjectId(userId)) {
    throw new Error('Invalid user ID');
  }

  const user = await User.findById(userId);
  if (!user) {
    throw new Error('User not found');
  }

  const options = {
    page: parseInt(page),
    limit: parseInt(limit),
    select: 'fullName avatar createdAt',
    sort: { createdAt: -1 }
  };

  const result = await User.paginate(
    { _id: { $in: user.following } },
    options
  );

  return {
    data: result.docs,
    total: result.totalDocs,
    pages: result.totalPages,
    page: result.page
  };
};
