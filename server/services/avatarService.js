import User from '../models/User.js';

export const uploadAvatar = async (userId, requestingUserId, file) => {
  try {
    if (!file || !file.buffer) {
      throw new Error('No file or invalid file uploaded');
    }

    if (userId !== requestingUserId) {
      console.error(`Authorization failed: ${requestingUserId} tried to update ${userId}`);
      throw new Error('Not authorized to update this profile');
    }

    const updateData = {
      avatar: {
        data: file.buffer,
        contentType: file.mimetype
      },
      avatarUrl: null
    };

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      updateData,
      { new: true }
    ).select('-passwordHash');

    if (!updatedUser) {
      throw new Error('User not found after update');
    }

    return updatedUser;
  } catch (error) {
    console.error('Error in avatarService:', error);
    throw error;
  }
};

export const getAvatar = async (userId) => {
  try {
    const user = await User.findById(userId)
      .select('avatar.data avatar.contentType avatarUrl');
    
    return user?.avatar || null;
  } catch (error) {
    console.error('Error getting avatar:', error);
    throw error;
  }
};