import jwt from 'jsonwebtoken';
import process from 'node:process'
import User from '../models/User.js';

export const authMiddleware = async (req, res, next) => {
    try {
        const token = req.header('Authorization')?.replace('Bearer ', '');
        
        if (!token) {
            return res.status(401).json({ 
                success: false, 
                message: 'No token, authorization denied' 
            });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id).select('-passwordHash');

        if (!user) {
            return res.status(401).json({ 
                success: false, 
                message: 'Token is not valid' 
            });
        }

        req.user = user;
        req.token = token; // Добавляем токен в request
        next();
    } catch (error) {
        console.error('Auth middleware error:', error);
        res.status(401).json({ 
            success: false, 
            message: 'Token is not valid',
            error: error.message 
        });
    }
};