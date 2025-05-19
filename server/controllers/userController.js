import * as userService from '../services/userService.js';
import { handleResponse, handleError } from '../utils/responseHandler.js';

export const getUserById = async (req, res) => {
    try {
        const user = await userService.getUserById(req.params.id);
        handleResponse(res, 200, { user }, 'User retrieved successfully');
    } catch (error) {
        handleError(res, error, 'Failed to get user');
    }
};