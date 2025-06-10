import React  from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useProfileData } from "../../hooks/useProfileData";
import { useProfile } from "../../hooks/useProfile";
import { ProfileUI } from "./ProfileUI.jsx";
import { NoUserFound } from "../Errors/NoUserFound.jsx";
import { Footer } from "../../../Footer/index.js";

export const Profile = () => {
  const { id } = useParams();
  const currentUser = useSelector((state) => state.auth.user);
  const [profileUser, setProfileUser] = useState(null);

  const {
    profileUser: fetchedProfileUser,
    userWorks,
    isOwnProfile,
    isLoading,
    onDeleteWork,
  } = useProfileData(id, currentUser);

  if (fetchedProfileUser && !profileUser) {
    setProfileUser(fetchedProfileUser);
  }

  const {
    open,
    selectedWork,
    isAvatarLoading,
    handleAvatarUpload,
    handleProfileUpdate,
    openWorkModal,
    closeWorkModal,
  } = useProfile(currentUser, setProfileUser, isOwnProfile);

  if (isLoading && !profileUser) {
    return (
      <>
        <ProfileUI isLoading={true} isAvatarLoading={isAvatarLoading} isOwnProfile={isOwnProfile} />
        <Footer />
      </>
    );
  }

  if (!profileUser) {
    return (
      <>
        <NoUserFound />
        <Footer />
      </>
    );
  }

  return (
    <>
      <ProfileUI
        profileUser={profileUser}
        userWorks={userWorks}
        worksCount={userWorks.length}
        isOwnProfile={isOwnProfile}
        handleAvatarUpload={handleAvatarUpload}
        isAvatarLoading={isAvatarLoading}
        handleProfileUpdate={handleProfileUpdate}
        open={open}
        selectedWork={selectedWork}
        closeWorkModal={closeWorkModal}
        openWorkModal={openWorkModal}
        isLoading={isLoading}
        onDeleteWork={onDeleteWork}
      />
      <Footer />
    </>
  );
};