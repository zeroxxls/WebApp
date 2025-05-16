import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import process from 'node:process'
import User from '../models/User.js';

export const registerUser = async (req, res) => {
    try {
        const { fullName, email, phone, password } = req.body;

        // Проверяем обязательные поля
        if (!fullName || !email || !phone || !password) {
            return res.status(400).json({
                success: false,
                message: 'All fields are required'
            });
        }

        // Проверяем, существует ли пользователь
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ 
                success: false, 
                message: 'User with this email already exists' 
            });
        }

        // Хешируем пароль
        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(password, salt);

        // Создаем нового пользователя
        const newUser = new User({
            fullName,
            email,
            phone,
            passwordHash,
        });

        // Сохраняем пользователя в БД
        const savedUser = await newUser.save();

        // Создаем JWT токен
        const token = jwt.sign(
            { id: savedUser._id },
            process.env.JWT_SECRET,
            { expiresIn: '7d' }
        );

        // Формируем ответ без пароля
        const userResponse = {
            _id: savedUser._id,
            fullName: savedUser.fullName,
            email: savedUser.email,
            phone: savedUser.phone,
            createdAt: savedUser.createdAt,
            updatedAt: savedUser.updatedAt
        };

        res.status(201).json({
            success: true,
            user: userResponse,
            token,
        });
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Failed to register user',
            error: error.message 
        });
    }
};

export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Ищем пользователя по email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ 
                success: false, 
                message: 'Invalid email or password' 
            });
        }

        // Проверяем пароль
        const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
        if (!isPasswordValid) {
            return res.status(401).json({ 
                success: false, 
                message: 'Invalid email or password' 
            });
        }

        // Создаем JWT токен
        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: '7d' }
        );

        // Формируем ответ без пароля
        const userResponse = {
            _id: user._id,
            fullName: user.fullName,
            email: user.email,
            phone: user.phone,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt
        };

        res.json({
            success: true,
            user: userResponse,
            token,
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Failed to login',
            error: error.message 
        });
    }
};

export const getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select('-passwordHash');
        
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        res.json({
            success: true,
            user
        });
    } catch (error) {
        console.error('Error getting user:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to get user',
            error: error.message
        });
    }
};

export const uploadAvatar = async (req, res) => {
  try {
    // 1. Проверка загруженного файла
    if (!req.file) {
      console.error('No file was uploaded');
      return res.status(400).json({
        success: false,
        message: 'No file uploaded',
      });
    }

    // 2. Логирование информации о файле
    console.log('Uploading avatar for user:', req.params.id);
    console.log('File info:', {
      originalname: req.file.originalname,
      mimetype: req.file.mimetype,
      size: req.file.size,
      bufferLength: req.file.buffer?.length || 0
    });

    // 3. Проверка прав доступа
    if (req.params.id !== req.user._id.toString()) {
      console.error(`User ${req.user._id} tried to update profile ${req.params.id}`);
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this profile'
      });
    }

    // 4. Сохранение в базу данных
    const updateData = {
      avatar: {
        data: req.file.buffer,
        contentType: req.file.mimetype
      },
      avatarUrl: null // Очищаем старый URL если был
    };

    console.log('Updating user with:', {
      dataLength: updateData.avatar.data.length,
      contentType: updateData.avatar.contentType
    });

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    ).select('-passwordHash');

    // 5. Проверка результата обновления
    if (!updatedUser) {
      console.error('User not found after update attempt');
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    console.log('Successfully updated avatar for user:', updatedUser._id);

    // 6. Возвращаем обновленные данные
    res.json({
      success: true,
      user: updatedUser,
      token: req.token
    });

  } catch (err) {
    console.error('Error uploading avatar:', {
      error: err.message,
      stack: err.stack
    });
    res.status(500).json({
      success: false,
      message: 'Failed to upload avatar',
      error: err.message,
    });
  }
};

export const getAvatar = async (req, res) => {
  try {
    console.log(`Fetching avatar for user ${req.params.id}`);
    
    const user = await User.findById(req.params.id)
      .select('avatar.data avatar.contentType avatarUrl');
    
    console.log('Found user avatar data:', {
      hasBinaryData: !!user?.avatar?.data,
      hasAvatarUrl: !!user?.avatarUrl
    });

    if (user?.avatar?.data) {
      res.set('Content-Type', user.avatar.contentType);
      return res.send(user.avatar.data);
    }

  } catch (err) {
    console.error('Error getting avatar:', {
      error: err.message,
      stack: err.stack
    });
    res.redirect('/default-avatar.png');
  }
};

export const checkAuth = async (req, res) => {
  try {
    // Пользователь доступен через req.user благодаря middleware verifyToken
    const user = await User.findById(req.userId).select('-passwordHash');
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    res.json({
      success: true,
      user
    });
  } catch (error) {
    console.error('Auth check error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to authenticate',
      error: error.message
    });
  }
};