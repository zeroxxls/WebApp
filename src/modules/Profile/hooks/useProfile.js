import { useState } from "react";
import { useDispatch } from "react-redux";
import { handleAvatarUpload } from "../utils/handleAvatarUpload";
import { setUser } from "../../../store/slices/authSlice";

export const useProfile = (currentUser, setProfileUser, isOwnProfile) => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [selectedWork, setSelectedWork] = useState(null);
  const [isAvatarLoading, setIsAvatarLoading] = useState(false);

  const handleAvatarUploadFn = async (file) => {
    await handleAvatarUpload({
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

  const openWorkModal = (work) => {
    setSelectedWork(work);
    setOpen(true);
  };

  const closeWorkModal = () => {
    setOpen(false);
    setSelectedWork(null);
  };

  return {
    open,
    selectedWork,
    isAvatarLoading,
    handleAvatarUpload: handleAvatarUploadFn,
    handleProfileUpdate,
    openWorkModal,
    closeWorkModal,
    setSelectedWork,
    setOpen, 
  };
};