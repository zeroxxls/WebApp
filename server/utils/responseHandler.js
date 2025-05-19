import process from 'node:process';
export const handleResponse = (res, statusCode, data, message = '') => {
    const response = {
        success: true,
        ...data
    };
    
    if (message) {
        response.message = message;
    }
    
    res.status(statusCode).json(response);
};

export const handleError = (res, error, defaultMessage = 'An error occurred') => {
    console.error(error);
    
    res.status(500).json({
        success: false,
        message: error.message || defaultMessage,
        error: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
};