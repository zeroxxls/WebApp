// controllers/followController.js
import User from '../models/User.js';
import { handleResponse, handleError } from '../utils/responseHandler.js';
import mongoose from 'mongoose';

const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);

export const followUser = async (req, res) => {
  try {
    const userId = req.user; 
    const { id } = req.params;


    if (userId === id) {
      return handleError(res, new Error('You cannot follow yourself'), 'Вы не можете подписаться на себя', 400); // 400 - Bad Request
    }
    
    if (!mongoose.Types.ObjectId.isValid(id)) {
      // И здесь тоже: передайте объект Error
      return handleError(res, new Error('Invalid user ID'), 'Неверный ID пользователя', 400); // 400 - Bad Request
    }

    // Проверяем существование обоих пользователей
    const [currentUserExists, targetUserExists] = await Promise.all([
      User.exists({ _id: userId }),
      User.exists({ _id: id })
    ]);

    if (!currentUserExists || !targetUserExists) {
      // И здесь
      return handleError(res, new Error('User not found'), 'Пользователь не найден', 404); // 404 - Not Found
    }

    // Обновляем подписки
    const [currentUser, targetUser] = await Promise.all([
      User.findByIdAndUpdate(
        userId,
        { $addToSet: { following: id } },
        { new: true, select: 'following' }
      ).lean(),
      User.findByIdAndUpdate(
        id,
        { $addToSet: { followers: userId } },
        { new: true, select: 'followers' }
      ).lean()
    ]);

    // Проверяем, что пользователи были успешно обновлены
    if (!currentUser || !targetUser) {
      // И здесь
      return handleError(res, new Error('Failed to update follow status'), 'Не удалось обновить статус подписки', 500); // 500 - Internal Server Error
    }

    handleResponse(res, 200, { 
      followingCount: currentUser.following?.length || 0,
      followersCount: targetUser.followers?.length || 0
    }, 'Successfully followed user');
  } catch (error) {
    // Здесь 'error' уже является объектом Error, поэтому это работает.
    handleError(res, error, 'Failed to follow user');
  }
};

export const unfollowUser = async (req, res) => {
  try {
    const userId  = req.user;
    const { id } = req.params;

    if (userId === id) {
      return handleError(res, new Error('You cannot unfollow yourself'), 'Вы не можете отписаться от себя', 400);
    }
    
    if (!isValidObjectId(id)) {
      return handleError(res, new Error('Invalid user ID'), 'Неверный ID пользователя', 400);
    }

    const [currentUser, targetUser] = await Promise.all([
      User.findByIdAndUpdate(
        userId,
        { $pull: { following: id } },
        { new: true, select: 'following' }
      ),
      User.findByIdAndUpdate(
        id,
        { $pull: { followers: userId } },
        { new: true, select: 'followers' }
      )
    ]);

    // Проверка на то, что пользователи существуют и были обновлены (аналогично followUser)
    if (!currentUser || !targetUser) {
        return handleError(res, new Error('Failed to update unfollow status'), 'Не удалось обновить статус отписки', 500);
    }

    handleResponse(res, 200, { 
      following: currentUser.following.length,
      followers: targetUser.followers.length 
    }, 'Successfully unfollowed user');
  } catch (error) {
    handleError(res, error, 'Failed to unfollow user');
  }
};

// ... остальные функции (getFollowers, getFollowing) тоже могут использовать new Error
export const getFollowers = async (req, res) => {
    try {
        const { id } = req.params;
        const { page = 1, limit = 20 } = req.query;
        
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return handleError(res, new Error('Invalid user ID'), 'Неверный ID пользователя', 400);
        }

        const user = await User.findById(id);
        if (!user) {
            return handleError(res, new Error('User not found'), 'Пользователь не найден', 404);
        }

        const options = {
            page: parseInt(page),
            limit: parseInt(limit),
            select: 'fullName avatar createdAt',
            sort: { createdAt: -1 }
        };

        // Убедитесь, что paginate возвращает объект с docs и totalDocs
        const result = await User.paginate(
            { _id: { $in: user.followers } },
            options
        );

        handleResponse(res, 200, {
            data: result.docs, // Переименовано для соответствия handleResponse
            total: result.totalDocs,
            pages: result.totalPages,
            page: result.page
        }, 'Followers retrieved successfully');
    } catch (error) {
        handleError(res, error, 'Failed to get followers');
    }
};

export const getFollowing = async (req, res) => {
    try {
        const { id } = req.params;
        const { page = 1, limit = 20 } = req.query;
        
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return handleError(res, new Error('Invalid user ID'), 'Неверный ID пользователя', 400);
        }

        const user = await User.findById(id);
        if (!user) {
            return handleError(res, new Error('User not found'), 'Пользователь не найден', 404);
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

        handleResponse(res, 200, {
            data: result.docs, // Переименовано для соответствия handleResponse
            total: result.totalDocs,
            pages: result.totalPages,
            page: result.page
        }, 'Following retrieved successfully');
    } catch (error) {
        handleError(res, error, 'Failed to get following');
    }
};