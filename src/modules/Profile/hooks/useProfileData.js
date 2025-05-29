import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setIsPostLoading } from "../../../store/slices/loadingSlice";

export const useProfileData = (id, currentUser) => {
  const dispatch = useDispatch();
  const [profileUser, setProfileUser] = useState(null);
  const [userWorks, setUserWorks] = useState([]);
  const isOwnProfile = currentUser && currentUser._id === id;

  // 💡 Оборачиваем в useCallback, чтобы не пересоздавалась функция
  const fetchUserData = useCallback(async () => {
    try {
      dispatch(setIsPostLoading(true));
      let userData;

      if (isOwnProfile) {
        userData = currentUser;
      } else {
        const response = await axios.get(`http://localhost:4444/users/${id}`);
        userData = response.data.user;
      }

      setProfileUser(userData);

      const worksResponse = { data: { works: userData.works || [] } };
      setUserWorks(worksResponse.data.works || []);
    } catch (error) {
      console.error("Error fetching user data:", error);
    } finally {
      dispatch(setIsPostLoading(false));
    }
  }, [dispatch, id, currentUser, isOwnProfile]);
  useEffect(() => {
    fetchUserData();
  }, [fetchUserData]);

  return {
    profileUser,
    setProfileUser,
    userWorks,
    setUserWorks,
    isOwnProfile,
    reloadProfileData: fetchUserData
  };
};