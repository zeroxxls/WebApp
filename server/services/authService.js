import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import process from 'node:process';
import User from '../models/User.js';

export const registerUser = async (userData) => {
    const { fullName, email, phone, password } = userData;

    if (!fullName || !email || !phone || !password) {
        throw new Error('All fields are required');
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
        throw new Error('User with this email already exists');
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser = new User({
        fullName,
        email,
        phone,
        passwordHash,
    });

    const savedUser = await newUser.save();
    const token = generateToken(savedUser._id);

    return {
        user: formatUserResponse(savedUser),
        token
    };
};

export const loginUser = async (email, password) => {
    const user = await User.findOne({ email });
    if (!user) {
        throw new Error('Invalid email or password');
    }

    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
    if (!isPasswordValid) {
        throw new Error('Invalid email or password');
    }

    const token = generateToken(user._id);

    return {
        user: formatUserResponse(user),
        token
    };
};

export const checkAuth = async (userId) => {
    const user = await User.findById(userId).select('-passwordHash');
    if (!user) {
        throw new Error('User not found');
    }
    return user;
};

const generateToken = (userId) => {
    return jwt.sign(
        { id: userId },
        process.env.JWT_SECRET,
        { expiresIn: '7d' }
    );
};

const formatUserResponse = (user) => {
    return {
        _id: user._id,
        fullName: user.fullName,
        email: user.email,
        phone: user.phone,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt
    };
};