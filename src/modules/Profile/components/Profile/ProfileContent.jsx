import React from "react";
import { ProfileHeader } from "../ProfileHeader/ProfileHeader";
import { ProfileWorksGrid } from "./ProfileWorksGrid";
import { NoWorksFound } from "../Errors/NoWorksFound";
import { ModalWindow } from "../../../MainContent/components/ModalWindow/ModalWindow";
import { useSelector } from "react-redux";

export const ProfileContent = ({
  profileUser,
  isOwnProfile,
  handleAvatarUpload,
  isAvatarLoading,
  handleProfileUpdate,
  selectedWork,
  setSelectedWork,
  open,
  setOpen
}) => {
  const { userWorks, isLoading } = useSelector((state) => state.works);

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <ProfileHeader
        user={profileUser}
        isOwnProfile={isOwnProfile}
        onAvatarUpload={handleAvatarUpload}
        isAvatarLoading={isAvatarLoading}
        onProfileUpdate={handleProfileUpdate}
      />
      
      {isLoading ? (
        <div>Loading works...</div>
      ) : userWorks.length > 0 ? (
        <ProfileWorksGrid
          userWorks={userWorks}
          user={profileUser}
          isOwnProfile={isOwnProfile}
          onWorkClick={(work) => {
            setSelectedWork(work);
            setOpen(true);
          }}
        />
      ) : (
        <NoWorksFound isOwnProfile={isOwnProfile} />
      )}

      {open && (
        <ModalWindow
          onClose={() => setOpen(false)}
          selectedWork={selectedWork}
          selectedUser={profileUser}
        />
      )}
    </div>
  );
};
