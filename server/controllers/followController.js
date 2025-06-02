// controllers/followController.js
import User from '../models/User.js';
import { handleResponse, handleError } from '../utils/responseHandler.js';

export const followUser = async (req, res) => {
  try {
    const { userId } = req.user; // Текущий пользователь
    const { id } = req.params; // ID пользователя, на которого подписываемся

    if (userId === id) {
      return handleError(res, null, 'You cannot follow yourself', 400);
    }

    // Добавляем подписку текущему пользователю
    const currentUser = await User.findByIdAndUpdate(
      userId,
      { $addToSet: { following: id } },
      { new: true }
    );

    // Добавляем подписчика целевому пользователю
    const targetUser = await User.findByIdAndUpdate(
      id,
      { $addToSet: { followers: userId } },
      { new: true }
    );

    handleResponse(res, 200, { currentUser, targetUser }, 'Successfully followed user');
  } catch (error) {
    handleError(res, error, 'Failed to follow user');
  }
};

export const unfollowUser = async (req, res) => {
  try {
    const { userId } = req.user;
    const { id } = req.params;

    if (userId === id) {
      return handleError(res, null, 'You cannot unfollow yourself', 400);
    }

    // Удаляем подписку у текущего пользователя
    const currentUser = await User.findByIdAndUpdate(
      userId,
      { $pull: { following: id } },
      { new: true }
    );

    // Удаляем подписчика у целевого пользователя
    const targetUser = await User.findByIdAndUpdate(
      id,
      { $pull: { followers: userId } },
      { new: true }
    );

    handleResponse(res, 200, { currentUser, targetUser }, 'Successfully unfollowed user');
  } catch (error) {
    handleError(res, error, 'Failed to unfollow user');
  }
};

export const getFollowers = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id).populate('followers', 'fullName avatar');
    
    if (!user) {
      return handleError(res, null, 'User not found', 404);
    }

    handleResponse(res, 200, { followers: user.followers }, 'Followers retrieved successfully');
  } catch (error) {
    handleError(res, error, 'Failed to get followers');
  }
};

export const getFollowing = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id).populate('following', 'fullName avatar');
    
    if (!user) {
      return handleError(res, null, 'User not found', 404);
    }

    handleResponse(res, 200, { following: user.following }, 'Following retrieved successfully');
  } catch (error) {
    handleError(res, error, 'Failed to get following');
  }
};