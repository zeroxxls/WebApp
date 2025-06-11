import * as authService from '../services/authService.js';
import { handleResponse, handleError } from '../utils/responseHandler.js';
import User from '../models/User.js'

export const registerUser = async (req, res) => {
    try {
        const userData = req.body;
        const { user, token } = await authService.registerUser(userData);
        handleResponse(res, 201, { user, token }, 'User registered successfully');
    } catch (error) {
        handleError(res, error, 'Failed to register user');
    }
};

export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const { user, token } = await authService.loginUser(email, password);
        handleResponse(res, 200, { user, token }, 'Login successful');
    } catch (error) {
        handleError(res, error, 'Failed to login');
    }
};

export const checkAuth = async (req, res) => {
  try {
    const user = req.user;
    
    handleResponse(res, 200, { user }, 'Authentication check successful');
  } catch (error) {
    console.error('Auth check error:', error);
    handleError(res, error, 'Failed to authenticate');
  }
};