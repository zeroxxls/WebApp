import axios from 'axios';
import { useState } from 'react';

export const useProfileUpdate = (userId, formData, onUpdate, onClose) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    console.log('formData being sent:', formData);

    try {
      const token = localStorage.getItem('token');
      const response = await axios.patch(
        `${import.meta.env.VITE_BACKEND_URL}/users/${userId}`,
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