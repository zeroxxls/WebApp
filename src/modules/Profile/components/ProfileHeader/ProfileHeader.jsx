import React from "react";
import { useProfileHeader } from "../../hooks/useProfileHeader";
import { ProfileHeaderUI } from "./ProfileHeaderUI";

export const ProfileHeader = ({
  user,
  isLoading,
  isOwnProfile,
  onAvatarUpload,
  isAvatarLoading,
  onProfileUpdate,
  worksCount,
}) => {
  const { isEditModalOpen, openEditModal, closeEditModal } = useProfileHeader();

  if (isLoading || !user) {
    return (
      <div className="flex flex-col md:flex-row items-center gap-6 mb-8 pb-8 border-b border-gray-700/50 animate-pulse">
        <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-gray-700"></div>
        <div className="space-y-2">
          <div className="h-6 w-48 bg-gray-700 rounded"></div>
          <div className="h-4 w-64 bg-gray-700 rounded"></div>
          <div className="h-4 w-32 bg-gray-700 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <ProfileHeaderUI
      user={user}
      isOwnProfile={isOwnProfile}
      isAvatarLoading={isAvatarLoading}
      onAvatarUpload={onAvatarUpload}
      onProfileUpdate={onProfileUpdate}
      isEditModalOpen={isEditModalOpen}
      openEditModal={openEditModal}
      closeEditModal={closeEditModal}
      worksCount={worksCount}
    />
  );
};
