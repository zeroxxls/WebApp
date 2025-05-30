import User from '../models/User.js';

export const getUserById = async (id) => {
  const user = await User.findById(id).populate('works');
  if (!user) {
    throw new Error('User not found');
  }
  // Преобразуем массив работ в массив их ID
  const workIds = user.works.map(work => work._id);

  // Создаем новый объект пользователя, где поле 'works' содержит только ID
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