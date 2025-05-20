import axios from "axios";
import { setUser } from "../../../store/slices/authSlice";

export const handleAvatarUpload = async ({
  file,
  currentUser,
  dispatch,
  setProfileUser,
  setIsAvatarLoading,
}) => {
  if (!file || !currentUser) return;

  try {
    setIsAvatarLoading(true);
    const formData = new FormData();
    formData.append("avatar", file);

    const token = localStorage.getItem("token");

    const response = await axios.patch(
      `http://localhost:4444/avatars/${currentUser._id}/avatar`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      }
    );

    dispatch(
      setUser({
        user: response.data.user,
        token: response.data.token || token,
      })
    );

    setProfileUser(response.data.user);
  } catch (error) {
    console.error("Avatar upload failed:", error);
    alert(error.response?.data?.message || "Failed to upload avatar");
  } finally {
    setIsAvatarLoading(false);
  }
};