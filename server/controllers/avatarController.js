import * as avatarService from '../services/avatarService.js';
import process from 'node:process';

export const uploadAvatar = async (req, res) => {
  try {
    res.header('Access-Control-Allow-Origin', 'http://localhost:5173');
    res.header('Access-Control-Allow-Credentials', 'true');
    console.log('Uploading avatar for user:', req.params.id);
    console.log('Authenticated user:', req.user._id);
    console.log('File received:', req.file ? {
      originalname: req.file.originalname,
      mimetype: req.file.mimetype,
      size: req.file.size
    } : 'No file');

    const updatedUser = await avatarService.uploadAvatar(
      req.params.id,
      req.user._id.toString(),
      req.file
    );

    console.log('Avatar updated successfully for user:', updatedUser._id);

    res.json({
      success: true,
      user: updatedUser,
      token: req.token
    });

  } catch (error) {
    console.error('Error in avatarController:', {
      message: error.message,
      stack: error.stack,
      statusCode: error.statusCode || 500
    });

    const status = error.statusCode || 500;
    res.status(status).json({
      success: false,
      message: error.message || 'Failed to upload avatar',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

export const getAvatar = async (req, res) => {
  try {
    const avatarData = await avatarService.getAvatar(req.params.id);
    
    if (avatarData?.data) {
      res.set('Content-Type', avatarData.contentType);
      return res.send(avatarData.data);
    }
    
    res.redirect('/default-avatar.png');
  } catch (error) {
    console.error('Error getting avatar:', error);
    res.redirect('/default-avatar.png');
  }
};