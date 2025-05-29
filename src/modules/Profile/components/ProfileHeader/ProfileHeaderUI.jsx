import React from "react";
import { AvatarSection } from "./AvatarSection";
import { BasicInfoSection } from "./BasicInfoSection";
import { TechStackSection } from "./TechStackSection";
import { ContactStatsSection } from "./ContactsStatsSection";
import { EditProfileModalWrapper } from "./EditProfileModalWrapper";

export const ProfileHeaderUI = ({
  user,
  isOwnProfile,
  isAvatarLoading,
  onAvatarUpload,
  onProfileUpdate,
  isEditModalOpen,
  openEditModal,
  closeEditModal,
  worksCount,
}) => {
  return (
    <div className="mb-8 pb-8 border-b border-gray-700/50">
      <div className="flex flex-col md:flex-row items-center gap-6">
        <AvatarSection
          user={user}
          isOwnProfile={isOwnProfile}
          isAvatarLoading={isAvatarLoading}
          onAvatarUpload={onAvatarUpload}
        />
        <div className="text-center md:text-left flex-1">
          <BasicInfoSection
            user={user}
            isOwnProfile={isOwnProfile}
            setIsEditModalOpen={openEditModal}
          />
          <TechStackSection techStack={user.techStack} />
          <ContactStatsSection contacts={user.contacts} worksCount={worksCount} />
        </div>
      </div>
      <EditProfileModalWrapper
        isOpen={isEditModalOpen}
        onClose={closeEditModal}
        onUpdate={onProfileUpdate}
        user={user}
      />
    </div>
  );
};