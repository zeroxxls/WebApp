import User from '../models/User.js';

export const getUserById = async (id) => {
  const user = await User.findById(id)
    .select('-passwordHash -likedWorks -savedWorks -likedArticles -savedArticles')
    .populate('works');
  if (!user) {
    throw new Error('User not found');
  }
  const workIds = user.works.map(work => work._id);

  const userWithWorkIds = { ...user.toObject(), works: workIds };

  return userWithWorkIds;
};

export const updateUserProfile = async (userId, updateData) => {
  const editableFields = ['fullName', 'email', 'phone', 'bio', 'techStack', 'contacts'];
  const safeUpdate = Object.fromEntries(
    editableFields
      .filter((field) => Object.prototype.hasOwnProperty.call(updateData, field))
      .map((field) => [field, updateData[field]])
  );

  const updatedUser = await User.findByIdAndUpdate(
    userId,
    { $set: safeUpdate },
    { new: true, runValidators: true }
  ).select('-passwordHash -likedWorks -savedWorks -likedArticles -savedArticles');
  if (!updatedUser) {
    throw new Error('User not found');
  }
  return updatedUser;
};
