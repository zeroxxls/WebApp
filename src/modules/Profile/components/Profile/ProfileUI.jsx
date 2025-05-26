import React from "react";
import { ProfileHeader } from "../ProfileHeader/ProfileHeader";
import { ProfileWorksGrid } from "./ProfileWorksGrid";
import { NoWorksFound } from "../Errors/NoWorksFound";
import { ModalWindow } from "../../../MainContent/components/ModalWindow/ModalWindow";
import { LoadingSkeleton } from "../../ui/LoadingSkeleton";

export const ProfileUI = ({
  profileUser,
  userWorks,
  isOwnProfile,
  handleAvatarUpload,
  isAvatarLoading,
  handleProfileUpdate,
  open,
  selectedWork,
  closeWorkModal,
  openWorkModal,
  isLoading,
}) => {
  if (isLoading) {
    return <LoadingSkeleton isAvatarLoading={isAvatarLoading} isOwnProfile={isOwnProfile} />;
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <ProfileHeader
        user={profileUser}
        isOwnProfile={isOwnProfile}
        onAvatarUpload={handleAvatarUpload}
        isAvatarLoading={isAvatarLoading}
        onProfileUpdate={handleProfileUpdate}
      />

      {userWorks.length > 0 ? (
        <ProfileWorksGrid
          userWorks={userWorks}
          user={profileUser}
          isOwnProfile={isOwnProfile}
          onWorkClick={openWorkModal}
        />
      ) : (
        <NoWorksFound isOwnProfile={isOwnProfile} />
      )}

      {open && (
        <ModalWindow
          onClose={closeWorkModal}
          selectedWork={selectedWork}
          selectedUser={profileUser}
        />
      )}
    </div>
  );
};