import React, { useState } from "react";
import { AvatarSection } from "./AvatarSection";
import { BasicInfoSection } from "./BasicInfoSection";
import { TechStackSection } from "./TechStackSection";
import { ContactStatsSection } from "./ContactsStatsSection";
import { EditProfileModalWrapper } from "./EditProfileModalWrapper";

export const ProfileHeader = ({
  user,
  isLoading,
  isOwnProfile,
  onAvatarUpload,
  isAvatarLoading,
  onProfileUpdate,
}) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

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
            setIsEditModalOpen={setIsEditModalOpen}
          />
          <TechStackSection techStack={user.techStack} />
          <ContactStatsSection contacts={user.contacts} worksCount={user.worksCount} />
        </div>
      </div>
      <EditProfileModalWrapper
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onUpdate={onProfileUpdate}
        user={user}
      />
    </div>
  );
};
