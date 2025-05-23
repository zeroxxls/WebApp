import User from '../models/User.js';

export const getUserById = async (userId) => {
  const user = await User.findById(userId).select('-passwordHash');
  if (!user) {
    throw new Error('User not found');
  }
  return user;
};

export const updateUserProfile = async (userId, updateData) => {
  const updatedUser = await User.findByIdAndUpdate(userId, updateData, { new: true }).select('-passwordHash');
  if (!updatedUser) {
    throw new Error('User not found');
  }
  return updatedUser;
};