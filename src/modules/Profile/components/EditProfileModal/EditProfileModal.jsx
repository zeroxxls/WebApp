import React from 'react';
import { useEditProfileModal } from '../../hooks/useEditProfileModal';
import { EditProfileModalContent } from './EditProfileModalContent';

export const EditProfileModal = ({ user, onClose, onUpdate }) => {
  const {
    activeTab,
    setActiveTab,
    formData,
    updateFormData,
    isLoading,
    handleSubmit,
  } = useEditProfileModal(user, onUpdate, onClose);

  return (
    <div className="fixed inset-0 bg-black/70 bg-opacity-50 flex items-center justify-center z-50 p-4">
      <EditProfileModalContent
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        formData={formData}
        updateFormData={updateFormData}
        isLoading={isLoading}
        handleSubmit={handleSubmit}
        onClose={onClose}
      />
    </div>
  );
};