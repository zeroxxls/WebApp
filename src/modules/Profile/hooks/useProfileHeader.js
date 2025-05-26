import { useState } from "react";

export const useProfileHeader = () => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const openEditModal = () => {
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
  };

  return {
    isEditModalOpen,
    openEditModal,
    closeEditModal,
  };
};