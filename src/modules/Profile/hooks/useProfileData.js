import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setIsPostLoading } from "../../../store/slices/loadingSlice";

export const useProfileData = (id, currentUser) => {
  const dispatch = useDispatch();
  const [profileUser, setProfileUser] = useState(null);
  const [userWorks, setUserWorks] = useState([]);
  const isOwnProfile = currentUser && currentUser._id === id;

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

      // Получаем ID работ пользователя
      const workIds = userData.works || [];

      // Внутри fetchUserData в useProfileData.js
      if (workIds.length > 0) {
        const worksPromises = workIds
          .filter(workId => typeof workId === 'string') // Фильтруем, оставляя только строки (ID)
          .map(workId => {
            return axios.get(`http://localhost:4444/works/${workId}`);
          });

        const worksResponses = await Promise.all(worksPromises);
        const fetchedWorks = worksResponses.map(res => res.data.work);
        setUserWorks(fetchedWorks);
      } else {
        setUserWorks([]);
      }

    } catch (error) {
      console.error("Error fetching user data:", error);
    } finally {
      dispatch(setIsPostLoading(false));
    }
  }, [dispatch, id, currentUser, isOwnProfile]);
const deleteWork = async (workId) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.delete(`http://localhost:4444/works/${workId}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    
    if (!response.data.success) {
      throw new Error('Failed to delete work');
    }
    
    // Принудительно обновляем данные пользователя
    const userResponse = await axios.get(`http://localhost:4444/users/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    
    setProfileUser(userResponse.data.user);
    setUserWorks(prevWorks => prevWorks.filter(work => work._id !== workId));
    
    return true;
  } catch (error) {
    console.error('Error deleting work:', error);
    return false;
  }
};
  useEffect(() => {
    fetchUserData();
  }, [fetchUserData]);

  return {
    profileUser,
    setProfileUser,
    userWorks,
    setUserWorks,
    isOwnProfile,
    reloadProfileData: fetchUserData,
    onDeleteWork: deleteWork
  };
};