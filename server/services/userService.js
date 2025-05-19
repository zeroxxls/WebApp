import User from '../models/User.js';

export const getUserById = async (userId) => {
    const user = await User.findById(userId).select('-passwordHash');
    
    if (!user) {
        throw new Error('User not found');
    }

    return user;
};