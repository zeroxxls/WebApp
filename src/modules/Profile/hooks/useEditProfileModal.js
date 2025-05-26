import { useState } from 'react';
import { useProfileUpdate } from './useProfileUpdate';

export const useEditProfileModal = (user, onUpdate, onClose) => {
  const [activeTab, setActiveTab] = useState('bio');
  const [formData, setFormData] = useState({
    bio: user.bio || '',
    techStack: user.techStack || [],
    contacts: user.contacts || [],
  });

  const { isLoading, handleSubmit: handleProfileSubmit } = useProfileUpdate(
    user._id,
    formData,
    onUpdate,
    onClose
  );

  const updateFormData = (key, value) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleProfileSubmit(e);
  };

  return {
    activeTab,
    setActiveTab,
    formData,
    updateFormData,
    isLoading,
    handleSubmit,
  };
};