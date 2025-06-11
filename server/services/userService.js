import User from '../models/User.js';

export const getUserById = async (id) => {
  const user = await User.findById(id).populate('works');
  if (!user) {
    throw new Error('User not found');
  }
  const workIds = user.works.map(work => work._id);

  const userWithWorkIds = { ...user.toObject(), works: workIds };

  return userWithWorkIds;
};

export const updateUserProfile = async (userId, updateData) => {
  const updatedUser = await User.findByIdAndUpdate(userId, updateData, { new: true }).select('-passwordHash');
  if (!updatedUser) {
    throw new Error('User not found');
  }
  return updatedUser;
};