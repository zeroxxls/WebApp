import React from "react";
import { EditProfileModal } from "../EditProfileModal/EditProfileModal";

export const EditProfileModalWrapper = ({ isOpen, onClose, onUpdate, user }) => {
  if (!isOpen) return null;
  return (
    <EditProfileModal
      user={user}
      onClose={onClose}
      onUpdate={onUpdate}
    />
  );
};
