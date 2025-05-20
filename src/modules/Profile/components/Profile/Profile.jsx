import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { useProfileData } from "../../hooks/useProfileData.js";
import { handleAvatarUpload as uploadAvatar } from "../../utils/handleAvatarUpload.js";
import { ProfileContent } from "./ProfileContent.jsx";
import { LoadingSkeleton } from "../../ui/LoadingSkeleton.jsx";
import { NoUserFound } from "../Errors/NoUserFound.jsx";
import { Footer } from "../../../Footer/index.js";
import { setUser } from "../../../../store/slices/authSlice.js";

export const Profile = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.auth.user);
  const isPostLoading = useSelector((state) => state.loading.isPostLoading);

  const [userWorks, setUserWorks] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedWork, setSelectedWork] = useState(null);
  const [isAvatarLoading, setIsAvatarLoading] = useState(false);

  const {
    profileUser,
    setProfileUser,
    isOwnProfile,
  } = useProfileData(id, currentUser);

  const handleAvatarUpload = (file) => {
    uploadAvatar({
      file,
      currentUser,
      dispatch,
      setProfileUser,
      setIsAvatarLoading,
    });
  };

  const handleProfileUpdate = (updatedUser) => {
    setProfileUser(updatedUser);
    if (isOwnProfile) {
      dispatch(
        setUser({
          user: updatedUser,
          token: localStorage.getItem("token"),
        })
      );
    }
  };

  if (isPostLoading) {
    return (
      <>
        <LoadingSkeleton
          isAvatarLoading={isAvatarLoading}
          isOwnProfile={isOwnProfile}
        />
        <Footer />
      </>
    );
  }

  if (!profileUser) return <NoUserFound />;

  return (
    <>
      <ProfileContent
        profileUser={profileUser}
        userWorks={userWorks}
        isOwnProfile={isOwnProfile}
        handleAvatarUpload={handleAvatarUpload}
        isAvatarLoading={isAvatarLoading}
        handleProfileUpdate={handleProfileUpdate}
        selectedWork={selectedWork}
        setSelectedWork={setSelectedWork}
        open={open}
        setOpen={setOpen}
      />
      <Footer />
    </>
  );
};