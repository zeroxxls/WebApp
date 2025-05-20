import axios from 'axios';
import { useState } from 'react';

export const useProfileUpdate = (userId, formData, onUpdate, onClose) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const token = localStorage.getItem('token');
      const response = await axios.patch(
        `http://localhost:4444/auth/update-profile/${userId}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      
      onUpdate(response.data.user);
      onClose();
    } catch (error) {
      console.error('Error updating profile:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, handleSubmit };
};