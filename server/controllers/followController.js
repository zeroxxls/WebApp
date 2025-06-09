import {
  followUserService,
  unfollowUserService,
  getFollowersService,
  getFollowingService
} from '../services/followService.js';
import { handleResponse, handleError } from '../utils/responseHandler.js';

export const followUser = async (req, res) => {
  try {
    const result = await followUserService(req.user._id, req.params.id);
    handleResponse(res, 200, result, 'Successfully followed user');
  } catch (error) {
    handleError(res, error, 'Failed to follow user');
  }
};

export const unfollowUser = async (req, res) => {
  try {
    const result = await unfollowUserService(req.user._id, req.params.id);
    handleResponse(res, 200, result, 'Successfully unfollowed user');
  } catch (error) {
    handleError(res, error, 'Failed to unfollow user');
  }
};

export const getFollowers = async (req, res) => {
  try {
    const result = await getFollowersService(req.params.id, req.query.page, req.query.limit);
    handleResponse(res, 200, result, 'Followers retrieved successfully');
  } catch (error) {
    handleError(res, error, 'Failed to get followers');
  }
};

export const getFollowing = async (req, res) => {
  try {
    const result = await getFollowingService(req.params.id, req.query.page, req.query.limit);
    handleResponse(res, 200, result, 'Following retrieved successfully');
  } catch (error) {
    handleError(res, error, 'Failed to get following');
  }
};
